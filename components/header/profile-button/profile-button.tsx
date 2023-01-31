import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { firestore } from '../../../config/firebase'
import profileButton from './profile-button.module.scss'
import profilePlaceholder from './images/profile-placeholder.webp'
import { server } from '../../../config/index'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export default function ProfileButton({}: ProfileButtonProps) {
  const { data: session } = useSession()
  const [isClicked, setClicked] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const ref2 = useRef<HTMLImageElement>(null)

  /*   fetch(`${server}/api/test`, {
    method: 'POST',
    body: session?.user?.name,
  }).then(res => res.json().then(res => console.log(res))) */

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
      { name: 'Check Application Status', link: '/apply' },
      { name: 'Settings', link: '/settings' },
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

  async function test() {
    await setDoc(doc(firestore, 'cities', 'DD'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    })
  }

  test()

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
