import {
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
  isArrayHasValue,
  isObjectHasValue,
  limitProductList,
  listView,
  sortList,
} from "@/helper"
import { MainLayout } from "@/layout"
import { AttributeProduct, ILimit, ISortType } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { RiFilterLine, RiLoader4Fill } from "react-icons/ri"
import { useCategory, useShopProduct } from "shared/hook"

const Shop = () => {
  const router = useRouter()
  const language = "vni"
  const shopFilterRef = useRef<HTMLDivElement>(null)
  const shopProductRef = useRef<HTMLDivElement>(null)

  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false)
  const [currentListView, setCurrentListView] = useState<number>(4)
  const [attributeList, setAttributeList] = useState<AttributeProduct[]>()

  const offset = Number(router.query?.offset) || 0
  const limit = Number(router.query?.limit) || 12

  const {
    isValidating: isLoading,
    isLoadingMore,
    data: products,
    handleFilter,
    isLimit,
  } = useShopProduct({ params: { limit: 12 } })
  const { isValidating: isCategoryLoading } = useCategory()

  useEffect(() => {
    if (!isObjectHasValue(router.query)) return

    handleFilter({
      ...router.query,
      limit: limit,
      offset,
      category_id: Number(router.query?.category_id) || false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const handleChangePage = () => {
    router.push(
      {
        query: {
          ...router.query,
          offset: offset + limit,
        },
      },
      undefined,
      { scroll: false }
    )
  }

  return (
    <>
      <section className="shop-container">
        <div className="container">
          <Breadcrumb page="shop" />
          <div className="shop">
            <div ref={shopFilterRef} className="shop__filter-wrapper">
              {isCategoryLoading ? (
                <CategoryLoading />
              ) : (
                <ShopFilter
                  attributeList={attributeList as AttributeProduct[]}
                />
              )}
            </div>
            <div ref={shopProductRef} className="shop__products">
              <header className="shop__products-header">
                <div>
                  <div
                    onClick={() => setOpenFilterModal(true)}
                    className="shop__products-view-filter-btn btn-reset"
                  >
                    <RiFilterLine />
                    <span>{language === "vni" ? "Lọc" : "Filter"}</span>
                  </div>

                  {/* Hide on small screen */}
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

                <div className="shop__products-filter">
                  <div className="shop__products-filter-price">
                    <p className="title">Sắp xếp theo : </p>
                    <Dropdown
                      list={sortList}
                      handleClick={(value: ISortType) =>
                        router.push(
                          {
                            query: {
                              ...router.query,
                              type_get: value.type_get,
                              offset: 0,
                            },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }
                    />
                  </div>

                  <div className="shop__products-filter-item">
                    <p className="title">Show : </p>
                    <Dropdown
                      list={limitProductList}
                      handleClick={(value: ILimit) =>
                        router.push(
                          {
                            query: {
                              ...router.query,
                              limit: value.limit,
                              offset: 0,
                            },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }
                    />
                  </div>
                </div>
              </header>

              {isObjectHasValue(router.query) &&
              !isLoading &&
              products?.length === 0 ? (
                <div className="shop__products--not-found">
                  {language === "vni"
                    ? "No products were found matching your selection."
                    : "Không tìm thấy sản phẩm nào phù hợp với lựa chọn của bạn."}
                </div>
              ) : null}

              <div
                className={`shop__product-container grid ${
                  currentListView === 1
                    ? ""
                    : `grid-col-1 grid-col-xs-2 grid-col-sm-2
                  grid-col-md-3 grid-col-lg-4 grid-col-1024-3`
                } grid-col-xl-${currentListView}`}
              >
                {/* {!isLoading && isObjectHasValue(products) ? */}
                {!isLoading && isObjectHasValue(products) ? (
                  <>
                    {currentListView === 1
                      ? products.map((product, index) => (
                          <ProductItemList
                            isLoading={isLoading}
                            key={index}
                            product={product}
                          />
                        ))
                      : products.map((product, index) => (
                          <ProductItem
                            key={index}
                            isLoading={isLoading}
                            type="shop"
                            product={product}
                          />
                        ))}
                  </>
                ) : null}

                {isLoading
                  ? Array.from({ length: 12 }).map((_, index) => (
                      <ProductItemLoading key={index} />
                    ))
                  : null}
              </div>

              {!isLimit && isArrayHasValue(products) ? (
                <div className="shop__pagination">
                  {isLoadingMore ? <RiLoader4Fill className="loader" /> : null}
                  <button
                    onClick={handleChangePage}
                    className="btn-primary shop__pagination-btn"
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
        direction="left"
      >
        <ModalHeading
          handleClose={() => setOpenFilterModal(false)}
          title={`${language === "vni" ? "Lọc sản phẩm" : "Filter products"} `}
        />
        <ShopFilter attributeList={attributeList as AttributeProduct[]} />
      </Modal>
    </>
  )
}

Shop.Layout = MainLayout

export default Shop
