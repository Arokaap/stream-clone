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
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return users
}
