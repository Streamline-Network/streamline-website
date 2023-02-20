import { Dispatch, SetStateAction } from 'react'

import checkboxes from './checkboxes.module.scss'

export default function Checkboxes({
  direction,
  checkboxArray,
  checkedCheckboxes,
  setCheckedCheckboxes,
}: CheckboxesProps) {
  return (
    <div className={checkboxes.wrapper}>
      {checkboxArray.map((checkbox, i) => (
        <div key={i}>
          <input type="checkbox" name={checkbox} />
          <span></span>
          <span></span>
          <label htmlFor={checkbox}>{checkbox}</label>
        </div>
      ))}
    </div>
  )
}

interface CheckboxesProps {
  direction: 'vertical' | 'horizontal' | 'auto'
  checkboxArray: string[]
  checkedCheckboxes: string[]
  setCheckedCheckboxes: Dispatch<SetStateAction<string[]>>
  onChangeCallback: (selected: string[]) => void
}
