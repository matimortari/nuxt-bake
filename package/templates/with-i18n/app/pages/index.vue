<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="flex w-full flex-col items-center gap-4 p-4 text-center">
      <div class="flex flex-col items-center gap-2 text-center">
        <icon name="simple-icons:nuxt" size="50" class="text-primary" />
        <h1>
          {{ t("index.header.title") }}
        </h1>
        <p>
          {{ t("index.header.description") }}
        </p>
      </div>
    </header>

    <hr class="border-primary! w-4/5">

    <div class="flex flex-col items-center gap-2">
      <h2 class="text-lg font-semibold">
        {{ t("index.features") }}
      </h2>

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <li v-for="(feature, index) in features" :key="index" class="flex items-center gap-2 text-xs font-semibold md:text-sm">
          <icon :name="feature.icon" size="20" class="text-primary" />
          <span>{{ t(`index.featureList.${feature.key}`) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const features = [
  { icon: "simple-icons:nuxtdotjs", key: "nuxt" },
  { icon: "simple-icons:typescript", key: "typescript" },
  { icon: "simple-icons:tailwindcss", key: "tailwind" },
  { icon: "simple-icons:iconify", key: "icons" },
  { icon: "ph:text-aa", key: "fonts" },
  { icon: "icon-park-outline:pineapple", key: "pinia" },
  { icon: "ph:translate", key: "i18n" },
  { icon: "ph:lock-key-open", key: "oauth" },
  { icon: "simple-icons:prisma", key: "prisma" },
  { icon: "simple-icons:eslint", key: "eslint" },
  { icon: "simple-icons:vercel", key: "vercel" },
]

useHead({
  title: t("index.meta.title"),
  meta: [{ name: "description", content: t("index.meta.description") }],
})
</script>
