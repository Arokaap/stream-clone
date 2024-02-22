import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getFollowedUsers = async (): Promise<
Array<{
  following: {
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
  followerId: string
  followingId: string
  createdAt: Date
  updateAt: Date
}>
> => {
  try {
    const self = await getSelf()

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id
      },
      include: {
        following: true
      }
    })

    return followedUsers
  } catch (error) {
    return []
  }
}

export const isFollowingUser = async (id: string): Promise<boolean> => {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: { id }
    })

    if (otherUser == null) {
      throw new Error('User not found')
    }

    if (otherUser?.id === self.id) {
      return true
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    })

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return !!existingFollow
  } catch {
    return false
  }
}

export const followUser = async (
  id: string
): Promise<{
  following: {
    id: string
    username: string
    imageUrl: string
    externalUserId: string
    bio: string | null
    createdAt: Date
    updateAt: Date
  }
  follower: {
    id: string
    username: string
    imageUrl: string
    externalUserId: string
    bio: string | null
    createdAt: Date
    updateAt: Date
  }
}> => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: { id }
  })

  if (otherUser == null) {
    throw new Error('User not found')
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot follow yourself')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (existingFollow != null) {
    throw Error('Already following')
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id
    },
    include: {
      follower: true,
      following: true
    }
  })

  return follow
}

export const unfollowUser = async (
  id: string
): Promise<{
  following: {
    id: string
    username: string
    imageUrl: string
    externalUserId: string
    bio: string | null
    createdAt: Date
    updateAt: Date
  }
}> => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (otherUser == null) {
    throw new Error('User not found')
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot unfollow yourself')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (existingFollow == null) {
    throw new Error('Not following')
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id
    },
    include: {
      following: true
    }
  })

  return follow
}
