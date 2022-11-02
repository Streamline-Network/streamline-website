import classnames from 'classnames'
import React from 'react'

export default function Block({ title, paragraphs, color }: BlockProps) {
  return (
    <div className={classnames('block column grid-row-span-2', color)}>
      <h2>{title}:</h2>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )
}

export interface BlockProps {
  title: string;
  paragraphs: React.ReactNode[];
  color: string;
}
