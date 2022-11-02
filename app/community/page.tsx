import Image from 'next/image'
import { Fragment } from 'react'
import Link from 'next/link'

import styles from './community.module.css'
import checkbox from './images/checkbox.png'
import discord from './images/discord.png'
import instagram from './images/instagram.png'
import reddit from './images/reddit.png'
import tiktok from './images/tiktok.png'
import twitter from './images/twitter.png'
import youtube from './images/youtube.png'

export default function Page() {
  const sections = [
    {
      title: 'Our Social Media',
      links: [
        {
          href: 'https://discord.gg/EAe4S6HdVC',
          src: discord,
          alt: 'Discord',
        },
        {
          href: 'https://www.youtube.com/channel/UCXg4U9_EQE_cKuU4PfZLn-w',
          src: youtube,
          alt: 'YouTube',
        },
        {
          href: 'https://twitter.com/streamlinesmp',
          src: twitter,
          alt: 'Twitter',
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: reddit,
          alt: 'Reddit',
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: instagram,
          alt: 'Instagram',
        },
        {
          href: 'https://www.tiktok.com/@streamlinesmp',
          src: tiktok,
          alt: 'TikTok',
        },
      ],
    },
    {
      title: 'Vote For Us',
      links: [
        {
          href: 'https://topminecraftservers.org/vote/28132',
          src: checkbox,
          alt: 'Top MC Servers',
        },
        {
          href: 'https://servers-minecraft.com/vote/1020',
          src: checkbox,
          alt: 'Servers MC',
        },
        {
          href: 'https://minecraft-server-list.com/server/480202/vote/',
          src: checkbox,
          alt: 'MC Server List',
        },
        {
          href: 'https://minecraft.buzz/vote/5307',
          src: checkbox,
          alt: 'MC Buzz',
        },
        {
          href: 'https://servers-minecraft.net/server-streamline-smp.21149',
          src: checkbox,
          alt: 'MC Servers',
        },
        {
          href: 'https://best-minecraft-servers.co/server-streamline-smp.9067/vote',
          src: checkbox,
          alt: 'Best MC',
        },
      ],
    },
    {
      title: 'Learn More',
      links: [],
    },
  ]

  return (
    <>
      <h1 className="main-header red">Join The Conversation</h1>
      {sections.map(({ title, links }, i) => (
        <Fragment key={i}>
          <h2 className="sub-header">{title}</h2>
          <div className="grid">
            {links.map(({ href, src, alt }, j) => (
              <Link
                target="_blank"
                rel="noreferrer"
                href={href}
                className="button large-button"
                key={j}
              >
                <div className="icon">
                  <Image
                    className={alt.toLowerCase()}
                    src={src}
                    alt={alt + ' icon'}
                  />
                </div>
                <h3>{alt}</h3>
              </Link>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  )
}
