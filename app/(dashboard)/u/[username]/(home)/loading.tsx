import { StreamPlayerSkeleton } from '@/components/stream-player'
import * as React from 'react'

const CreatorLoading = (): JSX.Element => {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton />
    </div>
  )
}

export default CreatorLoading
