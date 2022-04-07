import React from "react"
import { ProductItemLoading } from "./productItemLoading"

type Props = {
  item: number
}

const HomeProductSlideLoading = ({ item }: Props) => {
  return (
    <div className="product__slide__loading">
      <div className="container">
        <div className="product__slide__loading-header">
          <div className="product__slide__loading-header-left">
            <div className="product__slide__loading-header-left-title"></div>
            <div className="product__slide__loading-header-left-desc"></div>
          </div>
          <div className="product__slide__loading-header-right"></div>
        </div>

        <div
          className={`product__slide__loading-products ${
            item === 5 ? "product__slide__loading-products-5" : ""
          }`}
        >
          {Array.from({ length: item }).map((_, index) => (
            <ProductItemLoading key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeProductSlideLoading
