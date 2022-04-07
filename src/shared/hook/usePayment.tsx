import { RootState } from "@/core/store"
import { Payment } from "@/models"
import { setMessage } from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface PaymentSWR {
  data: Payment[]
  error: any
  isValidating: boolean
}

const usePayment = (): PaymentSWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const { productList, orderDraft, address, delivery } = useSelector(
    (state: RootState) => state.order
  )

  const { data, error, isValidating, mutate } = useSWR(
    "delivery",
    token && productList && orderDraft && address
      ? () =>
          orderApi.getPaymentList({ token }).then((res: any) => {
            if (res.result.success) {
              return res.result.data
            } else {
              dispatch(
                setMessage({
                  title: res.result.message,
                  type: "danger",
                  isOpen: true,
                })
              )
            }
          })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const setPayment = () => {

  }

  return {
    data,
    error,
    isValidating,
  }
}

export { usePayment }
