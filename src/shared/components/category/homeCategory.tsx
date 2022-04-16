import { CategoryItem } from "@/components"
import { isArrayHasValue } from "@/helper"
import { Category as ICategory } from "@/models"
import { useCategory } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { CategoryItemLoading } from "../loader"

export const HomeCategory = () => {
  const { data: parentCategories = [], isValidating } = useCategory()

  return (
    <div className="home__category">
      <div className="home__heading">
        <div className="home__heading-text">
          <h3 className="home__baner-category-heading">Danh mục sản phẩm</h3>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={4}
        navigation
        loop={false}
        breakpoints={{
          400: {
            slidesPerView: 4,
          },
          500: {
            slidesPerView: 5,
          },
          576: {
            slidesPerView: 6,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
          1200: {
            slidesPerView: 12,
          },
        }}
      >
        {isValidating && !isArrayHasValue(parentCategories)
          ? Array.from({ length: 12 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CategoryItemLoading />
              </SwiperSlide>
            ))
          : parentCategories.map((cate: ICategory) => (
              <>
                {cate.icon ? (
                  <SwiperSlide key={cate.id}>
                    <CategoryItem category={cate} />
                  </SwiperSlide>
                ) : null}
              </>
            ))}
      </Swiper>
    </div>
  )
}
