import { execSync } from "node:child_process"
import fs from "fs-extra"
import inquirer from "inquirer"
import ora from "ora"
import { beforeEach, describe, expect, it, vi } from "vitest"
import * as pkgMgr from "../src/helpers/package-manager"

vi.mock("fs-extra")
vi.mock("inquirer")
vi.mock("ora")
vi.mock("node:child_process")

const readFileMock = vi.mocked(fs.readFile as unknown as (path: string, encoding: string) => Promise<string>)
const writeFileMock = vi.mocked(fs.writeFile)
const oraMock = vi.mocked(ora)
const execMock = vi.mocked(execSync)

let spinnerMock: any

beforeEach(() => {
  vi.clearAllMocks()

  spinnerMock = { start: vi.fn().mockReturnThis(), stop: vi.fn(), succeed: vi.fn(), fail: vi.fn() }
  oraMock.mockReturnValue(spinnerMock)
})

describe("createPackageManagerCommands", () => {
  it("should return correct commands for all package managers", () => {
    const managers = [
      { name: "npm", installCmd: "npm install", run: "npm run test" },
      { name: "yarn", installCmd: "yarn install", run: "yarn test" },
      { name: "pnpm", installCmd: "pnpm install", run: "pnpm test" },
      { name: "bun", installCmd: "bun install", run: "bun run test" },
    ]

    for (const { name, installCmd, run } of managers) {
      const commands = pkgMgr.createPackageManagerCommands(name)
      expect(commands.installCmd).toBe(installCmd)
      expect(commands.runScript("test")).toBe(run)
    }
  })
})

describe("promptForPackageManager", () => {
  it("should prompt and return selected package manager", async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ pkgManager: "yarn" })
    const commands = await pkgMgr.promptForPackageManager()
    expect(commands.name).toBe("yarn")
    expect(commands.installCmd).toBe("yarn install")
  })
})

describe("installDependencies", () => {
  it("should run install and lint scripts successfully", async () => {
    execMock.mockReturnValue("")
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await pkgMgr.installDependencies("targetDir", pkg)
    expect(spinnerMock.succeed).toHaveBeenCalledWith("Dependencies installed!")
  })

  it("should fail gracefully if execSync throws", async () => {
    execMock.mockImplementation(() => {
      throw new Error("fail")
    })
    const pkg = pkgMgr.createPackageManagerCommands("npm")
    await expect(pkgMgr.installDependencies("targetDir", pkg)).rejects.toThrow("fail")
    expect(spinnerMock.fail).toHaveBeenCalledWith("Failed to install dependencies")
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
