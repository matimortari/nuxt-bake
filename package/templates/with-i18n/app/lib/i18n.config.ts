import en from "~/lib/locales/en-US.json"
import br from "~/lib/locales/fr-FR.json"

export default defineI18nConfig(() => {
  return {
    legacy: false,
    langDir: "./locales",
    messages: { "en-US": en, "fr-FR": br },
    locales: [
      { code: "en-US", iso: "en-US" },
      { code: "fr-FR", iso: "fr-FR" },
    ],
  }
})
