import Banner, { BannerProps } from './banner/banner'
import { useEffect, useRef, useState } from 'react'

const LS_KEY = 'closedBannerIds'

export default function Banners() {
  const [messages, setMessages] = useState<Messages>([])
  const existingAndClosedIdsRef = useRef<string[]>([])

  type Messages = Omit<BannerProps, 'close' | 'index'>[]

  const getOrSetLS = (item?: string[]): string[] => {
    return item
      ? localStorage.setItem(LS_KEY, JSON.stringify(item))
      : JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  }

  useEffect(() => {
    const banners = [
      {
        message: 'We are now accepting new people! Season 4 starts November 11th.',
        id: 'Season 4 Accepting',
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
