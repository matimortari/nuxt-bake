export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)
  const user = await db.user.findUnique({ where: { id: sessionUser.id } })

  return { user }
})
