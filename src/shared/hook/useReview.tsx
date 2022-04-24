import { RootState } from "@/core/store"
import { Comment } from "@/models"
import { setMessage } from "@/modules"
import userApi from "@/services/userApi"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface AddReviewHook {
  content: string
  product_id: number
}

interface DeleteReviewHook {
  comment_id: number
  product_id: number
}

interface Props {
  product_id: number
}

interface ReivewSWR {
  data: Comment[]
  error: any
  isValidating: boolean
  handleAddReview: (props: AddReviewHook) => void
  handleDeleteReview: (props: DeleteReviewHook) => void
  clearComments: Function
}

const useReview = ({ product_id }: Props): ReivewSWR => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.user)

  const { data, error, isValidating, mutate } = useSWR(
    `review_product_${product_id}`,
    product_id && token
      ? () =>
          userApi
            .getReviews({ token, product_id })
            .then((res: any) => res?.result || [])
      : null,
    {
      revalidateOnFocus: false,
    }
  )
  const handleAddReview = async ({ content, product_id }: AddReviewHook) => {
    if (!token) {
      router.push("/login")
    }
    if (!token || !content || !product_id) return

    const res: any = await userApi.addReview({ content, product_id, token })
    if (res?.result?.id) {
      if (!data) {
        mutate([res.result], false)
      } else {
        mutate([res.result, ...data], false)
      }
    } else {
      dispatch(
        setMessage({
          type: "danger",
          title: res?.result?.message || "",
        })
      )
    }
  }

  const handleDeleteReview = async ({
    comment_id,
    product_id,
  }: DeleteReviewHook) => {
    if (!token || !comment_id || !product_id) return

    const res: any = await userApi.deleteReview({
      comment_id,
      product_id,
      token,
    })

    mutate(
      [...data].filter((item) => item.id !== comment_id || 0),
      false
    )
  }

  const clearComments = () => {
    mutate([], false)
  }

  return {
    data,
    error,
    isValidating,
    handleAddReview,
    handleDeleteReview,
    clearComments,
  }
}

export { useReview }
