import { RootState } from "@/core/store"
import { convertBase64 } from "@/helper"
import { setMessage } from "@/modules"
import _ from "lodash"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface UseAttachmentRes {
  uploadImages: (
    files: FileList,
    callback: (props: Array<string>) => void
  ) => void
  deleteImage: (props: string) => void
  ratingImages: Array<string> | undefined
  setRatingImages: (props: Array<string> | undefined) => void
}

const useAttachment = (limit: number): UseAttachmentRes => {
  const dispatch = useDispatch()

  const [ratingImages, setRatingImages] = useState<Array<string> | undefined>(
    undefined
  )

  const uploadImages = async (
    files: FileList,
    callback: (props: Array<string>) => void
  ) => {
    // setImageLoading(true)
    const urls: any = await Promise.all(
      Array.from(files).map(async (item: File) => {
        return await convertBase64(item)
      })
    )

    if (
      files?.length > limit ||
      (files?.length || 0) + (ratingImages?.length || 0) > limit
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

    // setImageLoading(false)

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

  const deleteImage = (url: string) => {
    if (ratingImages) {
      const newImages = [...ratingImages].filter((item) => item !== url)
      setRatingImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  return {
    deleteImage,
    uploadImages,
    ratingImages,
    setRatingImages,
  }
}

export { useAttachment }
