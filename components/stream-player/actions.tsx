'use client'
import * as React from 'react'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { onFollow, onUnfollow } from '@/actions/follow'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

interface ActionsProps {
  hostIdentity: string
  isFollowing: boolean
  isHost: boolean
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost
}: ActionsProps): JSX.Element => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { userId } = useAuth()

  const handleFollow = (): void => {
    startTransition(async () => {
      await onFollow(hostIdentity)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    })
  }

  const handleUnfollow = (): void => {
    startTransition(async () => {
      await onUnfollow(hostIdentity)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    })
  }

  const toggleFollow = (): void => {
    if (!userId) {
      router.push('/sign-in')
      return
    }

    if (isHost) return

    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className='w-full lg:w-auto'
    >
      <Heart className={cn(
        'h-4 w-4 mr-2',
        isFollowing
          ? 'fill-white'
          : 'fill-none'
      )} />
      {isFollowing
        ? 'Unfollow'
        : 'Follow'
      }
    </Button>
  )
}

export const ActionsSkeleton = (): JSX.Element => {
  return (
    <Skeleton className='h-10 w-full lg:w-24'/>
  )
}
