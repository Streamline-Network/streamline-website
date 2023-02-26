import React from 'react'
import block from './tile-block.module.scss'
import classnames from 'classnames'

export default function TitleBlocks({ title, paragraphs, color, classes = [] }: BlockProps) {
  return (
    <section className={classnames(block.block, color, classes)}>
      <h2>{title}:</h2>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}

export interface BlockProps {
  title: string
  paragraphs: React.ReactNode[]
  color: string
  classes?: string[]
}
