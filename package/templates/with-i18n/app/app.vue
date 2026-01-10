<template>
  <NuxtLayout>
    <Analytics :debug="false" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt"

const { locale } = useI18n()
const isLoading = ref(true)

onMounted(() => {
  const onLoad = () => (isLoading.value = false)
  if (document.readyState === "complete") {
    isLoading.value = false
  }
  else {
    window.addEventListener("load", onLoad)
    onBeforeUnmount(() => window.removeEventListener("load", onLoad))
  }
})

useLocaleHead({ dir: true, seo: true })
useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  link: [{ rel: "icon", href: "/favicon.svg" }],
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
})
</script>
