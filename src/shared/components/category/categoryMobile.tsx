import { cartEmptyIcon, companyIcon } from "@/assets"
import { Category } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useCategory } from "shared/hook"

export const CategoryMobile = () => {
  const { data: categories, getChildCategories } = useCategory()
  const [childCategories, setChildCategories] = useState<Category[]>()
  const [currentId, setCurrentId] = useState<number>(
    () => categories?.[0]?.id || 0
  )

  useEffect(() => {
    if (!currentId) return

    getChildCategories(currentId).then((data: Category[]) =>
      setChildCategories(data)
    )
  }, [currentId])

  return (
    <div className="category__select">
      <ul className="category__left-list">
        {categories?.length > 0 &&
          categories.map((item: Category, index) => (
            <li
              onClick={() => setCurrentId(item.id)}
              key={item.id}
              className={`category__left-list-item ${
                item.id === currentId ? "category__left-list-item-active" : ""
              }`}
            >
              <div className="image-container">
                <Image
                  src={item?.icon ? `${DOMAIN_URL}${item.icon}` : companyIcon}
                  layout="fill"
                  alt=""
                  className="image"
                />
              </div>
              <p>{item.name}</p>
            </li>
          ))}
      </ul>

      {childCategories && childCategories?.length > 0 ? (
        <ul className="category__right-list">
          {childCategories.map((item: Category) => (
            <li key={item.id} className="category__right-list-item">
              <div className="image-container">
                <Image
                  src={item?.icon ? `${DOMAIN_URL}${item.icon}` : companyIcon}
                  layout="fill"
                  alt=""
                  className="image"
                />
              </div>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="category__right-list-no-category">
          {cartEmptyIcon}
          <p>Không có danh mục nào được tìm thấy</p>
        </div>
      )}
    </div>
  )
}
