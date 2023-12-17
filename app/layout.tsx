import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="es">
          <body className={inter.className}>
            <ThemeProvider
              attribute='class'
              forcedTheme='dark'
              storageKey='streamclone-theme'>
              {children}
            </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}
