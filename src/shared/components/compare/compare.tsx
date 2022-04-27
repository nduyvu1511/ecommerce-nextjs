import { RootState } from "@/core/store"
import { Product } from "@/models"
import {
  addToCart,
  clearProductCompare,
  deleteProductCompare,
  setModalConfirm,
  setProduct,
  toggleModalProduct,
  toggleShowCompareModal
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HiTrash } from "react-icons/hi"
import { TiArrowShuffle } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { formatMoneyVND } from "../../helper/functions"
import { ModalConfirm } from "../modal"

export const Compare = ({ type }: { type?: "page" | "modal" }) => {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()

  const { token, userInfo: { id: partner_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const { productsCompare, isShowCompareModal } = useSelector(
    (state: RootState) => state.compare
  )

  const handleAddToCart = (product: Product) => {
    if (!token) {
      router.push("/login")
      return
    }

    if (product.attributes.length > 0) {
      dispatch(toggleModalProduct(true))
      dispatch(setProduct(product))
    } else {
      dispatch(addToCart({ ...product, quantity: 1, partner_id }))
    }
  }

  const handleResetCompareList = () => {
    dispatch(clearProductCompare())
  }

  return (
    <div className="compare">
      <ModalConfirm onConfirm={handleResetCompareList} />
      {type === "page" ? (
        <div className="compare__header">
          <h3 className="compare__header-heading">
            {language === "vni" ? "So Sánh" : "Compare"}
          </h3>
          {productsCompare.length > 0 ? (
            <button
              onClick={() =>
                dispatch(
                  setModalConfirm({
                    isOpen: true,
                    title:
                      "Nếu đồng ý bạn sẽ xóa tất cả sản phẩm trong danh sách so sánh",
                  })
                )
              }
              className="btn-reset btn-primary"
            >
              {language === "vni" ? "Xóa tất cả" : "Reset Compare List"}

              <TiArrowShuffle />
            </button>
          ) : null}
        </div>
      ) : null}
      {productsCompare.length === 0 ? (
        <div className="compare__empty">
          <p className="compare__empty-text">
            {language === "vni"
              ? "Danh sách so sánh của bạn đang trống!"
              : "Your comparison list is empty!"}
          </p>
          <Link href="/shop" passHref>
            <a className="btn-primary">
              {language === "vni" ? "Tiếp tục mua sắm" : "Continue Shopping"}
            </a>
          </Link>
        </div>
      ) : (
        <div className="compare__table">
          <div className="compare__table-header">
            <div className="compare__table-item-img"></div>
            <div className="compare__table-item compare__table-item-name-wrapper">
              {language === "vni" ? "Name" : "Tên"}
            </div>
            <div className="compare__table-item">
              {language === "vni" ? "Category" : "Danh mục"}
            </div>
            <div className="compare__table-item">
              {language === "vni" ? "Price" : "Giá"}
            </div>
            <div className="compare__table-item">
              {language === "vni" ? "Unit" : "Đơn vị"}
            </div>
            <div className="compare__table-item"></div>
          </div>
          <div className="compare__table-body">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              navigation
              breakpoints={{
                450: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {productsCompare.map((item) => (
                <SwiperSlide key={item.product_tmpl_id}>
                  <div className="compare__table-item-wrapper">
                    <div className="compare__table-item-img">
                      <button
                        onClick={() =>
                          dispatch(deleteProductCompare(item.product_tmpl_id))
                        }
                        className="btn-reset compare__table-item-delete-btn"
                      >
                        <HiTrash />
                      </button>

                      <Link
                        href={`/product/${
                          item.attributes?.length > 0
                            ? item.product_tmpl_id
                            : item.product_prod_id
                        }`}
                        passHref
                      >
                        <div
                          onClick={() =>
                            dispatch(toggleShowCompareModal(false))
                          }
                          className="image-container"
                        >
                          <Image
                            src={`${API_URL}${item.image_url?.[0] || ""}`}
                            alt=""
                            layout="fill"
                            className="image"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="compare__table-item compare__table-item-name-wrapper">
                      <Link
                        href={`/product/${
                          item.attributes.length > 0
                            ? item.product_tmpl_id
                            : item.product_prod_id
                        }`}
                        passHref
                      >
                        <a className="compare__table-item-name">
                          {item.product_name}
                        </a>
                      </Link>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-category">
                        {item.category?.name}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-price">
                        {formatMoneyVND(item.price)}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-unit">
                        {item.uom.name}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <button
                        className="btn-primary"
                        onClick={() => handleAddToCart(item)}
                      >
                        {language === "vni" ? "Thêm giỏ hàng" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  )
}
