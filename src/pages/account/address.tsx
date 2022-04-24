import { Address } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"

const UserAddress = () => {
  return (
    <AccountContainer
      headerMobileTitle="Địa chỉ"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Địa chỉ", path: "" },
      ]}
      heading="Địa chỉ"
    >
      <Address />
    </AccountContainer>
  )
}

UserAddress.Layout = MainAuthLayout

export default UserAddress
