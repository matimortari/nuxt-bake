import type { EventHandlerRequest, H3Event } from "h3"

/**
 * Retrieves the authenticated user from the current session.
 * Throws 401 if no valid session exists.
 */
export async function getUserFromSession(event: H3Event<EventHandlerRequest>) {
  const session = await getUserSession(event)
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  return session.user
}
