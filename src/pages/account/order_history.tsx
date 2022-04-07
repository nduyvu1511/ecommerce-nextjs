import { Modal, OrderStatus } from "@/components"
import { AccountContainer } from "@/container"
import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { MainLayout } from "@/layout"
import { OrderHistory, OrderHistoryDetail } from "@/models"
import userApi from "@/services/userApi"
import { useEffect, useRef, useState } from "react"
import { AiFillEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"

const OrderHistory: any = () => {
  const language = "vni"
  const containerRef = useRef<HTMLSelectElement>(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)

  // const {
  //   orderHistoryList: list,
  //   token,
  //   orderDetailHistory,
  // } = useSelector((state: RootState) => state.user)
  // const [page, setPage] = useState<number>(() => (list.length > 0 ? 1 : 0))

  // const { data: orderHistoryList, totalPage } = usePagination({
  //   limit: 12,
  //   list,
  //   page,
  // })

  const [isOpen, setOpen] = useState<boolean>(false)
  const [orderHistoryList, setOrderHistoryList] = useState<OrderHistory[]>()
  const [orderDetailHistory, setOrderDetailHistory] =
    useState<OrderHistoryDetail>()

  useEffect(() => {
    if (!token) return

    userApi.getOrderListHistory({ token }).then((res: any) => {
      setOrderHistoryList(res.result?.data?.list_booking || [])
    })
    // dispatch(clearOrderHistoryDetail())
  }, [dispatch])

  const handleGetOrderDetail = (sale_order_id: number) => {
    if (!token) return
    setOpen(true)
    userApi.getDetailOrderHistory({ sale_order_id, token }).then((res: any) => {
      if (res.result.success)
        setOrderDetailHistory(res.result?.data?.info_booking)
    })
  }

  return (
    <AccountContainer heading="Order history" desc="This is order history">
      <section ref={containerRef} className="order__history">
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
              orderHistoryList.map((item) => (
                <tr key={item.order_id}>
                  <td>{item.name}</td>
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

        <div className="">
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
        </div>
      </section>
    </AccountContainer>
  )
}

OrderHistory.Layout = MainLayout

export default OrderHistory
