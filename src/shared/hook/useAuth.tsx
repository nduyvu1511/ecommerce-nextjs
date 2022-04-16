import { RootState } from "@/core/store"
import { useDispatch, useSelector } from "react-redux"
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { authentication, fbProvider, googleProvider } from "@/core/config"
import userApi from "@/services/userApi"
import { setMessage } from "@/modules"
import { UserInfo } from "@/models"

interface UseAuthRes {
  token: string
  loginWithFacebook: (callback: (token: string) => void) => void
  loginWithGoogle: (callback: (token: string) => void) => void
  OTPVerifier: (
    otpInput: string,
    callback: (token: string) => void,
    handleError: Function
  ) => void

  getUserInfo: (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => void
}

export const useAuth = (): UseAuthRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const loginWithFacebook = async (callback: (token: string) => void) => {
    try {
      const result = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken
      const firebase_access_token = credential.accessToken
    } catch (error: any) {
      console.log("error: ", error.message)
    }
  }

  const loginWithGoogle = async (callback: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(
        authentication,
        googleProvider
      )

      const credential = GoogleAuthProvider.credentialFromResult(response)
      const google_access_token: any = credential?.accessToken
      const firebase_access_token = credential?.idToken

      if (!googleProvider || !firebase_access_token) return

      const userInfoRes = response.user

      const res = await userApi.firebaseAuth({
        firebase_access_token,
        google_access_token,
        account_type: "google",
      })
      const result = res.data.result
      if (result.success) {
        // callback(token)
        if (userInfoRes) {
        }
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  const OTPVerifier = async (
    otpInput: string,
    callback: (token: string) => void,
    handleError: Function
  ) => {
    const confirmationResult = window.confirmationResult
    try {
      const responseToken = await confirmationResult.confirm(otpInput)

      const res: any = await userApi.firebaseAuth({
        firebase_access_token: responseToken._tokenResponse.idToken,
      })
      const token = res?.result?.data?.token
      if (token) {
        callback(token)
      } else {
        handleError()
        dispatch(
          setMessage({
            title: res.result.message,
            isOpen: true,
            type: "danger",
          })
        )
      }
    } catch (error) {
      handleError()
      dispatch(
        setMessage({
          title: "Vui lòng nhập đúng mã OTP",
          isOpen: true,
          type: "danger",
        })
      )
    }
  }

  const getUserInfo = (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => {
    if (!token) return

    userApi
      .getUserInfo({ token })
      .then((res: any) => {
        const info = res?.result?.data
        if (info) {
          handleSuccess(info)
        } else {
          handleError && handleError()
        }
      })
      .catch(() => {
        handleError && handleError()
      })
  }

  return {
    token,
    loginWithFacebook,
    loginWithGoogle,
    OTPVerifier,
    getUserInfo,
  }
}
