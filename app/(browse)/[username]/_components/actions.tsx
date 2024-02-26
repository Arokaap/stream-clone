'use client'
import * as React from 'react'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { onFollow, onUnfollow } from '@/actions/follow'
import { toast } from 'sonner'
import { onBlock, onUnblock } from '@/actions/block'

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export const Actions = ({
  isFollowing,
  userId
}: ActionsProps): JSX.Element => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = (): void => {
    startTransition(() => {
      onFollow(userId).then((data) => {
        toast.success(`You are now following ${data.following.username}`)
      }).catch(() => {
        toast.error('Something went wrong')
      })
    })
  }

  const handleUnfollow = (): void => {
    startTransition(() => {
      onUnfollow(userId).then((data) => {
        toast.success(`You have unfollowed ${data.following.username}`)
      }).catch(() => {
        toast.error('Something went wrong')
      })
    })
  }

  const onClick = (): void => {
    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  const handleBlock = (): void => {
    startTransition(() => {
      onBlock(userId).then((data) => {
        toast.success(`Blocked the user ${data.blocked.username}`)
      }).catch(() => {
        toast.error('Something went wrong')
      })
    })
  }

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  )
}

export default Actions
