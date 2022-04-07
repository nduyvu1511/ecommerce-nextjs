import { Product } from "@/models"
import _ from "lodash"
import { RiCloseCircleFill } from "react-icons/ri"
import { useReview } from "shared/hook"
import { Stars } from "../common"
import { ProductDetailLoading } from "../loader"
import ProductImg from "./productImage"
import { ProductIntro } from "./productIntro"

interface ModalProduct {
  handleClickModal?: Function
  type: "detail" | "modal"
  product: Product | null
  isLoading: boolean
}

export const ProductDetail = ({
  handleClickModal,
  type,
  product,
  isLoading,
}: ModalProduct) => {
  const { data: reviewList } = useReview({
    product_id: product?.product_tmpl_id || 0,
  })

  return (
    <>
      {isLoading ? (
        <ProductDetailLoading />
      ) : _.isObject(product) && Object.keys(product).length > 0 ? (
        <div className="modal__product">
          {handleClickModal ? (
            <button
              className="modal__product-btn-close btn-reset"
              onClick={() => handleClickModal && handleClickModal()}
            >
              <RiCloseCircleFill />
            </button>
          ) : null}

          {type === "modal" ? (
            <div className="modal__product-header">
              <h1 className="modal__product-title">{product.product_name}</h1>
              <div className="modal__product-sub">
                <p className="modal__product-sub-brand">
                  Company:{" "}
                  <small className="modal__product-sub-brand-title">
                    {product.company.company_name || "Unknown"}
                  </small>
                </p>

                <div className="modal__product-sub-rating">
                  <Stars count={5} />
                  <small className="modal__product-sub-rating-review">
                    {reviewList?.length || 0} REVIEW
                  </small>
                </div>

                <p className="modal__product-sub-sku">
                  SKU: <small>{product.barcode || "sku default"}</small>
                </p>
              </div>
            </div>
          ) : null}

          <div className="modal__product-content">
            {_.isArray(product.image_url) && product.image_url.length > 0 ? (
              <ProductImg type={type} images={product.image_url} />
            ) : null}
            <ProductIntro type={type} product={product} />
          </div>
        </div>
      ) : null}
    </>
  )
}
