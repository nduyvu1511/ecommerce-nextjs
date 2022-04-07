import { AttributeProduct, AttributeProductValueItem } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { Category } from "../category"
import { Heading } from "../heading"
import { InputRange } from "../inputs"
import { ProductAttributeItem } from "./productAttributeItem"

interface ShopFilterProps {
  attributeList: AttributeProduct[]
}

interface AttributeActive {
  parentId: number
  id: number
}

export const ShopFilter = ({ attributeList }: ShopFilterProps) => {
  const router = useRouter()

  const [attributesActive, setAttributesActive] = useState<AttributeActive[]>()

  const getAttributeActive = ({
    id,
    parentId,
  }: {
    id: number
    parentId: number
  }) =>
    attributesActive
      ? attributesActive.find(
          (_item) => _item.parentId === parentId && _item.id === id
        )
      : null

  return (
    <div className="shop__filter">
      <div className="shop__filter-category">
        <Heading vniTitle="Danh mục sản phẩm" engTitle="Product categories" />
        <Category type="full" />
      </div>

      <div className="shop__filter-item shop__filter-price">
        <Heading vniTitle="Lọc theo giá" engTitle="Filter by Price" />
        <InputRange
          min={0}
          max={100000}
          onChange={({ min, max }: { min: number; max: number }) => {}}
        />
      </div>

      {attributeList &&
        attributeList.map((item) => (
          <div key={item.attribute_id} className="shop__filter-item">
            <Heading
              vniTitle={item.attribute_name}
              engTitle={item.attribute_name}
            />
            {item.value_ids ? (
              <div className="product__attribute-list">
                {item.value_ids.map((q) => (
                  <ProductAttributeItem
                    onClick={(_item: AttributeProductValueItem) => {
                      if (attributesActive && attributesActive.length > 0) {
                        const attribute = getAttributeActive({
                          id: q.value_id,
                          parentId: item.attribute_id,
                        })

                        if (
                          attribute?.id === q.value_id &&
                          attribute.parentId === item.attribute_id
                        ) {
                          setAttributesActive(
                            [...attributesActive].filter(
                              (_item) => _item.id !== q.value_id
                            )
                          )
                        } else {
                          setAttributesActive([
                            ...attributesActive,
                            { id: q.value_id, parentId: item.attribute_id },
                          ])
                        }
                      } else {
                        setAttributesActive([
                          { parentId: item.attribute_id, id: q.value_id },
                        ])
                      }
                    }}
                    key={q.value_id}
                    valueItem={q}
                    itemActive={
                      !!(
                        getAttributeActive({
                          id: q.value_id,
                          parentId: item.attribute_id,
                        })?.id === q.value_id
                      )
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  )
}

export default ShopFilter
