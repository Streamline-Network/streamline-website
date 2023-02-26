import React, { MouseEvent } from 'react'

import Link from 'next/link'
import ProfileButton from './profile/profile'
import classnames from 'classnames'
import header from './header.module.scss'
import { useRouter } from 'next/router'

export default function Header({}: HeaderProps) {
  const pages = [
    ['Home', '/'],
    ['Community', '/community'],
    ['About', '/about'],
    ['Join', '/join'],
  ]

  const path = useRouter().asPath
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = (open?: boolean) => {
    setIsOpen(isOpen => {
      document && (document.body.style.overflow = open ?? (!document || !isOpen) ? 'hidden' : '')
      return open ?? !isOpen
    })
  }

  return (
    <header className={header.header}>
      <Link onClick={() => toggle(false)} href="/">
        Streamline SMP
      </Link>

      <nav className={classnames({ [header.open]: isOpen })}>
        <button onClick={() => toggle()}>
          <span />
          <span />
          <span />
        </button>
        <ul>
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

interface HeaderProps {}
