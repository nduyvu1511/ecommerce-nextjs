/* eslint-disable @next/next/no-img-element */
import { isArrayHasValue } from "@/helper"
import { API_URL } from "@/services"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageShow from "../common/imageShow"

interface IProductImage {
  images: Array<string>
  type: "modal" | "detail"
  isStock: boolean
}

export const ProductImg = ({ images, type, isStock }: IProductImage) => {
  const [swiper, setSwiper] = useState<any>({})
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [imageShow, setImageShow] = useState<string>()

  useEffect(() => {
    // if (swiper?.slideTo) {
    //   swiper?.slideTo(1)
    // }
    // setActiveIndex(1)
    // return () => {
    //   setActiveIndex(1)
    //   if (swiper?.slideTo) {
    //     swiper?.slideTo(1)
    //   }
    // }
  }, [])

  return (
    <>
      <div
        className={`product__img-show-container ${
          type === "modal" ? "product__img-show-container-modal" : ""
        }`}
      >
        {/* stock status */}
        {isStock ? (
          <span className="product-status product-status--in-stock">
            Còn hàng
          </span>
        ) : (
          <span className="product-status product-status--out-of-stock">
            Hết hàng
          </span>
        )}

        <Swiper
          slidesPerView={1}
          loop={true}
          onInit={(ev) => {
            ev.init()
            setSwiper(ev)
          }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {isArrayHasValue(images)
            ? images.map((img, index) => (
                <SwiperSlide
                  style={{
                    cursor: `${type === "detail" ? "zoom-in" : "default"}`,
                  }}
                  onClick={() => setImageShow(img)}
                  key={index}
                >
                  <img className="img-fluid" src={`${API_URL}${img}`} alt="" />
                </SwiperSlide>
              ))
            : null}
        </Swiper>

        <div className="product__img-show-sub">
          {images.map((img, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  swiper?.slideTo(index + 1)
                }}
                className={`product__img-show-sub-child ${
                  index === activeIndex - 1 || 0 ? "active" : ""
                }`}
              >
                <img
                  className="product__img-show-sub-item"
                  src={`${API_URL}${img}`}
                  alt=""
                />
              </div>
            )
          })}
        </div>
        {/* <div className="product__img-show-label">23%</div> */}
      </div>

      {imageShow && type === "detail" ? (
        <ImageShow
          onClose={() => setImageShow("")}
          url={`${API_URL}${imageShow || ""}`}
        />
      ) : null}
    </>
  )
}

export default ProductImg
