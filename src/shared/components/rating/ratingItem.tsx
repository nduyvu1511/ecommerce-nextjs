/* eslint-disable @next/next/no-img-element */
import { CommentRating } from "@/models"
import React, { useState } from "react"
import { Tag } from "../common"
import ImageShow from "../common/imageShow"
import { Star } from "../star"

interface RatingItemProps {
  rating: CommentRating
  onDelete?: (product_id: number) => void
}

export const RatingItem = ({ rating, onDelete }: RatingItemProps) => {
  // const divRef = useRef<HTMLDivElement>(null)
  const [imageUrl, setImageUrl] = useState<string>()
  // const [open, setOpen] = useState<boolean>(false)

  // useClickOutside([divRef], () => {
  //   setOpen(false)
  // })

  return (
    <>
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

          {rating?.rating_tag?.length > 0 ? (
            <div className="rating__item-content-tags">
              {rating.rating_tag.map((item, index) => (
                <Tag
                  key={index}
                  size="sm"
                  disabled={true}
                  name={item}
                  id={index}
                />
              ))}
            </div>
          ) : null}

          {rating.attachment_ids?.length > 0 ? (
            <div className="rating__item-content-image">
              {rating.attachment_ids.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImageUrl(item.file)}
                  className="rating__item-content-image-item"
                >
                  {/* data:image/jpeg;base64, */}
                  <img src={item.file} alt="" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* <div className="rating__item-options">
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
        </div> */}
      </div>

      {imageUrl ? (
        <ImageShow onClose={() => setImageUrl("")} url={imageUrl} />
      ) : null}
    </>
  )
}

export default RatingItem
