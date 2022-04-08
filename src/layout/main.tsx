import { Footer, Header } from "@/components"
import { Footer2 } from "@/components/footer/footer2"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <section
      className="main__layout"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer2 />

      <ModalContainer />
    </section>
  )
}
