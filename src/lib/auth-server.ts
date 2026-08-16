import { createServerFn } from '@tanstack/react-start'

export const getCurrentSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const [{ getRequestHeaders }, { auth }] = await Promise.all([
      import('@tanstack/react-start/server'),
      import('#/lib/auth.ts'),
    ])

    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    })

    if (!session?.user) return null

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    }
  },
)
