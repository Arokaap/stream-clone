import { Loader } from 'lucide-react'
import * as React from 'react'

interface LoadingVideoProps {
  label: string
}

const LoadingVideo = ({ label }: LoadingVideoProps): JSX.Element => {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
      <Loader className='h-10 w-10 text-muted-foreground animate-spin'/>
      <p className='text-muted-foreground capitalize'>
        {label}
      </p>
    </div>
  )
}

export default LoadingVideo
