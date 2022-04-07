import { RootState } from "@/core/store"
import { Promotion } from "@/models"
import { setMessage, setPromotion } from "@/modules"
import orderApi from "@/services/orderApi"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface CouponSWR {
  data: Promotion[]
  error: any
  isValidating: boolean
  setCoupon: (coupon: Promotion) => void
  applyPromotion: (coupon_code: string, handleSuccess: Function) => void
}

const usePromotion = (isFetch = true): CouponSWR => {
  const dispatch = useDispatch()
  const {
    token,
    userInfo: { id: partner_id },
  } = useSelector((state: RootState) => state.user)
  const { orderDraft } = useSelector((state: RootState) => state.order)

  const { data, error, isValidating, mutate } = useSWR(
    "coupons",
    isFetch && token && partner_id
      ? () =>
          userApi.getPromotionList({ partner_id, token }).then((res: any) => {
            if (res.result) {
              if (res.result.success) {
                return res.result.data.list_promotion
              } else {
                dispatch(
                  setMessage({
                    isOpen: true,
                    title: res.error?.message || "",
                    type: "danger",
                  })
                )
              }
            } else {
              dispatch(
                setMessage({
                  isOpen: true,
                  title: res.error?.message || "",
                  type: "danger",
                })
              )
            }
          })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const setCoupon = (coupon: Promotion | undefined) => {
    dispatch(setPromotion(coupon))
  }

  const applyPromotion = async (
    coupon_code: string,
    handleSuccess: Function
  ) => {
    if (!token || !coupon_code || !orderDraft) return

    const res: any = await orderApi.applyPromotion({
      coupon_code,
      order_id: orderDraft?.order_id,
      token,
    })

    const result = res.result
    if (result.success) {
      handleSuccess(result?.data?.promtion_line || [])
    } else {
      dispatch(
        setMessage({
          isOpen: true,
          title: result.message,
          type: "danger",
          direction: "top",
        })
      )
    }
  }

  return {
    data,
    error,
    isValidating,
    setCoupon,
    applyPromotion,
  }
}

export { usePromotion }
