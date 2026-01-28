import db from "#server/utils/db"
import { getUserFromSession } from "#server/utils/helpers"

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event)

  await db.user.delete({ where: { id: user.id } })

  await clearUserSession(event)

  return { success: true, message: "User account deleted successfully" }
})
