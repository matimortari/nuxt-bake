export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  await db.user.delete({ where: { id: sessionUser.id } })
  await destroyAuthenticatedSession(event)

  return { success: true, message: "User deleted successfully" }
})
