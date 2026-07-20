import type { H3Event } from "h3"

export async function handleOAuthUser(event: H3Event, userData: OAuthUserData) {
  const { id: providerAccountId, name, email, image, provider } = userData

  const account = await db.account.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    include: { user: true },
  })

  let sessionUser: User | null = account?.user ?? null
  if (!sessionUser) {
    const existingUser = await db.user.findUnique({where: { email },
    })
    if (existingUser) {
      await db.account.create({ data: { userId: existingUser.id, provider, providerAccountId } })
      sessionUser = existingUser
    } else {
      const newUser = await db.user.create({
        data: { 
          email,
          name: name?.trim() ?? email.split("@")[0]!,
          image: image || undefined,
          accounts: { create: { provider, providerAccountId } },
        },
      })
      sessionUser = newUser
    }
  }

  const now = new Date()
  await setUserSession(event, {
    user: sessionUser,
    loggedInAt: now,
    expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
    lastActivityAt: now,
  })

  return sendRedirect(event, "/")
}
