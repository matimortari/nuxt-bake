import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { logStep, printNextStepsBox } from "../src/helpers/ui"

let consoleSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {}))
afterEach(() => consoleSpy.mockRestore())

describe("logStep", () => {
  it("prints the title line and a separator", () => {
    logStep("Installing dependencies")

    expect(consoleSpy).toHaveBeenCalledWith("◇  Installing dependencies")
    expect(consoleSpy).toHaveBeenCalledWith("│")
    expect(consoleSpy).toHaveBeenCalledTimes(2)
  })

  it("prints the detail line when provided", () => {
    logStep("Installing dependencies", "this may take a while")

    expect(consoleSpy).toHaveBeenCalledWith("◇  Installing dependencies")
    expect(consoleSpy).toHaveBeenCalledWith("│  this may take a while")
    expect(consoleSpy).toHaveBeenCalledWith("│")
    expect(consoleSpy).toHaveBeenCalledTimes(3)
  })

  it("does not print detail line when omitted", () => {
    logStep("Done")

    const calls = consoleSpy.mock.calls.map(c => c[0])
    expect(calls.some((line: string) => line.startsWith("│  "))).toBe(false)
  })
})

describe("printNextStepsBox", () => {
  it("prints a box with the given lines", () => {
    printNextStepsBox(["cd my-app", "bun install"])

    const lines = consoleSpy.mock.calls.map(c => c[0] as string)
    expect(lines[0]).toMatch(/^╭── 👉 Next steps/)
    expect(lines.at(-1)).toMatch(/^╰─+╯$/)
    expect(lines.some(l => l.includes("cd my-app"))).toBe(true)
    expect(lines.some(l => l.includes("bun install"))).toBe(true)
  })

  it("pads short lines to match the box width", () => {
    printNextStepsBox(["short"])

    const lines = consoleSpy.mock.calls.map(c => c[0] as string)
    const contentLines = lines.filter(l => l.startsWith("│ ") && !l.startsWith("│  "))
    // Every content line must end with │
    for (const line of contentLines) {
      expect(line.endsWith("│")).toBe(true)
    }
  })

  it("widens the box when a line is longer than the title", () => {
    const longLine = "a".repeat(60)
    printNextStepsBox([longLine])

    const lines = consoleSpy.mock.calls.map(c => c[0] as string)
    expect(lines.some(l => l.includes(longLine))).toBe(true)
    // top and bottom borders should be wide enough
    expect(lines[0].length).toBeGreaterThanOrEqual(longLine.length)
  })

  it("handles an empty lines array", () => {
    printNextStepsBox([])

    const lines = consoleSpy.mock.calls.map(c => c[0] as string)
    expect(lines[0]).toMatch(/^╭── 👉 Next steps/)
    expect(lines.at(-1)).toMatch(/^╰─+╯$/)
    expect(consoleSpy).toHaveBeenCalledTimes(4) // top border + 2 padding rows + bottom border
  })
})
