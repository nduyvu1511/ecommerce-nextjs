import { isArrayHasValue } from "@/helper"
import { Category } from "@/models"
import productApi from "@/services/productApi"
import _ from "lodash"
import useSWR from "swr"

interface CategorySWR {
  data: Category[]
  error: any
  isValidating: boolean
  bannerUrls: Array<string>
}

const useCategory = (): CategorySWR => {
  const { data, error, isValidating } = useSWR(
    "category",
    () => productApi.getCategories().then((res: any) => res?.result?.data),
    { revalidateOnFocus: false, dedupingInterval: 120000 }
  )

  const bannerUrls: Array<string> = []

  const getCategories = () => {
    if (!isArrayHasValue(data)) return []

    _(data as Category[]).forEach((f) => {
      if (f.image?.length > 0) {
        bannerUrls.push(...f.image)
      }

      f.children = _(data)
        .filter((g) => g.parent_id === f.id)
        .value()
    })
    return _(data)
      .filter((f) => !f.parent_id)
      .value()
  }

  return {
    data: getCategories(),
    error,
    isValidating,
    bannerUrls,
  }
}

export { useCategory }
