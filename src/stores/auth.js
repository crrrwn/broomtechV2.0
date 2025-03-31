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

        return user
      } catch (error) {
        console.error("Registration error:", error)
        throw error
      }
    },

    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Get user data from Firestore
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
        }

        return user
      } catch (error) {
        console.error("Google login error:", error)
        throw error
      }
    },

    async initAuth() {
      this.isLoading = true

      return new Promise((resolve) => {
        // Check if there's already a user in Firebase Auth
        const currentUser = auth.currentUser

        if (currentUser) {
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

    // Add this helper method to fetch user data
    async fetchUserData(user) {
      try {
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
    },

    clearUser() {
      this.user = null
      this.userRole = null
      this.userProfile = null
    },

    async updateProfile(profileData) {
      if (!this.user?.id) return null

      try {
        await setDoc(
          doc(db, "users", this.user.id),
          {
            ...this.userProfile,
            ...profileData,
          },
          { merge: true },
        )

        this.userProfile = { ...this.userProfile, ...profileData }
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
            await this.fetchUserData(user.uid)
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

