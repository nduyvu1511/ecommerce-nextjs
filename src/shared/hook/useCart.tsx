import { RootState } from "@/core/store"
import { CartItem } from "@/models"
import { useSelector } from "react-redux"

interface UseCart {
  carts: CartItem[]
  totalMoney: number
}

const useCart = (): UseCart => {
  const { data: carts } = useSelector((state: RootState) => state.cart)
  const {
    userInfo: { id },
    token,
  } = useSelector((state: RootState) => state.user)

  if (!token) return { totalMoney: 0, carts: [] }

  if (carts.length === 0) return { carts: [], totalMoney: 0 }

  const totalMoney = carts.reduce((a, b) => b.price * b.quantity + a, 0)

  return {
    totalMoney,
    carts,
  }
}

export { useCart }
