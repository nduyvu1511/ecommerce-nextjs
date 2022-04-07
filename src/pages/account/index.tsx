import { AccountContainer } from "@/container"
import { MainLayout } from "@/layout"
import { BsFillHeartFill } from "react-icons/bs"
import { CgCalculator } from "react-icons/cg"
import { FaShoppingCart } from "react-icons/fa"

const AccountGeneral = () => {
  const language = "vni"

  return (
    <AccountContainer heading="General" desc="This is desc">
      <div className="account__general">
        <ul className="account__general-list">
          <li className="account__general-list-item">
            <span>
              <FaShoppingCart />
            </span>
            <h3>
              {10} {language === "vni" ? "Sản Phẩm" : "Product"}
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
              {10} {language === "vni" ? "Sản Phẩm" : "Product"}
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
              {10}
              {language === "vni" ? "Sản Phẩm" : "Product"}
            </h3>
            <p>{language === "vni" ? "Bạn đã đặt hàng" : "You ordered"}</p>
          </li>
        </ul>
      </div>
    </AccountContainer>
  )
}

AccountGeneral.Layout = MainLayout

export default AccountGeneral
