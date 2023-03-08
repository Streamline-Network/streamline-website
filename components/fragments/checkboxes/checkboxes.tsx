import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import checkboxes from './checkboxes.module.scss'

export default function Checkboxes({
  direction,
  checkboxArray,
  onChangeCallback,
}: CheckboxesProps) {
  const [currentCheckboxes, setCurrentCheckboxes] = useState(checkboxArray)

  useEffect(() => {
    onChangeCallback(currentCheckboxes)
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
      {currentCheckboxes.map(({ content, isChecked, link }, i) => (
        <div className={checkboxes.checkboxesWrapper} key={i}>
          <div className={checkboxes.checkboxWrapper}>
            <input
              type="checkbox"
              name={content}
              id={content}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setCurrentCheckboxes(() => {
                    const newArr = [...currentCheckboxes]
                    newArr[i].isChecked = !isChecked
                    return newArr
                  })
                }
              }}
              onClick={() => {
                setCurrentCheckboxes(() => {
                  const newArr = [...currentCheckboxes]
                  newArr[i].isChecked = !isChecked
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
  direction: 'vertical' | 'horizontal' | 'auto'
  checkboxArray: Checkbox[]
  onChangeCallback: (updatedCheckboxes: Checkbox[]) => void
}

export type Checkbox = {
  content: string
  isChecked: boolean

  link?: string
}
