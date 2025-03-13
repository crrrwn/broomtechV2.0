import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const adminEmail = "broomtechv2@gmail.com"
const adminPassword = "broomtech123"

async function setupAdminUser() {
  try {
    let userCredential

    try {
      // Try to sign in first
      userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // If user doesn't exist, create new account
        userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
      } else {
        throw error
      }
    }

    const user = userCredential.user

    // Create or update admin document
    await setDoc(
      doc(db, "admins", user.uid),
      {
        email: adminEmail,
        isAdmin: true,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    ) // Use merge to update existing document if it exists

    console.log("Admin user setup completed successfully")
    console.log("Admin UID:", user.uid)
  } catch (error) {
    console.error("Error setting up admin:", error)
  }
}

// Run the setup
setupAdminUser()
  .then(() => {
    console.log("Setup process completed")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Setup failed:", error)
    process.exit(1)
  })

