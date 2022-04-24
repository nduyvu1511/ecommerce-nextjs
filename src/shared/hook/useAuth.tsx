import { authentication, fbProvider, googleProvider } from "@/core/config"
import { RootState } from "@/core/store"
import { UserInfo } from "@/models"
import {
  setCurrentToken,
  setMessage,
  toggleOpenOtpLoginModal,
  toggleOpenScreenLoading,
} from "@/modules"
import userApi from "@/services/userApi"
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"

interface otpProps {
  otpInput: string
  handleSuccess: (token: string) => void
  handleError?: Function
}

interface UseAuthRes {
  token: string
  loginWithFacebook: (handleSuccess: (token: string) => void) => void
  loginWithGoogle: (handleSuccess: (token: string) => void) => void
  loginWithPhoneNumber: (props: otpProps) => void
  updatePhoneNumber: (props: otpProps) => void
  getUserInfo: (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => void
}

export const useAuth = (): UseAuthRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const { currentToken, phoneNumber } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()

  const loginWithFacebook = async (handleSuccess: (token: string) => void) => {
    try {
      const result = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken
      const firebase_access_token = credential.accessToken
    } catch (error: any) {
      console.log("error: ", error.message)
    }
  }

  const loginWithGoogle = async (handleSuccess: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(
        authentication,
        googleProvider
      )
      const credential = GoogleAuthProvider.credentialFromResult(response)
      const firebase_access_token = credential?.idToken
      if (!googleProvider || !firebase_access_token || !response?.user) return
      dispatch(toggleOpenScreenLoading(true))

      const res: any = await userApi.firebaseAuth({
        type: "data_google",
        data_in_token: response.user,
        firebase_access_token,
      })
      dispatch(toggleOpenScreenLoading(false))

      const token = res?.result?.data?.token
      if (res?.result?.success) {
        dispatch(setCurrentToken(token))
        handleSuccess(token)
      } else {
        dispatch(
          setMessage({
            type: "danger",
            title: res?.result?.message || "",
          })
        )
      }
    } catch (error) {
      console.log(error)
      dispatch(toggleOpenScreenLoading(false))
    }
  }

  const OTPVerifier = async (
    otpInput: string,
    handleSuccess: (token: string) => void,
    handleError: Function
  ) => {
    const confirmationResult = window.confirmationResult
    dispatch(toggleOpenScreenLoading(true))

    try {
      const responseToken = await confirmationResult.confirm(otpInput)
      const firebaseToken = responseToken?._tokenResponse?.idToken
      dispatch(toggleOpenScreenLoading(false))

      if (firebaseToken) {
        handleSuccess(firebaseToken)
      } else {
        handleError()
        dispatch(
          setMessage({
            title: "Vui lòng nhập đúng mã OTP",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(toggleOpenScreenLoading(false))
      dispatch(
        setMessage({
          title: "Vui lòng nhập đúng mã OTP",
          type: "danger",
        })
      )
    }
  }

  const updatePhoneNumber = async (props: otpProps) => {
    const { handleSuccess, handleError, otpInput } = props
    dispatch(toggleOpenScreenLoading(true))

    try {
      OTPVerifier(
        otpInput,
        async (firebase_access_token) => {
          if (!currentToken || !firebase_access_token || !phoneNumber) {
            dispatch(
              setMessage({
                title: "thiếu field cho update phone number ",
                type: "warning",
              })
            )
            return
          }

          const res: any = await userApi.updatePhoneNumber({
            firebase_access_token,
            phone: phoneNumber,
            token: currentToken,
          })
          dispatch(toggleOpenScreenLoading(false))

          if (res?.result?.success) {
            handleSuccess("")
          } else {
            const message = res?.result?.message
            dispatch(
              setMessage({
                title: message || "Số điện thoại đã tồn tại",
                type: "warning",
              })
            )
            if (message === "Tài khoản chưa được kích hoạt!") {
              dispatch(toggleOpenOtpLoginModal(false))
            } else {
              handleError && handleError()
            }
          }
        },
        () => {
          dispatch(toggleOpenScreenLoading(false))
        }
      )
    } catch (error) {
      dispatch(toggleOpenScreenLoading(false))
      console.log(error)
    }
  }

  const loginWithPhoneNumber = async (props: otpProps) => {
    const { handleSuccess, handleError, otpInput } = props
    dispatch(toggleOpenScreenLoading(true))
    try {
      OTPVerifier(
        otpInput,
        async (firebaseToken) => {
          const res: any = await userApi.firebaseAuth({
            firebase_access_token: firebaseToken,
          })
          const token = res?.result?.data?.token
          if (res?.result?.success) {
            handleSuccess(token)
          } else {
            handleError && handleError()
            dispatch(
              setMessage({
                title: res?.result?.message || "Đăng nhập không thành công",
                type: "danger",
              })
            )
          }
        },
        () => handleError && handleError()
      )
    } catch (error) {
      console.log(error)
    }
  }

  const getUserInfo = async (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => {
    if (!token) return

    try {
      const res: any = await userApi.getUserInfo({ token })
      if (res?.result?.success) {
        handleSuccess(res?.result?.data)
      } else {
        handleError && handleError()
      }
    } catch (error) {
      handleError && handleError()
    }
  }

  return {
    token,
    loginWithFacebook,
    loginWithGoogle,
    getUserInfo,
    loginWithPhoneNumber,
    updatePhoneNumber,
  }
}
