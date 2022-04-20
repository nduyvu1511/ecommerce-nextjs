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
        htmlTag.style.overflow = "auto"
      }
    }
  }, [])

  return (
    <div className="screen__loading">
      <BiLoaderAlt className="loader" />
    </div>
  )
}
