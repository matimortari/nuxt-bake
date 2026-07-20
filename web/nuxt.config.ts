import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/seo", "nuxt-shiki"],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  routeRules: {
    "/**": {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      },
    },
  },
  devServer: { host: "0.0.0.0" },
  vite: {
    server: {
      allowedHosts: [new URL(process.env.NUXT_PUBLIC_BASE_URL!).hostname],
      hmr: {
        protocol: "wss",
        host: new URL(process.env.NUXT_PUBLIC_BASE_URL!).hostname,
        port: Number(new URL(process.env.NUXT_PUBLIC_BASE_URL!).port),
      },
    },
    plugins: [tailwindcss() as any],
  },
  ssr: true,
  nitro: {
    preset: "static",
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },
  app: {
    head: {
      script: process.env.NODE_ENV === "production" ? [{ "src": "https://static.cloudflareinsights.com/beacon.min.js", "defer": true, "data-cf-beacon": `{"token": "${process.env.NUXT_CF_BEACON_TOKEN}"}` }] : [],
    },
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
  shiki: {
    bundledLangs: ["bash", "html", "javascript", "json", "yml", "markdown", "typescript", "vue"],
    bundledThemes: ["catppuccin-macchiato"],
    highlightOptions: { theme: "catppuccin-macchiato" },
  },
})
