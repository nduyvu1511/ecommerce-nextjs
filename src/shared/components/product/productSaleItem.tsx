import { Product, ProductSale as IProductSale } from "@/models"
import Link from "next/link"
import { useEffect } from "react"
import { CgArrowLongRight } from "react-icons/cg"
import { useCountdown } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

import { isObjectHasValue } from "../../helper/functions"
import Countdown from "../common/countdown"
import { ProductItem } from "./productItem"

interface ProductSaleItemProps {
  productSale: IProductSale
  isLoading: boolean
  setProductsSale: Function
}

export const ProductSaleItem = ({
  productSale,
  isLoading,
  setProductsSale,
}: ProductSaleItemProps) => {
  const language = "vni"

  const [days, hours, minutes, seconds] = useCountdown({
    targetDate: productSale?.end_date || "",
  })

  useEffect(() => {
    if (seconds === 0 && days === 0 && hours === 0 && minutes === 0) {
      setProductsSale && setProductsSale(productSale?.deal_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, hours, minutes, seconds])

  return (
    <>
      {isObjectHasValue(productSale) ? (
        <div className="product__sale">
          <div className="home__heading">
            <div className="home__heading-text">
              <div className="home__heading-text-sale">
                <h3>{productSale?.deal_name || "Flash sale"}</h3>
                <Countdown
                  days={days}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              </div>
              <p>
                {language === "vni"
                  ? productSale?.deals_title ||
                    "Đừng bỏ lỡ nhưng ưu đãi mới nhất"
                  : productSale?.deals_title || `Don't miss the latest offers`}
              </p>
            </div>
            <div className="home__heading-btn cursor-pointer">
              <Link passHref href={`/shop?type_get=sale`}>
                <>
                  <p>{language === "vni" ? "Xem tất cả" : "View All"} </p>
                  <CgArrowLongRight />
                </>
              </Link>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            navigation
            spaceBetween={15}
            breakpoints={{
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
          >
            {productSale?.product_promotion?.length > 0 &&
              productSale.product_promotion.map((product: Product, index) => (
                <SwiperSlide key={index}>
                  <ProductItem
                    isLoading={isLoading}
                    product={product}
                    type="sale"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : null}
    </>
  )
}