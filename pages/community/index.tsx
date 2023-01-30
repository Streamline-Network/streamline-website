import Image, { StaticImageData } from 'next/image'

import { Fragment } from 'react'
import { default as NextLink } from 'next/link'
import checkbox from './images/checkbox.png'
import classnames from 'classnames'
import community from './community.module.scss'
import discord from './images/discord.png'
import instagram from './images/instagram.png'
import reddit from './images/reddit.png'
import tiktok from './images/tiktok.png'
import twitter from './images/twitter.png'
import youtube from './images/youtube.png'

export default function Community({}: CommunityProps) {
  const sections: Section[] = [
    {
      title: 'Our Social Media',
      links: [
        {
          href: 'https://discord.gg/EAe4S6HdVC',
          src: discord,
          alt: 'Discord',
          classes: [community.button],
        },
        {
          href: 'https://www.youtube.com/channel/UCXg4U9_EQE_cKuU4PfZLn-w',
          src: youtube,
          alt: 'YouTube',
          classes: [community.button],
        },
        {
          href: 'https://twitter.com/streamlinesmp',
          src: twitter,
          alt: 'Twitter',
          classes: [community.button],
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: reddit,
          alt: 'Reddit',
          classes: [community.button],
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: instagram,
          alt: 'Instagram',
          classes: [community.button],
        },
        {
          href: 'https://www.tiktok.com/@streamlinesmp',
          src: tiktok,
          alt: 'TikTok',
          classes: [community.button],
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
          classes: [community.button],
        },
        {
          href: 'https://servers-minecraft.com/vote/1020',
          src: checkbox,
          alt: 'Servers MC',
          classes: [community.button],
        },
        {
          href: 'https://minecraft-server-list.com/server/480202/vote/',
          src: checkbox,
          alt: 'MC Server List',
          classes: [community.button],
        },
        {
          href: 'https://minecraft.buzz/vote/5307',
          src: checkbox,
          alt: 'MC Buzz',
          classes: [community.button],
        },
        {
          href: 'https://servers-minecraft.net/server-streamline-smp.21149',
          src: checkbox,
          alt: 'MC Servers',
          classes: [community.button],
        },
        {
          href: 'https://best-minecraft-servers.co/server-streamline-smp.9067/vote',
          src: checkbox,
          alt: 'Best MC',
          classes: [community.button],
        },
      ],
    },
    {
      title: 'Learn More',
      links: [
        {
          href: 'https://streamlinesmp.fandom.com/wiki/Streamline_SMP_Wiki',
          alt: 'Check Out The Wiki',
          classes: [community.wikiButton],
        },
      ],
    },
  ]

  return (
    <>
      <h1 className={classnames('red', community.title)}>Join The Conversation</h1>
      {sections.map(({ title, links }, i) => (
        <Fragment key={i}>
          <h2 className={community.subHeader}>{title}</h2>
          <div>
            <div className={community.grid}>
              {links.map(({ href, src, alt, classes }, j) => (
                <NextLink
                  target="_blank"
                  rel="noreferrer"
                  href={href}
                  className={classnames(...(classes ?? []), { [community.stats]: !src })}
                  key={j}>
                  {src && (
                    <>
                      <div className={community.icon}>
                        <Image
                          className={alt.toLowerCase()}
                          src={src}
                          alt={alt + ' Icon'}
                          height={50}
                        />
                      </div>
                      <h3>{alt}</h3>
                    </>
                  )}
                  {!src && alt}
                </NextLink>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}

interface CommunityProps {}

interface Section {
  title: string
  links: Link[]
}

interface Link {
  href: string
  src?: StaticImageData
  alt: string
  classes?: string[]
}
