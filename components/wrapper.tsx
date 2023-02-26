import { ReactNode } from 'react'
import { Rubik } from 'next/font/google'
import { Session } from 'next-auth/core/types'
import { SessionProvider } from 'next-auth/react'
import classNames from 'classnames'

const rubik = Rubik({
  subsets: ['latin'],
  preload: true,
  fallback: ['sans-serif'],
})

export default function Wrapper({ children, session }: WrapperProps) {
  return (
    <div className={classNames('wrapper', rubik.className)}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  )
}

interface WrapperProps {
  children: ReactNode
  session: Session
}
