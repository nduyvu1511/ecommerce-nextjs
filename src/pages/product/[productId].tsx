import {
  Breadcrumb,
  ProductDetail,
  ProductDetailLoading,
  ProductItem,
  ProductTabs,
} from "@/components"
import {
  getAttributeList,
  getListAttributeId,
  isArrayHasValue,
  isObjectHasValue,
  mergeProductAndProductDetail,
} from "@/helper"
import { MainLayout } from "@/layout"
import { Product, ProductDetail as IProductDetail } from "@/models"
import { setAttributeList, setProduct } from "@/modules"
import productApi from "@/services/productApi"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useProductDetail, useReview, useWishlist } from "shared/hook"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

interface ProduductDetailPageProps {
  product: IProductDetail
}

const ProductDetailPage = ({ product }: ProduductDetailPageProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useWishlist(true)
  const language = "vni"

  const { clearComments } = useReview({
    product_id: Number(router.query.productId) || 0,
  })

  const getProductsFromSession = sessionStorage.getItem("viewedProducts")
  const [viewedproducts, setViewedProducts] = useState<Array<Product>>(
    getProductsFromSession ? JSON.parse(getProductsFromSession) : []
  )
  const [relatedProducts, setRelatedProducts] = useState<Array<Product>>()

  const { product: productDetail, clearProductDetail } = useProductDetail({
    product,
  })

  // Get viewed products by session storage
  useEffect(() => {
    if (router.query?.productId && product?.category?.id) {
      productApi
        .getProductList({ category_id: Number(product.category.id), limit: 8 })
        .then((res: any) => {
          const products: Product[] = res.result

          setRelatedProducts(
            [...products].filter(
              (item) => item.product_tmpl_id !== product.product_tmpl_id
            )
          )
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.productId])

  // assign false to ref if the product detail page is unmount
  useEffect(() => {
    if (!isObjectHasValue(product)) return

    dispatch(setProduct(product))
    const attributeList = getAttributeList(product)
    if (isArrayHasValue(attributeList)) {
      dispatch(setAttributeList(attributeList))
    }

    return () => {
      clearProductDetail()
      dispatch(setProduct(null))
      clearComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.productId])

  useEffect(() => {
    document.title = product?.name || ""
  }, [])

  // Get viewed recently products
  useEffect(() => {
    if (!isObjectHasValue(product)) return

    if (isArrayHasValue(viewedproducts)) {
      const existProduct = viewedproducts.find(
        (pro) => pro.product_tmpl_id === product.product_tmpl_id
      )

      if (existProduct) {
        const newProducts = [...viewedproducts].filter(
          (product) => product.product_tmpl_id !== existProduct.product_tmpl_id
        )
        return setViewedProducts([existProduct, ...newProducts])
      }
    }

    const newProducts = [product, ...viewedproducts]

    sessionStorage.setItem("viewedProducts", JSON.stringify(newProducts))

    setViewedProducts(newProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, product])

  if (router.isFallback)
    return (
      <div className="product__detail-loading">
        <div className="container">
          <ProductDetailLoading />
        </div>
      </div>
    )

  return (
    <div className="product__detail-container">
      <div className="container">
        {isObjectHasValue(product) ? (
          <Breadcrumb
            page={product.category.name}
            path={`/shop?category_id=${product.category.id}`}
            child={product.product_name.split(" - ")[0]}
          />
        ) : null}
        <section className="product__detail-wrapper">
          <ProductDetail
            isLoading={false}
            product={isObjectHasValue(productDetail) ? productDetail : product}
            type="detail"
          />
        </section>
        <div className="product__detail-tabs-wrapper">
          <ProductTabs description={product?.description || ""} />
        </div>

        {/* Related Products */}
        {isArrayHasValue(relatedProducts) ? (
          <div className="product__detail-related">
            <h3 className="product__detail-heading">
              {language === "vni" ? "sản Phẩm liên quan" : "Related products"}
            </h3>
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              navigation
              spaceBetween={5}
              breakpoints={{
                576: {
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
            >
              {relatedProducts &&
                isArrayHasValue(relatedProducts) &&
                relatedProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductItem product={product} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        ) : null}

        {isArrayHasValue(viewedproducts) ? (
          <div className="product__detail-recently">
            <h3 className="product__detail-heading">
              {language === "vni"
                ? "Sản phẩm đã xem"
                : "Viewed recently products"}
            </h3>
            <Swiper
              className={`${
                viewedproducts.length <= 4 ? "swiper-hide-navigation" : ""
              }`}
              modules={[Navigation]}
              slidesPerView={2}
              navigation
              spaceBetween={5}
              breakpoints={{
                576: {
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
            >
              {viewedproducts.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
      </div>
    </div>
  )
}

ProductDetailPage.Layout = MainLayout

export default ProductDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await productApi.getProductList({ limit: 100 })

  return {
    paths: res.result.map((item: Product) => ({
      params: { productId: item.product_tmpl_id + "" },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const product_id = Number(context.params?.productId) || 0

  const {
    result: [product],
  }: any = await productApi.getProductList({
    product_id,
  })

  if (!isObjectHasValue(product))
    return {
      notFound: true,
    }

  const {
    result: {
      data: { detail: productDetail },
    },
  }: any = await productApi.getProductDetail({
    product_id: product.product_prod_id,
    list_products: [getListAttributeId(product)],
  })

  let newProduct: IProductDetail | null = null

  if (isObjectHasValue(product) && isObjectHasValue(productDetail)) {
    newProduct = mergeProductAndProductDetail({ product, productDetail })
  }

  return {
    props: {
      product: newProduct,
    },
    revalidate: 10,
  }
}
