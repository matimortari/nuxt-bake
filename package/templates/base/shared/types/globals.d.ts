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
