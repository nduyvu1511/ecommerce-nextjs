import { logo } from "@/assets"
import { accountHeaderOptionList } from "@/container"
import { RootState } from "@/core/store"
import {
  clearOrderData,
  logOut,
  toggleOpenNavLeftModal,
  toggleOpenSearchModal,
} from "@/modules"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineUser } from "react-icons/ai"
import { BiCart, BiWorld } from "react-icons/bi"
import { FiMenu } from "react-icons/fi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { IoChevronDownOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import { CartModal } from "../cart"
import { SearchForm, SearchResult } from "../search"
import { navLinks } from "./data"

export const Header = () => {
  const dispatch = useDispatch()
  const language = "vni"
  const {
    token,
    userInfo: { avatar = "" },
  } = useSelector((state: RootState) => state.user)
  const { isOpen: isOpenSearchResult, keyword } = useSelector(
    (state: RootState) => state.product.search
  )
  const { carts } = useCartOrder()

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
                </div>

                <div className="header__actions-right-tools-language">
                  <p>
                    <BiWorld />
                    {language === "vni" ? "Tiếng Việt" : "English"}
                  </p>
                  <IoChevronDownOutline />

                  <div className="header__actions-language-dropdown">
                    <p>{language === "vni" ? "English" : "Tiếng Việt"}</p>
                    <p>{language === "vni" ? "Tiếng Việt" : "Tiếng Việt"}</p>
                  </div>
                </div>

                {!token ? (
                  <div className="header__actions-right-tools-option">
                    <Link href="/login">
                      <a>{language === "vni" ? "Đăng nhập" : "Login"}</a>
                    </Link>
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

            {isOpenSearchResult && keyword ? (
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
                <Link passHref href={`${token ? "/account" : ""}`}>
                  {token && avatar ? (
                    <div className="image-container cursor-pointer">
                      <Image
                        src={`${DOMAIN_URL}${avatar}`}
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
              <div className="header__main-top-actions-cart">
                <div className="header__main-top-actions-cart-wrapper">
                  <Link passHref href="/cart">
                    <a className="header__main-top-actions-icon header__main-top-actions-icon-danger">
                      <BiCart />
                      <span className="header__main-top-actions-icon-absolute">
                        {carts.length}
                      </span>
                    </a>
                  </Link>

                  <div className="header__main-cart-absolute">
                    <CartModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
