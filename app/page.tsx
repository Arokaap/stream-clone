import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home (): JSX.Element {
  return (
    <div className='flex flex-col gap-y-4'>
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}
