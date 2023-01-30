import Image, { StaticImageData } from 'next/image'

import React from 'react'
import classnames from 'classnames'
import message from './message.module.scss'
import profilePicture from '../../axolotl-pfp.png'

export default function DiscordMessage({ at, mentioned, content }: DiscordMessageProps) {
  return (
    <div className={classnames(message.message, { [message.mentioned]: mentioned })}>
      <Image
        className={message.profilePicture}
        src={profilePicture}
        alt={`Profile picture for Hex32`}
        width={50}
        height={50}
      />
      <div className={message.content}>
        <div className={message.details}>
          <span style={{ color: '#ff4bf0' }}>Hex32</span>
          <span>{at}</span>
        </div>
        <div className={message.text}>{content}</div>
      </div>
    </div>
  )
}

export interface DiscordMessageProps {
  at: string
  mentioned: boolean
  content: React.ReactNode
}
