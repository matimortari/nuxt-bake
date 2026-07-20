<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>
        Sign In
      </h2>
    </header>

    <div class="my-4 flex flex-col items-center gap-4">
      <p class="text-lg font-semibold text-muted-foreground">
        Choose a provider to continue.
      </p>
      <span v-if="errorMessage" class="text-danger">{{ errorMessage }}</span>

      <div class="flex flex-row items-center gap-4">
        <button v-for="provider in OAUTH_PROVIDERS" :key="provider.name" class="btn" @click="navigateTo(`/api/auth/${provider.name}`, { external: true })">
          <icon :name="provider.icon" size="25" />
          <span>{{ provider.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { public: { baseURL } } = useRuntimeConfig()
const route = useRoute()

const OAUTH_PROVIDERS = [
  { name: "github", label: "Sign In With GitHub", icon: "simple-icons:github" },
  { name: "google", label: "Sign In With Google", icon: "simple-icons:google" },
]

const errorMessage = computed(() => {
  const error = route.query.error as string | undefined
  if (!error) {
    return null
  }

  const messages: Record<string, string> = {
    google_oauth_failed: "Google sign in failed. Please try again.",
    github_oauth_failed: "GitHub sign in failed. Please try again.",
    session_expired: "Your session has expired. Please sign in again.",
    session_timeout: "You were signed out due to inactivity.",
  }

  return messages[error] || "Authentication failed. Please try again."
})

useHead({
  title: "Sign In",
  link: [{ rel: "canonical", href: `${baseURL}/sign-in` }],
  meta: [{ name: "description", content: "Sign In page" }],
})
</script>
