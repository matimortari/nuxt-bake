interface User {
  id: string
  name: string
  email: string
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface Toast {
  id: string
  message: string
  type: "success" | "danger" | "warning" | "info"
  duration?: number
}

interface ConfirmOptions {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "primary" | "danger" | "warning"
}

interface UIState {
  toasts: Toast[]
  confirmation: { isOpen: boolean, options: ConfirmOptions | null }
}
