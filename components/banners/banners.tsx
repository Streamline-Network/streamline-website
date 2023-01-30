import Banner, { BannerProps } from './banner/banner'

import banners from './banners.json'
import { useState } from 'react'

export default function Banners() {
  type Messages = Omit<BannerProps, 'close' | 'index'>[]
  const lsKey = 'closedBannerIds'

  const getOrSetLS = (item?: string[]): string[] => {
    if (typeof window === 'undefined') return []
    return item
      ? localStorage.setItem(lsKey, JSON.stringify(item))
      : JSON.parse(localStorage.getItem(lsKey) || '[]')
  }

  const existingIds = banners.map(({ id }) => id)
  const closedIds = getOrSetLS()
  const existingAndClosedIds = closedIds.filter(id => existingIds.includes(id))
  const bannersToDisplay = banners.filter(banner => !closedIds.includes(banner.id))

  const [messages, setMessages] = useState<Messages>(bannersToDisplay)

  const close = (id: string) => {
    setMessages(messages => [...messages.filter(message => message.id !== id)])
    getOrSetLS([...existingAndClosedIds, id])
  }

  return (
    <>
      {messages.map((message, index) => (
        <Banner key={index} {...message} close={close} />
      ))}
    </>
  )
}
