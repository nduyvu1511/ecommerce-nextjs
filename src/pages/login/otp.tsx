import { useEffect, useRef, useState } from "react"
import { ScreenLoading } from "@/components"
import { AuthContainer } from "@/container"
import { getFromSessionStorage, setToLocalStorage } from "@/helper"
import userApi from "@/services/userApi"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { HiOutlineArrowSmLeft } from "react-icons/hi"
import { toast } from "react-toastify"
import { authentication } from "../../core/config/firebase"
import { OTPSchema, phoneNumberSchema } from "../../core/schema"
import { MainLayout } from "@/layout"
import { useDispatch } from "react-redux"
import { setMessage, setToken, setUserInfo } from "@/modules"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

const LoginWithOTP = () => {
  const language = "vni"
  const router = useRouter()
  const dispatch = useDispatch()

  const phoneNumberRef = useRef<string>()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isOtpLoading, setOtpLoading] = useState<boolean>(false)
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

  const handleLoginWithPhoneNumber = async ({
    phoneNumber,
  }: {
    phoneNumber: string
  }) => {
    setLoading(true)
    const verify = generateRecaptcha()

    try {
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phoneNumber.slice(1)}`,
        verify
      )
      phoneNumberRef.current = phoneNumber
      window.confirmationResult = confirmationResult

      setExpandForm(true)
      setLoading(false)

      sessionStorage.setItem("phoneNumberInput", phoneNumber)
    } catch (error) {
      generateRecaptcha()
      setLoading(false)
    }
  }

  const OTPVerifier = async ({ OTPInput: code }: { OTPInput: string }) => {
    const confirmationResult = window.confirmationResult
    setOtpLoading(true)
    try {
      const res = await confirmationResult.confirm(code)
      userApi
        .firebaseAuth({
          firebase_access_token: res._tokenResponse.idToken,
        })
        .then((res: any) => {
          const result = res?.result
          if (result?.success) {
            router.push("/")
            dispatch(setToken(result.data.token))
            dispatch(
              setMessage({ title: "Đăng nhập thành công!", isOpen: true })
            )

            userApi
              .getUserInfo({ token: result.data.token })
              .then((res: any) => {
                if (res.result.success) {
                  dispatch(setUserInfo(res.result.data))
                }
              })

            setOtpLoading(false)
          } else {
            dispatch(
              setMessage({
                title: result.message,
                isOpen: true,
                type: "danger",
              })
            )

            setOtpLoading(false)
          }
        })
    } catch (error) {
      setOtpLoading(false)
      dispatch(
        setMessage({
          title: "Vui lòng nhập đúng mã OTP",
          isOpen: true,
          type: "danger",
        })
      )
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  return (
    <>
      {!expandForm ? (
        <AuthContainer type="login">
          <Formik
            initialValues={{
              phoneNumber:
                (getFromSessionStorage("phoneNumberInput") as string) || "",
            }}
            validationSchema={phoneNumberSchema}
            onSubmit={handleLoginWithPhoneNumber}
          >
            {({ errors, touched, isValid }) => (
              <Form className="form-control form-control-auth">
                <div className="form-item">
                  <Field
                    className={`form-item-input ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "form-item-input-error"
                        : ""
                    }`}
                    id="phoneNumber"
                    type="text"
                    placeholder={
                      language === "vni" ? "Số điện thoại" : "Phone number"
                    }
                    name="phoneNumber"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <p className="form-item-text-error">{errors.phoneNumber}</p>
                  ) : null}
                </div>

                <div id="recaptcha-container"></div>

                <button
                  type="submit"
                  className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
                >
                  {language === "vni" ? "Tiếp theo" : "Next"}
                </button>
              </Form>
            )}
          </Formik>
        </AuthContainer>
      ) : null}

      {expandForm ? (
        <AuthContainer type="otp">
          <section className="otp-container">
            <header className="otp__header">
              <button
                onClick={() => setExpandForm(false)}
                className="btn-reset otp__header-btn"
              >
                <HiOutlineArrowSmLeft />{" "}
              </button>
              <p className="otp__header-heading">Vui Lòng Nhập Mã Xác Minh</p>
            </header>
            <div className="otp__form">
              <Formik
                initialValues={{
                  OTPInput: "",
                }}
                validationSchema={OTPSchema}
                onSubmit={OTPVerifier}
              >
                {({ errors, touched, isValid }) => (
                  <Form className="form-control">
                    <div className="form-item">
                      <label htmlFor="otpInput">
                        Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến (+84){" "}
                        {phoneNumberRef.current?.slice(1)}
                      </label>
                      <div className="form-item-wrapper">
                        <Field
                          autoFocus={true}
                          className={`${
                            errors.OTPInput && touched.OTPInput
                              ? "form-item-error"
                              : ""
                          }`}
                          maxLength={6}
                          id="otpInput"
                          type="tel"
                          name="OTPInput"
                        />

                        <div className="form-item-border">
                          {Array.from({ length: 6 }).map((item, index) => (
                            <span
                              key={index}
                              className="form-item-border-item"
                            ></span>
                          ))}
                        </div>
                      </div>
                      {errors.OTPInput && touched.OTPInput ? (
                        <p className="form-item-text-error">
                          {errors.OTPInput}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className={`btn-primary otp-btn-login ${
                        isValid ? "" : "btn-disabled"
                      }`}
                    >
                      {language === "vni" ? "Đăng Nhập" : "Sign up"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </AuthContainer>
      ) : null}

      {/* Loading  */}
      {isLoading || isOtpLoading ? <ScreenLoading /> : null}
    </>
  )
}

LoginWithOTP.Layout = MainLayout

export default LoginWithOTP
