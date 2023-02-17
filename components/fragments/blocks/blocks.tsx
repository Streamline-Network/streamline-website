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

interface BlockProps {
  blockArr: Block[]
}

export interface Block {
  title: string
  paragraphs: React.ReactNode[]
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

export function BlockForm({ numbered, questions, submit }: BlockFormProps) {
  function input(question: Question) {
    switch (question.type) {
      case 'short-answer':
        return (
          <input
            className={blocks.input}
            placeholder={question.placeholderText || 'Answer here...'}
          />
        )
      case 'paragraph':
        return (
          <textarea
            className={classNames(blocks.input, blocks.textarea)}
            placeholder={question.placeholderText || 'Answer here...'}
          />
        )
    }

    return <p>{question.type}</p>
  }

  return (
    <div className={blocks.wrapper}>
      {questions.map((question, i) => (
        <div className={blocks.block} key={i}>
          <div className={blocks.questionWrapper}>
            <h3 className={blocks.title}>{(numbered ? `${i + 1}. ` : '') + question.question}</h3>
            {question.required && <span>required</span>}
          </div>

          {question.description && <p>{question.description}</p>}
          {input(question)}
        </div>
      ))}
    </div>
  )
}

interface BlockFormProps {
  numbered: boolean
  questions: Question[]
  autosaveCallback?: (formInfo: FormInfo) => void

  submit: {
    agreements?: { agreement: string; link?: string; required?: boolean }[]
    submitCallback: (formInfo: FormInfo) => void | Error
  }
}

export type Question = {
  question: string
  description?: string
  required: boolean
} & (
  | { type: 'checkboxes' | 'multiple-choice'; options: string[] }
  | { type: 'short-answer' | 'paragraph' | 'minecraft-skin'; placeholderText?: string }
)

export type FormInfo = {
  submissionTime: number
  lastUpdate: number
  answers: {
    question: Question
    answer?: string | string[]
  }[]
}

export type FormError = {
  message: string
  question?: Question
}
