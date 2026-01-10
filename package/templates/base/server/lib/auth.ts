import type { H3Event } from "h3"
import db from "#server/lib/db"

export async function handleOAuthUser(event: H3Event, userData: OAuthUserData) {
  const { id: providerAccountId, name, email, image, provider } = userData

  // Find existing account by provider
  let account = await db.account.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    include: { user: true },
  })

  let user: any = account?.user ?? null
  if (!user) {
    user = await db.user.findUnique({ where: { email } })
  }

  // If still no user, create one
  if (!user) {
    user = await db.user.create({
      data: {
        email,
        name: name?.trim() || email.split("@")[0],
        image: image || undefined,
      },
    })
  }

  // Upsert account
  account = await db.account.upsert({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    update: {},
    create: { userId: user.id, provider, providerAccountId },
    include: { user: true },
  })

  user = account.user

  // Build session object
  const sessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image ?? null,
  }

  await setUserSession(event, { user: sessionUser, loggedInAt: new Date() })
  return sendRedirect(event, "/admin/profile")
}
