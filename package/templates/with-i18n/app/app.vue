<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <Toast />
  </ClientOnly>
</template>

<script setup lang="ts">
const { locale } = useI18n()
useSession()

onMounted(async () => {
  const savedLang = localStorage.getItem("nuxt-lang")
  if (savedLang && (savedLang === "en-US" || savedLang === "fr-FR")) {
    locale.value = savedLang as "en-US" | "fr-FR"
    await nextTick()
  }
})

useLocaleHead({ dir: true, seo: true })
useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  link: [{ rel: "icon", href: "/favicon.svg" }],
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" },],
})
</script>
