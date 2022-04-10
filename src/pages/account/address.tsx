import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import Address from "../../shared/components/address/address"

const UserAddress = () => {
  return (
    <AccountContainer heading="Your Address">
      <Address type="account" />
    </AccountContainer>
  )
}

UserAddress.Layout = MainAuthLayout

export default UserAddress
