/* eslint-disable @next/next/no-img-element */
import { avatar, companyIcon } from "@/assets"
import { CommentRating } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
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
          <div className="image-container">
            <Image
              src={
                rating?.partner_avatar
                  ? `${DOMAIN_URL}${rating?.partner_avatar}`
                  : avatar
              }
              alt=""
              layout="fill"
              quality={20}
              className="image"
            />
          </div>
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
                  name={item.tag_content}
                  id={index}
                />
              ))}
            </div>
          ) : null}

          {rating.image_urls?.length > 0 ? (
            <div className="rating__item-content-image">
              {rating.image_urls.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImageUrl(`${DOMAIN_URL}${item.image_url}`)}
                  className="rating__item-content-image-item"
                >
                  {/* data:image/jpeg;base64, */}
                  <div className="image-container">
                    <Image
                      src={`${DOMAIN_URL}${item.image_url}`}
                      alt=""
                      layout="fill"
                      quality={20}
                      className="image"
                    />
                  </div>
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
