import classnames from 'classnames'
import question from './question.module.scss'

export default function Question({ answer, color, question: q }: QuestionProps) {
  return (
    <details className={classnames(question.block, color)}>
      <summary>{q}</summary>
      <p>{answer}</p>
    </details>
  )
}

export interface QuestionProps {
  question: string
  answer: React.ReactNode
  color: string
}
