<template>
  <footer class="container mx-auto flex flex-row items-center justify-between border-t border-muted p-4">
    <p class="text-xs font-medium text-muted-foreground">
      © {{ new Date().getFullYear() }} Nuxt Bake. All rights reserved.
    </p>

    <div class="flex flex-row items-center gap-4">
      <nuxt-link to="https://www.npmjs.com/package/nuxt-bake" target="_blank" class="text-muted-foreground transition-all hover:scale-110 hover:text-foreground">
        <icon name="simple-icons:npm" size="25" />
      </nuxt-link>
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" target="_blank" class="text-muted-foreground transition-all hover:scale-110 hover:text-foreground">
        <icon name="simple-icons:github" size="25" />
      </nuxt-link>
    </div>
  </footer>
</template>
