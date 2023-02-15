import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import profileButton from './profile.module.scss'
import profilePlaceholder from './images/profile-placeholder.webp'
import { useRouter } from 'next/router'

export default function ProfileButton({ toggle }: ProfileButtonProps) {
  const { data: session } = useSession()
  const [isClicked, setClicked] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const ref2 = useRef<HTMLImageElement>(null)
  const router = useRouter()

  const callbackUrl = (router.query.callbackUrl ?? '/') as string

  console.log(callbackUrl)

  const items = [
    { name: 'Application', link: '/account/apply' },
    { name: 'Settings', link: '/account/settings' },
  ]

  const handleOutsideClick = (e: Event) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      ref2.current &&
      !ref2.current.contains(e.target as Node)
    ) {
      setClicked(false)
    }
  }

  if (typeof window !== 'undefined') document.addEventListener('click', handleOutsideClick)

  const handleClick = () => {
    setClicked(!isClicked)
  }

  const handleLogOut = async () => {
    await signOut()
    window.open('/', '_top')
  }

  const handleSignIn = async () => {
    await signIn('discord', { callbackUrl })
  }

  const createItems = () => {
    return items.map((item, index) => {
      return (
        <li key={index}>
          <Link
            onClick={() => {
              setClicked(false)
            }}
            className={profileButton.button}
            href={item.link}>
            {item.name}
          </Link>
        </li>
      )
    })
  }

  return (
    <li className={profileButton.profileWrapper}>
      {session ? (
        <>
          <div ref={ref2} onClick={() => handleClick()}>
            <Image
              src={session.user?.image || profilePlaceholder}
              className={profileButton.profileImg}
              alt="Profile Placeholder"
              width={30}
              height={30}
            />
          </div>

          {items.map(item => (
            <Link
              onClick={() => toggle(false)}
              key={item.name}
              href={item.link}
              className={profileButton.profileButton}>
              {item.name}
            </Link>
          ))}
          <a onClick={handleLogOut} className={profileButton.profileButton}>
            Sign Out
          </a>

          {isClicked ? (
            <nav ref={ref} className={profileButton.dropdown}>
              <ul>
                {createItems()}
                <li>
                  <a className={profileButton.button} onClick={handleLogOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </>
      ) : (
        <a onClick={handleSignIn} className={profileButton.loginButton}>
          Log in
        </a>
      )}
    </li>
  )
}

interface ProfileButtonProps {
  toggle: (open?: boolean) => void
}
