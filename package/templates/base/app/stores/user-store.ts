export const useUserStore = defineStore("user", () => {
  const user = ref<Record<string, any> | null>(null)
  const loading = ref(false)
  const errors = ref<Record<string, string | null>>({
    getUser: null,
    deleteUser: null,
  })

  async function getUser() {
    loading.value = true
    errors.value.getUser = null

    try {
      const res = await $fetch("/api/user", { method: "GET", credentials: "include" })
      user.value = res.userData
      return res
    }
    catch (err: any) {
      errors.value.getUser = err.data?.message || "Failed to get user"
      console.error("getUser error:", err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  async function deleteUser() {
    loading.value = true
    errors.value.deleteUser = null

    try {
      await $fetch("/api/user", { method: "DELETE", credentials: "include" })
      user.value = null
    }
    catch (err: any) {
      errors.value.deleteUser = err.data?.message || "Failed to delete user"
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
    errors,
    getUser,
    deleteUser,
  }
})
