import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  useForm,
} from 'react-hook-form'
import { FormError, FormInfo, Question } from './block-types'
import { KeyboardEvent, useRef, useState } from 'react'

import Checkboxes from '../checkboxes/checkboxes'
import Image from 'next/image'
import blocks from './blocks.module.scss'
import classNames from 'classnames'

function MinecraftSkin({
  state: register,
  question,
  setError,
  clearErrors,
}: {
  state: UseFormRegister<FieldValues>
  question: Question
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
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
      const uuid = (await (
        await fetch('/api/minecraft/profiles', {
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
      ).json()) as { uuid?: string }

      if (!uuid.uuid) {
        setError(question.question, { type: 'invalid-mc-username' })
        return setCurrentImage(false)
      }

      clearErrors(question.question)
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
  if (errors[question.question] === undefined) return

  switch (errors[question.question]!.type) {
    case 'required': {
      return <span className={blocks.error}>This question is required!</span>
    }
    case 'invalid-mc-username': {
      return <span className={blocks.error}>Minecraft account not found.</span>
    }
    default:
      return <span className={blocks.error}>Invalid input.</span>
  }
}

export default function FormBlocks({ numbered, questions, submit }: BlockFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()

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
          <>
            <Checkboxes
              groupName={question.question}
              register={register}
              direction={'auto'}
              checkboxArray={question.options.map(option => ({
                content: option,
                isChecked: false,
                required: false,
              }))}
            />
            {generateError(errors, question)}
          </>
        )
      }
      case 'minecraft-skin': {
        return (
          <>
            <MinecraftSkin
              state={register}
              question={question}
              setError={setError}
              clearErrors={clearErrors}
            />
            {generateError(errors, question)}
          </>
        )
      }
      default: {
        throw new Error('Unexpected question type!')
      }
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data)
  }

  const isErrors = () => Object.keys(errors).length !== 0

  const goToFirstError = () => {
    let firstError: any = errors[Object.keys(errors)[0]]
    if (firstError) {
      while (firstError && !firstError.ref) {
        firstError = firstError[Object.keys(firstError)[0]]
        console.log(firstError)
      }
      const elem = firstError.ref as HTMLElement
      elem.focus()
    }
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
      <div className={classNames(blocks.block)}>
        <div className={blocks.submitWrapper}>
          {submit.agreements && (
            <Checkboxes
              groupName={'agreements'}
              register={register}
              checkboxArray={submit.agreements.map(a => ({
                content: a.agreement,
                isChecked: false,
                required: true,
              }))}
              direction={'auto'}
              onChangeCallback={() => {}}
            />
          )}
          {isErrors() ? (
            <button onClick={goToFirstError} type="button">
              Submit
            </button>
          ) : (
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          )}
        </div>
        {errors['agreements'] && (
          <span className={blocks.error}>You must accept the agreements.</span>
        )}
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
