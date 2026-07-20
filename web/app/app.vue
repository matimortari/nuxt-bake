<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const { public: { baseURL } } = useRuntimeConfig()

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", href: "/favicon.svg" }],
  meta: [
    { name: "description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${baseURL}/og-image.png` },
    { name: "google-site-verification", content: "ek-IcOQaYofyH-JDVxvCdqxC-Ys0QpMOpKy9FGe3XnQ" },
  ],
})
</script>
