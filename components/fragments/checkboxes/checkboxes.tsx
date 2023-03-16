import { FieldValues, UseFormRegister } from 'react-hook-form'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import checkboxes from './checkboxes.module.scss'

export default function Checkboxes({
  groupName,
  direction,
  checkboxArray,
  onChangeCallback,
  register,
}: CheckboxesProps) {
  const [currentCheckboxes, setCurrentCheckboxes] = useState(checkboxArray)

  useEffect(() => {
    if (onChangeCallback) onChangeCallback(currentCheckboxes)
  }, [currentCheckboxes, onChangeCallback])

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
      {currentCheckboxes.map(({ content, isChecked, link, required }, i) => (
        <div className={checkboxes.checkboxesWrapper} key={i}>
          <div className={checkboxes.checkboxWrapper}>
            <input
              {...register(`${groupName}.${content}`, { required })}
              type="checkbox"
              id={content}
              onChangeCapture={e => {
                const currentStatus = e.currentTarget.checked

                setCurrentCheckboxes(() => {
                  const newArr = [...currentCheckboxes]
                  newArr[i].isChecked = currentStatus
                  return newArr
                })
              }}
            />

            {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </div>

          <label htmlFor={content}>
            {link ? (
              <Link target={'_blank'} href={link}>
                {content}
              </Link>
            ) : (
              content
            )}
          </label>
        </div>
      ))}
    </div>
  )
}

interface CheckboxesProps {
  groupName: string
  direction: 'vertical' | 'horizontal' | 'auto'
  checkboxArray: Checkbox[]
  register: UseFormRegister<FieldValues>
  onChangeCallback?: (updatedCheckboxes: Checkbox[]) => void
}

export type Checkbox = {
  content: string
  isChecked: boolean
  required: boolean

  link?: string
}
