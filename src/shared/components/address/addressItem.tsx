import { InputCheckbox } from "@/components"
import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import {
  setAddress,
  setAddressDefault,
  setAddressForm,
  toggleModalAddressForm,
} from "@/modules"
import { useRef, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useClickOutside, useUserAddress } from "shared/hook"

interface IAddressItem {
  isActive?: boolean
  address: ShippingAddress
  type: "account" | "order"
  onCheck?: (address: ShippingAddress) => void
}

export const AddressItem = ({
  isActive,
  address,
  onCheck,
  type,
}: IAddressItem) => {
  const language = "vni"
  const { deleteAddress } = useUserAddress(false)
  const dispatch = useDispatch()
  const optionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useClickOutside([optionRef, buttonRef], () => setOpenOption(false))

  const {
    token,
    userInfo: { id: partner_id },
    addressDefault,
  } = useSelector((state: RootState) => state.user)
  const { address: addressOrder } = useSelector(
    (state: RootState) => state.order
  )

  const [openOption, setOpenOption] = useState<boolean>(false)

  // Function
  const handleChangeDefault = () => {
    if (addressDefault?.id === address.id) {
      dispatch(setAddressDefault(undefined))
      if (addressOrder?.id === addressDefault.id) {
        dispatch(setAddress(undefined))
      }
    } else {
      dispatch(setAddressDefault(address))
      if (!addressOrder) {
        dispatch(setAddress(address))
      }
    }
    setOpenOption(false)
  }

  const handleCheckAddressItem = () => {
    if (type === "order") {
      onCheck && onCheck(address)
    }
  }

  const handleDeleteAddress = () => {
    if (!token || !partner_id) {
      toast.error("Token is invalid")
      return
    }

    deleteAddress({ partner_id, token, adress_id: address.id }).then(() => {
      setOpenOption(false)
    })
  }

  const handleUpdateAddress = () => {
    if (!address) return
    dispatch(toggleModalAddressForm(true))
    dispatch(setAddressForm(address))
  }

  return (
    <div
      onClick={handleCheckAddressItem}
      className={`address__item ${
        (isActive && type === "account") ||
        (address.id === addressOrder?.id && type === "order")
          ? "address__item-active"
          : ""
      } ${type === "order" ? "address__item-checkbox" : ""}`}
    >
      {isActive && type === "account" ? (
        <span className="address__item-active-label">
          <AiFillStar />
        </span>
      ) : null}

      <div
        className={`address__item-option-wrapper ${
          type === "order" ? "address__item-option-wrapper-checkbox" : ""
        }`}
      >
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            setOpenOption(!openOption)
          }}
          className="btn-reset address__item-btn"
        >
          <HiOutlineDotsVertical />
        </button>

        {openOption ? (
          <div ref={optionRef} className="address__item-option">
            {type === "account" ? (
              <>
                <p onClick={handleDeleteAddress}>
                  {language === "vni"
                    ? "Xóa địa chỉ này"
                    : "Delete this Address"}
                </p>
                <p onClick={handleChangeDefault}>
                  {addressDefault && addressDefault.id === address.id
                    ? "Xóa khỏi mặc định"
                    : "Đặt làm mặc định"}
                </p>
              </>
            ) : null}

            <p onClick={handleUpdateAddress}>
              {language === "vni" ? "Sửa địa chỉ này" : "Edit this Address"}
            </p>
          </div>
        ) : null}

        {type === "order" ? (
          <InputCheckbox
            isChecked={address.id === addressOrder?.id || false}
            onCheck={() => onCheck && onCheck(address)}
          />
        ) : null}
      </div>

      <ul className="address__item-list">
        <li className="address__item-list-item">
          <p
            className={`address__item-list-item-title ${
              language === "vni" ? "width-85" : "width-105"
            }`}
          >
            {language === "vni" ? "Họ tên: " : "Full name:"}
          </p>
          <p className="address__item-list-item-text">{address.name}</p>
        </li>

        <li className="address__item-list-item">
          <p
            className={`address__item-list-item-title ${
              language === "vni" ? "width-85" : "width-105"
            }`}
          >
            {language === "vni" ? "Điện thoại: " : "Phone number:"}
          </p>
          <p className="address__item-list-item-text">{address.phone}</p>
        </li>

        <li className="address__item-list-item">
          <p
            className={`address__item-list-item-title ${
              language === "vni" ? "width-85" : "width-105"
            }`}
          >
            {language === "vni" ? "Địa chỉ: " : "Address:"}
          </p>
          <p className="address__item-list-item-text">{address.full_adress}</p>
        </li>
      </ul>
    </div>
  )
}

export default AddressItem
