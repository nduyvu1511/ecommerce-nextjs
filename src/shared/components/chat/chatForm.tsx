import { RootState } from "@/core/store"
import React, { useEffect, useRef } from "react"
import { MdOutlineInsertPhoto, MdSend } from "react-icons/md"
import { RiLoader2Fill } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useInputText } from "shared/hook"

interface ChatFormProps {
  onSubmit: (val: string) => void
  isSending?: boolean
}

export const ChatForm = ({ onSubmit, isSending }: ChatFormProps) => {
  const { value, onChange, clearValue } = useInputText("")
  const { currentChannel } = useSelector((state: RootState) => state.chat)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [currentChannel?.channel_id])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!value) return
        onSubmit && onSubmit(value)
        clearValue()
      }}
      className="chat__form"
    >
      <input type="file" hidden name="" id="input-file" />
      <label htmlFor="input-file" className="btn-reset chat__form-image-button">
        <MdOutlineInsertPhoto />
      </label>
      <div className="chat__form-input">
        <input ref={inputRef} value={value} onChange={onChange} type="text" />
        <button type="submit" className="btn-reset">
          {!isSending ? (
            <MdSend
              className={`chat__form-input-icon ${
                value ? "chat__form-input-icon-active" : ""
              }`}
            />
          ) : (
            <RiLoader2Fill className="chat__form-input-icon loader" />
          )}
        </button>
      </div>
    </form>
  )
}
