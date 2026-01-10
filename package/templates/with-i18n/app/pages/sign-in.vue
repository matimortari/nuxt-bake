<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>{{ t("signIn.header") }}</h2>
    </header>

    <div class="my-4 flex flex-col items-center gap-4">
      <p class="text-muted-foreground text-lg font-semibold">
        {{ t("signIn.chooseProvider") }}
      </p>
      <div class="flex flex-row items-center gap-4">
        <button
          v-for="provider in providers" :key="provider.name"
          class="btn" @click="navigateTo(`/api/auth/${provider.name}`, { external: true })"
        >
          <icon :name="provider.icon" size="25" />
          <span>{{ t(`signIn.providers.${provider.name}`) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const providers = [
  { name: "github", icon: "simple-icons:github" },
  { name: "google", icon: "simple-icons:google" },
]

useHead({
  title: t("signIn.meta.title"),
  meta: [{ name: "description", content: t("signIn.meta.description") }],
})
</script>
