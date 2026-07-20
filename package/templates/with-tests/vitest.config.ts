import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./tests/setup.ts",
    exclude: ["templates/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,js}"],
      exclude: ["**/*.d.ts", "tests/**", "node_modules/**"],
    },
  },
})
