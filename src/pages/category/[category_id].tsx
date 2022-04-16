/* eslint-disable @next/next/no-img-element */
import { filterNotFound } from "@/assets"
import {
  BoxGridLoading,
  Breadcrumb,
  CategoryLoading,
  Dropdown,
  Modal,
  ModalHeading,
  ProductItem,
  ProductItemList,
  ProductItemLoading,
  ShopFilter,
} from "@/components"
import {
  DEFAULT_LIMIT_PRODUCT,
  isArrayHasValue,
  isObjectHasValue,
  limitProductList,
  listView,
  sortList,
} from "@/helper"
import { MainLayout } from "@/layout"
import {
  BreadcrumbItem,
  Category as ICategory,
  ParentChildCategoryList,
  Product,
} from "@/models"
import productApi from "@/services/productApi"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import { RiArrowUpDownLine, RiFilterLine, RiLoader4Fill } from "react-icons/ri"
import { useQueryProducts } from "shared/hook/useQueryProducts"

interface CategoryProps {
  products: Product[]
  category: ParentChildCategoryList
}

const ProductList = ({ products, category }: CategoryProps) => {
  const router = useRouter()
  const offset = Number(router.query?.offset) || 0
  const limit = Number(router.query?.limit) || DEFAULT_LIMIT_PRODUCT
  const language = "vni"
  const shopFilterRef = useRef<HTMLDivElement>(null)
  const shopProductRef = useRef<HTMLDivElement>(null)

  const {
    products: productList,
    isLimit,
    handleFilter,
    isLoadingMore,
    setProducts,
    setLimit,
    handleChangePage,
    handleSortProducts,
    isFetching,
  } = useQueryProducts()

  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false)
  const [currentListView, setCurrentListView] = useState<number>(4)
  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([])

  // Run in first mounting and category changes
  useEffect(() => {
    const { category_id, ...query } = router.query
    if (isObjectHasValue(query)) return

    setProducts(products?.slice(0, limit) || [])
    setLimit((products?.length || 0) <= limit)
  }, [router.query.category_id])

  // Get breadcrumb list by category
  useEffect(() => {
    if (isArrayHasValue(category?.parent_category))
      [
        setBreadcrumbList([
          { name: "Danh Mục", path: "/category/all" },
          ...category.parent_category.map((item) => ({
            name: item.name,
            path: `/category/${item.id}`,
          })),
        ]),
      ]
  }, [router.query.category_id])

  // Run in first mounting and query changes
  useEffect(() => {
    const { category_id, ...query } = router.query
    if (!isObjectHasValue(query)) return

    let noAttribute: any = {}
    let attribute: any = {}

    Object.keys(router.query).forEach((key) => {
      if (
        key.includes("attributes_") ||
        key === "price_range" ||
        key === "star_rating"
      ) {
        attribute[key] = router.query[key]
      } else {
        noAttribute[key] = router.query[key]
      }
    })

    if (isObjectHasValue(attribute)) {
      const attribute_ids = Object.keys(attribute).reduce(
        (prev: any, curr) =>
          [...prev].concat({
            attribute_id: Number(curr.split("attributes_")[1]) || 0,
            display_content: curr.includes("attributes_")
              ? "only_text"
              : curr === "price_range"
              ? "min_max_value"
              : curr,
            max_value:
              curr === "price_range"
                ? Number(attribute[curr][0]) > Number(attribute[curr][1])
                  ? Number(attribute[curr][0]) || 0
                  : Number(attribute[curr][1]) || 0
                : 0,
            min_value:
              curr === "price_range"
                ? Number(attribute[curr][0]) < Number(attribute[curr][1])
                  ? Number(attribute[curr][0]) || 0
                  : Number(attribute[curr][1]) || 0
                : curr === "star_rating"
                ? Number(attribute[curr])
                : 0,
            value_ids: curr.includes("attributes_")
              ? typeof attribute[curr] === "string"
                ? [Number(attribute[curr])]
                : attribute[curr].map((x: string) => Number(x))
              : [],
          }),
        []
      )

      handleFilter({
        ...noAttribute,
        categ_id: Number(category_id),
        limit,
        offset,
        category_id: Number(category_id),
        attribute_ids,
      })
    } else {
      handleFilter({
        ...query,
        limit,
        offset,
        category_id: Number(category_id),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  if (router.isFallback) {
    return (
      <div className="container">
        <div className="shop__loading">
          <div className="shop__loading-left">
            <CategoryLoading />
          </div>
          <div className="shop__loading-right">
            <div className="shop__loading-right-header">
              <BoxGridLoading height={50} col={1} length={1} />
            </div>
            <div className="shop__loading-right-products grid grid-col-2 grid-col-sm-3 grid-col-lg-4">
              {Array.from({ length: 24 }).map((_, index) => (
                <ProductItemLoading key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="shop-container">
        <div className="container">
          <Breadcrumb breadcrumbList={breadcrumbList} />
          <div className="shop">
            <div ref={shopFilterRef} className="shop__filter-wrapper">
              <ShopFilter categories={category?.child_category || []} />
            </div>
            <div ref={shopProductRef} className="shop__products">
              <header className="shop__products-header">
                <div className="shop__products-header-item">
                  <div className="shop__products-header-item-sort">
                    <ul className="shop__products-header-item-sort-list">
                      {sortList.map((item, index) => (
                        <li
                          className={`shop__products-header-item-sort-list-item ${
                            item.value === (router.query?.type_get || "")
                              ? "shop__products-header-item-sort-list-item-active"
                              : ""
                          }`}
                          onClick={() => {
                            handleSortProducts(item.value)
                          }}
                          key={index}
                        >
                          {item.title}
                        </li>
                      ))}

                      <li
                        className={`shop__products-header-item-sort-list-item ${
                          router.query?.type_get?.includes("price")
                            ? "shop__products-header-item-sort-list-item-active"
                            : ""
                        }`}
                        onClick={() => {
                          handleSortProducts(
                            router.query.type_get === "price_reduction"
                              ? "price_increase"
                              : "price_reduction"
                          )
                        }}
                      >
                        <p>Giá</p>

                        {!router.query?.type_get?.includes("price") ? (
                          <RiArrowUpDownLine />
                        ) : null}

                        {router.query?.type_get === "price_increase" ? (
                          <IoMdArrowRoundDown />
                        ) : null}

                        {router.query?.type_get === "price_reduction" ? (
                          <IoMdArrowRoundUp />
                        ) : null}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="shop__products-header-right">
                  <div className="shop__products-header-right-view">
                    <ul className="shop__products-view-list">
                      {listView.map((item) => (
                        <li
                          key={item.id}
                          className={`shop__view-item ${
                            +item.value === currentListView
                              ? "shop__view-item-active"
                              : ""
                          }`}
                        >
                          <button
                            onClick={() => setCurrentListView(+item.value)}
                            className="btn-reset shop__view-item-btn"
                          >
                            {item.icon}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="shop__products-header-right-limit">
                    <Dropdown
                      list={limitProductList}
                      handleClick={(limit: number) =>
                        router.push(
                          {
                            query: {
                              ...router.query,
                              limit,
                              offset: 0,
                            },
                          },
                          undefined,
                          { scroll: false, shallow: true }
                        )
                      }
                    />
                  </div>
                </div>
              </header>

              <div
                onClick={() => setOpenFilterModal(true)}
                className="shop__products-view-filter-btn btn-reset"
              >
                <RiFilterLine />
                <span>{language === "vni" ? "Lọc" : "Filter"}</span>
              </div>

              {isObjectHasValue(router.query) &&
              productList?.length === 0 &&
              !isFetching ? (
                <div className="shop__products--not-found">
                  <img src={filterNotFound} alt="" />
                  <p>
                    Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại
                    nhé?
                  </p>
                  <button
                    onClick={() =>
                      router.push(
                        `/category/${Number(router.query.category_id)}?offset=0`
                      )
                    }
                    className="btn-primary"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : null}

              <div
                className={`shop__product-container grid ${
                  currentListView === 1
                    ? ""
                    : `grid-col-2 grid-col-sm-3 grid-col-lg-4`
                } grid-col-xl-${currentListView}`}
              >
                {/* {!isLoading && isObjectHasValue(products) ? */}
                {isObjectHasValue(productList) && !isFetching ? (
                  <>
                    {currentListView === 1
                      ? productList.map((product, index) => (
                          <ProductItemList key={index} product={product} />
                        ))
                      : productList.map((product, index) => (
                          <ProductItem
                            key={index}
                            type="shop"
                            product={product}
                          />
                        ))}
                  </>
                ) : (
                  Array.from({ length: 24 }).map((_, index) => (
                    <ProductItemLoading key={index} />
                  ))
                )}
              </div>

              {!isLimit && isArrayHasValue(products) ? (
                <div className="shop__pagination">
                  {isLoadingMore ? <RiLoader4Fill className="loader" /> : null}
                  <button
                    onClick={() => handleChangePage()}
                    className="btn-primary-outline shop__pagination-btn"
                  >
                    {language === "vni" ? "Xem Thêm" : "Load More"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Modal filter in mobile */}
      <Modal
        isShowModal={isOpenFilterModal}
        handleClickModal={() => setOpenFilterModal(false)}
        direction="right"
      >
        <ModalHeading
          handleClose={() => setOpenFilterModal(false)}
          title={`${language === "vni" ? "Lọc sản phẩm" : "Filter products"} `}
        />
        <ShopFilter categories={category?.child_category || []} />
      </Modal>
    </>
  )
}

ProductList.Layout = MainLayout

export default ProductList

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await productApi.getCategories()
  const categories = res?.result?.data || []

  return {
    paths: categories.map((item: ICategory) => ({
      params: {
        category_id: item.id + "",
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const category_id = Number(context.params?.category_id) || 0

  const res: any = await productApi.getChildCategories(category_id)
  const product: any = await productApi.getProductList({
    category_id,
    limit: DEFAULT_LIMIT_PRODUCT + 1,
  })

  return {
    props: {
      category: res?.result?.data || {},
      products: product?.result || [],
    },
    revalidate: 10,
  }
}
