import { InputCheckbox } from "@/components"
import { OrderContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { Payment } from "@/models"
import { setMessage, setPayment } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useOrder, usePayment } from "shared/hook"
import { RootState } from "../core"

const Payment: any = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const language = "vni"

  const { address, productList, payment, delivery } = useSelector(
    (state: RootState) => state.order
  )
  const { createOrderDone, updateOrderDraft } = useOrder()
  const { data: paymentList = [] } = usePayment()

  useEffect(() => {
    if (!productList) {
      router.push("cart")
    }
    if (!address) {
      router.push("address")
    }
    if (!delivery) {
      router.push("shipping_detail")
    }
  }, [productList, address, delivery])

  // Functions
  const handleCreateOrder = () => {
    if (!payment) {
      dispatch(
        setMessage({
          title: "Vui lòng chọn phương thức thanh toán",
          type: "warning",
          isOpen: true,
        })
      )
      return
    } else {
      updateOrderDraft({
        partner_shipping_id: address?.id,
        handleSuccess: () => {
          createOrderDone(() => {
            router.push("order-confirmed")
          })
        },
      })
    }
  }

  const handleAddPayment = (paymentProps: Payment) => {
    dispatch(setPayment(paymentProps))
  }

  return (
    <OrderContainer>
      <section className="payment">
        <h3 className="payment-heading">
          {language === "vni"
            ? "Chọn phương thức thanh toán:"
            : "Select a payment method:"}
        </h3>
        <ul className="payment__list grid grid-col-1 grid-col-md-2 grid-col-lg-3">
          {paymentList.length > 0 &&
            paymentList.map(
              (item) =>
                item.state === "enabled" && (
                  <li
                    key={item.acquirer_id}
                    onClick={() => handleAddPayment(item)}
                    className={`payment__list-item ${
                      payment?.acquirer_id === item.acquirer_id
                        ? "payment__list-item-active"
                        : ""
                    }`}
                  >
                    <div className="payment__list-item-content">
                      <p>{item.name}</p>
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt=""
                      />
                    </div>
                    <InputCheckbox
                      isChecked={payment?.acquirer_id === item.acquirer_id}
                      onCheck={() => handleAddPayment(item)}
                    />
                  </li>
                )
            )}
        </ul>

        <footer className="payment__footer">
          <button
            onClick={handleCreateOrder}
            className={`btn-primary ${
              !payment || Object.keys(payment).length === 0
                ? "btn-disabled-clicked"
                : ""
            }`}
          >
            {language === "vni" ? "Kết thúc đặt hàng" : "Complete Order"}
          </button>
        </footer>
      </section>
    </OrderContainer>
  )
}

Payment.Layout = MainNoFooter

export default Payment
