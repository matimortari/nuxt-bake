import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ["~/assets/styles.css"],
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  i18n: {
    restructureDir: "app/utils",
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    locales: [
      { code: "en-US", iso: "en-US", file: "en-US.json" },
      { code: "fr-FR", iso: "fr-FR", file: "fr-FR.json" },
    ],
    defaultLocale: "en-US",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt-lang",
      alwaysRedirect: true,
      fallbackLocale: "en-US",
    },
  },
  icon: {
    mode: "svg",
    clientBundle: { scan: true },
  },
})
