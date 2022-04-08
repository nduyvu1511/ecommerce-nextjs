/* eslint-disable @next/next/no-img-element */
import {
  BannerLoading,
  Category,
  CategoryItem,
  CategoryListLoading,
  CategoryLoading,
  ModalHeading,
} from "@/components"
import { Category as ICategory } from "@/models"
import { DOMAIN_URL } from "@/services"
import { useCategory } from "shared/hook"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { isArrayHasValue } from "../../shared/helper/functions"

export const MainBanner = () => {
  const { bannerUrls, data: categories, isValidating } = useCategory()

  return (
    <div className="home__banner">
      <div className="home__banner-left">
        {isValidating && !isArrayHasValue(categories) ? (
          <CategoryLoading />
        ) : (
          <>
            <ModalHeading title={"Danh mục"} />
            <Category type="large" />
          </>
        )}
      </div>

      <div className="home__banner-banner">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          // autoplay={{
          //   delay: 4000,
          //   disableOnInteraction: false,
          // }}
        >
          {!isValidating && isArrayHasValue(bannerUrls) ? (
            bannerUrls.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="image-container">
                  <img src={`${DOMAIN_URL}${banner}`} alt="" />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <BannerLoading />
          )}
        </Swiper>

        <div className="home__banner-category">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={20}
            navigation
            loop={false}
            breakpoints={{
              400: {
                slidesPerView: 4,
              },
              576: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 6,
              },
              1024: {
                slidesPerView: 7,
              },
              1200: {
                slidesPerView: 8,
              },
            }}
          >
            {isValidating &&
            !isArrayHasValue(categories) &&
            !isArrayHasValue(bannerUrls) ? (
              <CategoryListLoading length={6} />
            ) : (
              categories.map((cate: ICategory) => (
                <SwiperSlide key={cate.id}>
                  {cate.icon ? <CategoryItem category={cate} /> : null}
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
