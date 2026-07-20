<div align="center">
<h1>
    <img src="public/wordmark.png" alt="Logo" width="300"/>
</h1>

A production-ready Nuxt.js starter with modern tooling and best practices, designed to help you build robust web applications quickly and efficiently.
</div>

## Repository Structure

### `web/`

A demo application showcasing the starter's capabilities and serving as a living example.

### `package/`

The CLI tool published to npm for scaffolding new projects based on this starter.

## Templates

Choose from multiple preconfigured templates to match your project needs:

### Standard Template

A comprehensive starter with:

- **Nuxt 4** with Vue Composition API and Nitro server engine.
- **TypeScript 7** for type safety.
- **ESLint** with modern flat config.
- **Tailwind CSS 4** for utility-first styling.
- **@nuxt/fonts** for optimized web font loading.
- **@nuxt/icon** for 200,000+ icons on-demand.
- **@nuxtjs/seo** for search engine optimization.
- **nuxt-auth-utils** for OAuth authentication (GitHub & Google).
- **@pinia/nuxt** for state management.
- **Prisma** for type-safe database access.

### i18n Template

Extends the standard template with:

- **@nuxtjs/i18n** for internationalization and localized routing.

### Test Template

Extends the standard template with:

- **Vitest** for unit and component testing.
- **Playwright** for end-to-end testing.

## Quick Start

### Create a New Project

```bash
npx @matimortari/nuxt-bake
```

Follow the interactive prompts to:
- Choose your project name
- Select a template (Standard, i18n, or Test)
- Install dependencies
- Initialize Git repository

### Configure Your Project

1. **Install dependencies:**

   ```bash
   cd <project-name>
   npm install
   ```

2. **Configure environment variables:**

   Copy the `.env.example` file to `.env` and fill in your environment-specific values:

   ```bash
   cp .env.example .env
   ```

   Refer to the `.env.example` file for details on required variables.

3. **Set up the database:**

   Run Prisma migrations to set up your database schema:

   ```bash
   npm run db:migrate
   ```

   Or use push for prototyping (no migration files):

   ```bash
   npm run db:push
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

   Your app will be available at `http://localhost:3000`.

> **Note:** Ensure your `.env` file is properly configured before running database commands.

## Contact

Feel free to reach out to discuss collaboration opportunities or to say hello!

- [**My Email**](mailto:matheus.felipe.19rt@gmail.com)
- [**My LinkedIn Profile**](https://www.linkedin.com/in/matheus-mortari-19rt)
- [**My GitHub Profile**](https://github.com/matimortari)

## License

This project is licensed under the [**MIT License**](./LICENSE).
