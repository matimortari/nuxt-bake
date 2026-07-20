type Preset = "standard" | "with-i18n" | "with-tests"

type PackageManagerName = "npm" | "yarn" | "pnpm" | "bun"

interface CliArgs {
  projectName: string | null
  targetPath: string | null
}

interface CommandSpec {
  command: string
  args: string[]
}

interface PackageManagerCommands {
  name: PackageManagerName
  install: CommandSpec
  runScript: (script: string) => CommandSpec
}

interface PresetExtras {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  scripts?: Record<string, string>
}
