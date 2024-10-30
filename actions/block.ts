'use server'

import { getSelf } from '@/lib/auth-service'
import { blockUser, unblockUser } from '@/lib/block-service'
import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL ?? '',
  process.env.LIVEKIT_API_KEY ?? '',
  process.env.LIVEKIT_API_SECRET ?? ''
)

export const onBlock = async (
  id: string
) => {
  const self = await getSelf()

  let blockedUser

  try {
    blockedUser = await blockUser(id)
  } catch {
    // This means user is not in the room
  }

  try {
    await roomService.removeParticipant(self.id, id)
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self.username}/community`)

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
  const self = await getSelf()
  const unblockedUser = await unblockUser(id)

  revalidatePath(`/u/${self.username}/community`)

  return unblockedUser
}
