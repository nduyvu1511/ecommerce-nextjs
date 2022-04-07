import { RootState } from "@/core/store"
import { setKeyword, toggleSearchResult } from "@/modules"
import { useRouter } from "next/router"
import React, { memo, useEffect, useRef, useState } from "react"
import { RiCloseFill, RiSearchLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useProduct } from "shared/hook"
import useDebounce from "shared/hook/useDebounce"

interface SearchFormProps {
  onChange?: Function
  type?: string
}

export const SearchForm = memo(function SearchFormChild({
  type,
  onChange,
}: SearchFormProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const secondRef = useRef<boolean>(false)
  const [value, setValue] = useState(router.query.keyword || "")
  const language = "vni"

  const { handleSearchProduct, clearSearchResult } = useProduct({
    key: "products_search",
  })

  const {
    search: { keyword },
  } = useSelector((state: RootState) => state.product)

  const valueSearchTerm = useDebounce(value, 500)

  useEffect(() => {
    onChange && onChange(value)
    if (secondRef.current) {
      if (type === "header") {
        if (valueSearchTerm) {
          handleSearchProduct(valueSearchTerm)
          dispatch(setKeyword(valueSearchTerm))
        } else {
          clearSearchResult()
          dispatch(setKeyword(""))
        }
      }
    } else {
      secondRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearchTerm, dispatch])

  const handleSubmit = () => {
    if (!value) return

    dispatch(toggleSearchResult(false))
    router.push({
      pathname: `/shop`,
      query: {
        ...router.query,
        keyword: value,
        category_id: null,
        offset: 0,
      },
    })
  }

  useEffect(() => {
    return () => {
      keyword && dispatch(setKeyword(""))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="header__search-form"
    >
      <input
        onFocus={() => dispatch(toggleSearchResult(true))}
        onClick={() => dispatch(toggleSearchResult(true))}
        className="header__search-input"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder={`${
          language === "vni" ? "Tìm kiếm sản phẩm..." : "Search for products..."
        }`}
      />

      <span
        onClick={() => setValue("")}
        className={`btn-reset header__search-input-clear ${
          value ? "header__search-input-clear-active" : ""
        }`}
      >
        <RiCloseFill />
      </span>
      <button onClick={handleSubmit} className="btn-reset header__search-btn">
        <RiSearchLine />
      </button>
    </form>
  )
})
