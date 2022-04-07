import { AttributeProductValueItem } from "@/models"

interface ProductAttributeItemProps {
  valueItem: AttributeProductValueItem
  onClick: Function
  itemActive?: boolean
}

export const ProductAttributeItem = ({
  valueItem,
  onClick,
  itemActive,
}: ProductAttributeItemProps) => {
  return (
    <span
      onClick={() => onClick && onClick(valueItem)}
      className={`product__attribute-list-item ${
        itemActive ? "product__attribute-list-item-active" : ""
      }`}
    >
      {valueItem.value_name}
    </span>
  )
}
