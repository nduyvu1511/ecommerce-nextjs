import { RootState } from "@/core/store"
import { toggleModalAddressForm } from "@/modules"
import { RiLoader4Line, RiMapPinAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useUserAddress } from "shared/hook"
import { AddressItem } from "./addressItem"

export const Address = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const { addressDefault } = useSelector((state: RootState) => state.user)

  const {
    data: { shipping_adress: addressList = [] } = { data: [] },
    isValidating,
  } = useUserAddress()

  return (
    <div className="address__container">
      {isValidating && addressList?.length === 0 ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      <div className="user__address">
        {addressList?.length > 0 &&
          addressList.map(
            (address) =>
              address.ward_id && (
                <AddressItem
                  key={address.id}
                  isActive={address.id === (addressDefault?.id || 0)}
                  address={address}
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
    </div>
  )
}
