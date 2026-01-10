<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="flex w-full flex-col items-center gap-4 p-4">
      <div class="flex flex-col items-center gap-2 text-center">
        <icon name="simple-icons:nuxt" size="50" class="text-primary" />
        <h1>
          Nuxt Bake
        </h1>
        <p>
          If you're seeing this, it means you've successfully set up your Nuxt.js project via <code class="text-primary">Nuxt Bake</code>.
        </p>
      </div>
    </header>

    <hr class="border-primary! w-4/5">

    <div class="flex flex-col items-center gap-2">
      <h2 class="text-lg font-semibold">
        Features
      </h2>

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-6">
        <li v-for="(feature, index) in features" :key="index" class="flex flex-row items-center gap-2 text-xs font-semibold md:text-sm">
          <icon :name="feature.icon" :size="20" class="text-primary" />
          <span>{{ feature.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
  { icon: "simple-icons:typescript", label: "TypeScript" },
  { icon: "simple-icons:tailwindcss", label: "Tailwind CSS 4" },
  { icon: "simple-icons:iconify", label: "Nuxt Icons" },
  { icon: "ph:text-aa", label: "Google Fonts" },
  { icon: "icon-park-outline:pineapple", label: "Pinia" },
  { icon: "ph:lock-key-open", label: "OAuth" },
  { icon: "simple-icons:prisma", label: "Prisma" },
  { icon: "simple-icons:playwright", label: "Playwright" },
  { icon: "simple-icons:vitest", label: "Vitest" },
  { icon: "simple-icons:eslint", label: "ESLint" },
  { icon: "simple-icons:vercel", label: "Vercel Analytics" },
]

useHead({
  title: "Home",
  meta: [{ name: "description", content: "Home page." }],
})
</script>
