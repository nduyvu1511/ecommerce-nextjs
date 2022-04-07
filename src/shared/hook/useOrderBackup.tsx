import { RootState } from "@/core/store"
import { productListToObjectIdQuantity } from "@/helper"
import { CartItem, CreateOrderDraftProps, Product } from "@/models"
import {
  setDelivery,
  setMessage,
  setOrderDraft,
  setPrevAddressId,
} from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface ProductSWR {
  data: Product[]
  error: any
  isValidating: boolean
  createOrderDraft: (props?: CreateOrderDraftProps) => void
}

const useOrder = (isFetch = true): ProductSWR => {
  const dispatch = useDispatch()

  const {
    token,
    userInfo: { id: customer_id },
  } = useSelector((state: RootState) => state.user)
  const {
    orderDraft,
    promotion,
    productList,
    address,
    delivery,
    payment,
    note,
  } = useSelector((state: RootState) => state.order)

  const { data, error, isValidating } = useSWR(
    "order_draft",
    orderDraft === undefined && productList && isFetch
      ? () => createOrderDraft()
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const createOrderDraft = async (orderDraftProps?: CreateOrderDraftProps) => {
    const {
      handleSuccess,
      handleError,
      promotionProps,
      addressProps,
      paymentProps,
      productListProps,
    } = orderDraftProps || {}

    if ((!productListProps && !productList) || !token || !customer_id) return

    try {
      const res: any = await orderApi.createOrderDraft({
        api_version: "2.1",
        customer_id,
        token,
        note,
        partner_shipping_id: addressProps?.id || address?.id || null,
        list_products: [
          {
            payment_term_id:
              paymentProps?.acquirer_id || payment?.acquirer_id || null,
            coupon_code:
              promotionProps?.coupon_code || promotion?.coupon_code || null,
            products: productListToObjectIdQuantity(
              (productListProps || productList) as CartItem[]
            ),
          },
        ],
      })

      if (res.error) {
        handleError && handleError()
        dispatch(
          setMessage({
            isOpen: true,
            type: "danger",
            title: res.error.message,
          })
        )
        return
      }

      if (res.result.success) {
        const order = res.result.data.sale_order_id?.[0]
        dispatch(setOrderDraft(order))

        if (addressProps) {
          dispatch(setPrevAddressId(addressProps.id))
        }

        if (productListProps && delivery) {
          if (delivery) {
            dispatch(setDelivery(undefined))
          }
        }

        handleSuccess && handleSuccess()

        return order
      } else {
        handleError && handleError()
        dispatch(
          setMessage({
            isOpen: true,
            type: "danger",
            title: res.result.message,
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    error,
    isValidating,
    createOrderDraft,
  }
}

export { useOrder }
