import { FieldValues, UseFormRegister } from 'react-hook-form'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import checkboxes from './checkboxes.module.scss'

export default function Checkboxes({
  groupName,
  direction,
  editable = true,
  checkboxArray,
  setCheckboxArray,
  onChangeCallback,
  register,
}: CheckboxesProps) {
  useEffect(() => {
    if (onChangeCallback) onChangeCallback(checkboxArray)
  }, [checkboxArray, onChangeCallback])

  function getDirection() {
    switch (direction) {
      case 'auto':
        return checkboxes.wrapperAuto
      case 'horizontal':
        return checkboxes.wrapperHorizontal
      case 'vertical':
        return checkboxes.wrapperVertical
    }
  }

  return (
    <div className={getDirection()}>
      {checkboxArray.map(({ content, isChecked, link, required }, i) => {
        const encodedContent = Buffer.from(content).toString('base64')

        return (
          <div className={checkboxes.checkboxesWrapper} key={i}>
            <div className={checkboxes.checkboxWrapper}>
              <input
                {...register(`${groupName}.${encodedContent}`, { required })}
                type="checkbox"
                id={content}
                disabled={!editable}
                defaultChecked={editable ? isChecked : undefined}
                checked={!editable ? isChecked : undefined}
                onChangeCapture={e => {
                  const currentStatus = e.currentTarget.checked

                  setCheckboxArray(() => {
                    const newArr = [...checkboxArray]
                    newArr[i].isChecked = currentStatus
                    return newArr
                  })
                }}
              />

              {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </div>

            <label htmlFor={content}>
              {link ? (
                <Link className={checkboxes.link} target={'_blank'} href={link}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export interface CheckboxesProps {
  groupName: string
  direction: 'vertical' | 'horizontal' | 'auto'
  checkboxArray: Checkbox[]
  setCheckboxArray: React.Dispatch<React.SetStateAction<Checkbox[]>>
  register: UseFormRegister<FieldValues>
  onChangeCallback?: (updatedCheckboxes: Checkbox[]) => void
  editable?: boolean
}

export type Checkbox = {
  content: string
  isChecked: boolean
  required: boolean

  link?: string
}
