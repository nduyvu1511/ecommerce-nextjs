import { Product, ProductParams } from "@/models"
import { useDispatch } from "react-redux"

interface Props {
  params?: ProductParams
  key: string
  shouldFetch?: boolean
}

interface NotificationRes {
  data: Product[]
  error: any
  isValidating: boolean
  handleSearchProduct: Function
  clearSearchResult: Function
  toggleWishlistStatus: (id: number) => void
}

const useNotification = ({ params, key, shouldFetch = true }: Props) => {
  const dispatch = useDispatch()

  return {}
}

export { useNotification }

