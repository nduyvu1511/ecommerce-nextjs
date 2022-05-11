import { EmptyLayout } from "@/layout"
import { persistor, store } from "core"
import { getMessaging, getToken } from "firebase/messaging"
import Head from "next/head"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { SWRConfig } from "swr"
import { AppPropsWithLayout } from "../models"
import "../styles/index.scss"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  useEffect(() => {
    const messaging = getMessaging()
    getToken(messaging, {
      vapidKey:
        "BIsfJkI7Y8ArRwtd11nBqNSFvVQ9KRLC-LLBP7gh8s3rPz5EbBWcENioTJkehcl0bsR0wTiH_6FWDuo1ACynzrk",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...

          console.log("current token: ", currentToken)
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          )
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err)
        // ...
      })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
