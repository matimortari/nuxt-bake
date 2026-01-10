import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],
  imports: {
    dirs: ["lib/**"],
  },
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },
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
})
