import { OrderStatus } from "@/components"
import { OrderContainer } from "@/container"
import { MainAuthLayoutNoFooter, MainNoFooter } from "@/layout"
import { clearOrderData } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../core"

const OrderConfirmed = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { orderDone } = useSelector((state: RootState) => state.order)

  useEffect(() => {
    if (!orderDone) {
      router.back()
    }

    return () => {
      dispatch(clearOrderData())
    }
  }, [orderDone])

  return (
    <>
      {orderDone ? (
        <OrderContainer isShowOrderSummary={false} isShowPromotion={false}>
          <div className="order__confirm">
            <OrderStatus type="order" order={orderDone} />

            <div className="order__confirm-link">
              <Link href="/">
                <a className="btn-primary">Trở về trang chủ</a>
              </Link>
            </div>
          </div>
        </OrderContainer>
      ) : null}
    </>
  )
}

OrderConfirmed.Layout = MainAuthLayoutNoFooter

export default OrderConfirmed
