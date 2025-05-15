import { defineStore } from "pinia"
import { auth, db } from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { watch } from "vue"

// Cache for user roles and profiles to avoid repeated Firestore queries
const userCache = new Map()

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    authInitialized: false,
    userRole: null,
    userProfile: null,
    isLoading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.userRole === "admin",
    isDriver: (state) => state.userRole === "driver",
    isUser: (state) => state.userRole === "user",
    currentUser: (state) => state.user,
    profile: (state) => state.userProfile,
  },

  actions: {
    async register(email, password, userData) {
      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Send email verification
        await sendEmailVerification(user)

        // Prepare user data for Firestore
        const userDocData = {
          id: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          role: "user",
          createdAt: new Date().toISOString(),
          ...userData,
        }

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), userDocData)

        // Update store state
        this.user = userDocData
        this.userRole = "user"
        this.userProfile = userDocData
        
        // Cache user data
        userCache.set(user.uid, {
          userData: userDocData,
          role: "user",
          timestamp: Date.now()
        })

        return user
      } catch (error) {
        console.error("Registration error:", error)
        throw error
      }
    },

    async login(email, password) {
      try {
        // Preload admin dashboard if email contains admin indicators
        if (email.includes("admin") || email.includes("administrator")) {
          // Preload admin dashboard in the background
          import("../views/admin/Dashboard.vue").catch(() => {
            // Silently handle import errors
          })
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Check cache first
        const cachedData = userCache.get(user.uid)
        if (cachedData && (Date.now() - cachedData.timestamp < 3600000)) { // Cache valid for 1 hour
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...cachedData.userData
          }
          this.userRole = cachedData.role
          this.userProfile = cachedData.userData
          
          // If admin, preload dashboard
          if (cachedData.role === "admin") {
            import("../views/admin/Dashboard.vue").catch(() => {
              // Silently handle import errors
            })
          }
          
          return user
        }

        // Get user data from Firestore if not in cache
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
          }
          this.userRole = userData.role || "user"
          this.userProfile = userData
          
          // Cache the user data
          userCache.set(user.uid, {
            userData,
            role: userData.role || "user",
            timestamp: Date.now()
          })
          
          // If admin, preload dashboard
          if (userData.role === "admin") {
            import("../views/admin/Dashboard.vue").catch(() => {
              // Silently handle import errors
            })
          }
        }

        return user
      } catch (error) {
        console.error("Login error:", error)
        throw error
      }
    },

    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        // Check cache first
        const cachedData = userCache.get(user.uid)
        if (cachedData && (Date.now() - cachedData.timestamp < 3600000)) { // Cache valid for 1 hour
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...cachedData.userData
          }
          this.userRole = cachedData.role
          this.userProfile = cachedData.userData
          return user
        }

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (!userDoc.exists()) {
          // Create new user document if it doesn't exist
          const userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            role: "user",
            createdAt: new Date().toISOString(),
          }
          await setDoc(doc(db, "users", user.uid), userData)
          this.user = userData
          this.userRole = "user"
          this.userProfile = userData
          
          // Cache the user data
          userCache.set(user.uid, {
            userData,
            role: "user",
            timestamp: Date.now()
          })
        } else {
          const userData = userDoc.data()
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
          }
          this.userRole = userData.role || "user"
          this.userProfile = userData
          
          // Cache the user data
          userCache.set(user.uid, {
            userData,
            role: userData.role || "user",
            timestamp: Date.now()
          })
        }

        return user
      } catch (error) {
        console.error("Google login error:", error)
        throw error
      }
    },

    // Add specific admin login method for faster admin dashboard loading
    async loginAdmin(email, password) {
      try {
        // Preload admin dashboard immediately
        const dashboardPromise = import("../views/admin/Dashboard.vue").catch(() => {
          // Silently handle import errors
        })
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Check cache first for faster response
        const cachedData = userCache.get(user.uid)
        if (cachedData && cachedData.role === "admin" && (Date.now() - cachedData.timestamp < 3600000)) {
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...cachedData.userData
          }
          this.userRole = "admin"
          this.userProfile = cachedData.userData
          
          // Wait for dashboard to load
          await dashboardPromise
          
          return user
        }

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          
          if (userData.role !== "admin") {
            await auth.signOut()
            throw new Error("You do not have admin privileges")
          }
          
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
          }
          this.userRole = "admin"
          this.userProfile = userData
          
          // Cache the user data
          userCache.set(user.uid, {
            userData,
            role: "admin",
            timestamp: Date.now()
          })
          
          // Wait for dashboard to load
          await dashboardPromise
          
          // Preload common admin components
          setTimeout(() => {
            import("../views/admin/Users.vue").catch(() => {})
            import("../views/admin/Drivers.vue").catch(() => {})
          }, 500)
        } else {
          await auth.signOut()
          throw new Error("Admin account not found")
        }

        return user
      } catch (error) {
        console.error("Admin login error:", error)
        throw error
      }
    },

    async initAuth() {
      this.isLoading = true

      return new Promise((resolve) => {
        // Check if there's already a user in Firebase Auth
        const currentUser = auth.currentUser

        if (currentUser) {
          // Check cache first for faster response
          const cachedData = userCache.get(currentUser.uid)
          if (cachedData && (Date.now() - cachedData.timestamp < 3600000)) {
            this.user = {
              id: currentUser.uid,
              email: currentUser.email,
              emailVerified: currentUser.emailVerified,
              ...cachedData.userData
            }
            this.userRole = cachedData.role
            this.userProfile = cachedData.userData
            this.isLoading = false
            resolve(this.user)
            return
          }
          
          // User is already authenticated in Firebase, get their data
          this.fetchUserData(currentUser).then(() => {
            this.isLoading = false
            resolve(this.user)
          })
        } else {
          // Wait for auth state to be determined
          const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              await this.fetchUserData(user)
            } else {
              this.clearUser()
            }

            this.isLoading = false
            resolve(this.user)
            unsubscribe()
          })
        }
      })
    },

    // Optimized helper method to fetch user data
    async fetchUserData(user) {
      try {
        // Check cache first
        const cachedData = userCache.get(user.uid)
        if (cachedData && (Date.now() - cachedData.timestamp < 3600000)) { // Cache valid for 1 hour
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...cachedData.userData
          }
          this.userRole = cachedData.role
          this.userProfile = cachedData.userData
          return
        }
        
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          this.user = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
          }
          this.userRole = userData.role || "user"
          this.userProfile = userData
          
          // Cache the user data
          userCache.set(user.uid, {
            userData,
            role: userData.role || "user",
            timestamp: Date.now()
          })
          
          // If admin, preload dashboard
          if (userData.role === "admin") {
            import("../views/admin/Dashboard.vue").catch(() => {
              // Silently handle import errors
            })
          }
        } else {
          console.warn("User document not found in Firestore")
          this.clearUser()
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        this.clearUser()
      }
    },

    setUser(userData) {
      this.user = userData
      this.userRole = userData.role || "user"
      this.userProfile = userData
      
      // Cache the user data
      if (userData && userData.id) {
        userCache.set(userData.id, {
          userData,
          role: userData.role || "user",
          timestamp: Date.now()
        })
      }
    },

    clearUser() {
      this.user = null
      this.userRole = null
      this.userProfile = null
    },

    async updateProfile(profileData) {
      if (!this.user?.id) return null

      try {
        const updatedProfile = {
          ...this.userProfile,
          ...profileData,
        }
        
        await setDoc(
          doc(db, "users", this.user.id),
          updatedProfile,
          { merge: true },
        )

        this.userProfile = updatedProfile
        
        // Update cache
        userCache.set(this.user.id, {
          userData: updatedProfile,
          role: updatedProfile.role || "user",
          timestamp: Date.now()
        })
        
        return this.userProfile
      } catch (error) {
        console.error("Error updating profile:", error)
        throw error
      }
    },

    async logout() {
      try {
        await auth.signOut()
        this.clearUser()
        return true
      } catch (error) {
        console.error("Logout error:", error)
        throw error
      }
    },

    // Add this method to ensure user is initialized
    async ensureUserInitialized() {
      if (this.user) return this.user

      // Wait for auth state to be determined
      if (this.authInitialized === false) {
        await new Promise((resolve) => {
          const unwatch = watch(
            () => this.authInitialized,
            (initialized) => {
              if (initialized) {
                unwatch()
                resolve()
              }
            },
          )

          // Set a timeout in case auth never initializes
          setTimeout(() => {
            unwatch()
            resolve()
          }, 5000)
        })
      }

      return this.user
    },

    // Find the init method and make sure it sets authInitialized
    async init() {
      this.loading = true

      try {
        // Set up auth state observer
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in
            await this.fetchUserData(user)
          } else {
            // User is signed out
            this.user = null
          }
          this.authInitialized = true
          this.loading = false
        })
      } catch (error) {
        console.error("Error initializing auth:", error)
        this.error = error.message
        this.authInitialized = true
        this.loading = false
      }
    },
  },
})