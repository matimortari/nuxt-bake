<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>

      <div v-if="loggedIn" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          {{ t('navbar.greeting', { name: user?.name }) }}
        </p>
        <button class="btn" @click="signOut">
          {{ t('navbar.logout') }}
        </button>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <p class="text-sm">
          {{ t('navbar.unauthenticated') }}
        </p>
        <nuxt-link to="/sign-in" class="btn">
          {{ t('navbar.signIn') }}
        </nuxt-link>
      </div>
    </div>

    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" class="btn">
        <icon name="simple-icons:github" size="20" />
      </nuxt-link>

      <button class="btn" @click="toggleTheme">
        <icon :name="themeIcon" size="20" />
      </button>

      <button v-for="language in availableLocales" :key="language" class="cursor-pointer outline-none hover:underline" @click="() => setLanguage(language)">
        {{ t(`locale.${language}`) }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { t, locale, availableLocales } = useI18n()
const { loggedIn, user } = useUserSession()
const { signOut } = useSession()
const { toggleTheme, themeIcon } = useTheme()

async function setLanguage(language: string) {
  locale.value = language as "en-US" | "fr-FR"
  localStorage.setItem("nuxt-lang", language)
  await nextTick()
}
</script>
