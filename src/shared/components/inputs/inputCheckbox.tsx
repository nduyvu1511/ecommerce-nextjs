import { BsCheck } from "react-icons/bs"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
}

export const InputCheckbox = ({ onCheck, isChecked }: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`input__checkbox ${isChecked ? "input__checkbox-active" : ""}`}
    >
      {isChecked ? <BsCheck /> : null}
    </span>
  )
}
