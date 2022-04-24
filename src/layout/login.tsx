import { HeaderLogin, Modal, OTP, ScreenLoading, Toast } from "@/components"
import { LayoutProps } from "@/models"
import { toggleOpenOtpLoginModal } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../core"

export const LoginLayout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()
  const { isOpenScreenLoading, isOpenLoginModal, isOpenOtpLoginModal } =
    useSelector((state: RootState) => state.common)
  return (
    <>
      <section className="main__layout">
        <HeaderLogin />

        <main>{children}</main>
      </section>

      {isOpenScreenLoading ? <ScreenLoading /> : null}
      {isOpenOtpLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(toggleOpenOtpLoginModal(false))}
          >
            <OTP show="modal" type="update" />
          </Modal>
        </div>
      ) : null}

      <Toast />

      {isOpenLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(toggleOpenOtpLoginModal(false))}
          >
            <OTP show="modal" type="login" />
          </Modal>
        </div>
      ) : null}
    </>
  )
}
