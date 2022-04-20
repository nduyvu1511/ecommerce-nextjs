import { logo } from "@/assets"
import {
  CartModal,
  CategoryMobile,
  CompareModal,
  Modal,
  ModalHeading,
  ModalProductDetail,
  Navigation,
  ScreenLoading,
  SearchForm,
  SearchResult,
  Toast,
} from "@/components"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import {
  toggleOpenCartModal,
  toggleOpenCategoryModal,
  toggleOpenNavLeftModal,
  toggleOpenSearchModal,
} from "@/modules"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { IoCloseCircleSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"

export const ModalContainer = () => {
  const dispatch = useDispatch()
  const {
    isOpenModalProduct,
    isOpenCartModal,
    isOpenSearchModal,
    isOpenCategoryModal,
    isOpenNavLeftModal,
    isOpenScreenLoading,
  } = useSelector((state: RootState) => state.common)
  const { isShowCompareModal } = useSelector(
    (state: RootState) => state.compare
  )

  return (
    <section className="modal__container">
      <div className="modal__container-compare">
        {isShowCompareModal ? (
          <CompareModal isShowModal={isShowCompareModal} />
        ) : null}
      </div>

      {isOpenModalProduct ? <ModalProductDetail /> : null}

      <Modal
        isShowModal={isOpenCartModal}
        handleClickModal={() => dispatch(toggleOpenCartModal(false))}
        direction="right"
      >
        <div className="cart__modal-wrapper">
          <ModalHeading
            handleClose={() => dispatch(toggleOpenCartModal(false))}
            title="Giỏ Hàng"
          />
          <CartModal isCloseModal={true} />
        </div>
      </Modal>

      {isOpenNavLeftModal ? (
        <Modal
          isShowModal={isOpenNavLeftModal}
          handleClickModal={() => dispatch(toggleOpenNavLeftModal(false))}
          direction="left"
        >
          <div className="menu__mobile">
            <header className="menu__mobile-header">
              <Link passHref href="/">
                <div onClick={() => dispatch(toggleOpenNavLeftModal(false))}>
                  <div className="image-container menu__mobile-header-img">
                    <Image src={logo} alt="" layout="fill" className="image" />
                  </div>
                </div>
              </Link>
              <button
                onClick={() => dispatch(toggleOpenNavLeftModal(false))}
                className="btn-reset"
              >
                <IoCloseCircleSharp />
              </button>
            </header>
            {/* <CategoryDropdown /> */}
            <Navigation
              handleClickModal={() => dispatch(toggleOpenNavLeftModal(false))}
            />
          </div>
        </Modal>
      ) : null}

      {isOpenCategoryModal ? (
        <Modal
          direction="right"
          isShowModal={isOpenCategoryModal}
          handleClickModal={() => {
            dispatch(toggleOpenCategoryModal(false))
          }}
        >
          <ModalHeading
            handleClose={() => dispatch(toggleOpenCategoryModal(false))}
            title="Danh mục"
          />
          <CategoryMobile />
        </Modal>
      ) : null}

      {/* Search Mobile */}
      {isOpenSearchModal ? (
        <Modal
          fullWidth
          direction="right"
          isShowModal={true}
          handleClickModal={() => dispatch(toggleOpenSearchModal(false))}
        >
          <div className="nav__mobile-search-wrapper">
            <div className="search__mobile-modal">
              <button
                onClick={() => dispatch(toggleOpenSearchModal(false))}
                className="btn-reset search__mobile-modal-btn-back"
              >
                <BiArrowBack />
              </button>
              <SearchForm type="mobile" />
            </div>

            <div className="search__result-sm">
              <SearchResult isCloseModal={true} />
            </div>
          </div>
        </Modal>
      ) : null}

      <Toast />

      {isOpenScreenLoading ? <ScreenLoading /> : null}
    </section>
  )
}
