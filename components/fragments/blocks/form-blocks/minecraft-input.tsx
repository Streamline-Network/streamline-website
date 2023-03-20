import { FieldValues, UseFormClearErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { KeyboardEvent, useRef, useState } from 'react'

import Image from 'next/image'
import { Question } from '../block-types'
import blocks from '../blocks.module.scss'

export default function MinecraftInput({
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
      clearErrors(question.question)
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
          {...register(question.question, {
            required: question.required,
          })}
          onKeyUp={handleInput}
          className={blocks.input}
          placeholder={question.placeholderText || 'Answer here...'}
        />
      </>
    </div>
  )
}
