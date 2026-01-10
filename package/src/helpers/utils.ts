import path from "node:path"
import fs from "fs-extra"
import inquirer from "inquirer"

export type Preset = "standard" | "with-i18n" | "with-tests"

export const REPO_URL = "https://github.com/matimortari/nuxt-bake.git"

export const PRESET_EXTRA_SCRIPTS: Record<Preset, Record<string, string>> = {
  "standard": {},
  "with-i18n": {},
  "with-tests": {
    "test": "vitest",
    "test:e2e": "playwright test",
    "coverage": "vitest --coverage",
  },
}

export const PRESET_EXTRA_PACKAGES: Record<Preset, { dependencies?: Record<string, string>, devDependencies?: Record<string, string>, scripts?: Record<string, string> }> = {
  "standard": {},
  "with-i18n": {
    dependencies: {
      "@nuxtjs/i18n": "10.2.1",
    },
  },
  "with-tests": {
    devDependencies: {
      "@nuxt/test-utils": "3.19.2",
      "@vitest/coverage-v8": "4.0.16",
      "@vue/test-utils": "3.20.0",
      "happy-dom": "13.7.6",
      "@playwright/test": "1.57.0",
      "vitest": "4.0.16",
    },
  },
}

export function getProjectNameFromArgs() {
  const args = process.argv.slice(2)
  const nIndex = args.findIndex(a => a === "-n" || a === "--name")
  if (nIndex !== -1 && args.length > nIndex + 1) {
    return args[nIndex + 1]
  }

  return null
}

export async function promptForProjectName() {
  let projectName = getProjectNameFromArgs()
  if (!projectName) {
    const { projectName: answerName } = await inquirer.prompt({
      type: "input",
      name: "projectName",
      message: "Enter your new project folder name:",
      default: "my-nuxt-app",
      validate: input => (input ? true : "Project folder name cannot be empty"),
    })

    projectName = answerName
  }

  return projectName
}

export async function validateTargetDirectory(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName)
  const exists = await fs.pathExists(targetDir)
  if (exists) {
    const { overwrite } = await inquirer.prompt({
      type: "confirm",
      name: "overwrite",
      message: `Directory "${projectName}" already exists. Overwrite?`,
      default: false,
    })
    if (!overwrite) {
      return null
    }

    await fs.remove(targetDir)
  }

  return targetDir
}
