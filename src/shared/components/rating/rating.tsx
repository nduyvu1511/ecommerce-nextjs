/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/core/store"
import { CommentRating } from "@/models"
import { useRouter } from "next/router"
import React from "react"
import { CgSmile } from "react-icons/cg"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useProductRating } from "shared/hook"
import { Pagination } from "../button"
import { Star } from "../star"
import RatingItem from "./ratingItem"

export const Rating = () => {
  const router = useRouter()
  const {
    data: { data: ratingList = [], data_count = 0 } = { data: [] },
    isValidating,
  } = useProductRating({
    product_id: Number(router.query?.productId) || 0,
    shouldFetch: true,
    type: "product",
  })
  const { product } = useSelector((state: RootState) => state.product)

  return (
    <div className="product__rating">
      <header className="product__rating-header">
        <h3>Đánh Giá - Nhận Xét Từ Khách Hàng</h3>

        <div className="product__rating-header-summary">
          <p>{product?.star_rating || 0}</p>
          <Star readonly ratingValue={(product?.star_rating || 0) * 20} />
        </div>

        <p className="product__rating-header-count">
          {data_count || 0} nhận xét
        </p>
      </header>

      {isValidating ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      {/* Raging list */}
      {ratingList?.length > 0 ? (
        <div className="product__rating-body">
          {ratingList.map((rating: CommentRating) => (
            <RatingItem
              onDelete={(id: number) => {}}
              rating={rating}
              key={rating.comment_id}
            />
          ))}
        </div>
      ) : (
        <div className="rating-no-rating">
          <CgSmile />
          <p>Chưa có đánh giá nào cho sản phẩm này</p>
        </div>
      )}

      {/* Pagination */}
      {ratingList?.length > 10 ? (
        <div className="product__rating-pagination">
          <Pagination
            totalPage={6}
            currentPage={1}
            onPaginate={() => console.log()}
          />
        </div>
      ) : null}
    </div>
  )
}
