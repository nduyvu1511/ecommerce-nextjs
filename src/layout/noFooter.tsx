import { Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"

export const MainNoFooter = ({ children }: LayoutProps) => {
  return (
    <section className="main__layout">
      <Header />
      <main>{children}</main>

      <ModalContainer />
    </section>
  )
}
