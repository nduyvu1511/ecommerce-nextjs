import { RootState } from "@/core/store"
import { productListToObjectIdQuantity } from "@/helper"
import { CreateOrderDraftProps, Product } from "@/models"
import {
  setMessage,
  setOrderDraft,
  setOrderDone,
  deleteManyItems,
} from "@/modules"
import orderApi from "@/services/orderApi"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface UpdateOrderHook {
  partner_shipping_id?: number | null
  payment_term_id?: number | null
  handleSuccess: Function
}

interface ProductSWR {
  data: Product[]
  error: any
  isValidating: boolean
  createOrderDraft: (props?: CreateOrderDraftProps) => void
  createOrderDone: (props: Function) => void
  updateOrderDraft: (props: UpdateOrderHook) => void
}

const useOrder = (isFetch = true): ProductSWR => {
  const dispatch = useDispatch()

  const {
    token,
    userInfo: { id: customer_id },
  } = useSelector((state: RootState) => state.user)
  const {
    orderDraft,
    promotionLineList,
    productList,
    address,
    payment,
    promotion,
    note,
    delivery,
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
    const { handleSuccess, handleError } = orderDraftProps || {}

    if (!productList || !token || !customer_id || orderDraft) return

    try {
      const res: any = await orderApi.createOrderDraft({
        api_version: "2.1",
        customer_id,
        token,
        note,
        // partner_shipping_id: address?.id || null,
        list_products: [
          {
            // payment_term_id: payment?.acquirer_id || null,
            // coupon_code: promotion?.coupon_code || null,
            products: productListToObjectIdQuantity(productList),
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

  const createOrderDone = async (handleSuccess: Function) => {
    if (!token || !productList || !delivery || !payment || !orderDraft) return

    const res: any = await orderApi.createOrderDone({
      order_id: [orderDraft.order_id],
      token,
    })
    const result = res?.result
    if (result?.success) {
      const sale_order_id = result?.data?.sale_order_id?.[0]?.sale_order_id
      if (sale_order_id) {
        const res: any = await userApi.getDetailOrderHistory({
          sale_order_id,
          token,
        })
        if (res.result.success) {
          dispatch(setOrderDone(res.result?.data?.info_booking))
          dispatch(
            deleteManyItems(
              productList.map((item) => ({
                product_prod_id: item.product_prod_id,
                product_tmpl_id: item.product_tmpl_id,
              }))
            )
          )
          handleSuccess()
        }
      }
    } else {
      dispatch(
        setMessage({
          isOpen: true,
          title: result?.message || "",
          type: "danger",
        })
      )
    }
  }

  const updateOrderDraft = async (props: UpdateOrderHook) => {
    const { handleSuccess, partner_shipping_id, payment_term_id } = props
    if (!orderDraft || !token) return
    const res: any = await orderApi.updateOrderDraft({
      order_id: [orderDraft.order_id],
      partner_shipping_id: partner_shipping_id || null,
      token,
      payment_term_id: payment_term_id || null,
    })

    if (res?.result?.success === false) {
      dispatch(
        setMessage({
          isOpen: true,
          title: res?.result?.message || "",
          type: "danger",
        })
      )
      return
    }

    if (res?.result === true) {
      handleSuccess()
    }
  }

  return {
    data,
    error,
    isValidating,
    createOrderDraft,
    createOrderDone,
    updateOrderDraft,
  }
}

export { useOrder }
