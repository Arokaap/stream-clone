'use server'

import { revalidatePath } from 'next/cache'

import { followUser, unfollowUser } from '@/lib/follow-service'

export const onFollow = async (
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
  try {
    const followedUser = await followUser(id)

    revalidatePath('/')

    if (followedUser !== null) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser
  } catch (error) {
    throw new Error('Internal Error')
  }
}

export const onUnfollow = async (
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
  try {
    const unfollowedUser = await unfollowUser(id)

    revalidatePath('/')

    if (unfollowedUser !== null) {
      revalidatePath(`/${unfollowedUser.following.username}`)
    }

    return unfollowedUser
  } catch (error) {
    throw new Error('Internal error')
  }
}
