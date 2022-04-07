import { formatMoneyVND } from "@/helper"
import { Delivery, DeliveryDetail, DeliveryDetailWithId } from "@/models"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { InputCheckbox } from "../inputs"

interface DeliveryItemProps {
  delivery: Delivery
  addDelivery: (delivery: Delivery) => void
  isActive: boolean
  deliveryDetail?: DeliveryDetail | undefined
  setDeliveryDetail?: (delivert: Delivery) => void
}

interface DeliveryDetailToggle extends DeliveryDetailWithId {
  // isOpen:
}

const DeliveryItem = (props: DeliveryItemProps) => {
  const { addDelivery, delivery, isActive, setDeliveryDetail, deliveryDetail } =
    props

  return (
    <li
      onClick={() => addDelivery && addDelivery(delivery)}
      key={delivery.carrier_id}
      className={`shipping__detail-list-item ${
        isActive ? "shipping__detail-list-item-active" : ""
      }`}
    >
      <div className="shipping__detail-wrapper">
        <div className="shipping__detail-wrapper-content">
          <h3>{delivery.carrier_name}</h3>
          <p>{formatMoneyVND(delivery.shipping_fee)}</p>
        </div>

        <div className="shipping__detail-wrapper-option">
          <InputCheckbox
            isChecked={isActive}
            onCheck={() => addDelivery && addDelivery(delivery)}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setDeliveryDetail && setDeliveryDetail(delivery)
            }}
            className="btn-reset shipping__detail-wrapper-option-btn"
          >
            {deliveryDetail ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </button>
        </div>
      </div>

      {deliveryDetail ? (
        <div
          className={`shipping__detail-wrapper-child ${
            delivery?.carrier_id === delivery.carrier_id
              ? "shipping__detail-wrapper-child-expand"
              : ""
          }`}
        >
          <p>{deliveryDetail.delivery_message}</p>
          <p>{formatMoneyVND(deliveryDetail.delivery_price)}</p>
        </div>
      ) : null}
    </li>
  )
}

export default DeliveryItem
