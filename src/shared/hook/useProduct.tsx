import { RootState } from "@/core/store"
import { Product, ProductParams } from "@/models"
import { setSearchingStatus } from "@/modules"
import productApi from "@/services/productApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface Props {
  params?: ProductParams
  key: string
}

interface ProductSWR {
  data: Product[]
  error: any
  isValidating: boolean
  handleSearchProduct: Function
  clearSearchResult: Function
}

const useProduct = ({ params, key }: Props): ProductSWR => {
  const dispatch = useDispatch()

  const {
    userInfo: { id: partner_id = 0 },
  } = useSelector((state: RootState) => state.user)
  const { data, error, isValidating, mutate } = useSWR(
    key,
    key === "products_search"
      ? null
      : () =>
          productApi
            .getProductList({ ...params, partner_id })
            .then((res: any) => res?.result),
    {
      revalidateOnFocus: false,
    }
  )

  const handleSearchProduct = async (value: string) => {
    dispatch(setSearchingStatus(true))
    const data: any = await productApi.getProductList({
      keyword: value,
      partner_id: partner_id || 0,
    })
    dispatch(setSearchingStatus(false))
    mutate(data?.result || [], false)
  }

  const clearSearchResult = () => {
    mutate([], false)
  }

  return {
    data,
    error,
    isValidating,
    handleSearchProduct,
    clearSearchResult,
  }
}

export { useProduct }
