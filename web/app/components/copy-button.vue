<template>
  <button class="absolute top-3 right-3 flex items-center justify-center rounded-md p-1.5 transition-all hover:bg-muted" :title="copied ? 'Copied!' : 'Copy to clipboard'" @click="copyToClipboard">
    <icon :name="copied ? 'ph:check' : 'ph:copy'" size="15" :class="copied ? 'text-accent' : 'text-muted-foreground'" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const copied = ref(false)

async function copyToClipboard() {
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>
