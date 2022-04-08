import { cartEmptyIcon } from "@/assets"
import { CartPageItem, InputCheckbox } from "@/components"
import { OrderContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { setMessage, setProductList } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCart, useCartOrder, useOrder } from "shared/hook"
import { RootState } from "../core"

const Cart = () => {
  const language = "vni"
  const router = useRouter()
  const dispatch = useDispatch()
  const { carts } = useCart()
  const {
    toggleEachInput,
    toggleCheckAllCart,
    updateQuantity,
    deleteCartItem,
    findProductFromProductList,
  } = useCartOrder()

  const { productList, orderDraft } = useSelector(
    (state: RootState) => state.order
  )
  const { createOrderDraft } = useOrder()

  useEffect(() => {
    if (productList === undefined && carts?.length > 0) {
      dispatch(setProductList(carts))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleNavigateToAddress = () => {
    if (!productList) {
      dispatch(
        setMessage({
          title: "Vui lòng chọn sản phẩm để tiếp tục",
          type: "warning",
          isOpen: true,
        })
      )
    } else {
      if (!orderDraft) {
        createOrderDraft({
          handleSuccess: () => {
            router.push("/address")
          },
        })
      } else {
        router.push("/address")
      }
    }
  }

  return (
    <OrderContainer>
      <section className="cart__container">
        <div className="container">
          <div className="cart__wrapper">
            {carts.length === 0 ? (
              <div className="cart__page-empty">
                {cartEmptyIcon}
                <p className="cart__page-empty-title">
                  {language === "vni"
                    ? "Your Cart is currently empty"
                    : "Giỏ hàng của bạn đang trống"}
                </p>

                <Link href="/shop" passHref>
                  <p className="btn-primary">
                    {language === "vni" ? "Tiếp tục mua sắm" : "Go to Shop"}
                  </p>
                </Link>
              </div>
            ) : (
              <div className="cart__body">
                <div className="cart__body-cart">
                  <div className="cart__body-cart-header">
                    <div className="cart__body-cart-header-check">
                      <InputCheckbox
                        isChecked={carts.length === productList?.length}
                        onCheck={toggleCheckAllCart}
                      />
                    </div>
                    <p className="cart__body-cart-header-space"></p>
                    <div className="cart__body-cart-header-wrapper">
                      <p className="cart-title-product">
                        {language === "vni" ? "Sản phẩm" : "Product"}
                      </p>
                      <p className="cart-title-price">
                        {language === "vni" ? "Giá" : "Price"}
                      </p>
                      <p className="cart-title-quantity">
                        {language === "vni" ? "Số lượng" : "Quantity"}
                      </p>
                      <p className="cart-title-subtotal">
                        {language === "vni" ? "Tổng phụ" : "Subtotal"}
                      </p>
                      <p></p>
                    </div>
                  </div>

                  <div className="cart__body-cart-header-sm">
                    <p>Chọn Tất cả</p>
                    <InputCheckbox
                      isChecked={carts.length === productList?.length}
                      onCheck={toggleCheckAllCart}
                    />
                  </div>
                  <ul className="cart__body-cart-list">
                    {carts.map((cart, index) => (
                      <CartPageItem
                        key={index}
                        isChecked={!!findProductFromProductList(cart)}
                        onDeleteItem={(productIds) =>
                          deleteCartItem(productIds)
                        }
                        onUpdateQuantity={(data: any) => updateQuantity(data)}
                        onCheck={(productIds) => toggleEachInput(productIds)}
                        cart={cart}
                      />
                    ))}
                  </ul>

                  <div className="cart__body-footer">
                    <button
                      onClick={handleNavigateToAddress}
                      className={`btn-primary cart__body-footer-btn ${
                        !productList || Object.keys(productList).length === 0
                          ? "btn-disabled-clicked"
                          : ""
                      }`}
                    >
                      {language === "vni"
                        ? "Tiếp tục vận chuyển"
                        : "Continue shipping"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </OrderContainer>
  )
}

Cart.Layout = MainNoFooter

export default Cart
