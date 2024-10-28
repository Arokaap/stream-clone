import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'
import { type User } from '@prisma/client'
interface StreamWithUser {
  id: string
  user: User
  isLive: boolean
  name: string
  thumbnailUrl: string | null
}

export const getStreams = async (): Promise<StreamWithUser[]> => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  let streams = []

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId
              }
            }
          }
        }
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updateAt: 'desc'
        }
      ]
    })
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updateAt: 'desc'
        }
      ]
    })
  }

  return streams
}
