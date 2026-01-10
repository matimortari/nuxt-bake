import { spawnSync } from "node:child_process"
import os from "node:os"
import path from "node:path"

export function cloneRepoToTemp(repoUrl: string) {
  const tmpDir = path.join(os.tmpdir(), `nuxt-bake-${Date.now()}`)
  const result = spawnSync("git", ["clone", "--depth=1", "--quiet", repoUrl, tmpDir], { stdio: "pipe", shell: true })
  if (result.error) {
    console.error("Failed to get project from remote:", result.error.message)
    return null
  }
  if (result.status !== 0) {
    console.error("Failed to clone repository")
    return null
  }

  return tmpDir
}

export function promptAndInitGit(targetDir: string) {
  const result = spawnSync("git", ["init", "--quiet"], { cwd: targetDir, stdio: "pipe", shell: true })
  if (result.error) {
    console.error("Failed to initialize Git:", result.error.message)
  }
  else if (result.status !== 0) {
    console.error("Git init failed")
  }
}
