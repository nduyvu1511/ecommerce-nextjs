import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { ProductIds } from "@/models"
import { toggleOpenCartModal } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import { CartItem } from "./cartItem"

interface CartModalProps {
  isCloseModal?: boolean
}

export const CartModal = ({ isCloseModal }: CartModalProps) => {
  const dispatch = useDispatch()
  const language = "vni"
  const { deleteCartItem, carts, totalMoney } = useCartOrder()
  const router = useRouter()
  const { address, delivery, payment } = useSelector(
    (state: RootState) => state.order
  )

  const handleCloseModal = () => {
    dispatch(toggleOpenCartModal(false))
  }

  const handleRedirect = () => {
    isCloseModal && handleCloseModal()
    if (payment) {
      return router.push("/payment")
    }
    if (delivery) {
      return router.push("/delivery")
    }
    if (address) {
      return router.push("/address")
    }

    return router.push("/cart")
  }

  const handleDeleteCartItem = (productIds: ProductIds) => {
    deleteCartItem(productIds)
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
                  <CartItem
                    onDelete={handleDeleteCartItem}
                    handleClose={handleCloseModal}
                    key={index}
                    cart={cart}
                  />
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
                  onClick={() => handleCloseModal && handleCloseModal()}
                  className="cart__modal-bottom-actions-item cursor-pointer"
                >
                  {language === "vni" ? "Xem giỏ hàng" : "View cart"}
                </a>
              </Link>
              <span
                onClick={handleRedirect}
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
}
