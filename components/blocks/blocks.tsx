import blocks from './blocks.module.scss'

export default function Blocks({ blockArr }: BlockProps) {
  return (
    <div className={blocks.wrapper}>
      {blockArr.map((item, i) => (
        <div className={blocks.block} key={i}>
          <h3 className={blocks.title}>{item.title}</h3>

          {item.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

export function BlockToggles({ blockArr }: BlockToggleProps) {
  return <h1>Controls go here</h1>
}

interface BlockProps {
  blockArr: Block[]
}

interface BlockToggleProps {
  blockArr: BlockToggle[]
}

export type BlockToggle = {
  title: string
  description?: string
} & (
  | { toggleType: 'button'; click: () => void }
  | { toggleType: 'switch'; toggleOn: () => void; toggleOff: () => void }
)

export interface Block {
  title: string
  paragraphs: React.ReactNode[]
}
