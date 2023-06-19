import Checkboxes, {
  Checkbox,
  CheckboxesProps,
} from 'components/fragments/blocks/form-blocks/checkboxes/checkboxes'
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form'
import { FormInfo, Question } from '../block-types'
import { getCheckboxValue, getValue, renderError } from './helpers'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    function removeScroll() {
      if (!document.activeElement) return
      const activeElement = document.activeElement as HTMLInputElement

      if ('type' in activeElement) {
        if (activeElement.type === 'number') {
          activeElement.blur()
        }
      }
    }

    document.addEventListener('wheel', removeScroll)

    return () => document.removeEventListener('wheel', removeScroll)
  })

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
            defaultValue={editable ? getValue(question, formInfo) : undefined}
            type="text"
            value={!editable ? getValue(question, formInfo) : undefined}
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
            defaultValue={editable ? getValue(question, formInfo) : undefined}
            value={!editable ? getValue(question, formInfo) : undefined}
          />
          {renderError(errors, encodedQuestion)}
        </>
      )
    }
    case 'checkboxes': {
      const value = getCheckboxValue(question, formInfo)

      return (
        <>
          <CheckboxWrapper
            groupName={encodedQuestion.question}
            register={register}
            direction={'auto'}
            editable={editable}
            array={value}
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
              className={blocks.diffButton}
              type="button">
              {question.buttonText}
            </Link>
          )}
          {renderError(errors, encodedQuestion)}
        </>
      )
    }
    case 'number': {
      return (
        <>
          <input
            {...register(encodedQuestion.question, {
              required: question.required,
            })}
            className={blocks.input}
            type="number"
            placeholder={question.placeholderText || 'Answer here...'}
            disabled={!editable}
            defaultValue={editable ? getValue(question, formInfo) : undefined}
            value={!editable ? getValue(question, formInfo) : undefined}
          />
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

function CheckboxWrapper(
  props: Omit<CheckboxesProps, 'setCheckboxArray' | 'checkboxArray'> & { array: Checkbox[] }
) {
  const [checkboxArray, setCheckboxArray] = useState(props.array)

  useEffect(() => {
    if (!props.editable) {
      setCheckboxArray(props.array)
    }
  }, [props.array, props.editable])

  return <Checkboxes {...props} checkboxArray={checkboxArray} setCheckboxArray={setCheckboxArray} />
}
