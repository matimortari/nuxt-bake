export const useUserStore = defineStore("user", () => {
  const toast = useToast()
  const user = ref<User | null>(null)
  const loading = ref(false)

  async function getUser() {
    loading.value = true

    try {
      const res = await $fetch<{ user: User }>("/api/user", { method: "GET", credentials: "include" })
      user.value = res.user
      return res
    }
    catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to get user")
      toast.error(message)
      console.error("getUser error:", err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  async function deleteUser() {
    loading.value = true

    try {
      await $fetch("/api/user", { method: "DELETE", credentials: "include" })
      user.value = null
    }
    catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to delete user")
      toast.error(message)
      console.error("deleteUser error:", err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    getUser,
    deleteUser,
  }
})
