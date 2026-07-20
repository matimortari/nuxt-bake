import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/i18n", "@nuxtjs/seo", "@pinia/nuxt", "nuxt-auth-utils"],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
    session: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      password: process.env.NUXT_SESSION_PASSWORD!,
      cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" },
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ["~/assets/styles.css"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  fonts: {
    processCSSVariables: true,
    families: [
      { name: "Inter", provider: "google", weights: ["300 800"] },
      { name: "JetBrains Mono", provider: "google", weights: ["400"] },
    ],
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
    serverBundle: "remote",
    clientBundle: { scan: true },
  },
  ogImage: {
    enabled: false,
  },
  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL,
  },
})
