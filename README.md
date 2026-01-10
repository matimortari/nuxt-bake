# Nuxt Bake 💚🏔️

A Nuxt.js starter project with modern tools and best practices, designed to help you build robust web applications quickly and efficiently.

## What's Inside?

### Web Application (`web/`)

- The web app that demonstrates the project’s capabilities.

### Command Line Interface (`package/`)

- The CLI tool, packaged as a npm module, to scaffold new projects using this starter.

## Key Features

This starter includes multiple templates to kick-start different project types:

### Standard Template

- **Nuxt 4** with **Vue** composition API and **Nitro** server engine.
- **TypeScript 5**.
- **ESLint 9**.
- **Tailwind CSS 4**.
- **Fonts** support via **@nuxt/fonts**.
- **Icons** support via **@nuxt/icon**.
- **OAuth** authentication with Google and GitHub via **nuxt-auth-utils**.
- **Pinia** for state management via **@pinia/nuxt**.
- **Prisma** for database management.
- **Vercel Analytics**.

### i18n Template

- **Internationalization** support via **@nuxtjs/i18n**.

### Test Template

- **Vitest** for unit and integration testing.
- **Playwright** for end-to-end testing.

## Getting Started

- Create a new project using the starter script:

```bash
npx @matimortari/nuxt-bake
```

- Navigate to the project directory and install dependencies:

```bash
cd <project-name>
npm install
```

- Migrate or push the database schema:

```bash
npm run db:migrate
# or
npm run db:push
```

- Start the development server:

```bash
npm run dev
```

> ⚠️ Ensure your `.env` file is properly configured before running database commands.

## Environment Variables

Be sure to configure the necessary environment variables for the application.
For a list of required environment variables and instructions, refer to the `.env.example` file included in the project template.

## Contact

Feel free to reach out to discuss collaboration opportunities or to say hello!

- [**My Email**](mailto:matheus.felipe.19rt@gmail.com)
- [**My LinkedIn Profile**](https://www.linkedin.com/in/matheus-mortari-19rt)
- [**My GitHub Profile**](https://github.com/matimortari)

## License

This project is licensed under the [**MIT License**](./LICENSE).
