import Checkboxes, { Checkbox } from '../checkboxes/checkboxes'
import { SetStateAction, useCallback, useEffect, useState } from 'react'

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
  const [checkboxes, setCheckboxes] = useState<Checkbox[][]>(getCheckboxes())
  const checkboxRefresh = useCallback(
    () => (updatedCheckboxes: Checkbox[]) => {
      console.log('Test')
      setCheckboxes([...checkboxes, updatedCheckboxes])
    },
    [checkboxes]
  )

  function getCheckboxes() {
    const allCheckboxes: Checkbox[][] = []

    for (const question of questions) {
      if (question.type === 'checkboxes') {
        const checkboxes: Checkbox[] = []

        for (const option of question.options) {
          checkboxes.push({ content: option, isChecked: false })
        }

        allCheckboxes.push(checkboxes)
      }
    }

    return allCheckboxes
  }

  useEffect(() => {
    console.log(checkboxes)
  }, [checkboxes])

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
      case 'checkboxes':
        return (
          <div>
            <Checkboxes
              direction={'auto'}
              checkboxArray={question.options.map(option => ({
                content: option,
                isChecked: false,
              }))}
              onChangeCallback={checkboxRefresh}
            />
          </div>
        )
      case 'minecraft-skin':
        return (
          <div className={blocks.minecraftSkinWrapper}>
            <div className={blocks.minecraftSkin} />
            <input className={blocks.input} placeholder={question.placeholderText} />
          </div>
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
      <div className={classNames(blocks.block, blocks.submitWrapper)}>
        {submit.agreements?.map(({ agreement, link, required }, i) => (
          <div className={blocks.checkboxWrapper} key={i}>
            <input type="checkbox" name={agreement} />
            {link ? (
              <span>
                <a target="_blank" rel="noreferrer" href={link}>
                  {agreement}
                </a>
              </span>
            ) : (
              <span>{agreement}</span>
            )}
            {(required === undefined || required !== false) && '*'}
          </div>
        ))}
        <button>Submit</button>
      </div>
    </div>
  )
}

interface BlockFormProps {
  numbered: boolean
  questions: Question[]
  autosaveCallback?: (formInfo: FormInfo) => void

  submit: {
    agreements?: { agreement: string; link?: string; required?: boolean }[]
    submitCallback: (formInfo: FormInfo) => void | FormError
  }
}

export type Question = {
  question: string
  description?: string
  required: boolean
} & (
  | { type: 'checkboxes' | 'multiple-choice'; options: string[] }
  | { type: 'short-answer' | 'paragraph' | 'minecraft-skin'; placeholderText?: string }
  | { type: 'button'; buttonText: string; buttonCallback: () => void | FormError }
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
