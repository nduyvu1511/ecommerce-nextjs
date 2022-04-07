import { RootState } from "@/core/store"
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { DeleteWishlistHook, Product, Wishlist } from "@/models"
import {
  setCurrentWishlistBtnProductId,
  setFetchingCurrentWishlistBtn,
  setMessage,
} from "@/modules"
import userApi from "@/services/userApi"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface WishlistSWR {
  data: Wishlist[]
  error: any
  isValidating: boolean
  handleToggleWishlist: (props: Product) => void
  handleDeleteWishlist: ({
    product_id,
    wishlist_id,
  }: DeleteWishlistHook) => void
}

const useWishlist = (isFetchData: boolean): WishlistSWR => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { token } = useSelector((state: RootState) => state.user)

  const { data, error, isValidating, mutate } = useSWR(
    "wishlist",
    isFetchData && token
      ? () => userApi.getWishlists({ token }).then((res: any) => res?.result)
      : null,
    { revalidateOnFocus: false }
  )

  const handleDeleteWishlist = ({
    wishlist_id,
    product_id,
  }: DeleteWishlistHook) => {
    if (!token) return

    userApi
      .deleteWishlist({ token, product_id, wishlist_id })
      .then((res: any) => {
        dispatch(setFetchingCurrentWishlistBtn(false))

        if (res.result?.[0]) {
          mutate(
            [...data].filter((item) => item.id !== res.result?.[0]),
            false
          )
          dispatch(
            setMessage({
              isOpen: true,
              title: "Đã xóa khỏi danh sách yêu thích",
            })
          )
        }
      })
      .catch(() => {
        dispatch(setFetchingCurrentWishlistBtn(false))
      })
  }

  const handleToggleWishlist = useCallback(
    (product: Product) => {
      if (!token) router.push("/login")

      if (!product || Object.keys(product).length === 0) return

      dispatch(setCurrentWishlistBtnProductId(product.product_tmpl_id))
      dispatch(setFetchingCurrentWishlistBtn(true))

      if (!isArrayHasValue(data)) {
        userApi
          .addWishlist({ token, product_id: product.product_tmpl_id })
          .then((res: any) => {
            dispatch(setFetchingCurrentWishlistBtn(false))

            if (isObjectHasValue(res.result)) {
              dispatch(
                setMessage({
                  isOpen: true,
                  title: "Đã Thêm vào danh sách yêu thích",
                })
              )
              mutate([res.result], false)
            }
          })
          .catch(() => {
            dispatch(setFetchingCurrentWishlistBtn(false))
          })

        return
      }

      const wishlist: Wishlist | undefined = (data as Wishlist[]).find(
        (item) =>
          item.product_id === product.product_tmpl_id &&
          item.id_product_att === product.product_prod_id
      )

      if (wishlist) {
        handleDeleteWishlist({
          product_id: product.product_tmpl_id,
          wishlist_id: wishlist.id,
        })
      } else {
        userApi
          .addWishlist({ token, product_id: product.product_tmpl_id })
          .then((res: any) => {
            if (isObjectHasValue(res.result)) {
              dispatch(setFetchingCurrentWishlistBtn(false))
              dispatch(
                setMessage({
                  isOpen: true,
                  title: "Đã Thêm vào danh sách yêu thích",
                })
              )
              mutate([res.result, ...data], false)
            }
          })
          .catch(() => {
            dispatch(setFetchingCurrentWishlistBtn(false))
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  return {
    data,
    error,
    isValidating,
    handleToggleWishlist,
    handleDeleteWishlist,
  }
}

export { useWishlist }
