/* eslint-disable @next/next/no-img-element */
import { companyIcon } from "@/assets"
import { Promotion } from "@/models"
import { InputCheckbox } from "../inputs"

interface PromotionItemProps {
  promotion: Promotion
  handleClick: Function
  isActive: boolean
}

export const PromotionItem = ({
  promotion,
  handleClick,
  isActive,
}: PromotionItemProps) => {
  const language = "vni"

  return (
    <li
      key={promotion.promotion_id}
      onClick={() => {
        handleClick && handleClick(promotion)
      }}
      className={`promotion__modal-list-item ${
        isActive ? "promotion__modal-list-item-active" : ""
      }`}
    >
      <div className="promotion__modal-list-item-image">
        <img src={promotion.image_url[0] || companyIcon} alt="" />
      </div>
      <div className="promotion__modal-list-item-info">
        <p className="promotion__modal-code">{promotion.name}</p>
        <p className="promotion__modal-limit">
          {language === "vni"
            ? `Giới hạn ${promotion.max_limit_per_user} mã`
            : `Limit for ${promotion.max_limit_per_user} code`}
        </p>
        <p className="promotion__modal-expire">
          <span className="expire-from">
            {language === "vni" ? "Từ" : "Từ"}: {promotion.date_start}
          </span>
          <span className="expire-to">
            {language === "vni" ? "Đến" : "Đến"}: {promotion.date_end}
          </span>
        </p>
      </div>

      <InputCheckbox
        type="radio"
        isChecked={isActive}
        onCheck={() => handleClick && handleClick(promotion)}
      />
    </li>
  )
}
