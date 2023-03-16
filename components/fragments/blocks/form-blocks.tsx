import {
  FieldErrors,
  FieldValues,
  Resolver,
  SubmitHandler,
  UseFormRegister,
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
}: {
  state: UseFormRegister<FieldValues>
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
  //! console.log(errors[question.question]?.type)

  return (
    errors[question.question] && <span className={blocks.error}>This question is required!</span>
  )
}

type FormValues = {
  [key: string]: string
}

const resolver: Resolver<FormValues> = async values => {
  console.log(values)
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  }
}

export default function FormBlocks({ numbered, questions, submit }: BlockFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  watch(values => console.log(values))

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
            <MinecraftSkin state={register} question={question} />
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
          <button type="submit">Submit</button>
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
