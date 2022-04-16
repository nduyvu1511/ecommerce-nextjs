/* eslint-disable @next/next/no-img-element */
import { isObjectHasValue } from "@/helper"
import { AttributeProduct, Category as ICategory } from "@/models"
import productApi from "@/services/productApi"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"
import useSWR from "swr"
import { CategoryList } from "../category/categoryList"
import { InputRange } from "../inputs"
import { Star } from "../star"
import { Attribute } from "./attributes"

interface ShopFilterProps {
  categories: ICategory[] | undefined
}

interface Price {
  min: number
  max: number
}

export const ShopFilter = (props: ShopFilterProps) => {
  const { categories } = props
  const router = useRouter()
  const divRef = useRef<HTMLDivElement>(null)
  const prices = useRef<Price>()

  const { data: attributeList } = useSWR(
    "product_attributes",
    () =>
      productApi
        .getProductAttributeList(Number(router.query?.category_id) || 0)
        .then((res: any) => res?.result?.data || []),
    {
      revalidateOnFocus: false,
    }
  )

  const handleFilterPrice = () => {
    if (
      !prices.current ||
      !isObjectHasValue(prices.current) ||
      prices.current.min >= prices.current.max
    )
      return

    router.push(
      {
        query: {
          ...router.query,
          offset: 0,
          price_range: [prices.current.min, prices.current.max],
        },
      },
      undefined,
      { shallow: true, scroll: true }
    )
  }

  const handleFilterAttribute = (parentId: string, childId: string) => {
    const attribute = `attributes_${parentId}`
    const attributeIds: any = router.query?.[attribute]

    let query = router.query
    if (!attributeIds) {
      query[attribute] = childId
    } else {
      if (typeof attributeIds === "string") {
        if (attributeIds === childId) {
          delete query[attribute]
        } else {
          query[attribute] = [attributeIds, childId]
        }
      } else if (typeof attributeIds === "object") {
        if (attributeIds?.includes(childId)) {
          query[attribute] = attributeIds.filter(
            (item: string) => item !== childId
          )
        } else {
          query[attribute] = [...attributeIds, childId]
        }
      } else {
        query[attribute] = childId
      }
    }

    router.push(
      {
        query: { ...query, offset: 0 },
      },
      undefined,
      { shallow: true, scroll: true }
    )
  }

  const handleFilterStarRating = (star: string) => {
    if (router.query?.star_rating === star) return

    router.push(
      {
        query: { ...router.query, offset: 0, star_rating: Number(star) },
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    )
  }

  return (
    <div className="shop__filter">
      <div className="shop__filter-category shop__filter-item">
        <Link href="/category/all">
          <a className="shop__filter-heading">Tất Cả Danh Mục</a>
        </Link>

        {categories && (categories?.length || 0) > 0 ? (
          <CategoryList categoryList={categories} idActive={2} />
        ) : null}
      </div>
      <div className="shop__filter-star shop__filter-item">
        <h3 className="shop__filter-heading">Đánh giá</h3>
        <ul className="shop__filter-star__list">
          {[3, 4, 5].map((star, index) => (
            <li
              onClick={() => handleFilterStarRating(star + "")}
              key={index}
              className="shop__filter-star__list-item"
            >
              <Star readonly size={18} ratingValue={star * 20} />
              <p>Từ {star} sao</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Attributes */}
      {attributeList?.length > 0 &&
        attributeList.map((item: AttributeProduct, index: number) =>
          item.display_content === "min_max_value" ? (
            <div
              key={index}
              ref={divRef}
              className="shop__filter-item shop__filter-price"
            >
              <h3 className="shop__filter-heading">Lọc theo giá</h3>
              <InputRange
                min={item.min_value}
                max={item.max_value}
                onChange={({ min, max }: { min: number; max: number }) => {
                  prices.current = { max, min }
                }}
                parentWidth={divRef.current?.offsetWidth || 200}
              />
              <button
                onClick={handleFilterPrice}
                className="btn-primary-outline"
              >
                Áp dụng
              </button>
            </div>
          ) : (
            <Attribute
              attribute={item}
              attributesActive={router.query[`attributes_${item.attribute_id}`]}
              onFilterAttribute={(parentId, childId) =>
                handleFilterAttribute(parentId, childId)
              }
            />
          )
        )}
      {Object.keys(router?.query).length >= 2 ? (
        <div
          onClick={() =>
            router.push(`/category/${router.query?.category_id || 0}?offset=0`)
          }
          className="shop__filter-item"
        >
          <div className="btn-primary shop__filter-item-clear-btn">
            Xóa bộ lọc
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ShopFilter
