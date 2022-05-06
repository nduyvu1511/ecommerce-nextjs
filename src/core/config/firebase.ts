import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)
authentication.useDeviceLanguage()

// const messaging = getMessaging()
// getToken(messaging, {
//   vapidKey:
//     "BIsfJkI7Y8ArRwtd11nBqNSFvVQ9KRLC-LLBP7gh8s3rPz5EbBWcENioTJkehcl0bsR0wTiH_6FWDuo1ACynzrk",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...

//       console.log("current token: ", currentToken)
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       )
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err)
//     // ...
//   })

export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()
