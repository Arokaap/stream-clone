'use server'

import { blockUser, unblockUser } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

export const onBlock = async (
  id: string
): Promise<
{
  blocked: {
    id: string
    username: string
    imageUrl: string
    externalUserId: string
    bio: string | null
    createdAt: Date
    updateAt: Date
  }
} & {
  id: string
  blockerId: string
  blockedId: string
}
> => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow ability to kick the guest

  const blockedUser = await blockUser(id)

  if (blockedUser !== null) {
    revalidatePath(`/${blockedUser.blocked.username}`)
  }

  return blockedUser
}

export const onUnblock = async (
  id: string
): Promise<
{
  blocked: {
    id: string
    username: string
    imageUrl: string
    externalUserId: string
    bio: string | null
    createdAt: Date
    updateAt: Date
  }
} & {
  id: string
  blockerId: string
  blockedId: string
}
> => {
  const unblockedUser = await unblockUser(id)

  if (unblockedUser !== null) {
    revalidatePath(`/${unblockedUser.blocked.username}`)
  }

  return unblockedUser
}
