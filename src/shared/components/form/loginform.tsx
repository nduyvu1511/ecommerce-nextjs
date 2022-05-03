import { AuthContainer } from "@/container"
import { loginSchema } from "@/core/schema"
import { getFromSessionStorage } from "@/helper"
import { ILogin } from "@/models"
import {
  setMessage,
  setToken,
  setUserInfo,
  toggleOpenLoginModal,
  toggleOpenOtpLoginModal,
} from "@/modules"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useAuth } from "shared/hook"

interface LoginFormProps {
  view: "page" | "modal"
}

export const LoginForm = ({ view }: LoginFormProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { loginWithPassword, getUserInfo } = useAuth()

  const handleLogin = (data: ILogin) => {
    loginWithPassword(data, (token) => {
      dispatch(setToken(token))
      if (view === "modal") {
        dispatch(setMessage({ title: "Đăng nhập thành công" }))
        dispatch(toggleOpenLoginModal(false))
      } else {
        router.push("/")
      }
      getUserInfo(token, (userInfo) => {
        dispatch(setUserInfo(userInfo))
      })
    })
  }
  return (
    <AuthContainer view={view} heading="Đăng nhập" type="login">
      {view === "modal" ? (
        <button
          onClick={() => {
            dispatch(toggleOpenLoginModal(false))
            dispatch(toggleOpenOtpLoginModal(false))
          }}
          className="btn-reset modal__login-close-btn"
        >
          <IoClose />
        </button>
      ) : null}

      <Formik
        initialValues={{
          phone: (getFromSessionStorage("phoneNumberInput") as string) || "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isValid }) => (
          <Form className="form-control form-control-auth">
            <div className="form-item">
              <Field
                className={`form-item-input ${
                  errors.phone && touched.phone ? "form-item-input-error" : ""
                }`}
                id="phone"
                type="text"
                placeholder={"Số điện thoại"}
                name="phone"
              />
              {errors.phone && touched.phone ? (
                <p className="form-item-text-error">{errors.phone}</p>
              ) : null}
            </div>

            <div className="form-item">
              <div className="form-item-wrapper">
                <Field
                  className={`form-item-input ${
                    errors.password && touched.password
                      ? "form-item-input-error"
                      : ""
                  }`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="btn-reset form-item-input-pw-icon"
                >
                  {!showPassword ? <RiEyeCloseLine /> : <RiEyeFill />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <p className="form-item-text-error">{errors.password}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
            >
              Đăng nhập
            </button>

            <div className="form-item-forgot-pw">
              <Link href="/reset_password">
                <a onClick={() => dispatch(toggleOpenLoginModal(false))}>
                  Quên mật khẩu
                </a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  )
}
