import { initializeApp } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyCqyE-eZjsBpmtbIzY4V-MNUKA9CmgmgGA",
  authDomain: "broomtechv2-d2431.firebaseapp.com",
  projectId: "broomtechv2-d2431",
  storageBucket: "broomtechv2-d2431.firebasestorage.app",
  messagingSenderId: "789470234134",
  appId: "1:789470234134:web:cbb4169b9cbd3c60459737",
  measurementId: "G-5TPKYCJXHE",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)
const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export { auth, db, storage, analytics }

