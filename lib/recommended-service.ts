import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getRecommended = async (): Promise<
Array<{
  id: string
  username: string
  imageUrl: string
  externalUserId: string
  bio: string | null
  createdAt: Date
  updateAt: Date
}>
> => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  let users = []

  if (userId !== null) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId
            }
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: [
        {
          stream: {
            isLive: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    })
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: [
        {
          stream: {
            isLive: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    })
  }

  return users
}
