import { AttributeProductValueItem, DisplayContentAttribute } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import { InputCheckbox } from "../inputs"

interface ProductAttributeItemProps {
  valueItem: AttributeProductValueItem
  onClick: Function
  itemActive?: boolean
  type: DisplayContentAttribute
}

export const ProductAttributeItem = ({
  valueItem,
  onClick,
  itemActive,
  type,
}: ProductAttributeItemProps) => (
  <div
    onClick={() => onClick && onClick(valueItem)}
    className="product__attribute-list-item"
  >
    <InputCheckbox
      isChecked={itemActive || false}
      onCheck={() => onClick && onClick(valueItem)}
    />
    <div className="product__attribute-list-item-wrapper">
      {console.log(valueItem.value_icon)}
      {type === "text_image" || type === "only_image" ? (
        <div
          className={`image-container ${
            valueItem.value_icon ? "" : "product__attribute-no-image"
          }`}
        >
          <Image
            layout="fill"
            className="image"
            src={`${DOMAIN_URL}${valueItem.value_icon || ""}`}
            alt=""
          />
        </div>
      ) : null}

      {type !== "only_image" ? <p>{valueItem.value_name}</p> : null}
    </div>
  </div>
)
