import { RootState } from "@/core/store"
import { Product } from "@/models"
import {
  addToCart,
  setMessage,
  setProduct,
  toggleModalProduct,
} from "@/modules"
import { useRouter } from "next/router"
import React from "react"
import { FaShoppingBasket } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

interface ButtonAddCardProps {
  product: Product
  type: "item" | "detail"
  quantity?: number
  className?: string
}

export const ButtonAddCard = ({
  product,
  type,
  quantity = 1,
  className,
}: ButtonAddCardProps) => {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()
  const { listAttribute } = useSelector((state: RootState) => state.product)

  const {
    token,
    userInfo: { id: partner_id },
  } = useSelector((state: RootState) => state.user)

  const handleAddToCart = () => {
    if (!token) {
      dispatch(
        setMessage({
          isOpen: true,
          type: "warning",
          title: "Bạn phải đăng nhập để thêm giỏ hàng",
        })
      )
      return router.push("/login")
    }

    if (type === "item") {
      if (product.attributes.length > 0) {
        dispatch(setProduct(product))
        dispatch(toggleModalProduct(true))
      } else {
        dispatch(addToCart({ ...product, quantity, partner_id }))
        dispatch(
          setMessage({ isOpen: true, title: "Thêm giỏ hàng thành công" })
        )
      }
    } else {
      console.log(listAttribute)
      dispatch(
        addToCart({
          ...product,
          quantity,
          partner_id,
          attribute_names: listAttribute?.map((item) => item.name) || [],
        })
      )

      dispatch(setMessage({ isOpen: true, title: "Thêm giỏ hàng thành công" }))
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`${
        type === "item"
          ? "product__card__bottom-btn"
          : "product__intro-shop-btn"
      } ${className ? className : ""}`}
    >
      <FaShoppingBasket />
      {language === "vni" ? "Thêm giỏ hàng" : "Add to cart"}
    </button>
  )
}