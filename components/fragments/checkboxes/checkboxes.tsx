import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useEffect, useState } from 'react'

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
            {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

            <input
              type="checkbox"
              name={content}
              onChange={() =>
                setCurrentCheckboxes(() => {
                  const newArr = [...currentCheckboxes]
                  newArr[i].isChecked = !isChecked
                  return newArr
                })
              }
            />
          </div>

          <label htmlFor={content}>{link ? <a href={link}>{content}</a> : content}</label>
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
