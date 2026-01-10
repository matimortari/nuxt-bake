import { execSync } from "node:child_process"
import path from "node:path"
import fs from "fs-extra"
import inquirer from "inquirer"
import ora from "ora"

function mergeObjects(base = {}, extra = {}) {
  return { ...base, ...extra }
}

export function createPackageManagerCommands(pkgManager: string) {
  switch (pkgManager) {
    case "yarn":
      return {
        name: "yarn",
        installCmd: "yarn install",
        runScript: (script: string) => `yarn ${script}`,
      }
    case "pnpm":
      return {
        name: "pnpm",
        installCmd: "pnpm install",
        runScript: (script: string) => `pnpm ${script}`,
      }
    case "bun":
      return {
        name: "bun",
        installCmd: "bun install",
        runScript: (script: string) => `bun run ${script}`,
      }
    case "npm":
    default:
      return {
        name: "npm",
        installCmd: "npm install",
        runScript: (script: string) => `npm run ${script}`,
      }
  }
}

export async function promptForPackageManager() {
  const { pkgManager } = await inquirer.prompt({
    type: "list",
    name: "pkgManager",
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

export async function installDependencies(targetDir: string, pkgManager: any) {
  const spinner = ora("Installing dependencies...").start()

  try {
    spinner.stop()
    execSync(pkgManager.installCmd, { cwd: targetDir, stdio: "inherit" })
    execSync(pkgManager.runScript("lint:fix"), { cwd: targetDir, stdio: "ignore" })
    spinner.succeed("Dependencies installed!")
  }
  catch (err: any) {
    spinner.fail("Failed to install dependencies")
    throw err
  }
}

export async function updatePackageJson(rootTemplateDir: string, targetDir: string, preset: string, extras: any) {
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
