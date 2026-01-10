import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    exclude: ["templates/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,js}"],
      exclude: ["**/*.d.ts", "tests/**", "node_modules/**"],
    },
  },
})
