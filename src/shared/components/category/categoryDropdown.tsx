import { isArrayHasValue } from "@/helper"
import { useState } from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import { IoMenuOutline } from "react-icons/io5"
import { useCategory } from "shared/hook"
import { Category } from "./category"

export const CategoryDropdown = ({ type }: { type?: string }) => {
  const [isOpenMenuCategory, setOpenMenuCategory] = useState(false)
  const language = "eng"

  const { data } = useCategory()

  return (
    <div
      className={`category__dropdown ${
        type === "header" ? "category__dropdown-absolute" : ""
      }`}
    >
      <button
        onClick={() => setOpenMenuCategory(!isOpenMenuCategory)}
        className="btn-reset category__dropdown-btn"
      >
        <IoMenuOutline />
        <p>{language === "eng" ? "All categories" : "Tất cả danh mục"}</p>
        {isOpenMenuCategory ? <HiChevronUp /> : <HiChevronDown />}
      </button>
      <div
        className={`category__dropdown-wrapper ${
          isOpenMenuCategory ? "category__dropdown-wrapper-active" : ""
        }`}
      >
        <Category toggleCategoryDropdown={() => setOpenMenuCategory(false)} />
      </div>
    </div>
  )
}
