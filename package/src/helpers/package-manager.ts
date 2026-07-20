import { spawnSync } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { select } from "@inquirer/prompts"
import createSpinner from "yocto-spinner"

function mergeObjects(base = {}, extra = {}) {
  return { ...base, ...extra }
}

function runCommand(command: CommandSpec, targetDir: string) {
  return spawnSync(command.command, command.args, {
    cwd: targetDir,
    stdio: "pipe",
    encoding: "utf8",
  })
}

export function createPackageManagerCommands(pkgManager: string): PackageManagerCommands {
  switch (pkgManager) {
    case "yarn":
      return {
        name: "yarn",
        install: { command: "yarn", args: ["install", "--ignore-scripts", "--silent"] },
        runScript: (script: string) => ({ command: "yarn", args: [script] }),
      }
    case "pnpm":
      return {
        name: "pnpm",
        install: { command: "pnpm", args: ["install", "--ignore-scripts", "--reporter", "silent"] },
        runScript: (script: string) => ({ command: "pnpm", args: ["run", script] }),
      }
    case "bun":
      return {
        name: "bun",
        install: { command: "bun", args: ["install", "--ignore-scripts"] },
        runScript: (script: string) => ({ command: "bun", args: ["run", script] }),
      }
    case "npm":
    default:
      return {
        name: "npm",
        install: { command: "npm", args: ["install", "--ignore-scripts", "--no-fund", "--no-audit"] },
        runScript: (script: string) => ({ command: "npm", args: ["run", script] }),
      }
  }
}

export async function promptForPackageManager() {
  const pkgManager = await select<PackageManagerName>({
    message: "Which package manager do you want to use?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" },
      { name: "bun", value: "bun" },
    ],
    default: "npm",
  })

  return createPackageManagerCommands(pkgManager)
}

export async function installDependencies(targetDir: string, pkgManager: PackageManagerCommands) {
  const spinner = createSpinner({ text: "Installing dependencies..." }).start()

  try {
    const installResult = runCommand(pkgManager.install, targetDir)
    if (installResult.error || installResult.status !== 0) {
      throw installResult.error || new Error(installResult.stderr || "Dependency installation failed")
    }

    spinner.stop()
  }
  catch (err: unknown) {
    spinner.error("Failed to install dependencies")
    throw err
  }
}

export async function runProjectSetup(targetDir: string, pkgManager: PackageManagerCommands) {
  const spinner = createSpinner({ text: "Preparing project (Prisma + Nuxt)..." }).start()

  try {
    const postinstallResult = runCommand(pkgManager.runScript("postinstall"), targetDir)
    if (postinstallResult.error || postinstallResult.status !== 0) {
      throw postinstallResult.error || new Error(postinstallResult.stderr || "Project preparation failed")
    }

    spinner.stop()
  }
  catch (err: unknown) {
    spinner.error("Failed to prepare project")
    throw err
  }
}

export async function updatePackageJson(rootTemplateDir: string, targetDir: string, preset: Preset, extras: PresetExtras) {
  const rootPkgPath = path.join(rootTemplateDir, "package.json")
  const targetPkgPath = path.join(targetDir, "package.json")
  const rootPkg = JSON.parse(await fs.readFile(rootPkgPath, "utf8"))

  const mergedPkg = {
    ...rootPkg,
    dependencies: mergeObjects(rootPkg.dependencies, extras.dependencies),
    devDependencies: mergeObjects(rootPkg.devDependencies, extras.devDependencies),
    scripts: mergeObjects(rootPkg.scripts, extras.scripts),
  }

  await fs.writeFile(targetPkgPath, JSON.stringify(mergedPkg, null, 2), "utf8")
}
