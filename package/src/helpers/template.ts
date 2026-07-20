import fs, { cp } from "node:fs/promises"
import path from "node:path"
import { getTemplatesDir, pathExists } from "./utils.js"

export async function copyRootTemplate(targetDir: string) {
  const templatesDir = getTemplatesDir()
  const rootTemplateDir = path.join(templatesDir, "base")
  if (!(await pathExists(rootTemplateDir))) {
    throw new Error(`Root template directory "${rootTemplateDir}" not found.`)
  }

  await cp(rootTemplateDir, targetDir, { recursive: true })

  const gitignoreSrc = path.join(targetDir, "gitignore")
  const gitignoreDest = path.join(targetDir, ".gitignore")
  if (await pathExists(gitignoreSrc)) {
    await fs.rename(gitignoreSrc, gitignoreDest)
  }

  return rootTemplateDir
}

export async function copyPresetFiles(preset: Preset, targetDir: string) {
  if (preset === "standard") {
    return
  }

  const templatesDir = getTemplatesDir()
  const presetDir = path.join(templatesDir, preset)
  if (!(await pathExists(presetDir))) {
    throw new Error(`Preset directory "${presetDir}" not found.`)
  }

  const presetRootFiles = await fs.readdir(presetDir)
  for (const file of presetRootFiles) {
    if (file === "app") {
      continue
    }

    await cp(path.join(presetDir, file), path.join(targetDir, file), { recursive: true, force: true })
  }

  const presetAppDir = path.join(presetDir, "app")
  if (await pathExists(presetAppDir)) {
    await cp(presetAppDir, path.join(targetDir, "app"), { recursive: true, force: true })
  }
}
