import { HeaderMobile, OTP } from "@/components"
import { LoginLayout } from "@/layout/login"

const LoginWithOTP = () => {
  return (
    <>
      <HeaderMobile centerChild={<p>Đăng nhập</p>} />

      <OTP show="page" type="login" />
    </>
  )
}

LoginWithOTP.Layout = LoginLayout

export default LoginWithOTP
