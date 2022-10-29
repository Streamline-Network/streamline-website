import classnames from 'classnames'
import Link from 'next/link'
import React from 'react'

export default function Footer({}: FooterProps) {
  const links: [text: string, href: string, button: boolean][] = [
    ['Map', 'http://map.streamlinesmp.com', true],
    ['Stats', 'http://stats.streamlinesmp.com', true],
    ['Donate', '/donate', false],
    ['Contact Us', '/contact', false],
  ]

  return (
    <footer>
      <p>© 2023 All Rights Reserved</p>
      <nav className="extra-links">
        {links.map(([text, href, isBtn], i) => (
          <Link
            key={i}
            href={href}
            className={classnames('link', { button: isBtn })}
          >
            {text}
          </Link>
        ))}
      </nav>
    </footer>
  )
}

interface FooterProps {}
