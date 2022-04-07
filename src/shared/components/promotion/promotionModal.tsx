import { cartEmptyIcon } from "@/assets"
import { Modal } from "@/components"
import { RootState } from "@/core/store"
import { Promotion, PromotionLine } from "@/models"
import {
  setMessage,
  setPromotion,
  setPromotionLineList,
  toggleModalCoupons,
} from "@/modules"
import { memo, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { usePromotion } from "shared/hook"
import { PromotionItem } from "./promotionItem"

export const PromotionModal = memo(function PromotionModalChild() {
  const dispatch = useDispatch()
  const language = "vni"
  const { data: promotionList, isValidating, applyPromotion } = usePromotion()

  const { promotion } = useSelector((state: RootState) => state.order)

  const [promotionCode, setPromotionCode] = useState<string>()

  const handleAddPromotion = (promotionProps: Promotion) => {
    applyPromotion(
      promotionProps.coupon_code,
      (promoLineList: PromotionLine[]) => {
        dispatch(setPromotion(promotionProps))
        dispatch(setPromotionLineList(promoLineList))
        dispatch(
          setMessage({
            title: "Đã áp dụng voucher",
            isOpen: true,
            direction: "top",
          })
        )
      }
    )
  }

  return (
    <Modal
      isShowModal={true}
      direction="center"
      heading={language === "vni" ? "Chọn Voucher" : "Choose Voucher"}
      handleClickModal={() => dispatch(toggleModalCoupons(false))}
    >
      <div className="promotion__modal">
        <div className="promotion__modal-header">
          <input
            onChange={(e) => setPromotionCode(e.target.value)}
            className="promotion__modal-header-search"
            value={promotionCode}
            placeholder={
              language === "vni" ? "Nhập mã giảm giá" : "Add coupon code"
            }
            type="text"
          />
        </div>
        <div className="promotion__modal-body">
          {promotionList?.length === 0 ? (
            <div className="promotion__modal-body-empty">
              {cartEmptyIcon}
              <span className="promotion__modal-body-empty-text">
                {language === "vni"
                  ? "Không có mã giảm giá nào được tìm thấy"
                  : "No discount codes found"}
              </span>
            </div>
          ) : null}

          {isValidating && !promotionList ? (
            <div className="promotion__modal-body-loading">
              <RiLoader4Line className="loader" />
            </div>
          ) : null}

          <ul className="promotion__modal-list">
            {promotionList?.length > 0
              ? promotionList.map(
                  (promo) =>
                    promo.is_use_promotion && (
                      <PromotionItem
                        promotion={promo}
                        key={promo.promotion_id}
                        handleClick={handleAddPromotion}
                        isActive={
                          (promotion?.promotion_id || 0) === promo.promotion_id
                        }
                      />
                    )
                )
              : null}
          </ul>
        </div>

        <footer className="promotion__modal-footer">
          <button
            onClick={() => dispatch(toggleModalCoupons(false))}
            className={`btn-primary ${!promotion ? "btn-secondary" : ""}`}
          >
            {promotion ? "OK" : "Cancel"}
          </button>
        </footer>
      </div>
    </Modal>
  )
})
