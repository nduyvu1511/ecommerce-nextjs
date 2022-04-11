import React, { useState } from "react"

interface TagProps {
  name: string
  id: number
  onChange?: (id?: number) => void
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export const Tag = ({
  name,
  onChange,
  id,
  size = "lg",
  disabled = false,
}: TagProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOnClick = () => {
    if (open) {
      setOpen(false)
      onChange && onChange()
    } else {
      setOpen(true)
      onChange && onChange(id)
    }
  }
  return (
    <span
      onClick={handleOnClick}
      className={`tag ${open ? "tag-active" : ""} tag-${size} ${
        disabled ? "tag-disabled" : ""
      }`}
    >
      {name}
    </span>
  )
}
