// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg",
  authDomain: "womart-3a686.firebaseapp.com",
  databaseURL:
    "https://womart-3a686-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "womart-3a686",
  storageBucket: "womart-3a686.appspot.com",
  messagingSenderId: "761325889031",
  appId: "1:761325889031:web:a95b7a85155033038eeca2",
  measurementId: "G-Y65TNJYHSL",
}
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
export const authentication = getAuth(app)
authentication.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()

export const getFCMToken = (setTokenFound: (token: string) => void) => {
  return getToken(messaging, {
    vapidKey:
      "BIsfJkI7Y8ArRwtd11nBqNSFvVQ9KRLC-LLBP7gh8s3rPz5EbBWcENioTJkehcl0bsR0wTiH_6FWDuo1ACynzrk",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken)
        setTokenFound(currentToken)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        )
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
