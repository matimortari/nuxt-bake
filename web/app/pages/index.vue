<template>
  <div class="flex flex-col items-center gap-8 p-4 md:p-12">
    <header class="flex flex-col items-center gap-4 text-center">
      <h1>
        Nuxt Bake 💚🏔️
      </h1>
      <p class="max-w-xl text-lg leading-5 text-primary">
        A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly.
      </p>
    </header>

    <section class="flex flex-col items-center text-center">
      <p class="max-w-xl border-b border-primary py-2 text-center text-sm">
        The Base Package includes everything you need to start a Nuxt project: TypeScript, ESLint, Tailwind CSS, Pinia, OAuth authentication, Prisma, and analytics integration. It's the perfect foundation to build upon.
      </p>
      <p class="my-2 text-center text-lg font-semibold text-muted-foreground">
        Extend your project with these additional options:
      </p>

      <div class="flex w-full flex-col items-center gap-4 text-sm md:flex-row md:justify-between md:gap-12">
        <div class="flex flex-col items-center border-b border-primary py-2 text-center">
          <h4>
            i18n Support
          </h4>
          <span>Internationalization via @nuxtjs/i18n.</span>
        </div>

        <div class="flex flex-col items-center border-b border-primary py-2 text-center">
          <h4>
            Testing Suite
          </h4>
          <span>Vitest for unit and integration tests.</span>
          <span>Playwright for end-to-end testing.</span>
        </div>
      </div>
    </section>

    <section class="flex flex-col items-center gap-2 text-center">
      <h2>
        Getting Started
      </h2>
      <p class="max-w-xl">
        Quickly scaffold your project using our CLI tool and start building.
      </p>

      <div class="card flex flex-col p-0">
        <div class="flex items-center justify-between gap-4 p-2 text-start text-sm leading-5 text-muted-foreground">
          <p>
            > After installing, run the following commands to get started:
          </p>
          <button class="hover:scale-sm flex items-center transition-all" title="Copy to Clipboard" @click="copyToClipboard">
            <icon :name="copyIcon" size="20" />
          </button>
        </div>
        <Shiki lang="bash" :code="COMMANDS.join('\n')" class="code-block" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const copyIcon = ref("ph:copy")

const COMMANDS = [
  "npx nuxt-bake",
  "cd <project-name>",
  "npm install",
  "npm run db:migrate",
  "npm run dev",
]

async function copyToClipboard() {
  await navigator.clipboard.writeText(COMMANDS.join("\n"))
  copyIcon.value = "ph:check"
  setTimeout(() => {
    copyIcon.value = "ph:copy"
  }, 1000)
}

useHead({
  title: "Nuxt Bake",
  link: [{ rel: "canonical", href: "https://nuxt-bake.vercel.app" }],
  meta: [{ name: "description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." }],
})
</script>
