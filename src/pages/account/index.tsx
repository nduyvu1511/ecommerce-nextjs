import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import { BsFillHeartFill } from "react-icons/bs"
import { CgCalculator } from "react-icons/cg"
import { FaShoppingCart } from "react-icons/fa"
import { useCart, useWishlist } from "shared/hook"

const AccountGeneral = () => {
  const language = "vni"

  const { carts } = useCart()
  const { data: wishlists } = useWishlist(false)

  return (
    <AccountContainer heading="General">
      <div className="account__general">
        <ul className="account__general-list">
          <li className="account__general-list-item">
            <span>
              <FaShoppingCart />
            </span>
            <h3>
              {carts?.length || 0} {language === "vni" ? "Sản Phẩm" : "Product"}
            </h3>
            <p>
              {language === "vni" ? "Trong giỏ hàng của bạn" : "In your cart"}
            </p>
          </li>

          <li className="account__general-list-item">
            <span>
              <BsFillHeartFill />
            </span>
            <h3>
              {wishlists?.length || 0}{" "}
              {language === "vni" ? "Sản Phẩm" : "Product"}
            </h3>
            <p>
              {language === "vni"
                ? "Trong danh sách yêu thích"
                : "In your Wishlist"}
            </p>
          </li>

          <li className="account__general-list-item">
            <span>
              <CgCalculator />
            </span>
            <h3>
              {10} {language === "vni" ? "Đơn hàng" : "Product"}
            </h3>
            <p>{language === "vni" ? "Bạn đã đặt hàng" : "You ordered"}</p>
          </li>
        </ul>
      </div>
    </AccountContainer>
  )
}

AccountGeneral.Layout = MainAuthLayout

export default AccountGeneral
