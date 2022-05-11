importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging.js")

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope)
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err)
    })
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
// Retrieve firebase messaging

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
