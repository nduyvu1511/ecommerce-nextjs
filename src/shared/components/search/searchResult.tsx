/* eslint-disable react/no-unescaped-entities */
import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { toggleSearchResult } from "@/modules"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { memo, useRef } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useClickOutside, useProduct } from "shared/hook"

export const SearchResult = memo(function SearchResultChild({
  handleClose,
}: {
  handleClose?: Function
}) {
  const dispatch = useDispatch()
  const searchResultRef = useRef<HTMLDivElement>(null)

  const { isOpen, keyword, isSearching } = useSelector(
    (state: RootState) => state.product.search
  )
  const { data: searchProducts = [] } = useProduct({
    key: "products_search",
  })

  // Handle click outside to hide search result
  useClickOutside([searchResultRef], (e: Event) => {
    if (
      e.target === document.querySelector(".header__search-input") ||
      e.target === document.querySelector(".header__search-btn") ||
      e.target ===
        document.querySelector(".header__search-input-clear-active") ||
      checkContainsElement(e.target)
    )
      return
    isOpen && dispatch(toggleSearchResult(false))
  })

  const checkContainsElement = (event: EventTarget | null) => {
    let isContain = false
    document
      .querySelectorAll(".search__result-list-item-link")
      .forEach((item) => {
        if (item === event) {
          isContain = true
        }
      })

    return isContain
  }

  const handleSearchItemClick = () => {
    isOpen &&
      setTimeout(() => {
        dispatch(toggleSearchResult(false))
      }, 100)
  }

  return (
    <div ref={searchResultRef} className="search__result">
      {keyword && isSearching === false && !isArrayHasValue(searchProducts) ? (
        <div className="search__result--no-result">
          không có kết quả nào cho{" "}
          <span>
            <small>"</small>
            {keyword}
            <small>"</small>
          </span>
        </div>
      ) : (
        <ul className="search__result-list">
          {isSearching && !isArrayHasValue(searchProducts) ? (
            <li className="search__result-loading">
              <RiLoader4Line />
            </li>
          ) : null}

          {keyword && isArrayHasValue(searchProducts) ? (
            <li className="search__result-keyword">
              <span> {`Hiển thị ${searchProducts.length} kết quả cho`}: </span>
              <p>"{keyword}"</p>
            </li>
          ) : null}

          {searchProducts.map((product, index) => (
            <li key={index} className="search__result-list-item">
              <Link href={`/product/${product.product_tmpl_id}`} passHref>
                <div
                  onClick={() => {
                    handleSearchItemClick()
                    handleClose && handleClose()
                  }}
                  className="search__result-list-item-link cursor-pointer"
                >
                  <p className="search__result-list-item-name">
                    {product.product_name}
                  </p>
                  <div className="search__result-list-item-img image-container">
                    <Image
                      src={`${DOMAIN_URL}${product.image_url[0]}`}
                      layout="fill"
                      alt=""
                      className="image"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
