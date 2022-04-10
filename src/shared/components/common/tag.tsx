import React, { useState } from "react"

interface TagProps {
  name: string
  id: number
  onChange: (id?: number) => void
}

const Tag = ({ name, onChange, id }: TagProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOnClick = () => {
    if (open) {
      setOpen(false)
      onChange()
    } else {
      setOpen(true)
      onChange(id)
    }
  }
  return (
    <span onClick={handleOnClick} className={`tag ${open ? "tag-active" : ""}`}>
      {name}
    </span>
  )
}

export default Tag
