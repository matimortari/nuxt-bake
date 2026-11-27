<template>
  <nav class="relative z-20 flex w-full items-center justify-between p-4 md:px-8">
    <nuxt-link to="/" class="flex items-center" aria-label="Nuxt Bake home">
      <img src="@/assets/wordmark.png" alt="Nuxt Bake" class="h-8 w-auto">
    </nuxt-link>

    <div class="flex items-center gap-1">
      <button type="button" class="btn-ghost size-10 p-0!" :title="`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`" @click="toggleTheme">
        <icon :name="themeIcon" size="20" />
      </button>
      <nuxt-link to="https://www.npmjs.com/package/nuxt-bake" target="_blank" class="btn-ghost size-10 p-0!" title="npm">
        <icon name="simple-icons:npm" size="20" />
      </nuxt-link>
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" target="_blank" class="btn-ghost size-10 p-0!" title="GitHub">
        <icon name="simple-icons:github" size="20" />
      </nuxt-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { colorMode, themeIcon, toggleTheme } = useTheme()
</script>
