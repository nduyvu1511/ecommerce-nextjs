import { Category } from "@/models"
import Link from "next/link"
import React, { useState } from "react"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

interface CategoryHeaderProps {
  categories: Category[]
}

export const CategorySlide = ({ categories }: CategoryHeaderProps) => {
  const [index, setIndex] = useState<number>(0)

  return (
    <div className="category__slide">
      <button
        onClick={() => index > 1 && setIndex(index - 1)}
        className="btn-reset category__slide-btn category__slide-btn-left"
      >
        <MdArrowBackIos />
      </button>
      <ul
        style={{ transform: `translateX(-${index * 100}%)` }}
        className="category__slide-list"
      >
        {categories.map((item, index) => (
          <>
            <li key={index} className="category__slide-list-item">
              <Link href={`/category/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          </>
        ))}
      </ul>

      <button
        onClick={() => setIndex(index + 1)}
        className="btn-reset category__slide-btn category__slide-btn-right"
      >
        <MdArrowForwardIos />
      </button>
    </div>
  )
}
