import Link from 'next/link'
import classnames from 'classnames'
import footer from './footer.module.scss'

export default function Footer() {
  const links: [text: string, href: string, button: boolean][] = [
    ['Map', '/map', true], // ["Map", "http://map.streamlinesmp.com", true],
    ['Stats', '/stats', true], // ["Stats", "http://stats.streamlinesmp.com", true],
    ['Donate', '/donate', false],
    ['Contact Us', '/contact', false],
  ]

  return (
    <footer className={footer.footer}>
      <span>© {new Date().getFullYear()} All Rights Reserved</span>
      <nav>
        <ul>
          {links.map(([text, href, isBtn], i) => (
            <li key={i}>
              <Link
                href={href}
                className={classnames({
                  [footer.button]: isBtn,
                })}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
