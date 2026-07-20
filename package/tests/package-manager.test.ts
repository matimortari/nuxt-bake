import { spawnSync } from "node:child_process"
import fs from "node:fs/promises"
import { select } from "@inquirer/prompts"
import { beforeEach, describe, expect, it, vi } from "vitest"
import createSpinner from "yocto-spinner"
import * as pkgMgr from "../src/helpers/package-manager"

vi.mock("node:fs/promises")
vi.mock("@inquirer/prompts")
vi.mock("yocto-spinner")
vi.mock("node:child_process")

const readFileMock = vi.mocked(fs.readFile as unknown as (path: string, encoding: string) => Promise<string>)
const writeFileMock = vi.mocked(fs.writeFile)
const createSpinnerMock = vi.mocked(createSpinner)
const spawnMock = vi.mocked(spawnSync)

let spinnerMock: any

beforeEach(() => {
  vi.clearAllMocks()
  spinnerMock = { start: vi.fn().mockReturnThis(), stop: vi.fn(), success: vi.fn(), error: vi.fn() }
  createSpinnerMock.mockReturnValue(spinnerMock)
})

describe("createPackageManagerCommands", () => {
  it("should return correct commands for all package managers", () => {
    const managers = [
      { name: "npm", installCommand: "npm", runCommand: "npm", runArgs: ["run", "test"] },
      { name: "yarn", installCommand: "yarn", runCommand: "yarn", runArgs: ["test"] },
      { name: "pnpm", installCommand: "pnpm", runCommand: "pnpm", runArgs: ["run", "test"] },
      { name: "bun", installCommand: "bun", runCommand: "bun", runArgs: ["run", "test"] },
    ]

    for (const { name, installCommand, runCommand, runArgs } of managers) {
      const commands = pkgMgr.createPackageManagerCommands(name)
      expect(commands.install.command).toBe(installCommand)
      expect(commands.runScript("test")).toEqual({ command: runCommand, args: runArgs })
    }
  })
})

describe("promptForPackageManager", () => {
  it("should prompt and return selected package manager", async () => {
    vi.mocked(select).mockResolvedValue("yarn")
    const commands = await pkgMgr.promptForPackageManager()
    expect(commands.name).toBe("yarn")
    expect(commands.install.command).toBe("yarn")
  })
})

describe("installDependencies", () => {
  it("should run install and lint scripts successfully", async () => {
    spawnMock.mockReturnValue({ status: 0, error: null } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await pkgMgr.installDependencies("targetDir", pkg)
    expect(spinnerMock.stop).toHaveBeenCalled()
  })

  it("should fail gracefully if install fails", async () => {
    spawnMock.mockReturnValue({ status: 1, error: null, stderr: "fail" } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.installDependencies("targetDir", pkg)).rejects.toThrow("fail")
    expect(spinnerMock.error).toHaveBeenCalledWith("Failed to install dependencies")
  })

  it("should rethrow the error object when spawn returns an error", async () => {
    const spawnError = new Error("spawn error")
    spawnMock.mockReturnValue({ status: 0, error: spawnError } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.installDependencies("targetDir", pkg)).rejects.toThrow("spawn error")
    expect(spinnerMock.error).toHaveBeenCalledWith("Failed to install dependencies")
  })

  it("should use the fallback message when stderr is empty", async () => {
    spawnMock.mockReturnValue({ status: 1, error: null, stderr: "" } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.installDependencies("targetDir", pkg)).rejects.toThrow("Dependency installation failed")
  })
})

describe("runProjectSetup", () => {
  it("should run postinstall script", async () => {
    spawnMock.mockReturnValue({ status: 0, error: null } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")

    await pkgMgr.runProjectSetup("targetDir", pkg)

    expect(spinnerMock.stop).toHaveBeenCalled()
    expect(spawnMock).toHaveBeenCalledTimes(1)
  })

  it("should fail if setup command fails", async () => {
    spawnMock.mockReturnValue({ status: 1, error: null, stderr: "postinstall failed" } as any)

    const pkg = pkgMgr.createPackageManagerCommands("npm")

    await expect(pkgMgr.runProjectSetup("targetDir", pkg)).rejects.toThrow("postinstall failed")
    expect(spinnerMock.error).toHaveBeenCalledWith("Failed to prepare project")
  })

  it("should rethrow the error object when spawn returns an error", async () => {
    const spawnError = new Error("spawn setup error")
    spawnMock.mockReturnValue({ status: 0, error: spawnError } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.runProjectSetup("targetDir", pkg)).rejects.toThrow("spawn setup error")
    expect(spinnerMock.error).toHaveBeenCalledWith("Failed to prepare project")
  })

  it("should use the fallback message when stderr is empty", async () => {
    spawnMock.mockReturnValue({ status: 1, error: null, stderr: "" } as any)
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.runProjectSetup("targetDir", pkg)).rejects.toThrow("Project preparation failed")
  })
})

describe("updatePackageJson", () => {
  it("should merge dependencies correctly", async () => {
    readFileMock.mockResolvedValue(JSON.stringify({ dependencies: { a: "1" }, devDependencies: {}, scripts: {} }))
    writeFileMock.mockResolvedValue()
    await pkgMgr.updatePackageJson("rootDir", "targetDir", "standard", { dependencies: { b: "2" }, devDependencies: {}, scripts: {} })
    expect(writeFileMock).toHaveBeenCalled()
  })

  it("should merge devDependencies and scripts", async () => {
    readFileMock.mockResolvedValue(JSON.stringify({
      dependencies: {},
      devDependencies: { a: "1" },
      scripts: { start: "node index.js" },
    }))
    writeFileMock.mockResolvedValue()
    await pkgMgr.updatePackageJson("rootDir", "targetDir", "standard", {
      dependencies: {},
      devDependencies: { b: "2" },
      scripts: { test: "vitest" },
    })
    expect(writeFileMock).toHaveBeenCalled()
  })

  it("should handle empty extras without error", async () => {
    readFileMock.mockResolvedValue(JSON.stringify({ dependencies: {}, devDependencies: {}, scripts: {} }))
    writeFileMock.mockResolvedValue()
    await pkgMgr.updatePackageJson("rootDir", "targetDir", "standard", {})
    expect(writeFileMock).toHaveBeenCalled()
  })
})
