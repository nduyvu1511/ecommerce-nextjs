import { HeaderLogin, ScreenLoading } from "@/components"
import { LayoutProps } from "@/models"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../core"

export const LoginLayout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()
  const {  isOpenScreenLoading } = useSelector(
    (state: RootState) => state.common
  )
  return (
    <>
      <section className="main__layout">
        <HeaderLogin />

        <main>{children}</main>
      </section>

      {isOpenScreenLoading ? <ScreenLoading /> : null}
    </>
  )
}
