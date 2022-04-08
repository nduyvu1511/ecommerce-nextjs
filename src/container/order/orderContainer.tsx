import { CartSummary } from "@/components"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { BsCheck2Circle } from "react-icons/bs"
import { FaShippingFast } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlinePayments } from "react-icons/md"
import { useSelector } from "react-redux"

interface IOrderContainer {
  children: ReactNode
  isShowPromotion?: boolean
  isShowOrderSummary?: boolean
}

export const OrderContainer = ({
  children,
  isShowPromotion = true,
  isShowOrderSummary = true,
}: IOrderContainer) => {
  const language = "vni"
  const router = useRouter()
  const { address, productList, delivery, payment, orderDone } = useSelector(
    (state: RootState) => state.order
  )

  const orderProcessList = [
    {
      id: "cart",
      icon: <FiShoppingCart />,
      engTitle: "Cart",
      vniTitle: "1. Giỏ hàng",
      isActive: productList || router.pathname.includes("cart"),
    },
    {
      id: "address",
      icon: <HiOutlineLocationMarker />,
      engTitle: "Shipping information",
      vniTitle: "2. Thông tin vận chuyển",
      isActive: (productList && address) || router.pathname.includes("address"),
    },
    {
      id: "shipping_detail",
      icon: <FaShippingFast />,
      engTitle: "Shipment Details",
      vniTitle: "3. Thông tin giao hàng",
      isActive:
        (productList && address && delivery) ||
        router.pathname.includes("shipping_detail"),
    },
    {
      id: "payment",
      icon: <MdOutlinePayments />,
      engTitle: "Payment",
      vniTitle: "4. Thanh toán",
      isActive:
        (productList && address && delivery && payment) ||
        router.pathname.includes("payment"),
    },
    {
      id: "order-confirmed",
      icon: <BsCheck2Circle />,
      engTitle: "Confirm",
      vniTitle: "5. Xác nhận",
      isActive: !!orderDone,
    },
  ]

  return (
    <section className="order__container">
      <div className="container">
        <div className="order-wrapper">
          <header className="order__header">
            <ul className="order__header-list">
              {orderProcessList.map((item) => (
                <li
                  onClick={() => item.isActive && router.push(item.id)}
                  key={item.id}
                  className={`order__header-list-item ${
                    item.isActive
                      ? "order__header-list-item-active cursor-pointer"
                      : ""
                  }`}
                >
                  <span
                    onClick={() => item.isActive && router.push(`/${item.id}`)}
                    className={`order__header-list-item-btn ${
                      item.isActive ? "order__header-list-item-btn-active" : ""
                    } `}
                  >
                    {item.icon}
                    <p>{language === "vni" ? item.vniTitle : item.engTitle}</p>
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <div className="order__body">
            <div
              className={`order__body-left ${
                !isShowOrderSummary ? "order__body-left-full" : ""
              }`}
            >
              {children}
            </div>
            {isShowOrderSummary ? (
              <div className="order__body-right">
                <CartSummary isShowPromotion={isShowPromotion} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
