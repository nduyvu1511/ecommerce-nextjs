import { RootState } from "@/core/store"
import {
  CommentRating,
  DeleteRatingProps,
  DeleteRatingRes,
  PurchasedProduct,
  UpdateRatingPropsWithLineId
} from "@/models"
import { setMessage } from "@/modules"
import ratingApi from "@/services/ratingApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface RatingSWR {
  data: any
  error: any
  isValidating: boolean
  deleteCommentRating: (props: DeleteRatingProps, callback: Function) => void
  updateCommentRating: (
    props: UpdateRatingPropsWithLineId,
    callback: Function
  ) => void
}

type Type = "purchase" | "product"

interface UseRatingProps {
  shouldFetch: boolean
  product_id?: number
  type: Type
}

const useProductRating = ({
  shouldFetch,
  product_id,
  type,
}: UseRatingProps): RatingSWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)

  const fetcher = async () => {
    if (!shouldFetch || !token) return

    if (type === "purchase") {
      const res: any = await ratingApi.getProductsPurchased(token)
      return res?.result?.data || []
    }

    const res: any = await ratingApi.getRatingsByProduct({
      comment_type: ["rating"],
      product_id: product_id || 0,
    })

    return res?.result?.data?.rating || []
  }

  const { data, error, isValidating, mutate } = useSWR(
    "product_ratings",
    fetcher,
    { revalidateOnFocus: false }
  )

  const deleteCommentRating = async (
    deleteRating: DeleteRatingProps,
    callback: Function
  ) => {
    if (!token) return

    const res: any = await ratingApi.deleteRatingProduct({
      ...deleteRating,
      token,
    })

    if (!res?.result?.success) return

    const comment: DeleteRatingRes = res?.result?.data
    if (comment) {
      mutate(
        {
          ...data,
          data: [...data?.data].map((item: PurchasedProduct) =>
            item.history_line_id === comment.history_line_id
              ? {
                  ...item,
                  comment_rating: {
                    comment_id: false,
                    partner_id: false,
                    partner_name: false,
                    partner_avatar: false,
                    content: false,
                    product_id: { id: false, name: false },
                    id: false,
                    name: false,
                    date: false,
                    editable: false,
                    star_rating: false,
                    star_rating_int: 0,
                    rating_tag: [],
                    attachment_ids: [],
                  },
                }
              : item
          ),
        },
        false
      )

      callback()
      dispatch(setMessage({ title: "Xóa đánh giá thành công", isOpen: true }))
    }
  }

  const updateCommentRating = async (
    commentRating: UpdateRatingPropsWithLineId,
    callback: Function
  ) => {
    if (!token) return

    const res: any = await ratingApi.updateRatingProduct(commentRating)
    if (res?.result?.success) {
      const comment_rating: CommentRating = res.result.data?.data?.[0]
      if (!comment_rating) return

      if (type === "product") {
      } else if (type === "purchase") {
        if (!res?.result?.success) return

        mutate(
          {
            ...data.data_count,
            data: [...data.data].map((item: PurchasedProduct) =>
              item.history_line_id === commentRating.history_line_id
                ? {
                    ...item,
                    comment_rating: {
                      ...comment_rating,
                      content: comment_rating.message,
                      editable: true,
                    },
                  }
                : item
            ),
          },
          false
        )

        callback()
      }

      dispatch(setMessage({ title: "Thêm đánh giá thành công!", isOpen: true }))
    }
  }

  return {
    data,
    error,
    isValidating,
    deleteCommentRating,
    updateCommentRating,
  }
}

export { useProductRating }

