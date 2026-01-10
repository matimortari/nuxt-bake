import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event)

  await db.user.delete({ where: { id: user.id } })

  await clearUserSession(event)

  return { success: true, message: "User account deleted successfully" }
})
