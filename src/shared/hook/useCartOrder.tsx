import { RootState } from "@/core/store"
import { isExistCart } from "@/helper"
import { CartItem, ProductIds } from "@/models"
import {
  setAddress,
  setDelivery,
  setOrderDraft,
  setPayment,
  setProductList,
  setPromotionLineList,
  updateCartQuantity,
} from "@/modules"
import { deleteCartItem as deleteCartItems } from "@/modules/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { usePromotion } from "./usePromotion"

interface UseCartOrderProps {
  toggleEachInput: (cart: CartItem) => void
  toggleCheckAllCart: Function
  updateQuantity: (cart: CartItem) => void
  deleteCartItem: (productIds: ProductIds) => void
  findProductFromProductList: (
    productIds: ProductIds
  ) => CartItem | null | undefined
}

const useCartOrder = (): UseCartOrderProps => {
  const dispatch = useDispatch()
  const { cancelPromotion } = usePromotion(false)
  const {
    productList,
    orderDraft,
    address,
    delivery,
    payment,
    promotion,
    promotionLineList,
  } = useSelector((state: RootState) => state.order)
  const { data: carts } = useSelector((state: RootState) => state.cart)

  const handleResetOrderField = () => {
    if (orderDraft) {
      dispatch(setOrderDraft(undefined))
    }
    if (address) {
      dispatch(setAddress(undefined))
    }
    if (delivery) {
      dispatch(setDelivery(undefined))
    }
    if (payment) {
      dispatch(setPayment(undefined))
    }
    if (promotion) {
      cancelPromotion()
    }
    if (promotionLineList) {
      dispatch(setPromotionLineList(undefined))
    }
  }

  const getDiffCartsById = (
    productList: CartItem[],
    productIds: ProductIds
  ): CartItem[] | undefined => {
    const newCarts = productList.filter(
      (item) => !isExistCart(item, productIds)
    )

    return newCarts?.length === 0 ? undefined : newCarts
  }

  const findProductFromProductList = (productIds: ProductIds) => {
    return productList
      ? productList.find((item) => isExistCart(item, productIds))
      : null
  }

  const toggleEachInput = (cart: CartItem) => {
    handleResetOrderField()
    if (!productList) {
      return dispatch(setProductList([cart]))
    }

    const productExist = findProductFromProductList(cart)
    if (productExist) {
      dispatch(setProductList(getDiffCartsById(productList, cart) || null))
    } else {
      dispatch(setProductList([...productList, cart]))
    }
  }

  const toggleCheckAllCart = () => {
    handleResetOrderField()
    if (carts?.length === productList?.length) {
      dispatch(setProductList(null))
    } else {
      dispatch(setProductList(carts))
    }
  }

  const deleteCartItem = (productIds: ProductIds) => {
    handleResetOrderField()
    dispatch(deleteCartItems(productIds))

    if (productList) {
      dispatch(setProductList(getDiffCartsById(productList, productIds)))
    } else {
      if (carts.length === 1) {
        dispatch(setProductList(undefined))
      }
    }
  }

  const updateQuantity = (cart: CartItem) => {
    handleResetOrderField()
    dispatch(updateCartQuantity(cart))

    if (productList) {
      if (findProductFromProductList(cart)) {
        const newCarts = [...productList].map((item) =>
          isExistCart(item, cart) ? cart : item
        )
        dispatch(setProductList(newCarts))
      }
    }
  }

  return {
    toggleEachInput,
    toggleCheckAllCart,
    updateQuantity,
    deleteCartItem,
    findProductFromProductList,
  }
}

export { useCartOrder }