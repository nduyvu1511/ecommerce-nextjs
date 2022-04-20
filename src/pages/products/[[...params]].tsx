import {
  Breadcrumb,
  ButtonSeeMore,
  ProductItem,
  ProductItemLoading,
} from "@/components"
import ProductFilter from "@/components/product/productFilter"
import { isArrayHasValue } from "@/helper"
import { MainLayout } from "@/layout"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useQueryProducts } from "shared/hook"

const ProductList = () => {
  const router = useRouter()
  const {
    products,
    handleFilter,
    handleChangePage,
    isFetching,
    isLimit,
    isLoadingMore,
  } = useQueryProducts()

  useEffect(() => {
    // if (!isObjectHasValue(router.query)) return
    handleFilter({ ...router.query, offset: Number(router.query?.offset) || 0 })
  }, [router.query])

  return (
    <section className="product__list">
      <div className="container">
        <Breadcrumb
          breadcrumbList={[{ name: "Danh sách sản phẩm", path: "/" }]}
        />

        <ProductFilter />

        <div className="product__list-container">
          <div
            className={`product__list-container grid grid-col-2 grid-col-sm-3 grid-col-lg-4
            grid-col-1024-5 grid-col-xl-6`}
          >
            {isFetching
              ? Array.from({ length: 24 }).map((_, index) => (
                  <ProductItemLoading key={index} />
                ))
              : null}

            {!isFetching &&
              products?.length > 0 &&
              products.map((product, index) => (
                <ProductItem type="shop" key={index} product={product} />
              ))}
          </div>

          {!isLimit && isArrayHasValue(products) ? (
            <ButtonSeeMore
              isLoading={isLoadingMore}
              onClick={() => handleChangePage()}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}

ProductList.Layout = MainLayout

export default ProductList

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   }
// }
