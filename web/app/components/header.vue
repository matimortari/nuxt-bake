<template>
  <header class="flex flex-col items-center gap-8 text-center">
    <img src="@/assets/wordmark.png" alt="Nuxt Bake Logo" class="w-56 md:w-72">

    <p class="max-w-lg font-medium text-muted-foreground">
      A production-ready full-stack starter for <span class="font-semibold text-primary">Nuxt 4</span>.
      Modern tooling, best practices, zero boilerplate — go from idea to running app in minutes.
    </p>

    <div class="flex flex-col items-center gap-2 md:flex-row">
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" target="_blank" class="btn">
        <icon name="simple-icons:github" size="15" />
        GitHub
      </nuxt-link>
      <nuxt-link to="https://www.npmjs.com/package/nuxt-bake" target="_blank" class="btn">
        <icon name="simple-icons:npm" size="15" />
        npm
      </nuxt-link>
    </div>
  </header>
</template>
