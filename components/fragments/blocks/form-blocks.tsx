import Checkboxes, { Checkbox } from '../checkboxes/checkboxes'
import {
  FieldErrors,
  FieldValues,
  Resolver,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

import Image from 'next/image'
import blocks from './blocks.module.scss'
import classNames from 'classnames'

function MinecraftSkin({
  state: { register, errors },
  question,
}: {
  state: { register: UseFormRegister<FieldValues>; errors: FieldErrors<FieldValues> }
  question: Question
}) {
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
      <>
        <input
          {...register(question.question, { required: question.required })}
          onKeyUp={handleInput}
          className={blocks.input}
          placeholder={question.placeholderText}
        />
      </>
    </div>
  )
}

function generateError(errors: FieldErrors<FieldValues>, question: Question) {
  console.log(errors[question.question]?.type)

  return errors[question.question] && <span>This question is required!</span>
}

export default function FormBlocks({ numbered, questions, submit }: BlockFormProps) {
  const [checkboxes, setCheckboxes] = useState<Checkbox[][]>(getCheckboxes())
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
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

  // const resolver: Resolver<FormValues> = async (values) => {
  //   return {
  //     values: values. ? values : {},
  //     errors: !values.firstName
  //       ? {
  //           firstName: {
  //             type: 'required',
  //             message: 'This is required.',
  //           },
  //         }
  //       : {},
  //   };
  // };

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
          <>
            <input
              {...register(question.question, { required: question.required })}
              className={blocks.input}
              placeholder={question.placeholderText || 'Answer here...'}
            />
            {generateError(errors, question)}
          </>
        )
      }
      case 'paragraph': {
        return (
          <>
            <textarea
              {...register(question.question, { required: question.required })}
              className={classNames(blocks.input, blocks.textarea)}
              placeholder={question.placeholderText || 'Answer here...'}
            />
            {generateError(errors, question)}
          </>
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
        return (
          <>
            <MinecraftSkin state={{ register, errors }} question={question} />
            {generateError(errors, question)}
          </>
        )
      }
    }

    return <p>{question.type}</p>
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={blocks.wrapper}>
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
        <button type="submit">Submit</button>
      </div>
    </form>
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
