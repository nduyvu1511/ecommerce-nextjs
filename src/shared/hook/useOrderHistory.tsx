import { RootState } from "@/core/store"
import { OrderHistory } from "@/models"
import userApi from "@/services/userApi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface OrderHistorySWR {
  data: OrderHistory[]
  error: any
  isValidating: boolean
}

const useOrderHistory = (): OrderHistorySWR => {
  const { token } = useSelector((state: RootState) => state.user)

  const { data, isValidating, error } = useSWR(
    "order_history_list",
    token
      ? () =>
          userApi
            .getOrderListHistory({ token })
            .then((res: any) => res?.result?.data?.list_booking || [])
      : null,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 100,
    }
  )

  return {
    data,
    error,
    isValidating,
  }
}

export { useOrderHistory }
