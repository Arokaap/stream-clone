import { db } from '@/lib/db'

export const getStreamByUserId = async (userId: string): Promise<{
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
  updateAt: Date
} | null> => {
  const stream = await db.stream.findUnique({
    where: { userId }
  })

  return stream
}
