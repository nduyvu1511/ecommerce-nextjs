import { otpImage, signinBg } from "@/assets"
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsFacebook } from "react-icons/bs"
import { FaPhoneAlt } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { authentication, fbProvider, googleProvider } from "@/core/config"
import userApi from "@/services/userApi"
import { useDispatch } from "react-redux"
import { setMessage } from "@/modules"

interface IAuthLayout {
  children: React.ReactNode
  type: "login" | "register" | "otp"
}

export const AuthContainer = ({ children, type }: IAuthLayout) => {
  const language = "vni"
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLoginWithGoogle = async () => {
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

      userApi
        .firebaseAuth({
          firebase_access_token,
          google_access_token,
          account_type: "google",
        })
        .then((res) => {
          const result = res.data.result
          if (result.success) {
            dispatch(
              setMessage({ title: "Đăng nhập thành công!", isOpen: true })
            )
            router.push("/")
            // setToken(result.data.token)
            if (userInfoRes) {
              // dispatch(setUserInfo({
              //   name: userInfoRes.displayName,
              //   phone: userInfoRes.phoneNumber || '',
              //   email: userInfoRes.email,
              // }));
            }
          } else {
            toast.error(result.message)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken
      const firebase_access_token = credential.accessToken

      // dispatch(
      //   fetchLoginWithFirebase({
      //     firebase_access_token,
      //     facebook_access_token,
      //     account_type: "facebook",
      //   })
      // )
    } catch (error: any) {
      console.log("error: ", error.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-wrapper">
          <div className="form-image image-container">
            <Image
              src={type === "otp" ? otpImage : signinBg}
              alt=""
              layout="fill"
              className="image"
            />
          </div>

          <div className="form-wrapper">
            {type !== "otp" ? (
              <h3 className="form-heading">
                {type === "login"
                  ? language === "vni"
                    ? "Đăng Nhập hoặc tạo tài khoản"
                    : "Login or create account"
                  : language === "vni"
                  ? "Đăng Ký"
                  : "Register"}
              </h3>
            ) : null}

            <div className="form-body">
              {children}
              {type !== "otp" ? (
                <footer className="form-footer">
                  <div className="recaptcha-container"></div>

                  <div className="form-footer-separate">
                    <span className="left"></span>
                    <span className="text">
                      {language === "vni" ? "Hoặc" : "Or"}
                    </span>
                    <span className="right"></span>
                  </div>

                  <div className="form-footer-others">
                    <button
                      onClick={handleLoginWithGoogle}
                      className="btn-primary"
                    >
                      <FcGoogle />
                      {language === "vni"
                        ? "Kết nối với Google"
                        : "Continue with Google"}
                    </button>
                    <button
                      onClick={handleLoginWithFacebook}
                      className="btn-primary"
                    >
                      <BsFacebook />
                      {language === "vni"
                        ? "Kết nối với Facebook"
                        : "Continue with Facebook"}
                    </button>

                    {router.pathname.split("/login/")[1] !== "otp" ? (
                      <Link href="/login/otp" passHref>
                        <button className="btn-primary">
                          <FaPhoneAlt />
                          {language === "vni"
                            ? "Đăng nhập với SMS"
                            : "Continue with SMS"}
                        </button>
                      </Link>
                    ) : null}
                  </div>
                </footer>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
