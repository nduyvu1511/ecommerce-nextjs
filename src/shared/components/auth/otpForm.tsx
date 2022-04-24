import React, { useState } from "react"
import OtpInput from "react-otp-input"

interface PhoneFormProps {
  phoneNumber: string
  onSubmit: (otpCode: string) => void
  type: "update" | "login"
}

export const OtpForm = ({ phoneNumber, onSubmit, type }: PhoneFormProps) => {
  const [otpVal, setOtpVal] = useState<string>("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit && onSubmit(otpVal)
      }}
      className="form-control"
    >
      <div className="form-item">
        <label htmlFor="otpInput">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến <b>{phoneNumber}</b>
        </label>

        <div className="input-otp">
          <OtpInput
            shouldAutoFocus
            value={otpVal}
            onChange={(otp: string) => setOtpVal(otp)}
            numInputs={6}
            isInputNum
          />
        </div>
      </div>

      <button
        type="submit"
        className={`btn-primary otp-btn-login ${
          otpVal.length === 6 ? "" : "btn-disabled"
        }`}
      >
        {type === "login" ? "Đăng Nhập" : "Cập nhật"}
      </button>
    </form>
  )
}
