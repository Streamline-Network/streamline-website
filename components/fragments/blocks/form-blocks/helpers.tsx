import { FieldErrors, FieldValues } from 'react-hook-form'
import { FormInfo, Question } from '../block-types'

import { Checkbox } from 'components/fragments/blocks/form-blocks/checkboxes/checkboxes'
import blocks from '../blocks.module.scss'

export function getValue(question: Question, formInfo?: FormInfo) {
  if (!formInfo || !formInfo.answers) return

  for (const answer of Object.keys(formInfo.answers)) {
    if (answer === question.question) {
      const value = formInfo.answers[answer]
      if (typeof value === 'string') return value
    }
  }
}

export function getCheckboxValue(question: Question, formInfo?: FormInfo) {
  if (question.type === 'checkboxes') {
    if (!formInfo || !formInfo.answers) {
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

    return question.options.map(option => ({
      content: option,
      isChecked: false,
      required: false,
    }))
  }

  throw new Error('Unexpected inputs.')
}

export function renderError(errors: FieldErrors<FieldValues>, question: Question) {
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

export const isErrors = (errors: FieldErrors<FieldValues>) => Object.keys(errors).length !== 0

export const goToFirstError = (errors: FieldErrors<FieldValues>) => {
  let firstError: any = errors[Object.keys(errors)[0]]
  if (firstError) {
    while (firstError && !firstError.ref) {
      firstError = firstError[Object.keys(firstError)[0]]
    }
    const elem = firstError.ref as HTMLElement
    elem.focus()
  }
}
