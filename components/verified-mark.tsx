import { Check } from 'lucide-react'
import * as React from 'react'

const VerifiedMark = (): JSX.Element => {
  return (
    <div className='p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600'>
      <Check className='h-[10px] w-[10px] text-primary stroke-[4px]'/>
    </div>
  )
}

export default VerifiedMark
