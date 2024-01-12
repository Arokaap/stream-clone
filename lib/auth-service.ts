/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { currentUser } from '@clerk/nextjs'

import { db } from '@/lib/db'

export const getSelf = async (): Promise<{
  id: string
  username: string
  imageUrl: string
  externalUserId: string
  bio: string | null
  createdAt: Date
  updateAt: Date
}> => {
  const self = await currentUser()

  if (!self?.username) {
    throw new Error('Unauthorized')
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id }
  })

  if (!user) {
    throw new Error('Not found')
  }

  return user
}
