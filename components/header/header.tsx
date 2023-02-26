import React, { MouseEvent } from 'react'

import Link from 'next/link'
import ProfileButton from './profile-button/profile-button'
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
  const toggle = (_event?: MouseEvent, open?: false) => {
    setIsOpen(isOpen => {
      document && (document.body.style.overflow = open ?? (!document || !isOpen) ? 'hidden' : '') // TODO: use CSS :has() selector
      return open ?? !isOpen
    })
  }

  return (
    <header className={header.header}>
      <Link onClick={() => toggle(undefined, false)} href="/">
        Streamline SMP
      </Link>

      <nav className={classnames({ [header.open]: isOpen })}>
        <button onClick={toggle}>
          <span />
          <span />
          <span />
        </button>
        <ul>
          {pages.map(([name, url], i) => (
            <li key={i} className={classnames({ [header.currentPg]: url === path })}>
              <Link onClick={() => toggle(undefined, false)} href={url}>
                {name}
              </Link>
            </li>
          ))}
          {/* <ProfileButton /> */}
        </ul>
      </nav>
    </header>
  )
}

interface HeaderProps {}
