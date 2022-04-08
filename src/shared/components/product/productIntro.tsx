import { formatMoneyVND, getPriceProduct } from "@/helper"
import { AttributeWithParentId, Product } from "@/models"
import {
  addProductCompare,
  changeAttributeItem,
  toggleShowCompareModal,
} from "@/modules"
import Link from "next/link"
import { useRef, useState } from "react"
import { RiArrowUpDownLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useReview } from "shared/hook"
import { ButtonAddCard } from "../button"
import ButtonWishlist from "../button/buttonAddWishlist"
import ButtonShare from "../button/buttonShare"
import { Rating } from "../star/star"
import { Stars } from "../common"
import { InputQuantity } from "../inputs"
import { ProductVariation } from "./productVariation"

interface IProductIntro {
  product: Product
  type: "detail" | "item" | "modal"
}

export const ProductIntro = ({ product, type }: IProductIntro) => {
  const dispatch = useDispatch()
  const language = "vni"
  const divRef = useRef<HTMLDivElement>(null)

  const { data: reviewList } = useReview({
    product_id: product.product_tmpl_id,
  })

  const [quantity, setQuantity] = useState<number>(1)

  const handleChangeVariantAttribute = (att: AttributeWithParentId) => {
    dispatch(changeAttributeItem(att))
  }

  const handleAddToCompareList = () => {
    if (type === "detail" || type === "item") {
      dispatch(toggleShowCompareModal(true))
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
              <p className="modal__product-sub-brand">
                Brands:{" "}
                <small className="modal__product-sub-brand-title">
                  {product.company.company_name || "Unknown"}
                </small>
              </p>

              <div className="modal__product-sub-rating">
                {/* <Rating
                  ratingValue={4.3}
                  allowHalfIcon={true}
                  allowHover={false}
                /> */}
                <Stars count={0} />
                <small className="modal__product-sub-rating-review">
                  {reviewList?.length || 0}{" "}
                  {language === "vni" ? "Đánh giá" : "REVIEWS"}`
                </small>
              </div>

              <p className="modal__product-sub-sku">
                Unit: <small>{product.uom.name}</small>
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

        {product.qty_available ? (
          <p
            className={`product__intro-status in-stock ${
              type === "item" ? "product__intro-status-sm" : ""
            }`}
          >
            {language === "vni" ? "còn hàng" : "in stock"}
          </p>
        ) : (
          <p
            className={`product__intro-status out-of-stock ${
              type === "item" ? "product__intro-status-sm" : ""
            }`}
          >
            {language === "vni" ? "hết hàng" : "out of stock"}
          </p>
        )}

        {/* {product.qty_available === 0 ? (
          <p
            className={`product__intro-status ${
              type === 'item' ? 'product__intro-status-sm' : ''
            } ${product.qty_available ? 'in-stock' : ''}`}>
            {language === 'vni' ? 'Hết hàng' : ' out of stock'}
          </p>
        ) : null} */}

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
          <div className="product__intro-shop">
            <InputQuantity
              quantity={quantity}
              onChangeQuantity={(q: number) => setQuantity(q)}
            />

            <ButtonAddCard
              product={product}
              quantity={quantity}
              type="detail"
            />
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
            {console.log(product.daily_deal_promotion)}
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
            Compare
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
            imageUrl={`${process.env.REACT_APP_DOMAIN_URL}${product.image_url[0]}`}
            name={product.product_name}
            description={product.description}
          />
        ) : null}
      </div>
    </>
  )
}
