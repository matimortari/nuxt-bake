export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)
  if (!sessionUser) {
    throw createError({ status: 404, message: "User not found" })
  }

  await db.user.delete({ where: { id: sessionUser.id } })
  
  await clearUserSession(event)

  return { success: true, message: "User deleted successfully" }
})
