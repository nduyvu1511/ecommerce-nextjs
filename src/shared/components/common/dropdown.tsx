/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import { useClickOutside } from "shared/hook"

export interface ItemDropdown {
  title?: string | number
  value?: any
  name?: string
  id: number
  price?: number
}

interface DropdownProps {
  list: ItemDropdown[]
  handleClick: Function
  heading?: string
  titleProp?: string
  hasSearchInput?: boolean
  maxHeight?: number
  itemActiveProps?: ItemDropdown | null
}

export const Dropdown = ({
  list,
  handleClick,
  heading,
  titleProp,
  maxHeight,
  hasSearchInput,
  itemActiveProps,
}: DropdownProps) => {
  const dropdownListRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)

  const [isOpen, setOpen] = useState<boolean>(false)
  const [listFilter, setListFilter] = useState<ItemDropdown[]>(list)
  const [searchVal, setSearchVal] = useState<string>()
  const [itemActive, setItemActive] = useState(() => {
    if (itemActiveProps) {
      return { title: itemActiveProps.title, id: itemActiveProps.id }
    }

    return {
      title: titleProp ? "" : list[0].title || list[0].name,
      id: titleProp ? 0 : list[0].id,
    }
  })

  useClickOutside([dropdownListRef, titleRef], () => setOpen(false))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearchVal(value)

    const newList = [...list].filter((item) =>
      item.name?.toLowerCase().includes(value.trim())
    )

    setListFilter(newList)
  }

  return (
    <div className="dropdown">
      <p
        ref={titleRef}
        onClick={() => setOpen(!isOpen)}
        className="dropdown-title"
      >
        {itemActive.id === 0
          ? titleProp
          : `${heading ? heading : ""} ${itemActive.title}`}
        <BiChevronDown
          className={`dropdown-icon ${isOpen ? "dropdown-icon-active" : ""}`}
        />
      </p>

      {isOpen ? (
        <ul
          style={{ maxHeight: maxHeight ? `${maxHeight}vh` : "50vh" }}
          ref={dropdownListRef}
          className={`dropdown-list ${
            hasSearchInput ? "dropdown-list-with-search" : ""
          } ${list.length > 10 ? "dropdown-list-limit" : ""}`}
        >
          {hasSearchInput && list.length > 2 ? (
            <div className="dropdown-search-wrapper">
              <input
                onChange={handleSearch}
                value={searchVal}
                className="dropdown-search"
                placeholder="Tìm kiếm"
                type="text"
              />

              {searchVal ? (
                <button onClick={() => setSearchVal("")} className="btn-reset">
                  <IoClose />
                </button>
              ) : null}
            </div>
          ) : null}

          {listFilter.length === 0 && searchVal ? (
            <li className="dropdown-list-item dropdown-list-item-result">
              không tìm thấy kết quả nào cho "
              <span style={{ fontWeight: 600 }}>{searchVal}</span>"
            </li>
          ) : null}

          {list &&
            list.length > 0 &&
            (listFilter.length < 2 && !searchVal ? list : listFilter).map(
              (item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setItemActive({
                      title: item.title || item.name,
                      id: item.id,
                    })
                    setOpen(false)
                    handleClick && handleClick(item.name ? item : item.value)
                  }}
                  className={`dropdown-list-item ${
                    item.id === itemActive.id ? "dropdown-list-item-active" : ""
                  }`}
                >
                  {item.title || item.name}
                </li>
              )
            )}
        </ul>
      ) : null}
    </div>
  )
}
