<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center md:items-start md:p-12 md:text-start">
    <h1>
      {{ error.status }} – {{ error.statusText || t("error.unknown") }}
    </h1>

    <p class="flex flex-col gap-2 text-lg/6 text-muted-foreground">
      <span>{{ t("error.description") }}</span>
      <span class="font-mono text-sm">{{ error.message || t("error.unknown") }}</span>
    </p>

    <button class="navigation-group" @click="() => clearError({ redirect: '/' })">
      <icon name="ph:arrow-left-bold" size="25" />
      <span class="font-semibold">{{ t("error.goHome") }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
</script>
