import { logo } from "@/assets"
import {
  AddressForm,
  CartModal,
  CategoryMobile,
  CompareModal,
  LoginForm,
  Modal,
  ModalHeading,
  ModalProductDetail,
  Navigation,
  OTP,
  PromotionModal,
  ScreenLoading,
  SearchForm,
  SearchResult,
  Toast,
} from "@/components"
import { RootState } from "@/core/store"
import {
  toggleModalAddressForm,
  toggleOpenCartModal,
  toggleOpenCategoryModal,
  toggleOpenLoginModal,
  toggleOpenNavLeftModal,
  toggleOpenOtpLoginModal,
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
  const { product } = useSelector((state: RootState) => state.product)
  const {
    isOpenModalProduct,
    isOpenCartModal,
    isOpenSearchModal,
    isOpenCategoryModal,
    isOpenNavLeftModal,
    isOpenScreenLoading,
    isOpenAddressForm,
    isOpenModalCoupons,
    isOpenOtpLoginModal,
    isOpenLoginSMSModal,
    isOpenLoginModal,
  } = useSelector((state: RootState) => state.common)
  const { isShowCompareModal } = useSelector(
    (state: RootState) => state.compare
  )

  return (
    <section className="modal__container">
      {isShowCompareModal ? (
        <div className="modal__container-compare">
          <CompareModal isShowModal={isShowCompareModal} />
        </div>
      ) : null}

      {isOpenModalProduct && product ? <ModalProductDetail /> : null}

      {isOpenCartModal ? (
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
            <CartModal />
          </div>
        </Modal>
      ) : null}

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
          disableAnimation
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

      {isOpenAddressForm ? (
        <div className="modal__address">
          <Modal
            unsetSize={true}
            disableOverLay={true}
            direction="center"
            isShowModal={true}
            heading={"Địa chỉ mới"}
            isShowConfirmModal={true}
            handleClickModal={() => dispatch(toggleModalAddressForm(false))}
          >
            <AddressForm />
          </Modal>
        </div>
      ) : null}

      <Toast />

      {isOpenModalCoupons ? (
        <div className="promotion__modal-container">
          <PromotionModal />
        </div>
      ) : null}

      {isOpenOtpLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(toggleOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="updatePhoneNumber" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginSMSModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(toggleOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="login" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            unsetSize
            disableAnimation
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(toggleOpenLoginModal(false))}
          >
            <LoginForm view="modal" />
          </Modal>
        </div>
      ) : null}

      {isOpenScreenLoading ? <ScreenLoading /> : null}
    </section>
  )
}
