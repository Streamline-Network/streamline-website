import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form'
import { FormInfo, Question } from '../block-types'
import { getCheckboxValue, getValue, renderError } from './helpers'

import Checkboxes from 'components/fragments/checkboxes/checkboxes'
import Link from 'next/link'
import MinecraftInput from './minecraft-input'
import blocks from '../blocks.module.scss'
import classNames from 'classnames'

export default function Input({
  question,
  register,
  editable,
  formInfo,
  errors,
  setError,
  clearErrors,
}: InputProps) {
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
      return <p>Oh no there was an error!</p>
    }
  }
}

interface InputProps {
  question: Question
  register: UseFormRegister<FieldValues>
  formInfo?: FormInfo
  editable: boolean
  errors: FieldErrors<FieldValues>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}
