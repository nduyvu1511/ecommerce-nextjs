import { isArrayHasValue, translateDataToTree } from "@/helper"
import { Category } from "@/models"
import productApi from "@/services/productApi"
import useSWR from "swr"

interface CategorySWR {
  data: Category[]
  error: any
  isValidating: boolean
  bannerUrls: Array<string>
  getChildCategories: (parent_id: number) => Promise<Category[]>
}

const useCategory = (categoryId: number | false = false): CategorySWR => {
  const { data, error, isValidating } = useSWR(
    "category",
    () =>
      productApi
        .getCategories(categoryId)
        .then((res: any) => res?.result?.data || []),
    { revalidateOnFocus: false, dedupingInterval: 12000 }
  )

  const getBannerUrls = (): Array<string> => {
    if (!isArrayHasValue(data)) return []

    let banners: Array<string> = []
    data.forEach((f: Category) => {
      if (f.image?.length > 0) {
        banners.push(...f.image)
      }
    })

    return banners
  }

  const getChildCategories = async (parent_id: number): Promise<Category[]> => {
    const res: any = await productApi.getCategories(parent_id)
    return res?.result?.data || []
  }

  return {
    bannerUrls: getBannerUrls(),
    data: translateDataToTree(data),
    error,
    isValidating,
    getChildCategories,
  }
}

export { useCategory }
