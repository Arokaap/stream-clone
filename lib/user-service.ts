import { db } from '@/lib/db'

export const getUserByUsername = async (username: string): Promise<{
  id: string
  username: string
  imageUrl: string
  externalUserId: string
  bio: string | null
  createdAt: Date
  updateAt: Date
} | null> => {
  const user = await db.user.findUnique({
    where: {
      username
    }
  })

  return user
}
