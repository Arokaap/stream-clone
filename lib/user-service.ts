import { db } from '@/lib/db'

export const getUserByUsername = async (
  username: string
): Promise<{
  id: string
  username: string
  imageUrl: string
  externalUserId: string
  stream: {
    id: string
    name: string
    thumbnailUrl: string | null
    ingressId: string | null
    serverUrl: string | null
    streamKey: string | null
    isLive: boolean
    isChatEnabled: boolean
    isChatDelayed: boolean
    isChatFollowersOnly: boolean
    userId: string
    createdAt: Date
    updateAt: Date } | null
  bio: string | null
  createdAt: Date
  updateAt: Date
} | null> => {
  const user = await db.user.findUnique({
    where: {
      username
    },
    include: {
      stream: true
    }
  })

  return user
}

export const getUserById = async (id: string): Promise<{
  id: string
  username: string
  imageUrl: string
  externalUserId: string
  stream: {
    isLive: boolean
  } | null
  bio: string | null
  createdAt: Date
  updateAt: Date
} | null> => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true
    }
  })

  return user
}
