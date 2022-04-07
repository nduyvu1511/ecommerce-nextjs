import { logo } from "@/assets"
import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { logOut } from "@/modules"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai"
import { FiMenu } from "react-icons/fi"
import { IoChevronDownOutline, IoCloseCircleSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useCart, useCategory, useScrollTop, useWishlist } from "shared/hook"
import { CartModal } from "../cart"
import { CategoryDropdown } from "../category"
import { ModalHeading } from "../heading"
import { Modal } from "../modal"
import { SearchForm, SearchResult } from "../search"
import { navLinks } from "./data"
import Navigation from "./navigation"
import NavMobile from "./navMobile"

export const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useWishlist(true)
  useCategory()
  const height = useScrollTop()
  const language = "vni"
  const { token } = useSelector((state: RootState) => state.user)
  const { isOpen: isOpenSearchResult, keyword } = useSelector(
    (state: RootState) => state.product.search
  )
  const { carts, totalMoney } = useCart()

  const [isModalOpen, setModalOpen] = useState({
    modalName: "",
    isOpen: false,
  })

  const handleItemClick = (name: string) => {
    setModalOpen({
      isOpen: name === isModalOpen.modalName ? !isModalOpen.isOpen : true,
      modalName: name,
    })
  }

  return (
    <>
      <header className={`header ${height > 150 ? "header-sticky" : ""}`}>
        <div className="header__notification">
          <h3>
            Due to the <strong>COVID</strong> 19 epidemic, orders may be
            processed with a slight delay
          </h3>
        </div>
        <div className="header__actions-wrapper">
          <div className="container">
            <div className="header__actions">
              <div className="header__actions-left">
                <ul className="header__actions-list">
                  {navLinks.map((nav) => (
                    <li key={nav.id} className="header__actions-list-item ">
                      <Link href={nav.path} passHref>
                        <a>{nav.engName}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="header__actions-right">
                <div className="header__actions-right-notification">
                  <p>
                    {/* {language === "eng"
                      ? " 100% Secure delivery without contacting the courier"
                      : "100% Giao hàng an toàn mà không cần liên hệ với chuyển phát nhanh"} */}
                    100% Secure delivery without contacting the courier
                  </p>
                  <p>
                    {" "}
                    {language === "vni"
                      ? "Cần trợ giúp? Gọi chúng tôi"
                      : "Need help? Call Us"}
                    : <strong>0909.099.580</strong>
                  </p>
                </div>

                <div className="header__actions-right-tools">
                  <div className="header__actions-right-tools-language">
                    <p>{language === "vni" ? "Tiếng Việt" : "English"}</p>
                    <IoChevronDownOutline />

                    <div className="header__actions-language-dropdown">
                      <p>{language === "vni" ? "English" : "Tiếng Việt"}</p>
                    </div>
                  </div>
                  <div className="header__actions-right-tools-option">
                    {!token ? (
                      <Link href="/login">
                        {language === "vni" ? "Đăng nhập" : "Login"}
                      </Link>
                    ) : (
                      <button
                        onClick={() => dispatch(logOut())}
                        className="btn-reset"
                      >
                        {language === "vni" ? "Đăng xuất" : "Log out"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`header__main-wrapper ${
            height > 70 ? "header__main-wrapper-active" : ""
          }`}
        >
          <div className="container">
            <div className="header__main-top">
              <button
                onClick={() => handleItemClick("menu")}
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

              <div className="header__main-top-actions">
                <div className="header__main-top-actions-user">
                  <Link passHref href={`${token ? "/account" : ""}`}>
                    <a className="header__main-top-actions-icon">
                      <AiOutlineUser />
                    </a>
                  </Link>
                </div>

                <div
                  onClick={() => router.push("/cart")}
                  className={`header__main-top-actions-cart cursor-pointer`}
                >
                  <Link passHref href="/cart">
                    <p className="header__main-top-actions-cart-price">
                      {formatMoneyVND(totalMoney)}
                    </p>
                  </Link>

                  <div className="header__main-top-actions-cart-wrapper">
                    <Link passHref href="/cart">
                      <p className="header__main-top-actions-icon header__main-top-actions-icon-danger">
                        <AiOutlineShopping />
                        <span className="header__main-top-actions-icon-absolute">
                          {carts.length}
                        </span>
                      </p>
                    </Link>

                    <button
                      onClick={() => handleItemClick("cart")}
                      className="btn-reset header__main-top-actions-icon-mobile"
                    >
                      <AiOutlineShopping />
                      <span className="cart__quantity-absolute">
                        {carts.length}
                      </span>
                    </button>

                    <div className="header__main-cart-absolute">
                      <CartModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="header__main-bottom">
              <div className="header__main-bottom-right">
                <CategoryDropdown type="header" />
              </div>

              <div className="header__main-bottom-left">
                <Navigation />
              </div>
            </div>
          </div>
        </div>
        <div className="header-border-bottom"></div>
      </header>
      <NavMobile
        isModalOpen={isModalOpen}
        setModalOpen={(name: string) => handleItemClick(name)}
      />
      <Modal
        isShowModal={isModalOpen.isOpen && isModalOpen.modalName === "menu"}
        handleClickModal={() => setModalOpen({ isOpen: false, modalName: "" })}
        direction="left"
      >
        <div className="menu__mobile">
          <header className="menu__mobile-header">
            <Link passHref href="/">
              <div
                onClick={() => setModalOpen({ isOpen: false, modalName: "" })}
              >
                <div className="image-container menu__mobile-header-img">
                  <Image src={logo} alt="" layout="fill" className="image" />
                </div>
              </div>
            </Link>
            <button
              onClick={() => setModalOpen({ isOpen: false, modalName: "" })}
              className="btn-reset"
            >
              <IoCloseCircleSharp />
            </button>
          </header>
          <CategoryDropdown />
          <Navigation
            handleClickModal={() =>
              setModalOpen({ isOpen: false, modalName: "" })
            }
          />
        </div>
      </Modal>

      <Modal
        isShowModal={isModalOpen.isOpen && isModalOpen.modalName === "cart"}
        handleClickModal={() => setModalOpen({ isOpen: false, modalName: "" })}
        direction="right"
      >
        <div className="cart__modal-wrapper">
          <ModalHeading
            handleClose={() => setModalOpen({ isOpen: false, modalName: "" })}
            title="Shopping cart"
          />
          <CartModal
            handleClose={() => setModalOpen({ isOpen: false, modalName: "" })}
          />
        </div>
      </Modal>
    </>
  )
}
