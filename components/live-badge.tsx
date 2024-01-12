import { cn } from '@/lib/utils'
import * as React from 'react'

interface LiveBadgeProps {
  classname?: string
}

export const LiveBadge = ({
  classname
}: LiveBadgeProps): JSX.Element => {
  return (
    <div className={cn(
      'bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide',
      classname
    )}>
      Live
    </div>
  )
}
