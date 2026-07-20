import { existsSync } from "node:fs"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { confirm, input } from "@inquirer/prompts"

export function getTemplatesDir() {
  const currentFile = fileURLToPath(import.meta.url)
  const sourceTemplatesDir = path.resolve(path.dirname(currentFile), "../..", "templates")
  if (existsSync(sourceTemplatesDir)) {
    return sourceTemplatesDir
  }

  return path.resolve(path.dirname(currentFile), "../../..", "templates")
}

export const PRESET_EXTRA_SCRIPTS: Record<Preset, Record<string, string>> = {
  "standard": {},
  "with-i18n": {},
  "with-tests": {
    "test": "vitest",
    "test:e2e": "playwright test",
    "coverage": "vitest --coverage",
  },
}

export const PRESET_EXTRA_PACKAGES: Record<Preset, PresetExtras> = {
  "standard": {},
  "with-i18n": {
    dependencies: {
      "@nuxtjs/i18n": "10.2.3",
    },
  },
  "with-tests": {
    devDependencies: {
      "@nuxt/test-utils": "4.0.0",
      "@vitest/coverage-v8": "4.1.10",
      "@vue/test-utils": "2.4.11",
      "happy-dom": "20.11.0",
      "@playwright/test": "1.60.0",
      "vitest": "4.1.10",
    },
  },
}

function getArgValue(args: string[], flags: string[]) {
  const index = args.findIndex(arg => flags.includes(arg))
  if (index !== -1 && args.length > index + 1) {
    return args[index + 1]
  }

  return null
}

function parseCliArgs(): CliArgs {
  const args = process.argv.slice(2)
  const namedProject = getArgValue(args, ["-n", "--name"])
  const targetPath = getArgValue(args, ["-p", "--path"])

  return {
    projectName: namedProject ?? (args.find(arg => !arg.startsWith("-") && arg !== namedProject && arg !== targetPath) ?? null),
    targetPath,
  }
}

export async function promptForProjectName() {
  let projectName = parseCliArgs().projectName
  if (!projectName) {
    projectName = await input({
      message: "Enter your new project folder name:",
      default: "my-nuxt-app",
      validate: input => (input ? true : "Project folder name cannot be empty"),
    })
  }

  return projectName
}

export async function promptForProjectPath() {
  let targetPath = parseCliArgs().targetPath
  if (!targetPath) {
    targetPath = await input({
      message: "Where would you like to create your project?",
      default: ".",
      validate: value => (value ? true : "Project path cannot be empty"),
    })
  }

  return path.resolve(process.cwd(), targetPath)
}

export async function pathExists(filePath: string) {
  return fs.access(filePath).then(() => true).catch(() => false)
}

export function resolveProjectDirectory(projectName: string, basePath: string) {
  return path.resolve(basePath, projectName)
}

export async function validateTargetDirectory(projectName: string, basePath = process.cwd()) {
  const targetDir = resolveProjectDirectory(projectName, basePath)
  const exists = await pathExists(targetDir)
  if (exists) {
    const overwrite = await confirm({
      message: `Directory "${projectName}" already exists. Overwrite?`,
      default: false,
    })
    if (!overwrite) {
      return null
    }

    await fs.rm(targetDir, { recursive: true, force: true })
  }

  return targetDir
}
