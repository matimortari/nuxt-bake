<template>
  <Welcome />
</template>

<script setup lang="ts">
const { public: { baseURL } } = useRuntimeConfig()
const { t } = useI18n()

useHead({
  title: t("index.meta.title"),
  link: [{ rel: "canonical", href: `${baseURL}` }],
  meta: [{ name: "description", content: t("index.meta.description") }],
})
</script>
