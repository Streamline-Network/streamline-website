import blocks from './blocks.module.scss'
import classNames from 'classnames'

export default function LimitedTable({ labels, rows }: LimitedTableProps) {
  return (
    <div className={blocks.tableWrapper}>
      <div className={blocks.labels}>
        <span>{labels.start}</span>
        <span>{labels.content}</span>
        <span>{labels.end}</span>
      </div>
      <div className={blocks.wrapper}>
        {rows.map((row, i) => (
          <div className={classNames(blocks.block, blocks.tableRow)} key={i}>
            <span className={blocks.start}>{row.start}</span>
            <span className={blocks.tableContent}>{row.content}</span>
            <span className={blocks.end}>{row.end}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface LimitedTableProps {
  labels: {
    start: string
    content: string
    end: string
  }

  rows: TableRow[]
}

export type TableRow = {
  start: string
  content: string
  end: string
}
