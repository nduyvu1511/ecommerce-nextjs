/* eslint-disable @next/next/no-img-element */
import { avatar1 } from "@/assets"
import { CommentRating } from "@/models"
import React, { useRef, useState } from "react"
import { BiTrash } from "react-icons/bi"
import { FiEdit2 } from "react-icons/fi"
import { HiDotsVertical } from "react-icons/hi"
import { useClickOutside } from "shared/hook"
import { Star } from "../star"

interface RatingItemProps {
  rating: CommentRating
  onDelete?: (product_id: number) => void
}

export const RatingItem = ({ rating, onDelete }: RatingItemProps) => {
  const divRef = useRef<HTMLDivElement>(null)

  useClickOutside([divRef], () => {
    setOpen(false)
  })
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="rating__item">
      <div className="rating__item-avatar">
        <img src={`data:image/jpeg;base64,${rating.partner_avatar}`} alt="" />
      </div>

      <div className="rating__item-content">
        <div
          className="rating__item-content-name"
          dangerouslySetInnerHTML={{ __html: rating.partner_name }}
        ></div>
        <div className="rating__item-content-rate">
          <Star
            readonly
            size={15}
            ratingValue={(rating.star_rating_int || 0) * 20}
          />
        </div>
        <p className="rating__item-content-date">{rating.date}</p>
        <div
          className="rating__item-content-desc"
          dangerouslySetInnerHTML={{ __html: rating.content }}
        ></div>

        <div className="rating__item-content-image">
          <div className="rating__item-content-image-item">
            <img src={avatar1} alt="" />
          </div>
          <div className="rating__item-content-image-item">
            <img src={avatar1} alt="" />
          </div>
          <div className="rating__item-content-image-item">
            <img src={avatar1} alt="" />
          </div>
          <div className="rating__item-content-image-item">
            <img src={avatar1} alt="" />
          </div>
        </div>
      </div>

      <div className="rating__item-options">
        <button onClick={() => setOpen(true)} className="btn-reset">
          <HiDotsVertical />
        </button>

        {open ? (
          <div ref={divRef} className="rating__item-options-child">
            <p
              onClick={() => {
                onDelete && onDelete(rating.product_id?.id || 0)
                setOpen(false)
              }}
            >
              <BiTrash />
              Xóa đánh giá
            </p>
            <p
              onClick={() => {
                setOpen(false)
              }}
            >
              <FiEdit2 />
              Sửa đánh giá
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RatingItem
