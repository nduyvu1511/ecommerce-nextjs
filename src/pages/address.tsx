import { Address as AddressComponent } from "@/components"
import { OrderContainer } from "@/container"
import { isObjectHasValue } from "@/helper"
import { MainAuthLayoutNoFooter } from "@/layout"
import { setAddress, setMessage } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useOrder, useUserAddress } from "shared/hook"
import { RootState } from "../core"

const Address = () => {
  const router = useRouter()
  const language = "vni"
  const dispatch = useDispatch()
  useUserAddress()

  const { productList, address } = useSelector(
    (state: RootState) => state.order
  )
  const { updateOrderDraft } = useOrder()
  const { addressDefault } = useSelector((state: RootState) => state.user)

  const handleRedirect = () => {
    if (!address) {
      dispatch(
        setMessage({
          title: "Vui lòng chọn địa chỉ để tiếp tục",
          type: "warning",
          isOpen: true,
        })
      )
    } else {
      updateOrderDraft({
        partner_shipping_id: address?.id,
        handleSuccess: () => {
          router.push("/shipping_detail")
        },
      })
    }
  }

  useEffect(() => {
    if (!productList) {
      router.push("/cart")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList])

  useEffect(() => {
    if (!address && addressDefault) {
      dispatch(setAddress(addressDefault))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <OrderContainer headerTitle="Địa chỉ giao hàng" isShowPromotion={false}>
      <AddressComponent type="order" />
      <div className="order__address-link">
        <button
          onClick={handleRedirect}
          className={`btn-primary ${
            !isObjectHasValue(address) ? "disabled" : ""
          }`}
        >
          {language === "vni"
            ? "Tiếp tục đến thông tin giao hàng"
            : "Continue to shipping detail"}
        </button>
      </div>
    </OrderContainer>
  )
}

Address.Layout = MainAuthLayoutNoFooter

export default Address
