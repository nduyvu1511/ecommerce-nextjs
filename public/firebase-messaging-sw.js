importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging.js")

import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}
initializeApp(firebaseConfig)
const messaging = getMessaging()

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )
  // Customize notification here
  const notificationTitle = "Background Message Title"
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
