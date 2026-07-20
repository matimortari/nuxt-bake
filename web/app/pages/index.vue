<template>
  <div class="flex flex-col items-center gap-12 px-4 py-12 md:px-12">
    <Header />

    <section class="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
      <h2>
        Features
      </h2>

      <div class="flex flex-row gap-2 rounded-lg bg-muted p-1">
        <button
          v-for="tab in TABS" :key="tab.key"
          class="btn py-1! transition-all" :class="activeTab === tab.key ? 'bg-card shadow-sm' : 'bg-transparent! text-muted-foreground! shadow-none'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="card w-full">
        <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          <li v-for="(feature, i) in visibleFeatures" :key="i" class="navigation-group rounded-lg p-2 text-left text-sm font-semibold">
            <span class="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <icon :name="feature.icon" size="20" class="text-primary" />
            </span>
            {{ feature.label }}
          </li>
        </ul>
      </div>
    </section>

    <section class="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
      <h2>
        Getting Started
      </h2>

      <div class="card flex w-full flex-col gap-2 text-left">
        <div class="flex items-center gap-2">
          <span class="step-badge">1</span>
          <h6>
            Scaffold your project
          </h6>
        </div>

        <div class="relative">
          <Shiki lang="bash" code="npx nuxt-bake" class="code-block" />
          <CopyButton text="npx nuxt-bake" />
        </div>
        <p class="text-sm text-muted-foreground">
          Follow the prompts to choose your project name, template, package manager, and whether to initialize a Git repo.
        </p>
      </div>

      <div class="card flex w-full flex-col gap-2 text-left">
        <div class="flex items-center gap-2">
          <span class="step-badge">2</span>
          <h6>
            Install dependencies
          </h6>
        </div>

        <div class="flex w-fit flex-row gap-2 rounded-lg bg-muted p-1">
          <button
            v-for="pm in PACKAGE_MANAGERS" :key="pm"
            class="btn py-1! transition-all" :class="activePm === pm ? 'bg-card shadow-sm' : 'bg-transparent! text-muted-foreground! shadow-none'"
            @click="activePm = pm"
          >
            {{ pm }}
          </button>
        </div>

        <div class="relative">
          <Shiki lang="bash" :code="installCommands[activePm].join('\n')" class="code-block" />
          <CopyButton :text="installCommands[activePm].join('\n')" />
        </div>
      </div>

      <div class="card flex w-full flex-col gap-2 text-left">
        <div class="flex items-center gap-2">
          <span class="step-badge">3</span>
          <h6>
            Configure environment variables
          </h6>
        </div>

        <div class="relative">
          <Shiki lang="bash" code="cp .env.example .env" class="code-block" />
          <CopyButton text="cp .env.example .env" />
        </div>
        <p class="text-sm text-muted-foreground">
          Edit <code class="text-primary">.env</code> and fill in your database URL, OAuth credentials, and any other required values.
        </p>
      </div>

      <div class="card flex w-full flex-col gap-2 text-left">
        <div class="flex items-center gap-2">
          <span class="step-badge">4</span>
          <h6>
            Set up the database
          </h6>
        </div>

        <div class="relative">
          <Shiki lang="bash" :code="dbCommands" class="code-block" />
          <CopyButton :text="dbCommands" />
        </div>
        <p class="text-sm text-muted-foreground">
          Use <code class="text-primary">db:push</code> instead of <code class="text-primary">db:migrate</code> for quick prototyping without migration files.
        </p>
      </div>

      <div class="card flex w-full flex-col gap-2 text-left">
        <div class="flex items-center gap-2">
          <span class="step-badge">5</span>
          <h6>
            Start the development server
          </h6>
        </div>

        <div class="relative">
          <Shiki lang="bash" :code="devCommand" class="code-block" />
          <CopyButton :text="devCommand" />
        </div>
        <p class="text-sm text-muted-foreground">
          Your app will be available at <code class="text-primary">http://localhost:3000</code>.
        </p>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const activeTab = ref<"standard" | "with-i18n" | "with-tests">("standard")
const activePm = ref<typeof PACKAGE_MANAGERS[number]>("npm")
const visibleFeatures = computed(() => FEATURES[activeTab.value])

const installCommands: Record<typeof PACKAGE_MANAGERS[number], string[]> = {
  npm: ["cd <project-name>", "npm install"],
  pnpm: ["cd <project-name>", "pnpm install"],
  yarn: ["cd <project-name>", "yarn"],
  bun: ["cd <project-name>", "bun install"],
}

const dbCommands = "npm run db:migrate\n# or for prototyping:\nnpm run db:push"

const devCommand = computed(() => {
  const cmds: Record<typeof PACKAGE_MANAGERS[number], string> = {
    npm: "npm run dev",
    pnpm: "pnpm dev",
    yarn: "yarn dev",
    bun: "bun run dev",
  }
  return cmds[activePm.value]
})

useHead({
  title: "Nuxt Bake",
  link: [{ rel: "canonical", href: "https://nuxt-bake.up.railway.app" }],
  meta: [{ name: "description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." }],
})
</script>
