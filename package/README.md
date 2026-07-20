# nuxt-bake

A CLI tool to quickly scaffold a Nuxt.js starter project with modern tools and best practices.

## Testing

The project includes unit and end-to-end tests set up with Vitest and Playwright. For development, you can run the tests using the following commands:

- To run unit tests with Vitest:

```bash
npm run test
```

- To check test coverage:

```bash
npm run coverage
```

- To run end-to-end tests with Playwright:

```bash
npm run test:e2e
```

## Publishing the Package

The package includes release scripts that handle versioning and publishing:

```bash
# For bug fixes (1.0.10 → 1.0.11)
npm run release:patch

# For new features (1.0.10 → 1.1.0)
npm run release:minor

# For breaking changes (1.0.10 → 2.0.0)
npm run release:major
```

Each script will:

1. Bump the version accordingly
2. Publish to npm with public access

## Usage

Create a new project using npx:

```bash
npx nuxt-bake

# Skip name prompt with a positional argument:
npx nuxt-bake my-nuxt-app

# Or use explicit flags:
npx nuxt-bake --name my-nuxt-app --path ./apps

# or install globally:
npm install -g nuxt-bake
nuxt-bake
```

You’ll be prompted to choose:

- Project name
- Project path
- Features (i18n, testing, etc.)
- Package manager (npm, pnpm, yarn, bun)
- Git repository initialization?
- Install dependencies?

After setup, you’ll have a fresh Nuxt.js project ready to go!

## Contact

Feel free to reach out to discuss collaboration opportunities or to say hello!

- [**My Email**](mailto:matheus.felipe.19rt@gmail.com)
- [**My LinkedIn Profile**](https://www.linkedin.com/in/matheus-mortari-19rt)
- [**My GitHub Profile**](https://github.com/matimortari)

## License

This project is licensed under the [**MITMIT License**](https://github.com/matimortari/nuxt-bake/blob/main/LICENSE).
