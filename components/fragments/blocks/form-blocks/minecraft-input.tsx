import { FieldValues, UseFormClearErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { ProfileBody } from 'pages/api/minecraft/profiles'
import { Question } from '../block-types'
import blocks from '../blocks.module.scss'
import customFetch from 'utils/fetch'

export default function MinecraftInput({
  state: register,
  question,
  editable = true,
  setError,
  clearErrors,
  defaultValue,
}: MinecraftInputProps) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [currentImage, setCurrentImage] = useState<string | false>(false)

  if (question.type !== 'minecraft-skin') throw new Error()

  const getSkin = useCallback(
    (name?: string) => {
      if (!name) {
        clearTimeout(timeoutRef.current)
        clearErrors(question.question)
        return setCurrentImage(false)
      }

      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(async () => {
        const { data: uuid } = await customFetch<{ uuid: string }, ProfileBody>(
          '/api/minecraft/profiles',
          'POST',
          { name }
        )

        if (!uuid.uuid) {
          setError(question.question, { type: 'invalid-mc-username' })
          return setCurrentImage(false)
        }

        clearErrors(question.question)
        setCurrentImage(uuid.uuid)
      }, 500)
    },
    [clearErrors, question.question, setError]
  )

  async function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    const name = e.currentTarget.value
    getSkin(name)
  }

  useEffect(() => {
    getSkin(defaultValue)
  }, [defaultValue, getSkin])

  return (
    <div className={blocks.minecraftSkinWrapper}>
      {currentImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ imageRendering: 'pixelated' }}
            className={blocks.minecraftSkin}
            src={`https://crafatar.com/avatars/${currentImage}/?overlay=true&size=50`}
            alt="A MC Skin"
            width={50}
            height={50}
          />
        </>
      ) : (
        <div className={blocks.minecraftSkin} />
      )}
      <>
        <input
          {...register(question.question, {
            required: question.required,
          })}
          onKeyUp={handleInput}
          className={blocks.input}
          placeholder={question.placeholderText || 'Answer here...'}
          disabled={!editable}
          type="text"
          defaultValue={editable ? defaultValue : undefined}
          value={!editable ? defaultValue : undefined}
        />
      </>
    </div>
  )
}

interface MinecraftInputProps {
  state: UseFormRegister<FieldValues>
  question: Question
  editable: boolean
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  defaultValue?: string
}
