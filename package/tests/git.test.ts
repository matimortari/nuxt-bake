import { spawnSync } from "node:child_process"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import * as git from "../src/helpers/git"

vi.mock("node:child_process")

// Suppress console.error for all tests to avoid confusion
let consoleSpy: ReturnType<typeof vi.spyOn>
beforeEach(() => {
  consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
})
afterEach(() => {
  consoleSpy.mockRestore()
})

describe("cloneRepoToTemp", () => {
  it("should clone repo successfully", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 0, error: null } as any)
    const tmpDir = git.cloneRepoToTemp("fake-repo-url")
    expect(tmpDir).toContain("nuxt-bake-")
  })

  it("should return null if clone fails with non-zero status", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 1, error: null } as any)
    const tmpDir = git.cloneRepoToTemp("fake-repo-url")
    expect(tmpDir).toBeNull()
  })

  it("should return null if clone fails with error object", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 0, error: new Error("git error") } as any)
    const tmpDir = git.cloneRepoToTemp("fake-repo-url")
    expect(tmpDir).toBeNull()
  })
})

describe("promptAndInitGit", () => {
  it("should log error if git init fails with error", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 0, error: new Error("init error") } as any)
    git.promptAndInitGit("/fake/dir")
    expect(consoleSpy).toHaveBeenCalledWith("Failed to initialize Git:", "init error")
  })

  it("should log error if git init fails with non-zero status", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 1, error: null } as any)
    git.promptAndInitGit("/fake/dir")
    expect(consoleSpy).toHaveBeenCalledWith("Git init failed")
  })

  it("should succeed silently if git init succeeds", () => {
    vi.mocked(spawnSync).mockReturnValue({ status: 0, error: null } as any)
    git.promptAndInitGit("/fake/dir")
    expect(consoleSpy).not.toHaveBeenCalled()
  })
})
