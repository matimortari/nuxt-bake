<template>
  <Welcome />
</template>

<script setup lang="ts">
const { public: { baseURL } } = useRuntimeConfig()

useHead({
  title: "Home",
  link: [{ rel: "canonical", href: `${baseURL}` }],
  meta: [{ name: "description", content: "Home page." }],
})
</script>
