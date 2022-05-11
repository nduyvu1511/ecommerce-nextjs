import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg",

  authDomain: "womart-3a686.firebaseapp.com",

  projectId: "womart-3a686",

  storageBucket: "womart-3a686.appspot.com",

  messagingSenderId: "761325889031",

  appId: "1:761325889031:web:a95b7a85155033038eeca2",

  measurementId: "G-Y65TNJYHSL",
}

const messaging = getMessaging(firebaseApp)
