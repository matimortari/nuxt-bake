<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>

      <div v-if="userStore.user" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          {{ t('navbar.greeting', { name: userStore.user?.name }) }}
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
const { clear } = useUserSession()
const { toggleTheme, themeIcon } = useTheme()
const userStore = useUserStore()

async function setLanguage(language: string) {
  locale.value = language as "en-US" | "fr-FR"
  localStorage.setItem("nuxt-lang", language)
  await nextTick()
}

onMounted(async () => {
  try {
    await userStore.getUser()
  }
  catch (err: any) {
    console.error("Failed to fetch user:", err)
  }

  const savedLang = localStorage.getItem("nuxt-lang")
  if (savedLang && (savedLang === "en-US" || savedLang === "fr-FR")) {
    locale.value = savedLang as "en-US" | "fr-FR"
    await nextTick()
  }
})

async function signOut() {
  await clear()
  return navigateTo("/")
}
</script>
