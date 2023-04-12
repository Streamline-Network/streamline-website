import Checkboxes, { Checkbox } from './checkboxes/checkboxes'
import { Checks, FormInfo, Section } from '../block-types'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { goToFirstError, isErrors } from './helpers'

import Input from './input'
import LoadingBar from './loading-bar'
import blocks from '../blocks.module.scss'
import classNames from 'classnames'

export default function FormBlocks({
  numbered = false,
  editable = true,
  sections,
  formInfo,
  submit,
  checks,
  save,
  error: [customError, setCustomError],
}: BlockFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()

  const [agreements, setAgreements] = useState<Checkbox[]>(
    submit.agreements
      ? submit.agreements.map(a => ({
          content: a.agreement,
          isChecked: false,
          required: true,
          link: a.link,
        }))
      : []
  )

  const onSubmit: SubmitHandler<FieldValues> = async (data: { [key: string]: string }) => {
    function getData(data: string) {
      if (typeof data === 'object') {
        return parseData(data)
      } else {
        return data
      }
    }

    function parseData(data: { [key: string]: string }) {
      setCustomError(undefined)

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

    save({ submissionTime: Date.now(), answers: parsedData })

    for (let i = 0; i < checks.length; i++) {
      const check = checks[i]
      const result = await check(parsedData)

      if (result) {
        return setCustomError(result)
      }
    }

    submit.final({ submissionTime: Date.now(), answers: parsedData })
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
                {
                  <Input
                    formInfo={formInfo}
                    clearErrors={clearErrors}
                    editable={editable}
                    errors={errors}
                    question={question}
                    register={register}
                    setError={setError}
                  />
                }
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
                checkboxArray={agreements}
                setCheckboxArray={setAgreements}
                direction={'auto'}
              />
            )}
            {isErrors(errors) ? (
              <button onClick={() => goToFirstError(errors)} type="button">
                Submit
              </button>
            ) : (
              <>
                <button disabled={isSubmitting} type="submit">
                  Submit
                </button>
                {isSubmitting && (
                  <div className={blocks.loadingBarWrapper}>
                    <LoadingBar />
                  </div>
                )}
              </>
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

export interface BlockFormProps {
  numbered?: boolean
  editable?: boolean
  sections: Section[]

  checks: Checks
  error: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]

  formInfo?: FormInfo

  submit: {
    agreements?: { agreement: string; link?: string; required?: boolean }[]
    final: (formInfo: FormInfo) => void
  }
  save: (formInfo: FormInfo) => void
}
