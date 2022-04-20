import { convertBase64 } from "@/helper"
import { setMessage } from "@/modules"
import _ from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface UseAttachmentRes {
  getBase64Images: (
    files: FileList,
    callback: (props: Array<string>) => void
  ) => void
  deleteImage: (props: string) => void
  ratingImages: Array<string> | undefined
  setRatingImages: (props: Array<string> | undefined) => void
  deleteImages: (props: Array<string>) => void
}

interface UseAttachmentProps {
  limit: number
  initRatingImages?: Array<string>
}

const useAttachment = (props: UseAttachmentProps): UseAttachmentRes => {
  const { limit, initRatingImages } = props
  const dispatch = useDispatch()

  const [ratingImages, setRatingImages] = useState<Array<string> | undefined>(
    initRatingImages && initRatingImages?.length > 0
      ? initRatingImages
      : undefined
  )

  const getBase64Images = async (
    files: FileList,
    callback: (props: Array<string>) => void,
    handleError?: Function
  ) => {
    try {
      const urls: any = await Promise.all(
        Array.from(files).map(async (item: File) => {
          return await convertBase64(item)
        })
      )

      if (
        limit > 1 &&
        (files?.length > limit ||
          (files?.length || 0) + (ratingImages?.length || 0) > limit)
      ) {
        dispatch(
          setMessage({
            title: `Bạn chỉ được chọn tối đa ${limit} ảnh`,
            isOpen: true,
            type: "warning",
            direction: "top",
          })
        )
        return
      }

      if (urls) {
        if (!ratingImages) {
          setRatingImages(urls)
          callback(urls)
        } else {
          const newUrls = _.uniq([...urls, ...ratingImages])
          setRatingImages(newUrls)
          callback(newUrls)
        }
      } else {
        handleError && handleError()
        dispatch(
          setMessage({
            type: "warning",
            isOpen: true,
            title: "Có lỗi xảy ra, vui lòng chọn lại ảnh",
            direction: "top",
          })
        )
      }
    } catch (error) {
      handleError && handleError()
      console.log(error)
    }
  }

  const deleteImages = (urls: Array<string>) => {
    if (ratingImages) {
      const newImages = [...urls].filter((item) =>
        ratingImages?.some((x) => x === item)
      )

      setRatingImages(newImages?.length > 0 ? newImages : undefined)
    } else {
      setRatingImages(undefined)
    }
  }

  const deleteImage = (url: string) => {
    if (ratingImages) {
      const newImages = [...ratingImages].filter((item) => item !== url)
      setRatingImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  return {
    deleteImage,
    getBase64Images,
    ratingImages,
    setRatingImages,
    deleteImages,
  }
}

export { useAttachment }
