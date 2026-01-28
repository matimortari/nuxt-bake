import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "nuxt-shiki",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/styles.css"],
  devtools: {
    enabled: true,
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  icon: {
    mode: "svg",
    clientBundle: { scan: true },
  },
  shiki: {
    bundledLangs: ["bash", "html", "javascript", "json", "markdown", "typescript", "vue"],
    bundledThemes: ["catppuccin-macchiato"],
    highlightOptions: {
      theme: "catppuccin-macchiato",
    },
  },
})
