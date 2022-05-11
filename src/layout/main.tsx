import { Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { useEffect } from "react"
import { useNotification } from "shared/hook/useNotification"

export const MainLayout = ({ children }: LayoutProps) => {
  const messaging = getMessaging()
  const { setNotificationUserId } = useNotification(false)

  useEffect(() => {
    const messaging = getMessaging()
    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          setNotificationUserId(currentToken)
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          )
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err)
      })

    onMessage(messaging, (payload) => {
      console.log("receive message.........................................")
      console.log(messaging, payload)
    })
  }, [])

  return (
    <section className="main__layout">
      <Header />
      <main>{children}</main>
      <Footer />
      <ModalContainer />
    </section>
  )
}
