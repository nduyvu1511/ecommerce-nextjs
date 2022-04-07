import DeliveryItem from "@/components/delivery/deliveryItem"
import { OrderContainer } from "@/container"
import { isObjectHasValue } from "@/helper"
import { MainNoFooter } from "@/layout"
import { Delivery, DeliveryDetailWithId } from "@/models"
import { setDelivery, setMessage } from "@/modules"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDelivery, useInputText } from "shared/hook"
import { RootState } from "../core"

const ShippingDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const language = "vni"

  const {
    data: deliveryList = [],
    getDeliveryDetail,
    confirmDelivery,
  } = useDelivery()
  const { delivery, address, productList } = useSelector(
    (state: RootState) => state.order
  )
  const [deliveryDetail, setDeliveryDetail] = useState<DeliveryDetailWithId>()
  const inputProps = useInputText("")

  // Functions
  const handleAddDelivery = (deliveryProps: Delivery) => {
    if (delivery?.carrier_id === deliveryProps.carrier_id) {
      dispatch(setDelivery(undefined))
    } else {
      dispatch(setDelivery(deliveryProps))
    }
  }

  const handleSetDeliveryDetail = (deliveryProps: Delivery) => {
    if (deliveryProps.carrier_id === deliveryDetail?.carrier_id) {
      setDeliveryDetail(undefined)
    } else {
      getDeliveryDetail({
        carrier_id: deliveryProps.carrier_id,
        handleSuccess: (deliveryDetail: DeliveryDetailWithId) => {
          setDeliveryDetail(deliveryDetail)
        },
      })
    }
  }

  const handleRedirect = () => {
    if (!delivery) {
      dispatch(
        setMessage({
          title: "Vui lòng chọn đơn vị vận chuyển để tiếp tục!",
          type: "danger",
          isOpen: true,
        })
      )
    } else {
      confirmDelivery({
        delivery: {
          carrier_id: delivery.carrier_id,
          delivery_message: inputProps.value,
        },
        handleSuccess: () => {
          router.push("/payment")
        },
      })
    }
  }

  useEffect(() => {
    if (!productList) {
      router.push("/cart")
    }

    if (!address) {
      router.push("/address")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, productList])

  return (
    <OrderContainer isShowPromotion={false}>
      <div className="shipping__detail">
        <h3 className="shipping__detail-heading">
          {language === "vni"
            ? "Chọn phương thức vận chuyển"
            : "Choose a shipping method"}
        </h3>

        <ul className="shipping__detail-list grid grid-col-1 grid-col-lg-2">
          {deliveryList.length > 0 &&
            deliveryList.map(
              (item) =>
                item.shipping_active && (
                  <DeliveryItem
                    addDelivery={handleAddDelivery}
                    delivery={item}
                    isActive={delivery?.carrier_id === item.carrier_id}
                    setDeliveryDetail={handleSetDeliveryDetail}
                    deliveryDetail={
                      item.carrier_id === deliveryDetail?.carrier_id
                        ? deliveryDetail
                        : undefined
                    }
                  />
                )
            )}
        </ul>

        <div className="shipping__detail-input">
          <textarea
            {...inputProps}
            placeholder="Lời nhắn cho đơn vị vận chuyển..."
            rows={2}
          ></textarea>
        </div>

        <footer className="shipping__detail-footer">
          <button
            onClick={handleRedirect}
            className={`${delivery ? "" : "btn-disabled"} btn-primary`}
          >
            {language === "vni" ? "Tiếp tục thanh toán" : "Continue to Payment"}
          </button>
        </footer>
      </div>
    </OrderContainer>
  )
}

ShippingDetail.Layout = MainNoFooter

export default ShippingDetail
