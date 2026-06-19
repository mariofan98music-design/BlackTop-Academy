import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD5vnppJkJsT5u7VEyrIMSzc2bbX7LTqC8",
  authDomain: "luxury-login-d7214.firebaseapp.com",
  projectId: "luxury-login-d7214",
  storageBucket: "luxury-login-d7214.firebasestorage.app",
  messagingSenderId: "267162564404",
  appId: "1:267162564404:web:5365eceed366f5dcd71761"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)