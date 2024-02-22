import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import * as React from 'react'
import Actions from './_components/actions'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({
  params
}: UserPageProps): Promise<React.JSX.Element> => {
  const user = await getUserByUsername(params.username)

  if (user == null) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)

  return (
    <div className='flex flex-col gap-y-4'>
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing}/>
    </div>
  )
}

export default UserPage
