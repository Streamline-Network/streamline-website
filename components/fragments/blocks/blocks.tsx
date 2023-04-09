import { Block } from './block-types'
import blocks from './blocks.module.scss'

export default function Blocks({ blockArr }: BlockProps) {
  return (
    <div className={blocks.wrapper}>
      {blockArr.map((item, i) => (
        <div className={blocks.block} key={i}>
          <h3 className={blocks.title}>{item.title}</h3>

          {item.paragraphs.map((paragraph, i) => {
            return <div key={i}>{paragraph}</div>
          })}
        </div>
      ))}
    </div>
  )
}

interface BlockProps {
  blockArr: Block[]
}
