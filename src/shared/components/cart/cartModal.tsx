import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import { memo } from "react"
import { useSelector } from "react-redux"
import { formatMoneyVND, isObjectHasValue } from "@/helper"
import { useCart } from "shared/hook"
import Link from "next/link"
import { CartItem } from "./cartItem"

export const CartModal = memo(function CartModalChild({
  handleClose,
}: {
  handleClose?: Function
}) {
  const language = "vni"
  const { carts, totalMoney } = useCart()
  const router = useRouter()
  const { orderDraft, address, delivery } = useSelector(
    (state: RootState) => state.order
  )

  const handleRedirectToPayment = () => {
    handleClose && handleClose()

    if (isObjectHasValue(orderDraft)) {
      if (isObjectHasValue(delivery)) {
        return router.push("/payment")
      }
      if (isObjectHasValue(address)) {
        return router.push("/shipping_detail")
      }
      return router.push("/address")
    } else {
      return router.push("/cart")
    }
  }

  return (
    <div className="cart__modal">
      {carts.length === 0 ? (
        <div className="cart__modal-empty">
          {cartEmptyIcon}
          <p className="cart__modal-empty-title">
            {language === "vni"
              ? "Không có sản phẩm nào trong giỏ hàng"
              : "No products in cart"}
          </p>
        </div>
      ) : (
        <>
          <div className="cart__modal-list">
            {carts.length > 0
              ? carts.map((cart, index) => (
                  <CartItem handleClose={handleClose} key={index} cart={cart} />
                ))
              : null}
          </div>
          <div className="cart__modal-bottom">
            <div className="cart__modal-bottom-price">
              <p>{language === "vni" ? "Tổng" : "Total"}:</p>
              <p>{formatMoneyVND(totalMoney)}</p>
            </div>
            <div className="cart__modal-bottom-actions">
              <Link passHref href="/cart">
                <a
                  onClick={() => handleClose && handleClose()}
                  className="cart__modal-bottom-actions-item cursor-pointer"
                >
                  {language === "vni" ? "Xem giỏ hàng" : "View cart"}
                </a>
              </Link>
              <span
                onClick={handleRedirectToPayment}
                className="cart__modal-bottom-actions-item"
              >
                {language === "vni" ? "Thanh toán" : " Checkout"}
              </span>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  )
})
