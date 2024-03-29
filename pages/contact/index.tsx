import Image, { StaticImageData } from 'next/image'

import Link from 'next/link'
import { NextSeo } from 'next-seo'
import classnames from 'classnames'
import contact from './contact.module.scss'
import discord from '/images/discord.png'
import email from '/images/email.png'

export default function Contact() {
  const blocks: Block[] = [
    {
      color: 'blue',
      top: 'Want a fast response? Start a support ticket and one of our staff will contact you within minutes.',
      img: {
        src: discord,
        alt: 'Discord logo',
      },
      label: 'We are happy to help!',
      button: {
        href: 'https://discord.com/channels/775831180086870096/981954520470921246',
        text: 'Support Ticket',
      },
      bottom: 'Average response: less than 7 hours',
    },
    {
      color: 'green',
      top: 'Got something more important or business related? Send us an email!',
      img: {
        src: email,
        alt: 'Email icon',
      },
      label: "We can't wait to hear from you!",
      button: {
        href: '/cdn-cgi/l/email-protection#88fbfdf8f8e7fafcc8fbfcfaede9e5e4e1e6edfbe5f8a6ebe7e5',
        text: 'Email Us',
      },
      bottom: 'Average response: less than 24 hours',
    },
  ]

  return (
    <>
      <NextSeo
        title="Contact - Reach Out to Us"
        description="Contact the admins of Streamline SMP, a vanilla whitelist-only Minecraft server. Send us an email or join our Discord server."
      />

      <h1 className={classnames('orange', contact.title)}>Contact</h1>
      <div className={contact.grid}>
        <div className={contact.subHeader}>
          <h3>Have A Question?</h3>
          <p>Check out our Q&A! Still lost? Contact us anytime.</p>
        </div>
        <div className={contact.contentGrid}>
          {blocks.map(
            ({ color, top, img: { src, alt }, label, button: { href, text }, bottom }, index) => (
              <div className={contact.block} key={index}>
                <h3>{top}</h3>
                <div className={classnames(contact.wrapperIconTxt, color)}>
                  <Image src={src} alt={alt} width={145} />
                  <p className={contact.subText}>{label}</p>
                </div>
                <Link target="_blank" href={href} className={contact.button}>
                  {text}
                </Link>
                <p className={contact.responseTime}>{bottom}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

type Block = {
  color: string
  top: string
  img: {
    src: StaticImageData
    alt: string
  }
  label: string
  button: {
    href: string
    text: string
  }
  bottom: string
}
