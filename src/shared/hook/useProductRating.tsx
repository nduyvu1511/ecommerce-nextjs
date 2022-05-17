import { RootState } from "@/core/store"
import {
  CommentRating,
  DeleteRatingProps,
  DeleteRatingRes,
  PurchasedProduct,
  UpdateRatingPropsWithLineId
} from "@/models"
import { setMessage, toggleOpenScreenLoading } from "@/modules"
import { API_URL } from "@/services"
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
  changePage: (
    offset: number,
    handleSuccess: Function,
    handleError?: Function
  ) => void
}

type Type = "purchase" | "product"

interface UseRatingProps {
  shouldFetch: boolean
  product_id?: number
  limit?: number
  type: Type
}

const useProductRating = ({
  shouldFetch,
  product_id,
  type,
  limit = 12,
}: UseRatingProps): RatingSWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)

  const fetcher = async (offset: number) => {
    if (type === "purchase") {
      const res: any = await ratingApi.getProductsPurchased({
        token,
        limit,
        offset,
      })
      return res?.result?.data || []
    }

    const res: any = await ratingApi.getRatingsByProduct({
      comment_type: ["rating"],
      product_id: product_id || 0,
      limit,
      offset,
    })

    return res?.result?.data?.rating || []
  }

  const { data, error, isValidating, mutate } = useSWR(
    "product_ratings",
    shouldFetch ? () => fetcher(0) : null,
    { revalidateOnFocus: false }
  )

  const changePage = async (
    offset: number,
    cb: Function,
    onError?: Function
  ) => {
    try {
      const rating = await fetcher(offset * limit)
      mutate(rating, false)
      cb()
    } catch (error) {
      onError && onError()
    }
  }

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
      dispatch(setMessage({ title: "Xóa đánh giá thành công" }))
    }
  }

  const updateCommentRating = async (
    commentRating: UpdateRatingPropsWithLineId,
    callback: Function
  ) => {
    if (!token) return
    dispatch(toggleOpenScreenLoading(true))

    try {
      const res: any = await ratingApi.updateRatingProduct(commentRating)
      dispatch(toggleOpenScreenLoading(false))
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
                        image_urls:
                          item?.comment_rating?.image_urls?.length > 0
                            ? item?.comment_rating?.image_urls?.map(
                                (item) => `${API_URL}${item.image_url}`
                              )
                            : [],
                      },
                    }
                  : item
              ),
            },
            true
          )

          callback()
        }

        dispatch(setMessage({ title: "Thêm đánh giá thành công!" }))
      }
    } catch (error) {
      dispatch(toggleOpenScreenLoading(false))
    }
  }

  return {
    data,
    error,
    isValidating,
    deleteCommentRating,
    updateCommentRating,
    changePage,
  }
}

export { useProductRating }

