#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { confirm, select } from "@inquirer/prompts"
import { promptAndInitGit } from "./helpers/git.js"
import { installDependencies, promptForPackageManager, runProjectSetup, updatePackageJson } from "./helpers/package-manager.js"
import { copyPresetFiles, copyRootTemplate } from "./helpers/template.js"
import { logStep, printNextStepsBox } from "./helpers/ui.js"
import { pathExists, PRESET_EXTRA_PACKAGES, PRESET_EXTRA_SCRIPTS, promptForProjectName, promptForProjectPath, resolveProjectDirectory, validateTargetDirectory } from "./helpers/utils.js"

async function run() {
  try {
    console.log("\n┌  Welcome to Nuxt Bake!\n│")

    const projectName = await promptForProjectName()
    if (!projectName) {
      console.log("\nProject name is required. Please provide a valid name.\n")
      process.exit(1)
    }

    const projectBasePath = await promptForProjectPath()
    const targetDir = await validateTargetDirectory(projectName, projectBasePath)
    if (!targetDir) {
      console.log(`\nFolder "${projectName}" already exists. Please choose another name or remove it.\n`)
      process.exit(1)
    }

    logStep("Creating project in", path.relative(process.cwd(), resolveProjectDirectory(projectName, projectBasePath)))

    const rootTemplateDir = await copyRootTemplate(targetDir)
    logStep("Project root created")

    const preset = await select<Preset>({
      message: "Select a preset:",
      choices: [
        { name: "Standard", value: "standard" },
        { name: "With i18n", value: "with-i18n" },
        { name: "With Tests", value: "with-tests" },
      ],
    })
    logStep("Preset selected", preset)

    await copyPresetFiles(preset, targetDir)
    logStep("Template files copied")

    await updatePackageJson(rootTemplateDir, targetDir, preset, {
      dependencies: PRESET_EXTRA_PACKAGES[preset]?.dependencies || {},
      devDependencies: PRESET_EXTRA_PACKAGES[preset]?.devDependencies || {},
      scripts: PRESET_EXTRA_SCRIPTS[preset] || {},
    })
    logStep("Project configuration merged")

    if (await pathExists(path.join(targetDir, ".env.example"))) {
      await fs.copyFile(path.join(targetDir, ".env.example"), path.join(targetDir, ".env"))
      logStep("Environment file created", ".env")
    }

    const pkgManager = await promptForPackageManager()
    logStep("Package manager selected", pkgManager.name)

    const initGit = await confirm({ message: "Initialize a Git repository?", default: true })
    if (initGit) {
      promptAndInitGit(targetDir)
      logStep("Git repository initialized")
    }

    const installDeps = await confirm({ message: "Install dependencies now?", default: true })
    if (installDeps) {
      await installDependencies(targetDir, pkgManager)
      await runProjectSetup(targetDir, pkgManager)
      logStep("Dependencies installed and project prepared")
    }

    console.log("└  ✨ Nuxt Bake project setup complete.\n")

    const devCommand = pkgManager.name === "yarn" ? "yarn dev" : `${pkgManager.name} run dev`
    printNextStepsBox([
      `› cd ${path.relative(process.cwd(), targetDir)}`,
      `› ${devCommand}`,
    ])
  }
  catch (err: unknown) {
    console.error("Error:", err)
    process.exit(1)
  }
}

run()
