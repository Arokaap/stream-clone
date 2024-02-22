'use client'

import { useSidebar } from '@/store/use-sidebar'
import { type Follow, type User } from '@prisma/client'
import * as React from 'react'
import { UserItem, UserItemSkeleton } from './user-item'

interface FollowingProps {
  data: Array<Follow & { following: User }>
}

export const Following = ({
  data
}: FollowingProps): JSX.Element => {
  const { collapsed } = useSidebar((state) => state)

  if (data.length === 0) {
    return <></>
  }

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>
            Following
          </p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {data.map((follow) =>
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={true}
          />
        )}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = (): JSX.Element => {
  return (
    <ul className='px-2 pt-2 lg:pt-0'>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i}/>
      ))}
    </ul>
  )
}
