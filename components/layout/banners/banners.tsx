import Banner, { BannerProps } from './banner/banner'
import { useEffect, useRef, useState } from 'react'

export const LS_KEY = 'closedBannerIds'

export default function Banners() {
  const [messages, setMessages] = useState<Messages>([])
  const existingAndClosedIdsRef = useRef<string[]>([])

  type Messages = Omit<BannerProps, 'close' | 'index'>[]

  const getOrSetLS = (item?: string[]) => {
    return (
      item
        ? localStorage.setItem(LS_KEY, JSON.stringify(item))
        : JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    ) as string[]
  }

  useEffect(() => {
    const banners = [
      {
        message: 'Season 4 is live! Join now!',
        id: 'Season 4 is live',
      },
    ]

    const existingIds = banners.map(({ id }) => id)
    const closedIds = getOrSetLS()
    existingAndClosedIdsRef.current = closedIds.filter(id => existingIds.includes(id))
    const bannersToDisplay = banners.filter(banner => !closedIds.includes(banner.id))

    setMessages(bannersToDisplay)
  }, [])

  const close = (id: string) => {
    setMessages(messages => [...messages.filter(message => message.id !== id)])
    getOrSetLS([...existingAndClosedIdsRef.current, id])
  }

  return (
    <>
      {messages.map((message, index) => (
        <Banner key={index} {...message} close={close} />
      ))}
    </>
  )
}
