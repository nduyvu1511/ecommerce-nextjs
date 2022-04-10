import { ProductItemLoading } from "@/components"
import { RootState } from "@/core/store"
import { formatMoneyVND, getPriceProduct, isObjectHasValue } from "@/helper"
import { Product } from "@/models"
import {
  addProductCompare,
  addToCart,
  setMessage,
  setProduct,
  toggleModalProduct,
  toggleShowCompareModal
} from "@/modules"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaShoppingBasket } from "react-icons/fa"
import { IoExpandOutline } from "react-icons/io5"
import { RiBarChartFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import ButtonWishlist from "../button/buttonAddWishlist"
import { Star } from "../star"

interface IProductItem {
  product: Product
  type?: string | "sale"
  isLoading?: boolean
}

export const ProductItem = ({ product, type, isLoading }: IProductItem) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    token,
    userInfo: { id: partner_id },
  } = useSelector((state: RootState) => state.user)

  const handleAddToCompareList = () => {
    dispatch(toggleShowCompareModal(true))
    dispatch(addProductCompare(product))
  }

  const handleOpenModalProduct = () => {
    dispatch(toggleModalProduct(true))
    dispatch(setProduct(product))
  }

  const handleAddToCart = () => {
    if (!token || !partner_id) {
      router.push("/login")

      return dispatch(
        setMessage({
          isOpen: true,
          title: "Bạn phải đăng nhập để thêm giỏ hàng",
          type: "warning",
        })
      )
    }

    if (product?.attributes?.length > 0) {
      handleOpenModalProduct()
    } else {
      dispatch(addToCart({ ...product, quantity: 1, partner_id }))
      dispatch(
        setMessage({
          isOpen: true,
          title: "Thêm giỏ hàng thành công!",
        })
      )
    }
  }

  return (
    <>
      {!isLoading && isObjectHasValue(product) ? (
        <div className="product__card">
          <div className="product__card__img">
            <span className="product__card-deal-label">22%</span>
            {/* Show on hover: wishlist, compare, detail  */}
            <div className="product__card__sub">
              {!router.query.productId ? (
                <button
                  onClick={handleOpenModalProduct}
                  className="product__card__sub-item"
                >
                  <IoExpandOutline />
                  <span
                    className="tool-tip"
                    style={{
                      left: `calc(-100% - 40px)`,
                    }}
                  >
                    Xem chi tiết
                  </span>
                </button>
              ) : null}

              <ButtonWishlist type="item" product={product} />

              <button
                onClick={handleAddToCompareList}
                className="product__card__sub-item"
              >
                <RiBarChartFill />
                <span
                  className="tool-tip"
                  style={{
                    left: `calc(-100% - 65px)`,
                  }}
                >
                  Thêm vào so sánh
                </span>
              </button>
            </div>

            {product?.image_url?.length === 1 ? (
              <div
                onClick={() => dispatch(setProduct(product))}
                className="image-container cursor-pointer product__card__img-item cursor-pointer"
              >
                <Link passHref href={`/product/${product.product_tmpl_id}`}>
                  <Image
                    className="image img-cover"
                    src={`${DOMAIN_URL}${product.image_url[0]}`}
                    alt=""
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                  />
                </Link>
              </div>
            ) : (
              <>
                <div
                  onClick={() => dispatch(setProduct(product))}
                  className="image-container cursor-pointer product__card__img-item product__card__img-top product__card__img-top-first"
                >
                  <Link passHref href={`/product/${product.product_tmpl_id}`}>
                    <Image
                      className="image"
                      src={`${DOMAIN_URL}${product.image_url[0]}`}
                      alt=""
                      layout="fill"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    />
                  </Link>
                </div>

                {product.image_url?.[1] ? (
                  <div
                    onClick={() => dispatch(setProduct(product))}
                    className="image-container product__card__img-top product__card__img-item product__card__img-top-second cursor-pointer"
                  >
                    <Link passHref href={`/product/${product.product_tmpl_id}`}>
                      <Image
                        className="image"
                        src={`${DOMAIN_URL}${product.image_url[1]}`}
                        alt=""
                        layout="fill"
                      />
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <div className="product__card-body">
            <div className="product__card__content">
              <Link href={`/product/${product.product_tmpl_id}`} passHref>
                <a className="product__card__content-title">
                  {type === "sale"
                    ? product.product_name
                    : product.product_name}
                </a>
              </Link>

              <p
                className={`product__card__content-status ${
                  !product.product_available
                    ? "product__card__content-status-out-of-stock"
                    : ""
                }`}
              >
                {product.product_available ? "in stock" : "out of stock"}
              </p>

              <div className="product__card__content-rating">
                <Star size={15} ratingValue={product.star_rating * 20} />
                {/* <span className="product__card__content-rating-review">
                  {product.product_available}
                </span> */}
              </div>

              <p className="product__card__content-price">
                <span
                  className={`product__card__content-price ${
                    product?.daily_deal_promotion?.compute_price
                      ? "product__card__content-price-sale"
                      : "product__card__content-price-origin"
                  } `}
                >
                  {formatMoneyVND(product.price)}
                </span>
                {product?.daily_deal_promotion?.compute_price ? (
                  <span className="product__card__content-price product__card__content-price-origin">
                    {formatMoneyVND(getPriceProduct(product))}
                  </span>
                ) : null}
              </p>
            </div>
            <div
              className={` ${
                type === "shop"
                  ? "product__card__bottom-hover"
                  : "product__card__bottom"
              }`}
            >
              <button
                onClick={handleAddToCart}
                className="product__card__bottom-btn"
              >
                <FaShoppingBasket /> Thêm giỏ hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ProductItemLoading />
      )}
    </>
  )
}
