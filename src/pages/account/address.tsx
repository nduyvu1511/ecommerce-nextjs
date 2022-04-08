import { AccountContainer } from "@/container"
import { MainAuthLayout, MainLayout } from "@/layout"
import Address from "../../shared/components/address/address"

const UserAddress = () => {
  return (
    <AccountContainer heading="Your Address" desc="This is address">
      <Address type="account" />
    </AccountContainer>
  )
}

UserAddress.Layout = MainAuthLayout

export default UserAddress
