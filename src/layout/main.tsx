import { Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <section className="main__layout">
      <Header />
      <main>{children}</main>
      <Footer />

      <ModalContainer />
    </section>
  )
}
