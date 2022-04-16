import { Address } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"

const UserAddress = () => {
  return (
    <AccountContainer
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Địa chỉ", path: "" },
      ]}
      heading="Your Address"
    >
      <Address type="account" />
    </AccountContainer>
  )
}

UserAddress.Layout = MainAuthLayout

export default UserAddress
