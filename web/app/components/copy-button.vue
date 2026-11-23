<template>
  <button
    type="button" class="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
    :title="copied ? 'Copied!' : 'Copy to clipboard'" @click="copyToClipboard"
  >
    <icon :name="copied ? 'ph:check-bold' : 'ph:copy'" size="15" :class="copied ? 'text-green-400' : ''" />
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
