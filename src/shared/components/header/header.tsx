import { avatar as avatarBlank, logo } from "@/assets"
import { accountHeaderOptionList } from "@/container"
import { RootState } from "@/core/store"
import {
  clearOrderData,
  logOut,
  toggleOpenLoginModal,
  toggleOpenNavLeftModal,
  toggleOpenSearchModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { BiCart, BiWorld } from "react-icons/bi"
import { FiMenu } from "react-icons/fi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { IoChevronDownOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import useLocale from "shared/hook/useLocale"
import { CartModal } from "../cart"
import { Notification } from "../notification"
import { SearchForm, SearchResult } from "../search"
import { navLinks } from "./data"

export const Header = () => {
  const dispatch = useDispatch()
  const language = useLocale()
  const router = useRouter()
  const { token, userInfo: { avatar = "" } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const { isOpen: isOpenSearchResult, keyword } = useSelector(
    (state: RootState) => state.product.search
  )
  const { isOpen: isOpenSearchHistory } = useSelector(
    (state: RootState) => state.search.history
  )
  const { carts } = useCartOrder(true)
  const { asPath, pathname } = useRouter()
  const [openCartModal, setOpenCartModal] = useState<boolean>(false)

  const changeLanguage = (locale: string) => {
    router.push(pathname, asPath, { locale })
  }

  return (
    <header className="header">
      <div className="header__actions-wrapper">
        <div className="container">
          <div className="header__actions">
            <div className="header__actions-left">
              <ul className="header__actions-list">
                {navLinks.map((nav) => (
                  <li key={nav.id} className="header__actions-list-item ">
                    <Link href={nav.path} passHref>
                      <a>{nav.vniName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="header__actions-right">
              <div className="header__actions-right-tools">
                <div className="header__actions-right-tools-noti">
                  <Link href="/account/notifications">
                    <a>
                      <IoMdNotificationsOutline />
                      Thông báo
                    </a>
                  </Link>
                  <div className="header__notification-modal">
                    <Notification />
                  </div>
                </div>

                <div className="header__actions-right-tools-language">
                  <p>
                    <BiWorld />
                    {/* {router.locale === "vi" ? "Tiếng Việt" : "English"} */}
                    Tiếng Việt
                  </p>
                  <IoChevronDownOutline />

                  <div className="header__actions-language-dropdown">
                    <p onClick={() => changeLanguage("en")}>English</p>
                    <p onClick={() => changeLanguage("vi")}>
                      {router.locale === "vi" ? "Tiếng Việt" : "Vietnamese"}
                    </p>
                  </div>
                </div>

                {!token ? (
                  <div className="header__actions-right-tools-option">
                    <div className="show-on-mobile">
                      <Link href="/login">
                        <a>{router.locale === "vni" ? "Đăng nhập" : "Login"}</a>
                      </Link>
                    </div>

                    <div
                      onClick={() => dispatch(toggleOpenLoginModal(true))}
                      className="show-on-desktop cursor-pointer"
                    >
                      {router.locale === "vni" ? "Đăng nhập" : "Login"}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header__main-wrapper">
        <div className="container">
          <div className="header__main-top">
            <button
              onClick={() => dispatch(toggleOpenNavLeftModal(true))}
              className="btn-reset header__main-top-menu-btn"
            >
              <FiMenu />
            </button>

            <div className="header__main-top-logo-wrapper">
              <Link passHref href="/">
                <div className="header__main-top-logo image-container cursor-pointer">
                  <Image className="image" src={logo} alt="" layout="fill" />
                </div>
              </Link>
            </div>

            <div className="header__main-top-search">
              <SearchForm type="header" />
              {isOpenSearchResult && keyword ? <SearchResult /> : null}
            </div>

            {isOpenSearchHistory || (isOpenSearchResult && keyword) ? (
              <div className="search-overlay"></div>
            ) : null}

            <div
              onClick={() => dispatch(toggleOpenSearchModal(true))}
              className="header__main-search-mobile"
            >
              <SearchForm />
            </div>

            <div className="header__main-top-actions">
              <div className="header__main-top-actions-user">
                <Link passHref href={`${token ? "/account" : "/login"}`}>
                  {token ? (
                    <div className="image-container cursor-pointer">
                      <Image
                        src={avatar ? `${API_URL}${avatar}` : avatarBlank}
                        layout="fill"
                        alt=""
                        className="image"
                      />
                    </div>
                  ) : (
                    <a className="header__main-top-actions-icon header__main-top-actions-icon-user">
                      <AiOutlineUser />
                    </a>
                  )}
                </Link>

                {token ? (
                  <div className="header__main-top-actions-user-absolute">
                    <ul className="account__option-list">
                      {accountHeaderOptionList.map((item, index) => (
                        <li
                          onClick={() => {
                            if (!item.path) {
                              dispatch(logOut())
                              dispatch(clearOrderData())
                            }
                          }}
                          className="account__option-list-item"
                          key={index}
                        >
                          <Link href={item.path}>
                            <a>{item.vniTitle}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {/* cart */}
              {router.pathname === "/checkout" ||
              router.pathname === "/cart" ? null : (
                <div
                  onMouseMove={() => {
                    setOpenCartModal(true)
                  }}
                  className="header__main-top-actions-cart"
                >
                  <div
                    onMouseEnter={() => setOpenCartModal(true)}
                    onMouseLeave={() => setOpenCartModal(false)}
                    className="header__main-top-actions-cart-wrapper"
                  >
                    <Link passHref href="/cart">
                      <a className="header__main-top-actions-icon header__main-top-actions-icon-danger">
                        <BiCart />
                        <span className="header__main-top-actions-icon-absolute">
                          {carts.length}
                        </span>
                      </a>
                    </Link>

                    {/* Cart Modal hover */}
                    {openCartModal ? (
                      <div className="header__main-cart-absolute">
                        <CartModal />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
