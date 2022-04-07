import React from "react"

interface BoxGridLoading {
  length: number
  col?: number
}

export const BoxGridLoading = ({ length, col = 2 }: BoxGridLoading) => {
  return (
    <div
      className={`box__loading grid grid-col-1 grid-col-md-2 grid-col-xl-${col}`}
    >
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="box__loading-item"></div>
      ))}
    </div>
  )
}
