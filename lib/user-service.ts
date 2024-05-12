import { db } from '@/lib/db'

export const getUserByUsername = async (
  username: string
): Promise<{
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
