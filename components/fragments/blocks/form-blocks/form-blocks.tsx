import Checkboxes, { Checkbox } from '../../checkboxes/checkboxes'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { FieldErrors, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormInfo, Question, Section } from '../block-types'

import Link from 'next/link'
import MinecraftInput from './minecraft-input'
import blocks from '../blocks.module.scss'
import classNames from 'classnames'

export default function FormBlocks({
  numbered = false,
  editable = true,
  sections,
  formInfo,
  submit,
  checks,
  error: [customError, setCustomError],
}: BlockFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()

  function renderError(errors: FieldErrors<FieldValues>, question: Question) {
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

  function getValue(question: Question, formInfo?: FormInfo) {
    if (!formInfo) return

    for (const answer of Object.keys(formInfo.answers)) {
      if (answer === question.question) {
        const value = formInfo.answers[answer]
        if (typeof value === 'string') return value
      }
    }
  }

  function getCheckboxValue(question: Question, formInfo?: FormInfo) {
    if (question.type === 'checkboxes') {
      if (!formInfo) {
        return question.options.map(option => ({
          content: option,
          isChecked: false,
          required: false,
        }))
      }

      for (const answer of Object.keys(formInfo.answers)) {
        if (answer === question.question) {
          const value = formInfo.answers[answer]
          if (typeof value === 'object') {
            const checkboxArray: Checkbox[] = []
            for (const option of Object.keys(value)) {
              checkboxArray.push({ content: option, isChecked: value[option], required: false })
            }
            return checkboxArray
          }
        }
      }
    }

    throw new Error('Unexpected inputs.')
  }

  function input(question: Question) {
    const encodedQuestion = {
      ...question,
      question: Buffer.from(question.question).toString('base64'),
    }

    switch (question.type) {
      case 'short-answer': {
        return (
          <>
            <input
              {...register(encodedQuestion.question, {
                required: question.required,
              })}
              className={blocks.input}
              placeholder={question.placeholderText || 'Answer here...'}
              disabled={!editable}
              defaultValue={getValue(question, formInfo)}
            />
            {renderError(errors, encodedQuestion)}
          </>
        )
      }
      case 'paragraph': {
        return (
          <>
            <textarea
              {...register(encodedQuestion.question, { required: question.required })}
              className={classNames(blocks.input, blocks.textarea)}
              placeholder={question.placeholderText || 'Answer here...'}
              disabled={!editable}
              defaultValue={getValue(question, formInfo)}
            />
            {renderError(errors, encodedQuestion)}
          </>
        )
      }
      case 'checkboxes': {
        const value = getCheckboxValue(question, formInfo)
        console.log(value)

        return (
          <>
            <Checkboxes
              groupName={encodedQuestion.question}
              register={register}
              direction={'auto'}
              editable={editable}
              checkboxArray={value}
            />
            {renderError(errors, encodedQuestion)}
          </>
        )
      }
      case 'minecraft-skin': {
        return (
          <>
            <MinecraftInput
              state={register}
              question={encodedQuestion}
              setError={setError}
              clearErrors={clearErrors}
              editable={editable}
              defaultValue={getValue(question, formInfo)}
            />
            {renderError(errors, encodedQuestion)}
          </>
        )
      }
      case 'button': {
        return (
          <>
            {editable && (
              <Link
                style={{ display: 'block', width: '100%' }}
                {...register(encodedQuestion.question)}
                href={question.link}
                target={'_blank'}
                referrerPolicy={'no-referrer'}
                className={blocks.button}
                type="button">
                {question.buttonText}
              </Link>
            )}
            {renderError(errors, encodedQuestion)}
          </>
        )
      }
      default: {
        console.warn('Input type not recognized!')
      }
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data: { [key: string]: string }) => {
    function getData(data: string) {
      if (typeof data === 'object') {
        return parseData(data)
      } else {
        return data
      }
    }

    function parseData(data: { [key: string]: string }) {
      let parsedData = {}
      for (const question of Object.keys(data)) {
        if (question === 'agreements') {
          parsedData = {
            ...parsedData,
            [question]: getData(data[question]),
          }
        } else {
          parsedData = {
            ...parsedData,
            [Buffer.from(question, 'base64').toString('utf8')]: getData(data[question]),
          }
        }
      }

      return parsedData
    }

    const parsedData = parseData(data)

    for (const check of checks) {
      const result = check(parsedData)
      if (result) return setCustomError(result)
    }

    setCustomError(undefined)

    submit.submitCallback({ submissionTime: Date.now(), answers: parsedData })
  }

  const isErrors = () => Object.keys(errors).length !== 0

  const goToFirstError = () => {
    let firstError: any = errors[Object.keys(errors)[0]]
    if (firstError) {
      while (firstError && !firstError.ref) {
        firstError = firstError[Object.keys(firstError)[0]]
      }
      const elem = firstError.ref as HTMLElement
      elem.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={blocks.wrapper}>
      {sections.map(({ sectionTitle, description, questions }, sectionIndex) => (
        <Fragment key={sectionIndex}>
          <div className={classNames(blocks.block, blocks.sectionWrapper)}>
            <h3 className={blocks.title}>
              {numbered ? `${String.fromCharCode(sectionIndex + 65)}: ` : ''}
              {sectionTitle}
            </h3>
            {description && <p>{description}</p>}
          </div>
          {questions.map((question, i) => {
            return (
              <div className={blocks.block} key={i}>
                <div className={blocks.questionWrapper}>
                  <h3 className={blocks.title}>
                    {(numbered ? `${String.fromCharCode(sectionIndex + 65)}${i + 1}. ` : '') +
                      question.question}
                  </h3>
                  {!question.required && <span>optional</span>}
                </div>

                {question.description && <p>{question.description}</p>}
                {input(question)}
              </div>
            )
          })}
        </Fragment>
      ))}
      {editable && (
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
          {customError && <span className={blocks.error}>{customError}</span>}
        </div>
      )}
    </form>
  )
}

interface BlockFormProps {
  numbered?: boolean
  editable?: boolean
  sections: Section[]
  checks: ((answers: { [key: string]: string }) => string | undefined)[]
  error: [string | undefined, Dispatch<SetStateAction<string | undefined>>]

  formInfo?: FormInfo

  submit: {
    agreements?: { agreement: string; link?: string; required?: boolean }[]
    submitCallback: (formInfo: FormInfo) => void
  }
}
