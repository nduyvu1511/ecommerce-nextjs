import { AccountContainer } from "@/container"
import { inputs } from "@/container/account/data"
import { userInfoSchema } from "@/core/schema"
import { RootState } from "@/core/store"
import { MainAuthLayout } from "@/layout"
import { editUserInfo, setMessage } from "@/modules"
import userApi from "@/services/userApi"
import { Field, Form, Formik } from "formik"
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"

interface UserForm {
  phone: string
  email: string
  name: string
  sex: string
}

const UserInfo = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const { userInfo, token } = useSelector((state: RootState) => state.user)

  const handleSubmit = (user: any) => {
    const { phone, ...others } = user

    userApi.updateUser({ ...others, token }).then((res: any) => {
      if (res.result.success) {
        dispatch(editUserInfo(others))
        dispatch(
          setMessage({
            title: "Chỉnh sửa người dùng thành công",
            isOpen: true,
          })
        )
      } else {
        dispatch(
          setMessage({
            title: res.result.message as string,
            isOpen: true,
            type: "danger",
          })
        )
      }
    })
  }

  return (
    <AccountContainer heading="Your profile">
      <div className="user__info-body-form">
        {_.isObject(userInfo) && Object.keys(userInfo).length > 0 && (
          <Formik
            initialValues={{
              phone: userInfo.phone,
              email: userInfo.email,
              name: userInfo.name,
              sex: userInfo.sex,
            }}
            validationSchema={userInfoSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid }) => (
              <Form className="form-control">
                {inputs.map((input) => (
                  <div
                    key={input.id}
                    className={`form-item-inline ${
                      input.id === "sex" ? "form-item-inline-radio" : ""
                    }`}
                  >
                    <label htmlFor={input.id}>
                      {language === "vni" ? input.vniTitle : input.engTitle}
                    </label>
                    {input.type === "text" ? (
                      <Field
                        className={`form-item-input ${
                          errors[input.id] && touched[input.id]
                            ? "form-item-input-error"
                            : ""
                        }`}
                        id={input.id}
                        readOnly={userInfo.phone && input.id === "phone"}
                        type="text"
                        placeholder={
                          language === "vni" ? input.vniTitle : input.engTitle
                        }
                        name={input.id}
                      />
                    ) : (
                      <div className="form-item-input-radio">
                        <label>
                          <Field type="radio" name={input.id} value="male" />
                          {language === "vni" ? "Nam" : "Male"}
                        </label>
                        <label>
                          <Field type="radio" name={input.id} value="female" />
                          {language === "vni" ? "Nữ" : "Female"}
                        </label>
                      </div>
                    )}
                    {errors[input.id] && touched[input.id] ? (
                      <p className="form-item-text-error">{errors[input.id]}</p>
                    ) : null}
                  </div>
                ))}
                <button
                  type="submit"
                  className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
                >
                  {language === "vni" ? "Cập nhật" : "Update"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </AccountContainer>
  )
}

UserInfo.Layout = MainAuthLayout

export default UserInfo
