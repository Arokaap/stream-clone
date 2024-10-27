import { StreamPlayerSkeleton } from '@/components/stream-player'
import * as React from 'react'

const UserLoading = (): JSX.Element => {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton/>
    </div>
  )
}

export default UserLoading
