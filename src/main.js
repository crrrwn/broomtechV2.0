import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import "./assets/css/tailwind.css"
import { auth } from "./firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "./stores/auth"

// Comment out Leaflet import until it's installed
// import "leaflet/dist/leaflet.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

let appMounted = false

// Wait for Firebase auth to initialize before mounting app
onAuthStateChanged(auth, (user) => {
  const authStore = useAuthStore()

  if (user) {
    // User is signed in
    authStore.setUser(user)
  } else {
    // User is signed out
    authStore.clearUser()
  }

  if (!appMounted) {
    app.mount("#app")
    appMounted = true
  }
})

