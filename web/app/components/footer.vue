<template>
  <footer class="mt-8 flex w-full items-center justify-between border-t px-4 py-6 md:px-0">
    <p class="text-xs font-medium text-muted-foreground">
      © {{ new Date().getFullYear() }} Nuxt Bake
    </p>

    <div class="flex items-center gap-3">
      <nuxt-link to="https://www.npmjs.com/package/nuxt-bake" target="_blank" class="text-muted-foreground transition-colors hover:text-foreground">
        <icon name="simple-icons:npm" size="20" />
      </nuxt-link>
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" target="_blank" class="text-muted-foreground transition-colors hover:text-foreground">
        <icon name="simple-icons:github" size="20" />
      </nuxt-link>
    </div>
  </footer>
</template>
