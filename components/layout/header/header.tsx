import { useRef, useState } from 'react'

import Link from 'next/link'
import ProfileButton from './profile/profile'
import classnames from 'classnames'
import header from './header.module.scss'
import { useRouter } from 'next/router'

export default function Header() {
  const pages = [
    ['Home', '/'],
    ['Community', '/community'],
    ['About', '/about'],
    ['Join', '/join'],
  ]

  const path = useRouter().asPath
  const ulRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggle = (open?: boolean) => {
    setIsOpen(isOpen => {
      document.body.style.overflow = open ?? !isOpen ? 'hidden' : ''
      return open ?? !isOpen
    })
  }

  function closeHandler() {
    const elem = ulRef.current as HTMLElement | null
    if (!elem) return
    elem.removeEventListener('transitionend', closeHandler)
    elem.style.display = 'none'
    setIsAnimating(false)
  }

  function openHandler() {
    const elem = ulRef.current as HTMLElement | null
    if (!elem) return
    elem.removeEventListener('transitionend', openHandler)
    elem.style.display = ''
    setTimeout(() => {
      toggle()
      setIsAnimating(false)
    })
  }

  return (
    <header className={header.header}>
      <Link onClick={() => toggle(false)} href="/">
        Streamline SMP
      </Link>

      <nav className={classnames({ [header.open]: isOpen })}>
        <button
          onClick={() => {
            const elem = ulRef.current as HTMLElement | null
            if (!elem) return

            if (isAnimating) {
              elem.addEventListener('transitionend', openHandler)
              return
            }

            setIsAnimating(true)

            if (isOpen) {
              toggle()
              elem.addEventListener('transitionend', closeHandler)
            } else {
              elem.style.display = ''
              setTimeout(() => {
                toggle()
                setIsAnimating(false)
              })
            }
          }}>
          <span />
          <span />
          <span />
        </button>
        <ul ref={ulRef}>
          {pages.map(([name, url], i) => (
            <li key={i} className={classnames({ [header.currentPg]: url === path })}>
              <Link onClick={() => toggle(false)} href={url}>
                {name}
              </Link>
            </li>
          ))}
          <ProfileButton toggle={toggle} />
        </ul>
      </nav>
    </header>
  )
}
