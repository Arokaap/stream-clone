'use client'
import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'
import { useState } from 'react'
import * as React from 'react'

interface CopyClientProps {
  value?: string
}

export const CopyButton = ({ value }: CopyClientProps): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = async (): Promise<void> => {
    if (value === null) return

    if (value === undefined) return

    setIsCopied(true)

    await navigator.clipboard.writeText(value)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const Icon = isCopied ? CheckCheck : Copy

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm">
      <Icon className='h-4 w-4'/>
    </Button>
  )
}
