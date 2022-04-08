import { OrderContainer } from "@/container"
import { MainAuthLayoutNoFooter } from "@/layout"
import { setAddress, setMessage } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUserAddress } from "shared/hook"
import { useOrder } from "shared/hook/useOrder"
import { RootState } from "../core"
import AddressComponent from "../shared/components/address/address"
import { isObjectHasValue } from "../shared/helper/functions"

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
          title: "Vui lòng chọn sản phẩm để tiếp tục",
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
    <OrderContainer isShowPromotion={false}>
      <AddressComponent type="order" />
      <div className="order__address-link">
        <button
          onClick={handleRedirect}
          className={`btn-primary ${
            !isObjectHasValue(address) ? "btn-disabled" : ""
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
