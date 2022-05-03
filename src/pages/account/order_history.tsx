import { Modal } from "@/components"
import { OrderStatus } from "@/components/account/status"
import { AccountContainer } from "@/container"
import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { MainAuthLayout } from "@/layout"
import { OrderHistory, OrderHistoryDetail } from "@/models"
import userApi from "@/services/userApi"
import { useRef, useState } from "react"
import { AiFillEye } from "react-icons/ai"
import { CgSmileNone } from "react-icons/cg"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useOrderHistory } from "shared/hook"

const OrderHistory: any = () => {
  const language = "vni"
  const containerRef = useRef<HTMLSelectElement>(null)
  const { token } = useSelector((state: RootState) => state.user)

  const [isOpen, setOpen] = useState<boolean>(false)
  const [orderDetailHistory, setOrderDetailHistory] =
    useState<OrderHistoryDetail>()

  const { data: orderHistoryList = [], isValidating } = useOrderHistory()

  const handleGetOrderDetail = (sale_order_id: number) => {
    if (!token) return
    setOpen(true)
    userApi.getDetailOrderHistory({ sale_order_id, token }).then((res: any) => {
      if (res?.result?.success)
        setOrderDetailHistory(res.result?.data?.info_booking)
    })
  }

  return (
    <AccountContainer
      headerMobileTitle="Lịch sử đơn hàng"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Lịch sử đơn hàng", path: "" },
      ]}
      heading="Lịch sử đơn hàng"
    >
      <section ref={containerRef} className="order__history">
        {isValidating && orderHistoryList?.length === 0 ? (
          <div className="loader-container">
            <RiLoader4Line className="loader" />
          </div>
        ) : null}

        {!isValidating && orderHistoryList?.length > 0 ? (
          <table className="order__history-table">
            <thead>
              <tr>
                <th>{language === "vni" ? "Mã đơn hàng" : "Order ID"}</th>
                <th className="hide-on-md-table">
                  {language === "vni" ? "Ngày" : "Date"}
                </th>
                <th>{language === "vni" ? "Số Tiền" : "Total amount"}</th>
                <th className="hide-on-xl-table">
                  {language === "vni" ? "Tình trạng đơn hàng" : "Order status"}
                </th>
                <th className="hide-on-sm-table">
                  {language === "vni"
                    ? "Tình trạng thanh toán"
                    : "Payment status"}
                </th>
                <th>{language === "vni" ? "Chi tiết" : "Detail"}</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryList &&
                orderHistoryList.map((item: OrderHistory) => (
                  <tr key={item.order_id}>
                    <td>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleGetOrderDetail(item.order_id)}
                      >
                        {item.name}
                      </span>
                    </td>
                    <td className="hide-on-md-table">{item.create_date}</td>
                    <td>{formatMoneyVND(item.amount_total)}</td>
                    <td className="hide-on-xl-table">{item.state_name}</td>
                    <td className="hide-on-sm-table">{item.state_paid}</td>
                    <td>
                      <button
                        onClick={() => handleGetOrderDetail(item.order_id)}
                        className="btn-reset"
                      >
                        <span className="order__history-detail-btn">
                          <AiFillEye />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}

        {!isValidating && orderHistoryList?.length === 0 ? (
          <div className="list--empty">
            <CgSmileNone />
            <p>Bạn chưa hoàn thành đơn hàng nào </p>
          </div>
        ) : null}

        {/* Modal */}
        {isOpen && orderDetailHistory ? (
          <Modal
            heading={`Mã đơn hàng: ${orderDetailHistory.name}`}
            direction="center"
            isShowModal={isOpen}
            handleClickModal={() => setOpen(false)}
          >
            <OrderStatus order={orderDetailHistory} type="history" />
          </Modal>
        ) : null}

        {/* <div className=""> */}
        {/* {totalPage > 1 ? (
          <Pagination
            currentPage={page}
            onPaginate={(page: number) => {
              setPage(page)
              containerRef.current?.scrollIntoView()
            }}
            totalPage={totalPage}
          />
        ) : null} */}
        {/* </div> */}
      </section>
    </AccountContainer>
  )
}

OrderHistory.Layout = MainAuthLayout

export default OrderHistory
