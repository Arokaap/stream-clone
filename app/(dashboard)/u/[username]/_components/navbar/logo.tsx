import Image from 'next/image'
import { Poppins } from 'next/font/google'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const Logo = (): JSX.Element => {
  return (
    <Link href="/">
      <div className='flex items-center gap-x-4 hover:opacity-75 transition'>
        <div className='transparent rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink'>
          <Image src="/logo.webp"
          alt='StreamClone'
          height="70"
          width="70"/>
        </div>
        <div className={cn(
          'hidden lg:block',
          font.className
        )}>
          <p className='text-lg font-semibold'>StreamClone</p>
          <p className='text-xs text-muted-foreground'>Creator dashboard</p>
        </div>
      </div>
    </Link>
  )
}
