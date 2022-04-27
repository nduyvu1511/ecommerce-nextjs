import { RootState } from "@/core/store"
import { formatMoneyVND, getPriceProduct } from "@/helper"
import { AttributeWithParentId, Product } from "@/models"
import {
  addProductCompare,
  addToCart,
  changeAttributeItem,
  setMessage,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { FaShoppingBasket } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { RiArrowUpDownLine, RiMessage2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { ButtonAddCard } from "../button"
import ButtonWishlist from "../button/buttonAddWishlist"
import ButtonShare from "../button/buttonShare"
import { InputQuantity } from "../inputs"
import { Star } from "../star"
import { ProductVariation } from "./productVariation"

interface IProductIntro {
  product: Product
  type: "detail" | "item" | "modal"
}

export const ProductIntro = ({ product, type }: IProductIntro) => {
  const dispatch = useDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { token, userInfo: { id: partner_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const { listAttribute } = useSelector((state: RootState) => state.product)

  const [openVariantModal, setOpenVariantModal] = useState<
    "buy" | "cart" | ""
  >()
  const [quantity, setQuantity] = useState<number>(1)

  // Functions
  const handleChangeVariantAttribute = (att: AttributeWithParentId) => {
    dispatch(changeAttributeItem(att))
  }

  const handleAddOrBuyProduct = () => {
    if (!token || !partner_id) {
      router.push("/login")
      return
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
        partner_id,
        attribute_names: listAttribute?.map((item) => item.name) || [],
      })
    )

    if (openVariantModal === "buy") {
      setOpenVariantModal("")
      router.push("/cart")
    } else {
      dispatch(setMessage({ title: "Thêm giỏ hàng thành công" }))
    }
  }

  const handleAddToCompareList = () => {
    if (type === "detail" || type === "item") {
      dispatch(toggleShowCompareModal(true))
    } else {
      dispatch(setMessage({ title: "Đã thêm vào danh sách so sánh" }))
    }

    dispatch(addProductCompare(product))
  }

  return (
    <>
      <div
        ref={divRef}
        className={`product__intro ${
          type === "item" ? "product__intro-horizontal" : ""
        }`}
      >
        {type === "detail" ? (
          <div className="modal__product-header">
            <p className="modal__product-title">{product.product_name}</p>

            <div className="modal__product-sub">
              <p className="modal__product-sub-item modal__product-sub-item-star">
                <Star
                  ratingValue={product.star_rating * 20}
                  size={15}
                  readonly
                />
              </p>

              <p className="modal__product-sub-item modal__product-sub-item-rating">
                {product.rating_count} đánh giá
              </p>

              <p className="modal__product-sub-item modal__product-sub-item-comment">
                {product.comment_count} bình luận
              </p>
            </div>
          </div>
        ) : null}
        {type === "item" ? (
          <Link
            href={`/product/${
              product.attributes.length > 0
                ? product.product_tmpl_id
                : product.product_prod_id
            }`}
            passHref
          >
            <a className="product__intro-title">{product.product_name}</a>
          </Link>
        ) : null}
        {type !== "item" ? (
          <div className="product__intro-price">
            <div className="product__intro-price-wrapper">
              <p
                className={`${
                  product?.daily_deal_promotion?.compute_price
                    ? "product__intro-price-old"
                    : "product__intro-price-current"
                }`}
              >
                {formatMoneyVND(
                  product?.daily_deal_promotion?.compute_price
                    ? product.price * quantity
                    : getPriceProduct(product) * quantity
                )}
              </p>

              {product?.daily_deal_promotion?.compute_price ? (
                <p className="product__intro-price-current">
                  {formatMoneyVND(getPriceProduct(product) * quantity)}
                </p>
              ) : null}

              <span className="product__intro-price-unit">
                / {quantity > 1 ? quantity : ""} {product?.uom?.name}
              </span>
            </div>

            {/* <ProductDetailCountdown targetDate="" /> */}
          </div>
        ) : null}

        {type !== "item" &&
        product?.attributes &&
        product.attributes.length > 0 ? (
          <div className="product__intro-variation-wrapper">
            {product.attributes.map((att) => (
              <ProductVariation
                onChangeAttribute={(att: AttributeWithParentId) =>
                  handleChangeVariantAttribute(att)
                }
                attribute={att}
                key={att.id}
              />
            ))}
          </div>
        ) : null}

        {type !== "item" ? (
          <div className="product__intro-quantity">
            <p>Số lượng</p>
            <InputQuantity
              quantity={quantity}
              onChangeQuantity={(q: number) => setQuantity(q)}
            />
          </div>
        ) : null}

        {type !== "item" ? (
          <div className="product__intro-shop">
            {type === "detail" ? (
              <button
                onClick={() => setOpenVariantModal("buy")}
                className="btn-primary product__intro-shop-cart-btn"
              >
                <span>Mua ngay</span>
              </button>
            ) : null}

            <ButtonAddCard
              product={product}
              quantity={quantity}
              type="detail"
            />

            {type === "detail" ? (
              <button
                onClick={() => setOpenVariantModal("cart")}
                className="product__intro-shop-btn-sm product__intro-shop-cart-mobile"
              >
                <FaShoppingBasket />
                <span>Thêm giỏ hàng</span>
              </button>
            ) : null}

            {type === "detail" ? (
              <button className="product__intro-shop-btn-sm product__intro-shop-chat-btn">
                <RiMessage2Fill />
                <span>Nhắn tin</span>
              </button>
            ) : null}
          </div>
        ) : null}
        {type === "item" ? (
          <div className="product__intro-price product__intro-price-sm">
            <p
              className={`${
                product?.daily_deal_promotion?.compute_price
                  ? "product__intro-price-old"
                  : "product__intro-price-current"
              }`}
            >
              {formatMoneyVND(
                product?.daily_deal_promotion?.compute_price
                  ? product.price * quantity
                  : getPriceProduct(product) * quantity
              )}
            </p>

            {product?.daily_deal_promotion?.compute_price ? (
              <p className="product__intro-price-current">
                {formatMoneyVND(getPriceProduct(product) * quantity)}
              </p>
            ) : null}

            <span className="product__intro-price-unit">
              / {quantity > 1 ? quantity : ""} {product?.uom?.name}
            </span>
          </div>
        ) : null}
        <div className="product__intro-sub">
          <ButtonWishlist product={product} type="detail" />

          <button
            onClick={handleAddToCompareList}
            className="product__intro-sub-item"
          >
            <RiArrowUpDownLine />
            So sánh
          </button>
        </div>
        {type === "item" ? (
          <ButtonAddCard
            className="product__intro-shop-btn-sm"
            product={product}
            quantity={quantity}
            type="detail"
          />
        ) : null}

        {type !== "item" ? (
          <div className="product__intro-bottom">
            <p className="product__intro-item product__intro-category">
              Category:{" "}
              <span className="product__intro-item-sub">
                {product.category.name}
              </span>
            </p>

            <p className="product__intro-item product__intro-tags">
              Tags:{" "}
              <span className="product__intro-item-sub">
                {product.category.name}, {product.barcode}
              </span>
            </p>
          </div>
        ) : null}
        {type !== "item" ? (
          <ButtonShare
            product_id={product.product_tmpl_id}
            imageUrl={`${process.env.REACT_APP_API_URL}${product.image_url[0]}`}
            name={product.product_name}
            description={product.description}
          />
        ) : null}
      </div>

      {openVariantModal && type === "detail" ? (
        <>
          <div className="product__variant-modal">
            <header className="product__variant-modal-header">
              <div className="product__variant-modal-header-left">
                {product?.image_url?.[0] ? (
                  <div className="image-container">
                    <Image
                      src={`${API_URL}${product?.image_url?.[0] || ""}`}
                      alt=""
                      layout="fill"
                      className="image"
                    />
                  </div>
                ) : null}

                <p>
                  {formatMoneyVND((product.price || 0) * quantity)}
                  <span>/</span>
                  <span>
                    {quantity} {product.uom.name}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setOpenVariantModal("")}
                className="btn-reset"
              >
                <IoClose />
              </button>
            </header>

            {product.attributes?.length > 0 ? (
              <div className="product__variant-modal-variants">
                {product.attributes.map((att) => (
                  <ProductVariation
                    onChangeAttribute={(att: AttributeWithParentId) =>
                      handleChangeVariantAttribute(att)
                    }
                    attribute={att}
                    key={att.id}
                  />
                ))}
              </div>
            ) : null}

            <div className="product__variant-modal-quantity">
              <p>Số lượng</p>
              <InputQuantity
                quantity={quantity}
                onChangeQuantity={(q: number) => setQuantity(q)}
              />
            </div>

            <div className="product__variant-modal-btn">
              <button onClick={handleAddOrBuyProduct} className="btn-primary">
                {openVariantModal === "buy" ? "Mua ngay" : "Thêm giỏ hàng"}
              </button>
            </div>
          </div>

          <div
            onClick={() => setOpenVariantModal("")}
            className="product__variant-modal-overlay"
          ></div>
        </>
      ) : null}
    </>
  )
}
