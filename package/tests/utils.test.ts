import fs from "fs-extra"
import inquirer from "inquirer"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PRESET_EXTRA_PACKAGES, PRESET_EXTRA_SCRIPTS, REPO_URL } from "../src/helpers/utils"
import * as utils from "../src/helpers/utils"

vi.mock("fs-extra")
vi.mock("inquirer")

const presets = ["standard", "with-i18n", "with-tests"] as const
let originalArgv: string[]

beforeEach(() => {
  originalArgv = [...process.argv]
})

afterEach(() => {
  process.argv = originalArgv
  vi.clearAllMocks()
})

describe("repository", () => {
  it("has a valid REPO_URL", () => {
    expect(REPO_URL).toBe("https://github.com/matimortari/nuxt-bake.git")
  })
})

describe.each(presets)("preset %s", (preset) => {
  it("has a valid scripts object", () => {
    expect(PRESET_EXTRA_SCRIPTS[preset]).toBeTypeOf("object")
  })

  it("has a valid packages object", () => {
    expect(PRESET_EXTRA_PACKAGES[preset]).toBeTypeOf("object")
  })
})

describe("getProjectNameFromArgs", () => {
  it("returns correct name with -n", () => {
    process.argv = ["node", "cli.js", "-n", "my-nuxt-app"]
    expect(utils.getProjectNameFromArgs()).toBe("my-nuxt-app")
  })

  it("returns correct name with --name", () => {
    process.argv = ["node", "cli.js", "--name", "my-nuxt-app"]
    expect(utils.getProjectNameFromArgs()).toBe("my-nuxt-app")
  })

  it("returns null if no name provided", () => {
    process.argv = ["node", "cli.js"]
    expect(utils.getProjectNameFromArgs()).toBeNull()
  })

  it("returns empty string if -n is empty", () => {
    process.argv = ["node", "cli.js", "-n", ""]
    expect(utils.getProjectNameFromArgs()).toBe("")
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
    const promptMock = vi.mocked(inquirer.prompt as any)
    promptMock.mockResolvedValue({ projectName: "my-prompted-nuxt-app" })

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-prompted-nuxt-app")
  })

  it("validator rejects empty string during prompt", async () => {
    process.argv = ["node", "cli.js"]
    const promptMock = vi.mocked(inquirer.prompt as any)
    promptMock.mockImplementation(async (opts: any) => {
      const validateFn = opts.validate
      expect(validateFn("")).toBe("Project folder name cannot be empty")
      expect(validateFn("valid")).toBe(true)
      return { projectName: "my-filled-nuxt-app" }
    })

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-filled-nuxt-app")
  })

  it("prompts if -n is empty string", async () => {
    process.argv = ["node", "cli.js", "-n", ""]
    const promptMock = vi.mocked(inquirer.prompt as any)
    promptMock.mockResolvedValue({ projectName: "my-filled-from-empty-nuxt-app" })

    const name = await utils.promptForProjectName()
    expect(name).toBe("my-filled-from-empty-nuxt-app")
  })
})

describe("validateTargetDirectory", () => {
  it("returns null if path exists and user declines overwrite", async () => {
    const pathExistsMock = vi.mocked(fs.pathExists as any)
    const promptMock = vi.mocked(inquirer.prompt as any)

    pathExistsMock.mockResolvedValue(true)
    promptMock.mockResolvedValue({ overwrite: false })

    const result = await utils.validateTargetDirectory("exists")
    expect(result).toBeNull()
  })

  it("removes existing directory if user confirms overwrite", async () => {
    const pathExistsMock = vi.mocked(fs.pathExists as any)
    const removeMock = vi.mocked(fs.remove as any)
    const promptMock = vi.mocked(inquirer.prompt as any)

    pathExistsMock.mockResolvedValue(true)
    removeMock.mockResolvedValue()
    promptMock.mockResolvedValue({ overwrite: true })

    const result = await utils.validateTargetDirectory("exists")
    expect(removeMock).toHaveBeenCalled()
    expect(result).toContain("exists")
  })

  it("removes existing directory even if projectName is empty string", async () => {
    const pathExistsMock = vi.mocked(fs.pathExists as any)
    const removeMock = vi.mocked(fs.remove as any)
    const promptMock = vi.mocked(inquirer.prompt as any)

    pathExistsMock.mockResolvedValue(true)
    removeMock.mockResolvedValue()
    promptMock.mockResolvedValue({ overwrite: true })

    const result = await utils.validateTargetDirectory("")
    expect(removeMock).toHaveBeenCalled()
    expect(result).toContain("")
  })

  it("returns path if not exists", async () => {
    const pathExistsMock = vi.mocked(fs.pathExists as any)
    pathExistsMock.mockResolvedValue(false)

    const result = await utils.validateTargetDirectory("new-dir")
    expect(result).toContain("new-dir")
  })

  it("resolves path even if projectName is empty string and path does not exist", async () => {
    const pathExistsMock = vi.mocked(fs.pathExists as any)
    pathExistsMock.mockResolvedValue(false)

    const result = await utils.validateTargetDirectory("")
    expect(result).toContain("")
  })
})
