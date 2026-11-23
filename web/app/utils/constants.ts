export const TABS = [
  { key: "standard", label: "Standard" },
  { key: "with-i18n", label: "With i18n" },
  { key: "with-tests", label: "With Tests" },
] as const

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const

const CORE_FEATURES = [
  { icon: "simple-icons:nuxtdotjs", label: "Nuxt v4", description: "Vue Composition API, Nitro, and file-based routing." },
  { icon: "simple-icons:typescript", label: "TypeScript v7", description: "End-to-end types across app, server, and Prisma." },
  { icon: "simple-icons:tailwindcss", label: "Tailwind CSS v4", description: "Utility-first styling with a ready-made design system." },
  { icon: "simple-icons:iconify", label: "Nuxt Icon", description: "On-demand icons without shipping a huge sprite." },
  { icon: "ph:text-aa", label: "Nuxt Fonts", description: "Self-hosted Google fonts with zero layout shift." },
  { icon: "icon-park-outline:pineapple", label: "Pinia", description: "Typed client state that stays predictable as you grow." },
  { icon: "ph:lock-key-open", label: "OAuth", description: "GitHub and Google sign-in with session validation." },
  { icon: "simple-icons:prisma", label: "Prisma ORM", description: "Type-safe PostgreSQL access and migrations." },
  { icon: "simple-icons:eslint", label: "ESLint", description: "Flat config and formatting so the codebase stays consistent." },
  { icon: "ph:magnifying-glass", label: "Nuxt SEO", description: "Sitemap, robots, and sensible defaults out of the box." },
] as const

export const FEATURES: Record<typeof TABS[number]["key"], { icon: string, label: string, description: string }[]> = {
  "standard": [...CORE_FEATURES],
  "with-i18n": [
    ...CORE_FEATURES,
    { icon: "ph:translate", label: "i18n", description: "Localized routing with English and French baked in." },
  ],
  "with-tests": [
    ...CORE_FEATURES,
    { icon: "simple-icons:vitest", label: "Vitest", description: "Unit and component tests ready on day one." },
    { icon: "simple-icons:playwright", label: "Playwright", description: "End-to-end coverage wired into the Nuxt app." },
  ],
}
