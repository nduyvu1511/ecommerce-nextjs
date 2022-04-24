import React, { useEffect } from "react"
import { BiLoaderAlt } from "react-icons/bi"

export const ScreenLoading = () => {
  useEffect(() => {
    const htmlTag = document.querySelector("html")
    if (htmlTag) {
      htmlTag.style.overflow = "hidden"
    }

    return () => {
      if (htmlTag) {
        htmlTag.style.overflow = "unset"
      }
    }
  }, [])

  return (
    <div className="screen__loading">
      <span>
        <BiLoaderAlt className="loader" />
      </span>
    </div>
  )
}
