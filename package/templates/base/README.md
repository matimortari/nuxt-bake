# Nuxt Bake

This project was scaffolded using [**Nuxt Bake**](https://www.npmjs.com/package/nuxt-bake) – a modern Nuxt.js starter with best practices built-in.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env` and fill in your environment-specific values:

```bash
cp .env.example .env
```

Refer to the `.env.example` file for details on required variables.

### 3. Set Up the Database

Run Prisma migrations to set up your database schema:

```bash
npm run db:migrate
```

Or use push for prototyping (no migration files):

```bash
npm run db:push
```

### 4. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`.

## Available Scripts

- `dev` – Start the development server
- `build` – Build for production
- `typecheck` – Run TypeScript type checking
- `lint` – Lint the codebase
- `lint:fix` – Lint and auto-fix issues
- `db:generate` – Generate Prisma Client
- `db:push` – Push schema changes to the database
- `db:migrate` – Create and apply migrations

## Learn More

Visit the [Nuxt Bake documentation](https://www.npmjs.com/package/nuxt-bake) for more information about this starter template.
