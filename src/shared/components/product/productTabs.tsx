import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useReview } from "shared/hook"
import { Rating } from "../rating"
import ProductReview from "../review/review"

export const ProductTabs = ({ description }: { description: string }) => {
  const language = "vni"
  const router = useRouter()

  const { data: reviews } = useReview({
    product_id: Number(router.query.productId),
  })

  const [tabOpen, setTabOpen] = useState<"description" | "review" | "rating">(
    "rating"
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
            ? `Hỏi đáp (${reviews?.length || 0})`
            : `Q&A (${reviews?.length || 0})`}
        </h5>

        <h5
          onClick={() => setTabOpen("rating")}
          className={`product__detail-tabs-header-heading ${
            tabOpen === "rating"
              ? "product__detail-tabs-header-heading-active"
              : ""
          }`}
        >
          {language === "vni" ? `Đánh giá` : "Product Ratings"}
        </h5>
      </div>

      <div className="product__detail-tabs-content">
        {tabOpen === "description" ? (
          <div className="product__detail-tabs-content-desc">
            <p className="product__tab-content-text">
              <div
                className="product__tab-content-desc"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </p>
          </div>
        ) : null}

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
