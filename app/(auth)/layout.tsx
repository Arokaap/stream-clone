import * as React from 'react'
import { Logo } from './_components/logo'

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-6'>
      <Logo/>
      {children}
    </div>
  )
}

export default AuthLayout
