import { Product } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Rating } from "../rating"
import { ProductReview } from "../review"

export const ProductTabs = ({ product }: { product: Product }) => {
  const language = "vni"
  const router = useRouter()

  const [tabOpen, setTabOpen] = useState<"description" | "review" | "rating">(
    "description"
  )

  useEffect(() => {
    return () => {
      setTabOpen("description")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.productId])

  return (
    <section className="product__detail-tabs">
      <div className="product__detail-tabs-header">
        <h5
          onClick={() => setTabOpen("description")}
          className={`product__detail-tabs-header-heading ${
            tabOpen === "description"
              ? "product__detail-tabs-header-heading-active"
              : ""
          }`}
        >
          {language === "vni" ? "Mô tả" : "Description"}
        </h5>

        <h5
          onClick={() => setTabOpen("review")}
          className={`product__detail-tabs-header-heading ${
            tabOpen === "review"
              ? "product__detail-tabs-header-heading-active"
              : ""
          }`}
        >
          {language === "vni"
            ? `Hỏi đáp (${product.comment_count})`
            : `Q&A (${product.comment_count})`}
        </h5>

        <h5
          onClick={() => setTabOpen("rating")}
          className={`product__detail-tabs-header-heading ${
            tabOpen === "rating"
              ? "product__detail-tabs-header-heading-active"
              : ""
          }`}
        >
          {language === "vni"
            ? `Đánh giá (${product.rating_count})`
            : "Product Ratings"}
        </h5>
      </div>

      <div className="product__detail-tabs-content">
        {tabOpen === "description" ? (
          <div className="product__detail-tabs-content-desc">
            <p className="product__tab-content-text">
              <div
                style={{ overflow: "hidden" }}
                className="product__tab-content-desc"
                dangerouslySetInnerHTML={{ __html: product?.description || "" }}
              ></div>

              {!product?.description ? (
                <p>Không có mô tả nào cho sản phẩm này</p>
              ) : null}
            </p>
          </div>
        ) : null}

        {console.log(product.description)}

        {tabOpen === "review" ? (
          <div className="product__detail-tabs-content-info">
            <ProductReview />
          </div>
        ) : null}

        {tabOpen === "rating" ? (
          <div className="product__detail-tabs-content-info">
            <Rating />
          </div>
        ) : null}
      </div>
    </section>
  )
}
