import { RootState } from "@/core/store"
import { formatMoneyVND, getTotalPrice } from "@/helper"
import { PromotionLine } from "@/models"
import { toggleModalCoupons } from "@/modules"
import { BiGift } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useScrollTop } from "shared/hook"
import { useOrder } from "shared/hook/useOrder"
import { PromotionModal } from "../promotion"
import { CartSummaryProductList } from "./cartSummaryProductList"

interface CartTotalProps {
  isShowPromotion?: boolean
}

export const CartSummary = ({ isShowPromotion }: CartTotalProps) => {
  const language = "vni"
  const dispatch = useDispatch()
  const { createOrderDraft } = useOrder()
  const height = useScrollTop()

  const { delivery, productList, promotionLineList, orderDraft } = useSelector(
    (state: RootState) => state.order
  )
  const { isOpenModalCoupons } = useSelector((state: RootState) => state.common)

  const handleOpenPromotionModal = () => {
    dispatch(toggleModalCoupons(true))
    if (!orderDraft) {
      createOrderDraft()
    }
  }

  const getPromotionLineMoney = (promotion: PromotionLine) => {
    const { type } = promotion.discount_line
    if (type === "percentage") {
      return (
        promotion.qty *
        promotion.price_unit *
        (1 - promotion.discount_line.value / 100)
      )
    }

    if (type === "fixed") {
      return (
        promotion.qty * promotion.price_unit * -promotion.discount_line.value
      )
    }

    return promotion.qty * promotion.price_unit
  }

  const getTotalPromotion = (): number => {
    let total = 0
    promotionLineList
      ? promotionLineList.forEach((val) => {
          if (val.discount_line.type === "percentage") {
            total += (val.discount_line.value / 100) * val.price_unit
          } else if (val.discount_line.type === "fixed") {
            total += val.discount_line.value
          }

          return total
        })
      : 0
    return total
  }

  return (
    <div
      className={`cart__body-total 
      ${height >= 420 ? "cart__body-total-sticky" : ""}
    `}
    >
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

          <span className="cart__body-total-product-title-quantity">
            {productList?.length || 0}
          </span>
        </div>

        {productList ? (
          <CartSummaryProductList
            promotionLineList={promotionLineList}
            productList={promotionLineList ? undefined : productList}
          />
        ) : null}
      </div>

      {productList ? (
        <div className="cart__body-total-summary">
          <div className="cart__body-total-subtotal">
            <p className="cart__body-total-subtotal-title">
              {language === "vni" ? "Tổng phụ phí" : "Merchandise Subtotal"}:{" "}
            </p>
            {formatMoneyVND(getTotalPrice(productList))}
          </div>

          {(orderDraft?.promo_price || 0) > 0 ? (
            <div className="cart__body-total-subtotal">
              <p className="cart__body-total-subtotal-title">
                {language === "vni"
                  ? "Tổng Voucher giảm giá"
                  : "Voucher Discount"}
                :
              </p>
              <p className="cart__body-total-subtotal-price">
                {formatMoneyVND(orderDraft?.promo_price || 0)}
              </p>
            </div>
          ) : null}

          {/* {(orderDraft?.amount_tax || 0) > 0 ? (
            <div className="cart__body-total-subtotal">
              <p className="cart__body-total-subtotal-title">
                {language === "vni" ? "Thuế" : "Tax"}:
              </p>
              <p className="cart__body-total-subtotal-price">
                {formatMoneyVND(orderDraft?.amount_tax || 0)}
              </p>
            </div>
          ) : null} */}

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
                getTotalPrice(productList) +
                  (delivery?.shipping_fee || 0) -
                  getTotalPromotion()
              )}
            </p>
          </div>
        </div>
      ) : null}

      {console.log(delivery)}

      {isShowPromotion && productList ? (
        <div className="cart__body-total-coupons">
          {productList ? (
            <button
              onClick={handleOpenPromotionModal}
              className={`btn-primary cart__body-total-coupons-btn ${
                !productList ? "btn-disabled" : ""
              }`}
            >
              <BiGift />
              {language === "vni" ? "Thêm mã giảm giá" : "Add discount code"}
            </button>
          ) : null}

          {isOpenModalCoupons ? <PromotionModal /> : null}
        </div>
      ) : null}
    </div>
  )
}
