import { RootState } from "@/core/store"
import { DEFAULT_LIMIT_PRODUCT, isArrayHasValue } from "@/helper"
import { Product, ProductParams, TypeGet } from "@/models"
import productApi from "@/services/productApi"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

interface UseQueryProductRes {
  products: Product[]
  handleFilter: (params: ProductParams) => void
  isLoadingMore: boolean
  isLimit: boolean
  setProducts: (props: Product[]) => void
  setLimit: Function
  handleChangePage: Function
  handleFilterAttribute: Function
  handleSortProducts: Function
  isFetching: boolean
}

const useQueryProducts = (): UseQueryProductRes => {
  const router = useRouter()
  const offset = Number(router.query?.offset) || 0
  const limit = Number(router.query?.limit) || DEFAULT_LIMIT_PRODUCT
  const {
    userInfo: { id: partner_id = 0 },
  } = useSelector((state: RootState) => state.user)

  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)
  const [isFetching, setFetching] = useState<boolean>(false)

  const handleFilter = async (params: ProductParams) => {
    const _limit = Number(params?.limit) || limit
    const offset = Number(params?.offset) || 0
    if (offset >= _limit) {
      setLoadingMore(true)
    } else {
      setFetching(true)
    }

    try {
      const { query } = router
      let productsFetch: Product[] = []
      if (
        Object.keys(query).some(
          (key) =>
            key.includes("attributes_") ||
            key === "star_rating" ||
            key === "price_range"
        )
      ) {
        const res: any = await productApi.filterProducts({
          ...params,
          partner_id,
          limit: _limit + 1,
        })
        productsFetch = res?.result?.data || []
      } else {
        const res: any = await productApi.getProductList({
          ...params,
          partner_id,
          limit: _limit + 1,
        })

        productsFetch = res?.result || []
      }

      // Set limit and loading more status
      setLimit(productsFetch.length <= _limit)

      if (offset >= _limit) {
        setLoadingMore(true)
      } else {
        setFetching(false)
      }

      const newProducts = productsFetch?.slice(0, _limit) || []

      // Assign if offset is smaller than limit otherwise push to array
      if (offset >= _limit) {
        if (
          isArrayHasValue(newProducts) &&
          !products?.some((item) =>
            newProducts?.find(
              (x: Product) => x.product_prod_id === item.product_prod_id
            )
          )
        ) {
          setProducts([...products, ...newProducts])
        }
      } else {
        setProducts(newProducts)
      }
    } catch (error) {
      if (offset >= _limit) {
        setLoadingMore(true)
      } else {
        setFetching(false)
      }
    }
  }

  const handleChangePage = () => {
    if (isLoadingMore) return

    router.push(
      {
        query: {
          ...router.query,
          offset: offset + limit,
        },
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const handleFilterAttribute = () => {}

  const handleSortProducts = (value: TypeGet) => {
    router.push(
      {
        query: {
          ...router.query,
          type_get: value,
          offset: 0,
        },
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  return {
    products,
    handleFilter,
    isLimit,
    isLoadingMore,
    setProducts,
    setLimit,
    handleChangePage,
    handleFilterAttribute,
    handleSortProducts,
    isFetching,
  }
}

export { useQueryProducts }
