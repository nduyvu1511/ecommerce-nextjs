import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { Product } from "@/models"
import { BiLoaderCircle } from "react-icons/bi"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useWishlist } from "shared/hook"

interface ButtonWishlistProps {
  product: Product
  type: "item" | "detail"
}

const ButtonWishlist = ({ product, type }: ButtonWishlistProps) => {
  const language = "vni"
  const { handleToggleWishlist } = useWishlist(false)
  const { data: wishlists = [] } = useWishlist(false)

  const {
    wishlistBtn: { currentProductId, isFetching },
  } = useSelector((state: RootState) => state.product)

  const handleAddToWishlist = () => {
    if (isFetching && product.product_tmpl_id === currentProductId) return

    handleToggleWishlist(product)
  }

  return (
    <>
      <button
        onClick={handleAddToWishlist}
        className={`${
          type === "item"
            ? "product__card__sub-item"
            : "product__intro-sub-item"
        }`}
      >
        {product.product_tmpl_id === currentProductId && isFetching ? (
          <BiLoaderCircle className="loader" />
        ) : isArrayHasValue(wishlists) &&
          wishlists?.find(
            (item) => item.product_id === product.product_tmpl_id
          ) ? (
          <FaHeart style={{ fill: "#dc3545" }} />
        ) : (
          <FaRegHeart />
        )}

        {type === "detail"
          ? `${language === "vni" ? "Yêu thích" : "Add to wishlist"}`
          : ""}
      </button>
    </>
  )
}

export default ButtonWishlist
