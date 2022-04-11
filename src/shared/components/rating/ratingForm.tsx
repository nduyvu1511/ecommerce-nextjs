/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/core/store"
import {
  DeleteRatingProps,
  PurchasedProduct,
  RatingRangePost,
  TagRating,
  UpdateRatingProps,
} from "@/models"
import { setMessage, toggleModalConfirm } from "@/modules"
import { DOMAIN_URL } from "@/services"
import ratingApi from "@/services/ratingApi"
import { useRouter } from "next/router"
import React, { memo, useState } from "react"
import { AiOutlineCamera } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { RiLoader4Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useInputText } from "shared/hook"
import { useAttachment } from "shared/hook/useAttachment"
import useSWR from "swr"
import { Tag } from "../common"
import { ModalConfirm } from "../modal/modalConfirm"
import { Star } from "../star"

interface RatingFormProps {
  onAddRating: (props: UpdateRatingProps) => void
  purchaseForm: PurchasedProduct
  isShowFooter?: boolean
  onCloseModal?: Function
  onDeleteRating?: (props: DeleteRatingProps) => void
}

export const RatingForm = memo(function RatingFormChild({
  onAddRating,
  purchaseForm,
  isShowFooter = true,
  onCloseModal,
  onDeleteRating,
}: RatingFormProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.user)
  const { isOpenModalConfirm } = useSelector((state: RootState) => state.common)

  const { deleteImage, ratingImages, uploadImages, setRatingImages } =
    useAttachment(5)

  // Rating input field
  const commentRating = purchaseForm?.comment_rating?.content || ""
  const inputProps = useInputText(
    commentRating.includes("<p>")
      ? commentRating.slice(3, commentRating.length - 4)
      : commentRating
  )

  // Star rating
  const [ratingVal, setRatingVal] = useState<RatingRangePost | undefined>(
    purchaseForm?.comment_rating?.star_rating_int
  )

  // Rating tags from API server
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
  const [ratingTagIds, setRatingTagId] = useState<Array<number> | undefined>()

  // Rating image ids after upload successfully to server
  const [ratingImageIds, setRatingImageIds] = useState<Array<number>>()
  const [ratingImageLoading, setRatingImageLoading] = useState<boolean>()

  // Functions
  const handleClearRatingForm = () => {
    setRatingImages(undefined)
    setRatingVal(undefined)
    setRatingImageIds(undefined)
    setRatingTagId(undefined)
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

  const handleDeleteCommentRating = () => {
    purchaseForm?.history_line_id &&
      purchaseForm?.product &&
      onDeleteRating &&
      onDeleteRating({
        history_line_id: purchaseForm.history_line_id,
        product_id: purchaseForm.product.product_tmpl_id,
        token,
      })
  }

  const handleAddRating = () => {
    ratingVal &&
      inputProps.value &&
      onAddRating &&
      onAddRating({
        star_rating: ratingVal,
        content: inputProps.value,
        tag_ids: ratingTagIds || [],
        attachment_ids: ratingImageIds || [],
        product_id: purchaseForm?.product.product_tmpl_id,
        token,
      })
  }

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !purchaseForm?.product?.product_tmpl_id) return
    setRatingImageLoading(true)

    uploadImages(e.target.files, async (urls: Array<string>) => {
      const res: any = await ratingApi.createAttachment({
        product_id: purchaseForm.product.product_tmpl_id,
        token,
        attachments: urls.map((url) => ({
          file: url,
          type: "picture",
        })),
      })

      const imageIds: Array<number> = res?.result?.data

      try {
        if (imageIds?.length > 0) {
          setRatingImageIds(imageIds)
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

        setRatingImageLoading(false)
      } catch (error) {
        setRatingImageLoading(false)
      }
    })
  }

  return (
    <>
      <div className="rating__form-container">
        <header className="rating__form-header">
          <div className="rating__form-header-img">
            <img
              src={`${DOMAIN_URL}${
                purchaseForm?.product?.image_url?.[0] || ""
              }`}
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
                  onChange={(e) => handleUploadImages(e)}
                  hidden
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
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
                        {ratingImages?.includes(url) && !ratingImageLoading ? (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteImage(url)
                            }}
                            className="btn-reset"
                          >
                            <IoMdClose />
                          </span>
                        ) : null}

                        {ratingImages?.includes(url) && ratingImageLoading ? (
                          <span className="rating__form-attachment-image-item-loading">
                            <RiLoader4Fill className="loader" />
                          </span>
                        ) : null}

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

            {purchaseForm?.comment_rating?.comment_id ? (
              <button
                onClick={() => dispatch(toggleModalConfirm(true))}
                className="btn-primary rating__form-footer-danger-btn"
              >
                Xóa đánh giá
              </button>
            ) : null}

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

      {isOpenModalConfirm ? (
        <ModalConfirm
          confirmModal={handleDeleteCommentRating}
          desc="Nếu đồng ý, bạn sẽ xóa đi đánh giá này"
        />
      ) : null}
    </>
  )
})
