import fs from "node:fs/promises"
import { beforeEach, describe, expect, it, vi } from "vitest"
import * as template from "../src/helpers/template"
import * as utils from "../src/helpers/utils"

vi.mock("node:fs/promises")
vi.mock("../src/helpers/utils", async importOriginal => ({ ...await importOriginal<typeof import("../src/helpers/utils")>(), pathExists: vi.fn() }))

const NOT_FOUND_REGEX = /not found/
const targetDir = "/tmp/target"

beforeEach(() => vi.clearAllMocks())

describe("copyRootTemplate", () => {
  it("throws if path doesn't exist", async () => {
    vi.mocked(utils.pathExists).mockResolvedValue(false)

    await expect(template.copyRootTemplate(targetDir)).rejects.toThrow(NOT_FOUND_REGEX)
  })

  it("copies files if path exists", async () => {
    vi.mocked(utils.pathExists).mockResolvedValue(false).mockResolvedValueOnce(true)
    vi.mocked(fs.cp as any).mockResolvedValue(undefined)

    const result = await template.copyRootTemplate(targetDir)

    expect(fs.cp).toHaveBeenCalledWith(expect.stringContaining("base"), targetDir, { recursive: true })
    expect(result).toContain("base")
  })

  it("renames gitignore to .gitignore when present", async () => {
    vi.mocked(utils.pathExists).mockResolvedValue(true)
    vi.mocked(fs.cp as any).mockResolvedValue(undefined)
    vi.mocked(fs.rename as any).mockResolvedValue(undefined)

    await template.copyRootTemplate(targetDir)

    expect(fs.rename).toHaveBeenCalledWith(
      expect.stringContaining("gitignore"),
      expect.stringContaining(".gitignore"),
    )
  })
})

describe("copyPresetFiles", () => {
  it("returns early for standard preset", async () => {
    await template.copyPresetFiles("standard", targetDir)

    expect(utils.pathExists).not.toHaveBeenCalled()
    expect(fs.readdir).not.toHaveBeenCalled()
    expect(fs.cp).not.toHaveBeenCalled()
  })

  it("throws if preset not found", async () => {
    vi.mocked(utils.pathExists).mockResolvedValue(false)

    await expect(template.copyPresetFiles("with-i18n", targetDir)).rejects.toThrow(NOT_FOUND_REGEX)
  })

  it("copies root files and app folder", async () => {
    vi.mocked(utils.pathExists).mockResolvedValue(true)
    vi.mocked(fs.readdir as unknown as (path: string) => Promise<string[]>).mockResolvedValue(["file1.txt", "app"])
    vi.mocked(fs.cp as any).mockResolvedValue(undefined)

    await template.copyPresetFiles("with-i18n", targetDir)

    expect(fs.readdir).toHaveBeenCalledWith(expect.stringContaining("with-i18n"))
    expect(fs.cp).toHaveBeenCalledWith(
      expect.stringContaining("file1.txt"),
      expect.stringContaining("file1.txt"),
      { recursive: true, force: true },
    )
    expect(fs.cp).toHaveBeenCalledWith(
      expect.stringContaining("app"),
      expect.stringContaining("app"),
      { recursive: true, force: true },
    )
  })

  it("copies root files without app folder when app doesn't exist", async () => {
    vi.mocked(utils.pathExists).mockImplementation(async path => !path.includes("app"))
    vi.mocked(fs.readdir as unknown as (path: string) => Promise<string[]>).mockResolvedValue(["file1.txt", "file2.txt"])
    vi.mocked(fs.cp as any).mockResolvedValue(undefined)

    await template.copyPresetFiles("with-i18n", targetDir)

    expect(fs.readdir).toHaveBeenCalledWith(expect.stringContaining("with-i18n"))
    expect(fs.cp).toHaveBeenCalledWith(
      expect.stringContaining("file1.txt"),
      expect.stringContaining("file1.txt"),
      { recursive: true, force: true },
    )
    expect(fs.cp).toHaveBeenCalledWith(
      expect.stringContaining("file2.txt"),
      expect.stringContaining("file2.txt"),
      { recursive: true, force: true },
    )
    expect(fs.cp).toHaveBeenCalledTimes(2)
  })
})
