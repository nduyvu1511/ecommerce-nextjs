import { HeaderMobile } from "@/components"
import { AuthContainer } from "@/container"
import { loginSchema } from "@/core/schema"
import { getFromSessionStorage } from "@/helper"
import { LoginLayout } from "@/layout/login"
import { ILogin } from "@/models"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri"

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleLogin = (data: ILogin) => {
    // dispatch(fetchLogin(data))
  }

  return (
    <>
      <HeaderMobile centerChild={<p>Đăng nhập</p>} />
      <AuthContainer show="page" heading="Đăng nhập" type="login">
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
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="btn-reset form-item-input-icon"
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
            </Form>
          )}
        </Formik>
      </AuthContainer>
    </>
  )
}

Login.Layout = LoginLayout

export default Login
