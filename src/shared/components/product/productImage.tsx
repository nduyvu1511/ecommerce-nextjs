/* eslint-disable @next/next/no-img-element */
import { DOMAIN_URL } from "@/services"
import { useEffect, useState } from "react"

interface IProductImage {
  images: Array<string>
  type: "modal" | "detail"
}

export const ProductImg = ({ images, type }: IProductImage) => {
  const [slideIndex, setSlideIndex] = useState(0)

  const [imageZoomPosition, setImageZoomPosition] = useState("0% 0%")

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setImageZoomPosition(`${x}% ${y}%`)
  }

  useEffect(() => {
    if (slideIndex > 0) setSlideIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  return (
    <>
      <div className="product__img-show">
        <div
          style={{
            backgroundPosition: imageZoomPosition,
            backgroundImage: `url(${DOMAIN_URL}${images[slideIndex]})`,
          }}
          onMouseMove={handleMouseMove}
          onMouseOut={() => setImageZoomPosition(`${0}% ${0}%`)}
          className={`product__img-show-container ${
            type === "detail" ? "product__img-show-container-detail" : ""
          }`}
        >
          {images.map((img, index) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                }}
                className="product__img-show-banner"
                src={`${DOMAIN_URL}${img}`}
                alt=""
              />
            )
          })}
        </div>

        <div className="product__img-show-sub">
          {images.map((img, index) => {
            return (
              <div
                key={index}
                onClick={() => setSlideIndex(index)}
                className={`product__img-show-sub-child ${
                  index === slideIndex ? "active" : ""
                }`}
              >
                <img
                  className="product__img-show-sub-item"
                  src={`${DOMAIN_URL}${img}`}
                  alt=""
                />
              </div>
            )
          })}
        </div>
        {/* <div className="product__img-show-label">23%</div> */}
      </div>
    </>
  )
}

export default ProductImg
