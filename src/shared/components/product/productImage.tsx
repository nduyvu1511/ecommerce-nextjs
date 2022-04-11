/* eslint-disable @next/next/no-img-element */
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { DOMAIN_URL } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import ImageShow from "../common/imageShow"

interface IProductImage {
  images: Array<string>
  type: "modal" | "detail"
}

export const ProductImg = ({ images, type }: IProductImage) => {
  const [swiper, setSwiper] = useState<any>({})
  const [activeIndex, setActiveIndex] = useState<number>(1)
  const [imageShow, setImageShow] = useState<string>()

  useEffect(() => {
    return () => {
      setActiveIndex(1)
      console.log("unmount")
      if (isObjectHasValue(swiper)) {
        swiper?.slideTo(1)
      }
      // setSwiper({})
    }
  }, [])

  return (
    <>
      <div className="product__img-show-container">
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
                  <img
                    className="img-fluid"
                    src={`${DOMAIN_URL}${img}`}
                    alt=""
                  />
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
                  src={`${DOMAIN_URL}${img}`}
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
          url={`${DOMAIN_URL}${imageShow || ""}`}
        />
      ) : null}
    </>
  )
}

export default ProductImg
