import { RootState } from "@/core/store"
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { Product, ProductParams } from "@/models"
import productApi from "@/services/productApi"
import { useState } from "react"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface Props {
  params?: ProductParams
}

interface ProductSWR {
  data: Product[]
  isValidating: boolean
  handleFilter: (params: ProductParams) => void
  error: any
  isLoadingMore: boolean
  isLimit: boolean
}

const useShopProduct = ({ params }: Props): ProductSWR => {
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)

  const {
    userInfo: { id: partner_id = 0 },
  } = useSelector((state: RootState) => state.user)

  const { data, error, isValidating, mutate } = useSWR(
    "shop_products",
    isObjectHasValue(params)
      ? () =>
          productApi
            .getProductList({ ...params, partner_id })
            .then((res: any) => res?.result)
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const handleFilter = (params: ProductParams) => {
    const limit = Number(params?.limit) || 12
    const offset = Number(params?.offset) || 0

    if (offset >= limit) {
      setLoadingMore(true)
    }

    productApi
      .getProductList({
        partner_id,
        ...params,
        limit: limit + 1,
      })
      .then((res: any) => {
        setLoadingMore(false)
        const productsFetch: Product[] = res?.result || []
        let products: Product[] = productsFetch

        if (productsFetch.length > limit) {
          products = productsFetch.slice(0, productsFetch.length - 1)
          setLimit(false)
        } else {
          setLimit(true)
        }

        // When user click see more button to get another products
        if (offset >= limit) {
          if (products?.length > 0) {
            if (isArrayHasValue(data)) {
              mutate([...data, ...products], false)
            } else {
              mutate(products, false)
            }
          }
        } else {
          mutate(products, false)
        }
      })
  }

  return {
    data,
    error,
    isValidating,
    handleFilter,
    isLimit,
    isLoadingMore,
  }
}

export { useShopProduct }
