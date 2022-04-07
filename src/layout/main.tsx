import { Footer, Header } from "@/components"
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
      <Footer />

      <ModalContainer />
    </section>
  )
}
