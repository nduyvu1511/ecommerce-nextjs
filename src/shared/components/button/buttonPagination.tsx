import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"

interface PaginationProps {
  onPaginate: Function
  currentPage: number
  totalPage: number
}

export const Pagination = ({
  totalPage,
  currentPage,
  onPaginate,
}: PaginationProps) => {
  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <button
          onClick={() => onPaginate(currentPage - 1)}
          className={`btn-reset pagination-btn ${
            currentPage === 1 ? "pagination-btn-disable" : ""
          }`}
        >
          <HiArrowSmLeft />
        </button>
      ) : null}

      {Array.from({ length: totalPage }).map((_, index) => (
        <button
          key={index}
          className={`btn-reset pagination-btn ${
            currentPage === index + 1 ? "pagination-btn-active" : ""
          } `}
          onClick={() => onPaginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {currentPage < totalPage ? (
        <button
          onClick={() => onPaginate(currentPage + 1)}
          className={`btn-reset pagination-btn ${
            currentPage === totalPage ? "pagination-btn-disable" : ""
          }`}
        >
          <HiArrowSmRight />
        </button>
      ) : null}
    </div>
  )
}
