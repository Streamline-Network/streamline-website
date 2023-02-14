import Image, { StaticImageData } from 'next/image'

import React from 'react'
import classnames from 'classnames'
import message from './message.module.scss'

export default function DiscordMessage({
  at,
  mentioned,
  content,
  from: { profilePicture, username, color },
}: DiscordMessageProps) {
  return (
    <div className={classnames(message.message, { [message.mentioned]: mentioned })}>
      <Image
        className={message.profilePicture}
        src={profilePicture}
        alt={`Profile picture for ${username}`}
        width={50}
        height={50}
      />
      <div className={message.content}>
        <div className={message.details}>
          <span style={{ color }}>{username}</span>
          <span>{at}</span>
        </div>
        <div className={message.text}>{content}</div>
      </div>
    </div>
  )
}

export interface DiscordMessageProps {
  from: {
    username: string
    profilePicture: StaticImageData
    color: string
  }
  at: string
  mentioned: boolean
  content: React.ReactNode
}
