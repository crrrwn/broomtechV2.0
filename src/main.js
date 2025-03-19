import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import "./assets/css/tailwind.css"  // Keep Tailwind CSS import
import { auth, db } from "./firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "./stores/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

// Comment out Leaflet import until it's installed
// import "leaflet/dist/leaflet.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

let appMounted = false

// Wait for Firebase auth to initialize before mounting app
onAuthStateChanged(auth, async (user) => {
  const authStore = useAuthStore()

  try {
    if (user) {
      // User is signed in
      try {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          authStore.setUser({
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
          })
        } else {
          // Handle case where user exists in Auth but not in Firestore
          const userData = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            role: "user",
            createdAt: new Date().toISOString(),
          }
          await setDoc(doc(db, "users", user.uid), userData)
          authStore.setUser(userData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        authStore.clearUser()
      }
    } else {
      // User is signed out
      authStore.clearUser()
    }
  } catch (error) {
    console.error("Auth state error:", error)
    authStore.clearUser()
  } finally {
    // Set loading to false regardless of outcome
    authStore.isLoading = false
    
    // Mount the app if not already mounted
    if (!appMounted) {
      app.mount("#app")
      appMounted = true
    }
  }
}, (error) => {
  console.error("Auth observer error:", error)
  const authStore = useAuthStore()
  authStore.clearUser()
  authStore.isLoading = false
  
  // Mount the app even on error to avoid white screen
  if (!appMounted) {
    app.mount("#app")
    appMounted = true
  }
})

// Setup navigation guards based on authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // If route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !authStore.isAuthenticated && !authStore.isLoading) {
    next('/login')
  } 
  // If route is for guests only (like login) and user is already logged in
  else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/')
  }
  // Otherwise proceed normally
  else {
    next()
  }
})