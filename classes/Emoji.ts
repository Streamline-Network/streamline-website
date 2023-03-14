import { EmojiData } from './../components/page-effects/celebration'

export default class Emoji {
  cords: { x: number; y: number }
  speed: number
  angle: number
  rotation: number
  emoji: string
  // interval: NodeJS.Timeout
  id: string

  constructor(
    startCords: { x: number; y: number },
    speed: number,
    angle: number,
    rotation: number,
    emoji: string,
    id: string
  ) {
    this.cords = startCords
    this.speed = speed
    this.angle = angle
    this.rotation = rotation
    this.emoji = emoji
    this.id = id
  }

  create(
    createEmoji: ({}: EmojiData) => void,
    updateEmoji: ({}: EmojiData) => void
  ) {
    createEmoji({
      cords: this.cords,
      rotation: this.rotation,
      emoji: this.emoji,
      id: this.id,
    })

    setInterval(() => {
      this.cords.y += this.speed
      updateEmoji({
        cords: this.cords,
        rotation: this.rotation,
        emoji: this.emoji,
        id: this.id,
      })
    }, 50)
  }
}
