import { otpImage, signinBg } from "@/assets"
import { setMessage, setToken } from "@/modules"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsFacebook } from "react-icons/bs"
import { FaPhoneAlt } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useAuth } from "shared/hook"

interface IAuthLayout {
  children: React.ReactNode
  type: "login" | "register" | "otp"
}

export const AuthContainer = ({ children, type }: IAuthLayout) => {
  const language = "vni"
  const router = useRouter()
  const dispatch = useDispatch()

  const { loginWithGoogle, loginWithFacebook } = useAuth()

  const handleLoginWithGoogle = async () => {
    loginWithGoogle((token: string) => {
      dispatch(setToken(token))
      router.push("/")
      dispatch(setMessage({ title: "Đăng nhâp thành công", isOpen: true }))
    })
  }

  const handleLoginWithFacebook = async () => {
    loginWithFacebook((token) => {
      dispatch(setToken(token))
      router.push("/")
      dispatch(setMessage({ title: "Đăng nhâp thành công", isOpen: true }))
    })
  }

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-wrapper">
          <div className="form-image image-container">
            <Image
              src={type === "otp" ? otpImage : signinBg}
              alt=""
              layout="fill"
              className="image"
            />
          </div>

          <div className="form-wrapper">
            {type !== "otp" ? (
              <h3 className="form-heading">
                {type === "login"
                  ? language === "vni"
                    ? "Đăng Nhập hoặc tạo tài khoản"
                    : "Login or create account"
                  : language === "vni"
                  ? "Đăng Ký"
                  : "Register"}
              </h3>
            ) : null}

            <div className="form-body">
              {children}
              {type !== "otp" ? (
                <footer className="form-footer">
                  <div className="recaptcha-container"></div>

                  <div className="form-footer-separate">
                    <span className="left"></span>
                    <span className="text">
                      {language === "vni" ? "Hoặc" : "Or"}
                    </span>
                    <span className="right"></span>
                  </div>

                  <div className="form-footer-others">
                    <button
                      onClick={handleLoginWithGoogle}
                      className="btn-primary"
                    >
                      <FcGoogle />
                      {language === "vni"
                        ? "Kết nối với Google"
                        : "Continue with Google"}
                    </button>
                    <button
                      onClick={handleLoginWithFacebook}
                      className="btn-primary"
                    >
                      <BsFacebook />
                      {language === "vni"
                        ? "Kết nối với Facebook"
                        : "Continue with Facebook"}
                    </button>

                    {router.pathname.split("/login/")[1] !== "otp" ? (
                      <Link href="/login/otp" passHref>
                        <button className="btn-primary">
                          <FaPhoneAlt />
                          {language === "vni"
                            ? "Đăng nhập với SMS"
                            : "Continue with SMS"}
                        </button>
                      </Link>
                    ) : null}
                  </div>
                </footer>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
