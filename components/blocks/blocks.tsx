import blocks from './blocks.module.scss'
import classNames from 'classnames'

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
  function control(block: BlockToggle) {
    switch (block.controlType) {
      case 'button':
        return <button onClick={block.click}>{block.buttonText}</button>
      case 'switch':
        return <>Switch code goes here!</>
      case 'message':
        return <p>{block.message}</p>
      default:
        throw new Error('Unexpected control type!')
    }
  }

  return (
    <div className={classNames(blocks.wrapper, blocks.blockToggle)}>
      {blockArr.map((block, i) => (
        <div className={blocks.block} key={i}>
          <h3 className={blocks.title}>{block.title}</h3>

          <span className={blocks.description}>{block.description}</span>

          {control(block)}
        </div>
      ))}
    </div>
  )
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
  | { controlType: 'button'; buttonText: string; click: () => void }
  | { controlType: 'switch'; toggleOn: () => void; toggleOff: () => void }
  | { controlType: 'message'; message: string }
)

export interface Block {
  title: string
  paragraphs: React.ReactNode[]
}
