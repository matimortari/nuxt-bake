let toastIdCounter = 0
let resolveConfirmation: ((value: boolean) => void) | null = null

export function useUI() {
  const state = useState<UIState>("ui", () => ({
    toasts: [],
    confirmation: { isOpen: false, options: null },
  }))

  const toast = {
    list: () => state.value.toasts as readonly Toast[],
    show(message: string, type: Toast["type"], duration = 5000) {
      if (import.meta.server) {
        return ""
      }

      const id = `toast-${++toastIdCounter}`
      state.value.toasts.push({ id, message, type, duration })
      if (duration > 0) {
        setTimeout(toast.dismiss, duration, id)
      }
      return id
    },
    success: (message: string, duration = 5000) => toast.show(message, "success", duration),
    error: (message: string, duration = 7000) => toast.show(message, "danger", duration),
    warning: (message: string, duration = 6000) => toast.show(message, "warning", duration),
    info: (message: string, duration = 5000) => toast.show(message, "info", duration),
    dismiss(id: string) {
      state.value.toasts = state.value.toasts.filter(t => t.id !== id)
    },
    clear() {
      state.value.toasts = []
    },
  }

  function confirm(options: ConfirmOptions): Promise<boolean> {
    if (import.meta.server) {
      return Promise.resolve(false)
    }

    resolveConfirmation?.(false)
    state.value.confirmation = { isOpen: true, options }
    return new Promise((resolve) => {
      resolveConfirmation = resolve
    })
  }

  const confirmation = {
    isOpen: () => state.value.confirmation.isOpen,
    options: () => state.value.confirmation.options,
    resolve(value: boolean) {
      state.value.confirmation.isOpen = false
      resolveConfirmation?.(value)
      resolveConfirmation = null
    },
  }

  return { toast, confirm, confirmation }
}
