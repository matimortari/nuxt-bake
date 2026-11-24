export function useTheme() {
  const colorMode = useColorMode()
  const themeIcon = computed(() => colorMode.value === "dark" ? "ph:sun" : "ph:moon")

  const toggleTheme = () => colorMode.preference = colorMode.value === "light" ? "dark" : "light"

  return { colorMode, themeIcon, toggleTheme }
}
