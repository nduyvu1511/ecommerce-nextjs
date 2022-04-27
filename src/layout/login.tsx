import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../core"

export const LoginLayout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()
  const { isOpenScreenLoading, isOpenLoginSMSModal, isOpenOtpLoginModal } =
    useSelector((state: RootState) => state.common)

  return (
    <>
      <section className="main__layout">
        <main>{children}</main>
        <ModalContainer />
      </section>
    </>
  )
}
