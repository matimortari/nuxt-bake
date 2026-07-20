export const TABS = [
  { key: "standard", label: "Standard" },
  { key: "with-i18n", label: "With i18n" },
  { key: "with-tests", label: "With Tests" },
] as const

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const

export const FEATURES: Record<typeof TABS[number]["key"], { icon: string, label: string }[]> = {
  "standard": [
    { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
    { icon: "simple-icons:typescript", label: "TypeScript 7" },
    { icon: "simple-icons:tailwindcss", label: "Tailwind CSS 4" },
    { icon: "simple-icons:iconify", label: "Nuxt Icon" },
    { icon: "ph:text-aa", label: "Nuxt Fonts" },
    { icon: "icon-park-outline:pineapple", label: "Pinia" },
    { icon: "ph:lock-key-open", label: "OAuth (GitHub & Google)" },
    { icon: "simple-icons:prisma", label: "Prisma ORM" },
    { icon: "simple-icons:eslint", label: "ESLint" },
    { icon: "ph:magnifying-glass", label: "Nuxt SEO" },
  ],
  "with-i18n": [
    { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
    { icon: "simple-icons:typescript", label: "TypeScript 7" },
    { icon: "simple-icons:tailwindcss", label: "Tailwind CSS 4" },
    { icon: "simple-icons:iconify", label: "Nuxt Icon" },
    { icon: "ph:text-aa", label: "Nuxt Fonts" },
    { icon: "icon-park-outline:pineapple", label: "Pinia" },
    { icon: "ph:lock-key-open", label: "OAuth (GitHub & Google)" },
    { icon: "simple-icons:prisma", label: "Prisma ORM" },
    { icon: "simple-icons:eslint", label: "ESLint" },
    { icon: "ph:magnifying-glass", label: "Nuxt SEO" },
    { icon: "ph:translate", label: "i18n + Localized Routing" },
  ],
  "with-tests": [
    { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
    { icon: "simple-icons:typescript", label: "TypeScript 7" },
    { icon: "simple-icons:tailwindcss", label: "Tailwind CSS 4" },
    { icon: "simple-icons:iconify", label: "Nuxt Icon" },
    { icon: "ph:text-aa", label: "Nuxt Fonts" },
    { icon: "icon-park-outline:pineapple", label: "Pinia" },
    { icon: "ph:lock-key-open", label: "OAuth (GitHub & Google)" },
    { icon: "simple-icons:prisma", label: "Prisma ORM" },
    { icon: "simple-icons:eslint", label: "ESLint" },
    { icon: "ph:magnifying-glass", label: "Nuxt SEO" },
    { icon: "simple-icons:vitest", label: "Vitest" },
    { icon: "simple-icons:playwright", label: "Playwright" },
  ],
} as const
