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

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-6">
        <li v-for="(feature, index) in FEATURES" :key="index" class="flex items-center gap-2 text-xs font-semibold md:text-sm">
          <icon :name="feature.icon" size="20" class="text-primary" />
          <span>{{ t(`index.featureList.${feature.label}`) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const FEATURES = [
  { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
  { icon: "simple-icons:typescript", label: "TypeScript 7" },
  { icon: "simple-icons:tailwindcss", label: "Tailwind CSS 4" },
  { icon: "simple-icons:iconify", label: "Nuxt Icons" },
  { icon: "ph:text-aa", label: "Google Fonts" },
  { icon: "icon-park-outline:pineapple", label: "Pinia" },
  { icon: "ph:lock-key-open", label: "OAuth" },
  { icon: "simple-icons:prisma", label: "Prisma" },
  { icon: "ph:magnifying-glass", label: "Nuxt SEO" },
  { icon: "simple-icons:playwright", label: "Playwright" },
  { icon: "simple-icons:vitest", label: "Vitest" },
  { icon: "simple-icons:eslint", label: "ESLint" },
  { icon: "ph:translate", label: "i18n" }
]
</script>
