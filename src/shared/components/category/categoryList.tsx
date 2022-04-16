import { Category } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface CategoryListProps {
  categoryList: Category[]
  idActive: number
}

export const CategoryList = ({ categoryList, idActive }: CategoryListProps) => {
  return (
    <ul className="category__list">
      {categoryList.map((cate) => (
        <li
          className={`category__list-item ${
            cate.id === idActive ? "category__list-item-active" : ""
          }`}
          key={cate.id}
        >
          <Link passHref href={`/category/${cate.id}`}>
            <div className="category__list-item">
              <div className="image-container">
                <Image
                  src={`${DOMAIN_URL}${cate.icon}`}
                  alt=""
                  className="image"
                  layout="fill"
                />
              </div>

              <p className="category__list-item-name">{cate.name}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

