'use client'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { type User, type Stream } from '@prisma/client'
import * as React from 'react'

interface StreamPlayerProps {
  user: User & { stream: Stream | null }
  stream: Stream
  isFollowing: boolean
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps): JSX.Element => {
  const { token, name, identity } = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return (
      <div>
        Cannot watch the stream
      </div>
    )
  }

  return (
    <div>
      Allowed to watch the stream
    </div>
  )
}

export default StreamPlayer
