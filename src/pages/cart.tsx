import { cartEmptyIcon } from "@/assets"
import { CartPageItem, InputCheckbox } from "@/components"
import { OrderContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { setProductList } from "@/modules"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import { RootState } from "../core"

const Cart = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const {
    carts,
    toggleEachInput,
    toggleCheckAllCart,
    updateQuantity,
    deleteCartItem,
    findProductFromProductList,
    handleResetOrderField,
  } = useCartOrder()
  const { productList } = useSelector((state: RootState) => state.order)

  useEffect(() => {
    if (carts?.length > 0) {
      if (productList === undefined) {
        dispatch(setProductList(carts))
      }
    } else {
      handleResetOrderField()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <OrderContainer
      isShowPromotion={true}
      headerTitle={`Giỏ hàng (${productList?.length || 0})`}
    >
      <section className="cart__container">
        <div className="cart__wrapper">
          {carts.length === 0 ? (
            <div className="cart__page-empty">
              {cartEmptyIcon}
              <p className="cart__page-empty-title">
                Giỏ hàng của bạn đang trống
              </p>

              <Link href="/" passHref>
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
                  <p>Chọn Tất cả ({productList?.length || 0})</p>
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
                      onDeleteItem={(productIds) => deleteCartItem(productIds)}
                      onUpdateQuantity={(data: any) => updateQuantity(data)}
                      onCheck={(productIds) => toggleEachInput(productIds)}
                      cart={cart}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </OrderContainer>
  )
}

Cart.Layout = MainNoFooter

export default Cart
