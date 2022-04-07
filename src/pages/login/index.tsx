import { getFromSessionStorage } from "@/helper"
import { MainLayout } from "@/layout"
import { ILogin } from "@/models"
import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import AuthContainer from "../../container/auth/authContainer"
import { loginSchema } from "../../core/schema"

const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = (data: ILogin) => {
    // dispatch(fetchLogin(data))
  }

  return (
    <AuthContainer type="login">
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
                placeholder={
                  "Phone number"
                  // language === "vni" ? "Số điện thoại" : "Phone number"
                }
                name="phone"
              />
              {errors.phone && touched.phone ? (
                <p className="form-item-text-error form-item-text-error-sm">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="form-item">
              <Field
                className={`form-item-input ${
                  errors.password && touched.password
                    ? "form-item-input-error"
                    : ""
                }`}
                id="password"
                type="password"
                placeholder="Password"
                // placeholder={language === "vni" ? "Mật khẩu" : "Password"}
                name="password"
              />
              {errors.password && touched.password ? (
                <p className="form-item-text-error form-item-text-error-sm">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
            >
              Next
              {/* {language === "vni" ? "Tiếp theo" : "Next"} */}
            </button>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  )
}

Login.Layout = MainLayout

export default Login
