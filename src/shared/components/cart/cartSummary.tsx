import { RootState } from "@/core/store"
import { formatMoneyVND, isObjectHasValue } from "@/helper"
import { toggleModalCoupons } from "@/modules"
import { BiGift } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { PromotionModal } from "../promotion"

interface CartTotalProps {
  isShowPromotion?: boolean
}

const CartTotal = ({ isShowPromotion }: CartTotalProps) => {
  const language = "vni"
  const dispatch = useDispatch()

  const { orderDraft, delivery, productList } = useSelector(
    (state: RootState) => state.order
  )
  const { isOpenModalCoupons } = useSelector((state: RootState) => state.common)

  return (
    <div className="cart__body-total">
      <h3 className="cart__body-total-heading">
        {language === "vni" ? "Tồng giỏ hàng" : "Cart totals"}
      </h3>

      <div className="cart__body-total-product">
        <div className="cart__body-total-product-title">
          <h3 className="cart__body-total-product-title-heading">
            {!productList
              ? language === "vni"
                ? "Vui lòng chọn sản phẩm"
                : "Please choose a product"
              : language === "vni"
              ? "Sản phẩm"
              : "Products"}
          </h3>

          {productList ? (
            <span className="cart__body-total-product-title-quantity">
              {orderDraft && isObjectHasValue(orderDraft)
                ? orderDraft.detail_order.order_line_view.length
                : 0}
            </span>
          ) : null}
        </div>

        {orderDraft && productList ? (
          <ul className="cart__total-product-list">
            {orderDraft.detail_order.order_line_view.length > 0 &&
              orderDraft.detail_order.order_line_view.map((cart) => (
                <li
                  key={cart.product_id}
                  className="cart__total-product-list-item"
                >
                  <p className="cart__total-product-list-item-title">
                    {cart.name}
                  </p>

                  <ul className="cart__total-price-list">
                    <li className=" cart__total-price-list-item">
                      {formatMoneyVND(cart.price_total)}
                    </li>
                    {cart.discount_line.type === "percent" &&
                    cart.discount_line.value ? (
                      <li className=" cart__total-price-list-item">
                        Giảm: {cart.discount_line.value}%
                      </li>
                    ) : null}

                    {cart.discount_line.type === "fixed" &&
                    cart.discount_line.value ? (
                      <li className=" cart__total-price-list-item">
                        Giảm: {formatMoneyVND(cart.discount_line.value)}
                      </li>
                    ) : null}

                    <li className=" cart__total-price-list-item">
                      Số lượng: {cart.qty}
                    </li>
                    <li className="cart__total-price-list-item-danger cart__total-price-list-item">
                      Thành tiền:{" "}
                      {formatMoneyVND(
                        cart.price_subtotal + (delivery?.shipping_fee || 0)
                      )}
                    </li>
                  </ul>
                </li>
              ))}
          </ul>
        ) : null}
      </div>

      {orderDraft && productList ? (
        <>
          <div className="cart__body-total-subtotal">
            <p className="cart__body-total-subtotal-title">
              {language === "vni" ? "Tổng phụ phí" : "Merchandise Subtotal"}:{" "}
            </p>
            {formatMoneyVND(orderDraft.amount_untaxed)}
          </div>

          {orderDraft.promo_price ? (
            <div className="cart__body-total-subtotal">
              <p className="cart__body-total-subtotal-title">
                {language === "vni"
                  ? "Tổng Voucher giảm giá"
                  : "Voucher Discount"}
                :
              </p>
              <p className="cart__body-total-subtotal-price">
                {formatMoneyVND(orderDraft.promo_price)}
              </p>
            </div>
          ) : null}

          {orderDraft.amount_tax > 0 ? (
            <div className="cart__body-total-subtotal">
              <p className="cart__body-total-subtotal-title">
                {language === "vni" ? "Thuế" : "Tax"}:
              </p>
              <p className="cart__body-total-subtotal-price">
                {formatMoneyVND(orderDraft.amount_tax)}
              </p>
            </div>
          ) : null}

          <div className="cart__body-total-subtotal">
            <p className="cart__body-total-subtotal-title">
              {language === "vni" ? "Phí vận chuyển" : "Shipping fee"}:
            </p>
            <p className="cart__body-total-subtotal-price">
              {formatMoneyVND(delivery?.shipping_fee || 0)}
            </p>
          </div>

          <div
            style={{ borderBottom: !isShowPromotion ? 0 : "" }}
            className="cart__body-total-subtotal"
          >
            <p className="cart__body-total-subtotal-title">
              {language === "vni" ? "Tổng" : "Total Payment"}:
            </p>
            <p className="cart__body-total-subtotal-price">
              {formatMoneyVND(
                orderDraft.amount_total + (delivery?.shipping_fee || 0)
              )}
            </p>
          </div>
        </>
      ) : null}

      {isShowPromotion && productList ? (
        <div className="cart__body-total-coupons">
          {productList ? (
            <button
              onClick={() => dispatch(toggleModalCoupons(true))}
              className="btn-primary cart__body-total-coupons-btn"
            >
              <BiGift />
              {language === "vni" ? "Thêm mã giảm giá" : "Add discount code"}
            </button>
          ) : null}

          {isOpenModalCoupons ? (
            <PromotionModal
              handleCloseModal={() => dispatch(toggleModalCoupons(false))}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default CartTotal
