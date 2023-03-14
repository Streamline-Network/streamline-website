import { useCallback, useEffect, useRef, useState } from 'react'

import Emoji from 'classes/Emoji'
import celebration from './page-effects.module.scss'
import { random } from 'utils/misc'

const EMOJIS = [
  '🥳',
  '🎉',
  '🎊',
  '🎁',
  '🎈',
  '😍',
  '🤩',
  '✌',
  '🤘',
  '🤟',
  '👍',
  '🙌',
  '👏',
  '🍰',
  '🎂',
  '🍭',
  '🍸',
  '🍾',
  '👑',
]

export default function Celebration() {
  const mainIntervalRef = useRef<NodeJS.Timer>()
  const [allEmojis, setAllEmojis] = useState<EmojiData[]>([])

  useEffect(() => {
    const createEmoji = (data: EmojiData) => {
      setAllEmojis(allEmojis => [...allEmojis, data])
    }

    const updateEmoji = (data: EmojiData) => {
      const index = allEmojis.findIndex(emoji => emoji.id === data.id)
      const updatedEmojis = [...allEmojis]
      updatedEmojis[index] = data
      setAllEmojis(updatedEmojis)
    }

    mainIntervalRef.current = setInterval(() => {
      console.log('update')
      const testEmoji = new Emoji(
        { x: random(0, window.innerWidth), y: 20 },
        5,
        0,
        0,
        EMOJIS[random(0, EMOJIS.length - 1)],
        crypto.randomUUID()
      )

      testEmoji.create(createEmoji, updateEmoji)
    }, 500)

    return () => {
      clearInterval(mainIntervalRef.current)
    }
  }, [allEmojis])

  return (
    <div className={celebration.wrapper}>
      {allEmojis.map((emoji, i) => (
        <span id={emoji.id} style={{ left: emoji.cords.x, top: emoji.cords.y }} key={i}>
          {emoji.emoji}
        </span>
      ))}
    </div>
  )
}

export type EmojiData = {
  cords: { x: number; y: number }
  rotation: number
  emoji: string
  id: string
}
