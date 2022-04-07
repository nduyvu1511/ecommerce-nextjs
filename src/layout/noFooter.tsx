import { Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"

export const MainNoFooter = ({ children }: LayoutProps) => {
  return (
    <section
      className="main__layout__no-footer"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1, minHeight: "100vh" }}>{children}</main>

      <ModalContainer />
    </section>
  )
}
