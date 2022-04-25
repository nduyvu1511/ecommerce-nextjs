import { OtpForm, PhoneForm } from "@/components"
import { AuthContainer } from "@/container"
import { authentication } from "@/core/config"
import { RootState } from "@/core/store"
import {
  clearAuthData,
  setMessage,
  setPhoneNumber,
  setToken,
  setUserInfo,
  toggleOpenLoginModal,
  toggleOpenOtpLoginModal,
  toggleOpenScreenLoading,
} from "@/modules"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { HiOutlineArrowSmLeft } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "shared/hook"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface LoginOtpProps {
  type: "update" | "login"
  show: "page" | "modal"
}

export const OTP = ({ type, show }: LoginOtpProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const phoneNumberRef = useRef<string>()
  const { loginWithPhoneNumber, updatePhoneNumber, getUserInfo } = useAuth()
  const { currentUserInfo, phoneNumber, currentToken } = useSelector(
    (state: RootState) => state.auth
  )
  const [expandForm, setExpandForm] = useState<boolean>(false)

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      authentication
    )
  }

  // Generate OTP input
  const generateOtpCode = async (phoneNumber: string) => {
    dispatch(toggleOpenScreenLoading(true))
    const verify = generateRecaptcha()

    try {
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phoneNumber.slice(1)}`,
        verify
      )
      dispatch(toggleOpenScreenLoading(false))
      phoneNumberRef.current = phoneNumber
      window.confirmationResult = confirmationResult

      setExpandForm(true)

      sessionStorage.setItem("phoneNumberInput", phoneNumber)
      if (type === "update") {
        dispatch(setPhoneNumber(phoneNumber))
      }
    } catch (error) {
      dispatch(toggleOpenScreenLoading(false))
      generateRecaptcha()
    }
  }

  // Validate OTP
  const handleVerifyOTP = async (otpInput: string) => {
    if (type === "update") {
      updatePhoneNumber({
        otpInput,
        handleSuccess: (token) => {
          // if (token) {
          //   dispatch(setToken(token))
          //   getUserInfo(token, (userInfo) => {
          //     dispatch(setUserInfo(userInfo))
          //   })
          // } else {
          if (currentToken) {
            dispatch(setToken(currentToken))
          }
          if (currentUserInfo?.id) {
            dispatch(
              setUserInfo({ ...currentUserInfo, phone: phoneNumber || "" })
            )
            // }
          }

          dispatch(toggleOpenOtpLoginModal(false))
          router.push("/")
          dispatch(clearAuthData())
        },
        handleError: () => {
          setExpandForm(false)
        },
      })
    } else {
      loginWithPhoneNumber({
        otpInput,
        handleSuccess: (token) => {
          if (show === "page") {
            router.push("/")
          } else {
            dispatch(toggleOpenLoginModal(false))
            dispatch(setMessage({ title: "Đăng nhập thành công" }))
          }
          dispatch(setToken(token))
          getUserInfo(token, (userInfo) => {
            dispatch(setUserInfo(userInfo))
          })
        },
        handleError: () => {},
      })
    }
  }

  return (
    <>
      {!expandForm ? (
        type === "update" ? (
          <>
            <AuthContainer
              show={show}
              showLogo={false}
              heading="Vui lòng cập nhật số điện thoại"
              type="otp"
            >
              <button
                onClick={() => {
                  dispatch(toggleOpenOtpLoginModal(false))
                  dispatch(clearAuthData())
                }}
                className="btn-reset modal__otp-close-btn"
              >
                <IoClose />
              </button>
              <PhoneForm
                type="login"
                onSubmit={(phone) => generateOtpCode(phone)}
              />
            </AuthContainer>
          </>
        ) : (
          <AuthContainer show={show} heading="Đăng nhập bằng SMS" type="login">
            <button
              onClick={() => {
                dispatch(toggleOpenLoginModal(false))
              }}
              className="btn-reset modal__otp-close-btn"
            >
              <IoClose />
            </button>
            <PhoneForm
              type="login"
              onSubmit={(phone) => generateOtpCode(phone)}
            />
          </AuthContainer>
        )
      ) : (
        <AuthContainer show={show} showLogo={type !== "update"} type="otp">
          <button
            onClick={() => {
              dispatch(toggleOpenOtpLoginModal(false))
              dispatch(clearAuthData())
            }}
            className="btn-reset modal__otp-close-btn"
          >
            <IoClose />
          </button>

          <div className="otp-container">
            <header className="otp__header">
              <button
                onClick={() => setExpandForm(false)}
                className="btn-reset otp__header-btn"
              >
                <HiOutlineArrowSmLeft />
              </button>
              <p className="otp__header-heading">Vui Lòng Nhập Mã Xác Minh</p>
            </header>
            <div className="otp__form">
              <OtpForm
                phoneNumber={phoneNumberRef.current || ""}
                onSubmit={(val) => handleVerifyOTP(val)}
                type={type}
              />
            </div>
          </div>
        </AuthContainer>
      )}
    </>
  )
}
