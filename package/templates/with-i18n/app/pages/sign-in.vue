<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>
        {{ t("signIn.header") }}
      </h2>
    </header>

    <div class="my-4 flex flex-col items-center gap-4">
      <p class="text-muted-foreground text-lg font-semibold">
        {{ t("signIn.chooseProvider") }}
      </p>
      <span v-if="errorMessage" class="text-danger">{{ errorMessage }}</span>

      <div class="flex flex-row items-center gap-4">
        <button v-for="provider in OAUTH_PROVIDERS" :key="provider.name" class="btn" @click="navigateTo(`/api/auth/${provider.name}`, { external: true })">
          <icon :name="provider.icon" size="25" />
          <span>{{ provider.label }}</span>        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { public: { baseURL } } = useRuntimeConfig()
const { t } = useI18n()

const OAUTH_PROVIDERS = [
  { name: "github", label: t(`signIn.providers.${provider.name}`), icon: "simple-icons:github" },
  { name: "google", label: t(`signIn.providers.${provider.name}`), icon: "simple-icons:google" },
]

const errorMessage = computed(() => {
  const error = route.query.error as string | undefined
  if (!error) {
    return null
  }

  const messages: Record<string, string> = {
    "GoogleOAuthFailed": t("signIn.messages.googleOAuthFailed"),
    "GitHubOAuthFailed": t("signIn.messages.githubOAuthFailed"),
    "SessionExpired": t("signIn.messages.sessionExpired"),
    "SessionTimeout": t("signIn.messages.sessionTimeout"),
  }

  return messages[error] || t("signIn.messages.unknownError")

})

useHead({
  title: t("signIn.meta.title"),
  link: [{ rel: "canonical", href: `${baseURL}` }],
  meta: [{ name: "description", content: t("signIn.meta.description") }],
})
</script>
