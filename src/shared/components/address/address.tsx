import { Modal, ModalConfirm } from "@/components"
import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import {
  setAddress,
  setDelivery,
  setPayment,
  toggleModalAddressForm,
} from "@/modules"
import { RiMapPinAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useUserAddress } from "shared/hook"
import { BoxGridLoading } from "../loader"
import AddressForm from "./addressForm"
import AddressItem from "./addressItem"

interface IAddress {
  type: "account" | "order"
}

export const Address = ({ type }: IAddress) => {
  const language = "vni"
  const dispatch = useDispatch()
  const { addressDefault } = useSelector((state: RootState) => state.user)
  const { isOpenAddressForm } = useSelector((state: RootState) => state.common)
  const {
    address: orderAddress,
    payment,
    delivery,
  } = useSelector((state: RootState) => state.order)

  const {
    data: { shipping_adress: addressList = [] } = { data: [] },
    isValidating,
  } = useUserAddress()

  const handleSetAddressOrder = (address: ShippingAddress) => {
    if (address.id === orderAddress?.id) return
    dispatch(setAddress(address))
    if (payment) {
      dispatch(setPayment(undefined))
    }

    if (delivery) {
      dispatch(setDelivery(undefined))
    }
  }

  const handleClickModal = () => {
    dispatch(toggleModalAddressForm(false))
  }

  return (
    <div className="address__container">
      {isValidating && addressList?.length === 0 ? (
        <BoxGridLoading length={6} />
      ) : null}

      <div className="user__address">
        {addressList?.length > 0 &&
          addressList.map(
            (address) =>
              address.ward_id && (
                <AddressItem
                  type={type}
                  key={address.id}
                  isActive={address.id === (addressDefault?.id || 0)}
                  address={address}
                  onCheck={(address: ShippingAddress) => {
                    handleSetAddressOrder(address)
                  }}
                />
              )
          )}
        <button
          onClick={() => dispatch(toggleModalAddressForm(true))}
          className="btn-reset user__address-btn-add"
        >
          <RiMapPinAddLine />
          {language === "vni" ? "Thêm địa chỉ" : "Add Address"}
        </button>
      </div>

      {isOpenAddressForm ? (
        <>
          <Modal
            unsetSize={true}
            direction="center"
            isShowModal={true}
            heading={language === "vni" ? "Địa chỉ mới" : "Create New Address"}
            isShowConfirmModal={true}
            handleClickModal={handleClickModal}
          >
            <AddressForm />
          </Modal>

          <ModalConfirm
            confirmModal={handleClickModal}
            desc={`${
              language === "vni"
                ? "Nếu thoát, những gì bạn vừa nhập có thể sẽ mất!"
                : "If you exit, what you just entered may be lost"
            }`}
          />
        </>
      ) : null}
    </div>
  )
}

export default Address
