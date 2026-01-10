<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <h1>
      {{ error.statusCode }}
    </h1>

    <p class="text-muted-foreground text-center">
      {{ error.statusMessage || t("error.unknown") }}
    </p>

    <nuxt-link to="/">
      {{ t("error.goHome") }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
</script>
