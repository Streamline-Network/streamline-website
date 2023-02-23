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

  return (
    <div className={checkboxes.wrapper}>
      {currentCheckboxes.map(({ content, isChecked }, i) => (
        <div key={i}>
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
          <span>
            <MdCheckBox />
          </span>
          <span>
            <MdCheckBoxOutlineBlank />
          </span>
          <label htmlFor={content}>{content}</label>
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
}
