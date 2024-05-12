import { WifiOff } from 'lucide-react'
import * as React from 'react'

interface OfflineVideoProps {
  username: string
}

const OfflineVideo = ({ username }: OfflineVideoProps): JSX.Element => {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
      <WifiOff className='h-10 w-10 text-muted-foreground'/>
      <p className='text-muted-foreground'>
        {username} is offline
      </p>
    </div>
  )
}

export default OfflineVideo
