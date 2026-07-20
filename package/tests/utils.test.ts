import { existsSync } from "node:fs"
import fs from "node:fs/promises"
import { confirm, input } from "@inquirer/prompts"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PRESET_EXTRA_PACKAGES, PRESET_EXTRA_SCRIPTS } from "../src/helpers/utils"
import * as utils from "../src/helpers/utils"

vi.mock("node:fs")
vi.mock("node:fs/promises")
vi.mock("@inquirer/prompts")

describe("getTemplatesDir", () => {
  it("returns the source templates dir when it exists", () => {
    vi.mocked(existsSync).mockReturnValue(true)
    const dir = utils.getTemplatesDir()
    expect(dir).toContain("templates")
  })

  it("returns the fallback templates dir when source does not exist", () => {
    vi.mocked(existsSync).mockReturnValue(false)
    const dir = utils.getTemplatesDir()
    expect(dir).toContain("templates")
  })
})

const presets = ["standard", "with-i18n", "with-tests"] as const
let originalArgv: string[]
beforeEach(() => originalArgv = [...process.argv])
afterEach(() => {
  process.argv = originalArgv
  vi.clearAllMocks()
})

describe.each(presets)("preset %s", (preset) => {
  it("has a valid scripts object", () => {
    expect(PRESET_EXTRA_SCRIPTS[preset]).toBeTypeOf("object")
  })

  it("has a valid packages object", () => {
    expect(PRESET_EXTRA_PACKAGES[preset]).toBeTypeOf("object")
  })
})

describe("promptForProjectName", () => {
  it("returns name from args", async () => {
    process.argv = ["node", "cli.js", "-n", "my-arg-nuxt-app"]
    const name = await utils.promptForProjectName()
    expect(name).toBe("my-arg-nuxt-app")
  })

  it("prompts if no args", async () => {
    process.argv = ["node", "cli.js"]
    vi.mocked(input).mockResolvedValue("my-prompted-nuxt-app")

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-prompted-nuxt-app")
  })

  it("validator rejects empty string during prompt", async () => {
    process.argv = ["node", "cli.js"]
    const inputMock = vi.mocked(input)
    inputMock.mockImplementation((opts: any) => {
      const validateFn = opts.validate
      expect(validateFn("")).toBe("Project folder name cannot be empty")
      expect(validateFn("valid")).toBe(true)
      const promise = Promise.resolve("my-filled-nuxt-app") as any
      promise.cancel = () => {}
      return promise
    })

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-filled-nuxt-app")
  })

  it("prompts if -n is empty string", async () => {
    process.argv = ["node", "cli.js", "-n", ""]
    vi.mocked(input).mockResolvedValue("my-filled-from-empty-nuxt-app")

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-filled-from-empty-nuxt-app")
  })

  it("uses positional project name without prompting", async () => {
    process.argv = ["node", "cli.js", "my-positional-app"]
    const name = await utils.promptForProjectName()
    expect(name).toBe("my-positional-app")
    expect(input).not.toHaveBeenCalled()
  })
})

describe("promptForProjectPath", () => {
  it("returns path from args without prompting", async () => {
    process.argv = ["node", "cli.js", "-p", "./target"]
    const resolvedPath = await utils.promptForProjectPath()
    expect(resolvedPath).toContain("target")
    expect(input).not.toHaveBeenCalled()
  })

  it("prompts for project path when no args are provided", async () => {
    process.argv = ["node", "cli.js"]
    vi.mocked(input).mockResolvedValue("./custom-target")

    const resolvedPath = await utils.promptForProjectPath()

    expect(resolvedPath).toContain("custom-target")
  })

  it("validator rejects empty string during prompt", async () => {
    process.argv = ["node", "cli.js"]
    const inputMock = vi.mocked(input)
    inputMock.mockImplementation((opts: any) => {
      const validateFn = opts.validate
      expect(validateFn("")).toBe("Project path cannot be empty")
      expect(validateFn("./some-path")).toBe(true)
      const promise = Promise.resolve("./filled-path") as any
      promise.cancel = () => {}
      return promise
    })

    const resolvedPath = await utils.promptForProjectPath()
    expect(resolvedPath).toContain("filled-path")
  })
})

describe("validateTargetDirectory", () => {
  it("returns null if path exists and user declines overwrite", async () => {
    vi.mocked(fs.access).mockResolvedValue()
    vi.mocked(confirm).mockResolvedValue(false)

    const result = await utils.validateTargetDirectory("exists")
    expect(result).toBeNull()
  })

  it("removes existing directory if user confirms overwrite", async () => {
    vi.mocked(fs.access).mockResolvedValue()
    vi.mocked(confirm).mockResolvedValue(true)
    vi.mocked(fs.rm).mockResolvedValue()

    const result = await utils.validateTargetDirectory("exists")
    expect(fs.rm).toHaveBeenCalled()
    expect(result).toContain("exists")
  })

  it("removes existing directory even if projectName is empty string", async () => {
    vi.mocked(fs.access).mockResolvedValue()
    vi.mocked(confirm).mockResolvedValue(true)
    vi.mocked(fs.rm).mockResolvedValue()

    const result = await utils.validateTargetDirectory("")
    expect(fs.rm).toHaveBeenCalled()
    expect(result).toContain("")
  })

  it("returns path if not exists", async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error("ENOENT"))

    const result = await utils.validateTargetDirectory("new-dir")
    expect(result).toContain("new-dir")
  })

  it("resolves path even if projectName is empty string and path does not exist", async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error("ENOENT"))

    const result = await utils.validateTargetDirectory("")
    expect(result).toContain("")
  })

  it("resolves using custom base path", async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error("ENOENT"))

    const result = await utils.validateTargetDirectory("new-dir", "/tmp")
    expect(result).toBe("/tmp/new-dir")
  })
})
