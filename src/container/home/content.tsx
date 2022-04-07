import {
  CategoryLoading,
  HomeHeading,
  ProductItem,
  ProductPromotion,
  ProductTrending,
} from "@/components"
import HomeProductSlideLoading from "@/components/loader/homeProductSlideLoading"
import Image from "next/image"
import Link from "next/link"
import { useProduct } from "shared/hook"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { bannerBox2 } from "../../shared/assets"
import { isArrayHasValue } from "../../shared/helper/functions"
import reviewList from "./data"
import { HomeSlideProduct } from "./homeSlide"

export const MainContent = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const language = "vni"
  const { data: topProducts, isValidating: isTopLoading } = useProduct({
    key: "top_products",
    params: { type_get: "sale" },
  })
  const { data: newProducts, isValidating: isLoading } = useProduct({
    key: "products",
    params: { type_get: "new" },
  })
  const { data: leftProducts, isValidating: isProducTrendingLoading } =
    useProduct({
      key: "left_products",
      params: { type_get: "new", limit: 6, offset: 1 },
    })

  return (
    <section className="home__content">
      {/* Left */}
      <div className="home__content-left">
        <div className="home__content-left-trending">
          <h3 className="home__content-left-heading">
            {language === "vni" ? "Sản phẩm nổi bật" : "trending products"}
          </h3>
          <div className="home__content-left-trending-wrapper">
            {topProducts?.length > 0 &&
              topProducts.map((product, index) => (
                <ProductTrending
                  isLoading={isTopLoading}
                  key={index}
                  product={product}
                />
              ))}
          </div>
        </div>

        {/* Review Slide */}
        <div className="home__content-left-review">
          <h3 className="home__content-left-heading">
            {language === "vni"
              ? "Đánh giá của Khách hàng "
              : "Customer Comment"}
          </h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {reviewList.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review">
                  <div className="review__content">
                    <h3 className="review__content-heading">
                      {language === "vni" ? review.vniTitle : review.engTitle}
                    </h3>
                    <p className="review__content-text">
                      {language === "vni" ? review.vniDesc : review.engDesc}
                    </p>
                  </div>
                  <div className="review__user">
                    <div className="review__user-img image-container">
                      <Image
                        src={review.image}
                        alt=""
                        className="image"
                        layout="fill"
                      />
                    </div>
                    <p>
                      <span className="review__user-name">{review.name}</span>
                      <span className="review__user-job">{review.job}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {isProducTrendingLoading ? (
          <CategoryLoading />
        ) : (
          <div className="home__content-left-new">
            <h3 className="home__content-left-heading">
              {language === "vni" ? "Sản phẩm mới" : "New products"}
            </h3>
            <div className="home__content-left-trending-wrapper">
              {leftProducts?.length > 0 &&
                leftProducts.map((product, index) => (
                  <ProductTrending
                    isLoading={isProducTrendingLoading}
                    key={index}
                    product={product}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="home__content-right">
        {newProducts?.length === 0 ? (
          <HomeProductSlideLoading item={4} />
        ) : (
          <HomeSlideProduct
            path="/shop"
            name="Bán Chạy"
            title="Đừng bỏ lỡ nhưng ưu đãi mới nhất"
          >
            <div className="home__banner-products-slider">
              {newProducts?.length > 0 && (
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={2}
                  navigation
                  spaceBetween={15}
                  breakpoints={{
                    576: {
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {newProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                      <ProductItem isLoading={isLoading} product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </HomeSlideProduct>
        )}

        <div className="home__content-right-banner-first">
          <div className="home__content-right-banner-first-content">
            <h5>
              {language === "vni"
                ? "Luôn chăm sóc sức khỏe"
                : "Always Taking Care"}
            </h5>
            <h3>
              {language === "vni"
                ? "Tại cửa hàng hoặc trực tuyến, sức khỏe và sự an toàn của bạn là ưu tiên hàng đầu của chúng tôi"
                : "In store or online your health & safety is our top priority"}
            </h3>
          </div>
          <div className="home__content-right-banner-first-img image-container">
            <Image layout="fill" className="image" src={bannerBox2} alt="" />
          </div>
        </div>

        <div className="home__content-right-hot-product">
          {newProducts?.[2]?.product_name ? (
            <div>
              <HomeHeading
                name="Sản phẩm hot trong ngày"
                title="Đừng bỏ lỡ cơ hội này với mức giảm giá đặc biệt chỉ trong ngày"
                path="/shop"
              />
              <div className="home__content-right-hot-product-wrapper">
                <ProductPromotion />
              </div>
            </div>
          ) : null}

          <div className="home__content-right-promotion">
            <Link href="/shop?type_get=sale" passHref>
              <div className="home__content-right-promotion-link cursor-pointer">
                <p>Siêu giảm giá cho lần mua hàng đầu tiên của bạn</p>
                <h5>free25bac</h5>
                <small>
                  {language === "vni"
                    ? "Sử dụng mã giảm giá khi thanh toán"
                    : "Use discount code in checkout"}
                </small>
              </div>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <HomeProductSlideLoading item={8} />
        ) : (
          <HomeSlideProduct
            name="Sản phẩm mới"
            title="Những sản phẩm mới nhất đến từ shop"
            path="/shop?type_get=new"
          >
            <div className="home__content-right-new-products grid grid-col-1 grid-col-xs-2 grid-col-md-3 grid-col-xl-4">
              {isArrayHasValue(newProducts) &&
                newProducts
                  .slice(0, 8)
                  .map((product, index) => (
                    <ProductItem
                      isLoading={isTopLoading}
                      type="shop"
                      key={index}
                      product={product}
                    />
                  ))}
            </div>
          </HomeSlideProduct>
        )}
      </div>
    </section>
  )
}
