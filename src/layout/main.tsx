import { Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import ChatContainer from "@/container/chat/chatContainer"
import { LayoutProps } from "@/models"
import { useEffect } from "react"
import { useNotification } from "shared/hook/useNotification"
import { getFCMToken, onMessageListener } from "../core"

export const MainLayout = ({ children }: LayoutProps) => {
  const { setNotificationUserId } = useNotification(false)

  getFCMToken((token) => console.log(token))

  onMessageListener()
    .then((payload) => {
      console.log(payload)
    })
    .catch((err) => console.log("failed: ", err))

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then(function (registration) {
  //         console.log("Registration successful, scope is:", registration.scope)
  //       })
  //       .catch(function (err) {
  //         console.log("Service worker registration failed, error:", err)
  //       })
  //   }
  // }, [])

  return (
    <section className="main__layout">
      <Header />
      <main>{children}</main>
      <Footer />
      <ModalContainer />
      <ChatContainer />
    </section>
  )
}
