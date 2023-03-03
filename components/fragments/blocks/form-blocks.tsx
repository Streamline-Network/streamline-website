import Checkboxes, { Checkbox } from '../checkboxes/checkboxes'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

import Image from 'next/image'
import blocks from './blocks.module.scss'
import classNames from 'classnames'

function MinecraftSkin({ question }: { question: Question }) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [currentImage, setCurrentImage] = useState<string | false>(false)

  if (question.type !== 'minecraft-skin') throw new Error()

  async function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    const name = e.currentTarget.value
    if (!name) {
      clearTimeout(timeoutRef.current)
      return setCurrentImage(false)
    }
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const uuid = await (
        await fetch('/api/minecraft/profiles', {
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
      ).json()

      if (uuid.error) return setCurrentImage(false)

      setCurrentImage(uuid.uuid)
    }, 500)
  }

  return (
    <div className={blocks.minecraftSkinWrapper}>
      {currentImage ? (
        <Image
          className={blocks.minecraftSkin}
          src={`https://crafatar.com/avatars/${currentImage}/?overlay`}
          alt="A MC Skin"
          width={50}
          height={50}
        />
      ) : (
        <div className={blocks.minecraftSkin} />
      )}
      <input
        onKeyUp={handleInput}
        className={blocks.input}
        placeholder={question.placeholderText}
      />
    </div>
  )
}

export default function FormBlocks({ numbered, questions, submit }: BlockFormProps) {
  const [checkboxes, setCheckboxes] = useState<Checkbox[][]>(getCheckboxes())
  const checkboxRefresh = useCallback(
    () => (updatedCheckboxes: Checkbox[]) => {
      setCheckboxes([...checkboxes, updatedCheckboxes])
    },
    [checkboxes]
  )
  const [agreements, setAgreements] = useState<Checkbox[] | undefined>(
    submit.agreements?.map(agreement => ({
      content: agreement.agreement,
      link: agreement.link,
      isChecked: false,
    }))
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

  function input(question: Question) {
    switch (question.type) {
      case 'short-answer': {
        return (
          <input
            className={blocks.input}
            placeholder={question.placeholderText || 'Answer here...'}
          />
        )
      }
      case 'paragraph': {
        return (
          <textarea
            className={classNames(blocks.input, blocks.textarea)}
            placeholder={question.placeholderText || 'Answer here...'}
          />
        )
      }
      case 'checkboxes': {
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
      }
      case 'minecraft-skin': {
        return <MinecraftSkin question={question} />
      }
    }

    return <p>{question.type}</p>
  }

  return (
    <div className={blocks.wrapper}>
      {questions.map((question, i) => (
        <div className={blocks.block} key={i}>
          <div className={blocks.questionWrapper}>
            <h3 className={blocks.title}>{(numbered ? `${i + 1}. ` : '') + question.question}</h3>
            {!question.required && <span>optional</span>}
          </div>

          {question.description && <p>{question.description}</p>}
          {input(question)}
        </div>
      ))}
      <div className={classNames(blocks.block, blocks.submitWrapper)}>
        {agreements && (
          <Checkboxes
            checkboxArray={agreements}
            direction={'auto'}
            onChangeCallback={setAgreements}
          />
        )}
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
