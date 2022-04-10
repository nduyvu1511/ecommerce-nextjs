/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/core/store"
import { convertBase64 } from "@/helper"
import {
  PurchasedProduct,
  RatingRangePost,
  TagRating,
  UpdateRatingProps,
} from "@/models"
import { setMessage } from "@/modules"
import { DOMAIN_URL } from "@/services"
import ratingApi from "@/services/ratingApi"
import _ from "lodash"
import { useRouter } from "next/router"
import React, { memo, useState } from "react"
import { AiOutlineCamera } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useInputText } from "shared/hook"
import useSWR from "swr"
import Tag from "../common/tag"
import { Star } from "../star"

interface RatingFormProps {
  onAddRating: (props: UpdateRatingProps) => void
  purchaseForm: PurchasedProduct
  isShowFooter?: boolean
  onCloseModal?: Function
}

export const RatingForm = memo(function RatingFormChild({
  onAddRating,
  purchaseForm,
  isShowFooter = true,
  onCloseModal,
}: RatingFormProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const commentRating = purchaseForm?.comment_rating?.content || ""
  const inputProps = useInputText(
    commentRating ? commentRating.slice(3, commentRating.length - 4) : ""
  )
  const { token } = useSelector((state: RootState) => state.user)

  // const [imageLoading, setImageLoading] = useState<
  //   | {
  //       loading: boolean
  //       id: number
  //     }
  //   | undefined
  // >()
  const [ratingVal, setRatingVal] = useState<RatingRangePost | undefined>(
    purchaseForm?.comment_rating?.star_rating_int
  )
  const [ratingImages, setRatingImages] = useState<Array<string> | undefined>(
    undefined
  )
  const [ratingTagIds, setRatingTagId] = useState<Array<number> | undefined>()
  const [attachmentIds, setAttachmentId] = useState<Array<number> | undefined>()
  const { data: ratingTagsRes, isValidating } = useSWR(
    "product_tags",
    ratingVal
      ? () =>
          ratingApi
            .getRatingTags(Number(router?.query?.productId) || 0)
            .then((res: any) => {
              const tags = res?.result
              return tags?.length > 0 ? tags : undefined
            })
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 100,
    }
  )

  const handleClearRatingForm = () => {
    setRatingImages(undefined)
    setRatingVal(undefined)
    setAttachmentId(undefined)
    setRatingTagId(undefined)
  }

  const handleSelectImage = async (e: any) => {
    // setImageLoading(true)
    const files = e.target.files
    const urls: any = await Promise.all(
      Array.from(files).map(async (item: any) => {
        return await convertBase64(item)
      })
    )

    if (
      files?.length > 5 ||
      (files?.length || 0) + (ratingImages?.length || 0) > 5
    ) {
      dispatch(
        setMessage({
          title: "Bạn chỉ được chọn tối đa 5 ảnh",
          isOpen: true,
          type: "warning",
          direction: "top",
        })
      )
      return
    }

    // setImageLoading(false)

    if (urls) {
      if (!ratingImages) {
        setRatingImages(urls)
      } else {
        setRatingImages(_.uniq([...urls, ...ratingImages]))
      }
    } else {
      dispatch(
        setMessage({
          type: "warning",
          isOpen: true,
          title: "Có lỗi xảy ra, vui lòng chọn lại ảnh",
          direction: "top",
        })
      )
    }
  }

  const handleDeleteRatingImages = (url: string) => {
    if (ratingImages) {
      const newImages = [...ratingImages].filter((item) => item !== url)
      setRatingImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  const handleToggleTag = (tagId: number) => {
    if (!ratingTagIds) {
      setRatingTagId([tagId])
    } else {
      if (ratingTagIds.includes(tagId)) {
        const newTags = [...ratingTagIds].filter((id) => id !== tagId)
        setRatingTagId(newTags?.length > 0 ? newTags : undefined)
      } else {
        setRatingTagId([...ratingTagIds, tagId])
      }
    }
  }

  const handleAddRating = () => {
    ratingVal &&
      inputProps.value &&
      onAddRating &&
      onAddRating({
        star_rating: ratingVal,
        content: inputProps.value,
        tag_ids: ratingTagIds || [],
        attachment_ids: attachmentIds || [],
        product_id: purchaseForm?.product.product_id,
        token,
      })
  }

  return (
    <div className="rating__form-container">
      <header className="rating__form-header">
        <div className="rating__form-header-img">
          <img
            src={`${DOMAIN_URL}${purchaseForm?.product?.image_url?.[0] || ""}`}
            alt=""
          />
        </div>
        <div className="rating__form-header-info">
          <p className="rating__form-header-info-name">
            {purchaseForm?.product?.product_name || ""}
          </p>
          <p className="rating__form-header-info-variant"></p>
        </div>
      </header>

      {/* body */}
      <div className="rating__form">
        <div className="rating__form-star">
          <Star
            initialValue={ratingVal}
            allowHover={false}
            onClick={(val: number) =>
              setRatingVal((val / 20) as RatingRangePost)
            }
            ratingValue={0}
            size={35}
            iconsCount={5}
          />
        </div>

        {ratingVal ? (
          <div className="rating__form-wrapper">
            {ratingTagsRes?.length > 0 ? (
              <div className="rating__form-tags">
                {ratingTagsRes.map((item: TagRating) => (
                  <Tag
                    key={item.tag_id}
                    id={item.tag_id}
                    name={item.tag_content}
                    onChange={() => handleToggleTag(item.tag_id)}
                  />
                ))}
              </div>
            ) : null}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddRating()
              }}
              className="rating__form-form"
            >
              <textarea
                {...inputProps}
                placeholder="Nhập nội dung đánh giá..."
                rows={4}
              ></textarea>

              {!isShowFooter ? (
                <button
                  type="submit"
                  className={`btn-primary ${
                    !ratingVal || !inputProps.value ? "btn-disabled" : ""
                  }`}
                >
                  Thêm đánh giá
                </button>
              ) : null}
            </form>

            <div className="rating__form-attachment">
              <input
                onChange={handleSelectImage}
                hidden
                type="file"
                multiple
                id="rating-attachment"
              />
              <label
                htmlFor="rating-attachment"
                className={`btn-primary-outline ${
                  ratingImages?.length === 5 ? "btn-disabled" : ""
                }`}
              >
                <AiOutlineCamera />
                Thêm hình ảnh
                <span style={{ marginLeft: "8px" }}>{`${
                  ratingImages?.length || 0
                } / 5`}</span>
              </label>

              {ratingImages ? (
                <div className="rating__form-attachment-image">
                  {ratingImages.map((url, index) => (
                    <div
                      key={index}
                      className="rating__form-attachment-image-item"
                    >
                      {/* {ratingImages?.includes(url) && !imageLoading ? ( */}
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteRatingImages(url)
                        }}
                        className="btn-reset"
                      >
                        <IoMdClose />
                      </span>
                      {/*  ) : null}*/}

                      {/* {ratingImages?.includes(url) && imageLoading ? ( */}
                      {/* <span className="rating__form-attachment-image-item-loading">
                      <RiLoader4Fill className="loader" />
                    </span> */}
                      {/*  ) : null}*/}

                      <img src={url} alt="" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {isShowFooter ? (
        <footer className="rating__form-footer">
          <button
            onClick={() => {
              handleClearRatingForm()
              onCloseModal && onCloseModal()
            }}
            className="btn-primary"
          >
            Trở lại
          </button>
          <button
            className={`btn-primary ${
              !ratingVal || !inputProps.value ? "btn-disabled" : ""
            }`}
            onClick={handleAddRating}
          >
            Hoàn thành
          </button>
        </footer>
      ) : null}
    </div>
  )
})
