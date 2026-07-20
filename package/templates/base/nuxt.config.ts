import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/seo", "@pinia/nuxt", "nuxt-auth-utils"],
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
    name: "Nuxt Bake",
  },
})
