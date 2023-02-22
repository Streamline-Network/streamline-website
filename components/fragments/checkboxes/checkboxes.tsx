import { Dispatch, SetStateAction } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import checkboxes from './checkboxes.module.scss'

export default function Checkboxes({
  direction,
  checkboxArray,
  setCheckboxArray,
}: CheckboxesProps) {
  return (
    <div className={checkboxes.wrapper}>
      {checkboxArray.map(({ content, isChecked }, i) => (
        <div key={i}>
          <input type="checkbox" name={content} />
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
  setCheckboxArray: Dispatch<SetStateAction<Checkbox[]>>
}

export type Checkbox = {
  content: string
  isChecked: boolean
}
