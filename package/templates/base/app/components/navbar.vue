<template>
  <nav class="navigation-group w-full justify-between p-4">
    <div class="navigation-group">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>

      <div v-if="loggedIn" class="navigation-group">
        <p class="text-sm">
          Hi, <span class="font-semibold text-primary">{{ user?.name }}</span>
        </p>
        <button type="button" class="btn" @click="signOut">
          Logout
        </button>
      </div>

      <div v-else class="navigation-group">
        <p class="text-sm">
          Unauthenticated
        </p>
        <nuxt-link to="/sign-in" class="btn">
          Sign In
        </nuxt-link>
      </div>
    </div>

    <div class="navigation-group">
      <nuxt-link to="https://github.com/matimortari/nuxt-bake" class="btn">
        <icon name="simple-icons:github" size="20" />
      </nuxt-link>

      <button type="button" class="btn" @click="toggleTheme">
        <icon :name="themeIcon" size="20" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
const { loggedIn, user } = useUserSession()
const { signOut } = useSession()
</script>
