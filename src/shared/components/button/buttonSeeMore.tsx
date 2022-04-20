import React from "react"
import { RiLoader4Fill } from "react-icons/ri"

interface ButtonSeeMoreProps {
  isLoading: boolean
  onClick: Function
}

export const ButtonSeeMore = ({ isLoading, onClick }: ButtonSeeMoreProps) => {
  return (
    <>
      <div className="shop__pagination">
        {isLoading ? <RiLoader4Fill className="loader" /> : null}
        <button
          onClick={() => onClick && onClick()}
          className="btn-primary-outline shop__pagination-btn"
        >
          Xem Thêm
        </button>
      </div>
    </>
  )
}

