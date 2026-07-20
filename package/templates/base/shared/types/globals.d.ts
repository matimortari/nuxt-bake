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
  type: "success" | "error" | "warning" | "info"
  duration?: number
}
