import Image from 'next/image'
import { Poppins } from 'next/font/google'
import * as React from 'react'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const Logo = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center'>
      <div className='rounded-full p-1'>
        <Image
          src="/logo.webp"
          alt='StreamClone'
          height="150"
          width="150"
        />
      </div>
      <div className={cn('flex flex-col items-center', font.className)}>
        <p className='text-xl font-semibold'>
          StreamClone
        </p>
        <p className='text-sm text-muted-foreground'>
          Let&apos;s play
        </p>
      </div>
    </div>
  )
}
