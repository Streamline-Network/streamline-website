import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header({}: HeaderProps) {
  const pages = [
    ['Home', '/'],
    ['Community', '/community'],
    ['About', '/about'],
    ['Join', '/join'],
  ]

  const path = usePathname()

  return (
    <header>
      <div className="header">
        <Link className="title" href="/">
          Streamline SMP
        </Link>
        <nav className="main-navigation" role="navigation">
          <span className="line first-line"></span>
          <span className="line secound-line"></span>
          <span className="line third-line"></span>
          <ul className="nav-list">
            {pages.map(([name, url], i) => (
              <li
                key={i}
                className={classnames({ 'current-pg': url === path })}
              >
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="notifications"></div>
    </header>
  )
}

interface HeaderProps {}
