<template>
  <div class="relative flex min-h-screen flex-col">
    <Header />

    <section class="relative flex flex-col items-center px-4 py-16 text-center md:px-8 md:py-24">
      <div class="dot-overlay" />

      <div class="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4">
        <div class="h-1 w-14 origin-left bg-primary" />

        <h1 class="hero-heading">
          Nuxt Bake
        </h1>

        <p class="max-w-xl text-base/7 font-medium text-muted-foreground md:text-lg">
          A production-ready Nuxt starter with modern tooling and best practices.
        </p>

        <div class="flex flex-col items-center gap-2 md:flex-row">
          <a href="#start" class="btn-primary rounded-full! px-5!">
            Get started
            <icon name="ph:arrow-down-bold" size="15" />
          </a>
          <nuxt-link to="https://github.com/matimortari/nuxt-bake" target="_blank" class="btn-ghost rounded-full! px-5!">
            <icon name="simple-icons:github" size="15" />
            View source
          </nuxt-link>
        </div>

        <div class="relative w-full max-w-md text-left">
          <Shiki lang="bash" code="npx nuxt-bake" class="code-block" />
          <CopyButton text="npx nuxt-bake" />
        </div>
      </div>
    </section>

    <main class="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 pb-16 md:px-8">
      <section>
        <div class="border-b pb-4">
          <h2>
            Features
          </h2>
        </div>

        <div class="mt-2 flex flex-row border-b">
          <button
            v-for="tab in TABS" :key="tab.key"
            type="button"
            class="cli-tab"
            :class="activeTab === tab.key ? 'cli-tab--active' : ''"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="features-grid">
          <article v-for="(feature, index) in visibleFeatures" :key="`${activeTab}-${index}`" class="feature-item">
            <icon :name="feature.icon" class="feature-icon text-primary" size="20" />
            <div class="flex flex-col gap-1">
              <h3 class="text-base! leading-none! font-bold">
                {{ feature.label }}
              </h3>
              <p class="text-caption">
                {{ feature.description }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="start">
        <div class="border-b pb-4">
          <h2>
            Getting Started
          </h2>
        </div>

        <ol class="mt-2 flex flex-col">
          <li class="step-row">
            <span class="step-badge">1</span>
            <div class="flex min-w-0 flex-col gap-2">
              <div>
                <h6>Scaffold your project</h6>
                <p class="text-caption mt-1">
                  Follow the prompts to choose a name, preset, package manager, and Git.
                </p>
              </div>
              <div class="relative">
                <Shiki lang="bash" code="npx nuxt-bake" class="code-block" />
                <CopyButton text="npx nuxt-bake" />
              </div>
            </div>
          </li>

          <li class="step-row">
            <span class="step-badge">2</span>
            <div class="flex min-w-0 flex-col gap-2">
              <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h6>Install dependencies</h6>
                  <p class="text-caption mt-1">
                    Skip this if you already installed during the CLI prompts.
                  </p>
                </div>
                <div class="pm-tabs shrink-0">
                  <button
                    v-for="pm in PACKAGE_MANAGERS" :key="pm"
                    type="button" class="cli-tab cli-tab--auto"
                    :class="activePm === pm ? 'cli-tab--active' : ''" @click="activePm = pm"
                  >
                    {{ pm }}
                  </button>
                </div>
              </div>
              <div class="relative">
                <Shiki lang="bash" :code="installCommand" class="code-block" />
                <CopyButton :text="installCommand" />
              </div>
            </div>
          </li>

          <li class="step-row">
            <span class="step-badge">3</span>
            <div class="flex min-w-0 flex-col gap-2">
              <div>
                <h6>Configure environment variables</h6>
                <p class="text-caption mt-1">
                  Fill in your database URL, OAuth credentials, and session secret.
                </p>
              </div>
              <div class="relative">
                <Shiki lang="bash" code="cp .env.example .env" class="code-block" />
                <CopyButton text="cp .env.example .env" />
              </div>
            </div>
          </li>

          <li class="step-row">
            <span class="step-badge">4</span>
            <div class="flex min-w-0 flex-col gap-2">
              <div>
                <h6>Set up the database</h6>
                <p class="text-caption mt-1">
                  Use <code class="text-primary">db:push</code> for prototyping without migration files.
                </p>
              </div>
              <div class="relative">
                <Shiki lang="bash" :code="dbCommands" class="code-block" />
                <CopyButton :text="dbCommands" />
              </div>
            </div>
          </li>

          <li class="step-row border-b-0!">
            <span class="step-badge">5</span>
            <div class="flex min-w-0 flex-col gap-2">
              <div>
                <h6>Start the development server</h6>
                <p class="text-caption mt-1">
                  Your app will be available at <code class="text-primary">http://localhost:3000</code>.
                </p>
              </div>
              <div class="relative">
                <Shiki lang="bash" :code="devCommand" class="code-block" />
                <CopyButton :text="devCommand" />
              </div>
            </div>
          </li>
        </ol>
      </section>

      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref<"standard" | "with-i18n" | "with-tests">("standard")
const activePm = ref<typeof PACKAGE_MANAGERS[number]>("npm")
const visibleFeatures = computed(() => FEATURES[activeTab.value])

const pmRun: Record<typeof PACKAGE_MANAGERS[number], (script: string) => string> = {
  npm: script => `npm run ${script}`,
  pnpm: script => `pnpm ${script}`,
  yarn: script => `yarn ${script}`,
  bun: script => `bun run ${script}`,
}

const installCommands: Record<typeof PACKAGE_MANAGERS[number], string[]> = {
  npm: ["cd <project-name>", "npm install"],
  pnpm: ["cd <project-name>", "pnpm install"],
  yarn: ["cd <project-name>", "yarn"],
  bun: ["cd <project-name>", "bun install"],
}

const installCommand = computed(() => installCommands[activePm.value].join("\n"))
const dbCommands = computed(() => `${pmRun[activePm.value]("db:migrate")}\n# or for prototyping:\n${pmRun[activePm.value]("db:push")}`)
const devCommand = computed(() => pmRun[activePm.value]("dev"))

useHead({
  title: "Nuxt Bake",
  link: [{ rel: "canonical", href: "https://nuxt-bake.up.railway.app" }],
  meta: [{ name: "description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." }],
})
</script>

<style scoped>
.hero-heading {
  font-size: clamp(2.1rem, 5vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.dot-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    color-mix(in srgb, var(--foreground) 18%, transparent) 1.5px,
    transparent 1.5px
  );
  background-size: 12px 12px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}

.cli-tab {
  flex: 1;
  padding: 0.65rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: transparent;
  color: var(--muted-foreground);
  border: none;
  border-right: var(--border-style);
  transition: all var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cli-tab:last-child {
  border-right: none;
}
.cli-tab--active {
  background-color: color-mix(in srgb, var(--muted) 30%, transparent);
  color: var(--foreground);
  border-bottom: 2px solid var(--primary);
}
.cli-tab:not(.cli-tab--active):hover {
  background-color: color-mix(in srgb, var(--muted) 20%, transparent);
}
.cli-tab--auto {
  flex: 0 0 auto;
  min-width: 4.25rem;
}
.pm-tabs {
  display: flex;
  width: fit-content;
  overflow: hidden;
  border: var(--border-style);
  border-radius: var(--border-radius);
}
.pm-tabs .cli-tab {
  border-right: var(--border-style);
}
.pm-tabs .cli-tab:last-child {
  border-right: none;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: var(--border-style);
}
@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
  .feature-item:nth-child(even) {
    border-left: var(--border-style);
    padding-left: 2rem;
  }
}

.feature-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem 0.75rem;
  border-bottom: var(--border-style);
  text-align: left;
  transition: background-color var(--transition);
}
.feature-item:hover {
  background-color: color-mix(in srgb, var(--muted) 12%, transparent);
}

.step-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  padding: 2rem 0;
  border-bottom: var(--border-style);
  text-align: left;
}
</style>
