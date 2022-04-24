import { phoneNumberSchema } from "@/core/schema"
import React from "react"

import { Field, Form, Formik } from "formik"
import { getFromSessionStorage } from "@/helper"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  type: "login" | "update"
}

export const PhoneForm = ({ onSubmit, type }: OtpFormProps) => {
  return (
    <Formik
      initialValues={{
        phoneNumber:
          type === "login"
            ? getFromSessionStorage("phoneNumberInput") || ""
            : "",
      }}
      validationSchema={phoneNumberSchema}
      onSubmit={({ phoneNumber }) => onSubmit(phoneNumber)}
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
              placeholder="Số điện thoại"
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
            Tiếp theo
          </button>
        </Form>
      )}
    </Formik>
  )
}
