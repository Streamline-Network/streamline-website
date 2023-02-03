import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import profileButton from './profile-button.module.scss'
import profilePlaceholder from './images/profile-placeholder.webp'

export default function ProfileButton({}: ProfileButtonProps) {
  const { data: session } = useSession()
  const [isClicked, setClicked] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const ref2 = useRef<HTMLImageElement>(null)

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

  const createItems = () => {
    const items = [
      { name: 'Application', link: '/account/apply' },
      { name: 'Settings', link: '/account/settings' },
    ]

    return items.map((item, index) => {
      return (
        <li key={index}>
          <Link className={profileButton.button} href={item.link}>
            {item.name}
          </Link>
        </li>
      )
    })
  }

  return (
    <li>
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
          <a onClick={() => signIn('discord')} className={profileButton.profileButton}>
            Account
          </a>
          {isClicked ? (
            <nav ref={ref} className={profileButton.dropdown}>
              <ul>
                {createItems()}
                <li>
                  <a className={profileButton.button} onClick={() => signOut()}>
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </>
      ) : (
        <a onClick={() => signIn('discord')} className={profileButton.loginButton}>
          Login
        </a>
      )}
    </li>
  )
}

interface ProfileButtonProps {}
