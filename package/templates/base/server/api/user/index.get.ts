export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)
  if (!sessionUser) {
    throw createError({ status: 404, message: "User not found" })
  }

  const user = await db.user.findUnique({ where: { id: sessionUser.id } })

  return { user }
})
