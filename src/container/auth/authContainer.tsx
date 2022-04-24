import { logo } from "@/assets"
import { PHONE_SCHEMA } from "@/helper"
import {
  setCurrentUserInfo,
  setMessage,
  setToken,
  setUserInfo,
  toggleOpenLoginModal,
  toggleOpenOtpLoginModal,
} from "@/modules"
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
  heading?: string
  showLogo?: boolean
  show: "modal" | "page"
}

export const AuthContainer = ({
  children,
  type,
  heading,
  showLogo = true,
  show,
}: IAuthLayout) => {
  const language = "vni"
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithGoogle, loginWithFacebook, getUserInfo } = useAuth()

  const handleLoginWithGoogle = async () => {
    try {
      loginWithGoogle(async (token: string) => {
        getUserInfo(token, (userInfo) => {
          if (PHONE_SCHEMA.test(userInfo?.phone || "")) {
            if (show === "page") {
              router.push("/")
            } else {
              dispatch(toggleOpenLoginModal(false))
              dispatch(setMessage({ title: "Đăng nhâp thành công" }))
            }
            dispatch(setToken(token))
            dispatch(setUserInfo(userInfo))
          } else {
            if (show === "modal") {
              dispatch(toggleOpenLoginModal(false))
            }
            dispatch(setCurrentUserInfo(userInfo))
            dispatch(toggleOpenOtpLoginModal(true))
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginWithFacebook = async () => {
    loginWithFacebook((token) => {
      dispatch(setToken(token))
      router.push("/")
      dispatch(setMessage({ title: "Đăng nhâp thành công" }))
    })
  }

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth__inner">
          {showLogo ? (
            <div className="auth__inner-left">
              <Link href="/" passHref>
                <div className="image-container">
                  <Image src={logo} alt="" className="image" layout="fill" />
                </div>
              </Link>
            </div>
          ) : null}
          <div className="auth__inner-right">
            <div className="auth__form-container">
              {heading ? <h3 className="form-heading">{heading}</h3> : null}

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
                        className="btn-primary-outline"
                      >
                        <FcGoogle />
                        <span className="show-on-desktop">Google</span>
                        <span className="hide-on-desktop">
                          Tiếp tục với Google
                        </span>
                      </button>
                      <button
                        onClick={handleLoginWithFacebook}
                        className="btn-primary-outline"
                      >
                        <BsFacebook />
                        <span className="show-on-desktop">Facebook</span>
                        <span className="hide-on-desktop">
                          Tiếp tục với Facebook
                        </span>
                      </button>

                      {router.pathname === "/login/otp" ||
                      show === "modal" ? null : (
                        <Link href="/login/otp" passHref>
                          <button className="btn-primary-outline">
                            <FaPhoneAlt />
                            <span className="show-on-desktop">SMS</span>
                            <span className="hide-on-desktop">
                              Tiếp tục với SMS
                            </span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </footer>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
