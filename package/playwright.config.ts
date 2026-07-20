import { defineConfig } from "@playwright/test"

export default defineConfig({
  outputDir: "./tests/e2e/test-results",
  testDir: "./tests/e2e",
})
