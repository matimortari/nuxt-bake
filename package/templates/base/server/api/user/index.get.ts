import db from "#server/utils/db"
import { getUserFromSession } from "#server/utils/helpers"

export default defineEventHandler(async (event) => {
  const user = await db.user.findUnique({
    where: { id: (await getUserFromSession(event))?.id },
  })
  if (!user) {
    throw createError({ status: 404, message: "User not found" })
  }

  return user
})
