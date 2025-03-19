import { defineStore } from "pinia"
import { auth, db } from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    userRole: null,
    userProfile: null,
    isLoading: true,
    authError: null
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
        this.isLoading = true
        this.authError = null
        
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
        this.authError = error.message || "Registration failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async login(email, password) {
      try {
        this.isLoading = true
        this.authError = null
        
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
          this.user = userData
          this.userRole = "user"
          this.userProfile = userData
        }

        return user
      } catch (error) {
        console.error("Login error:", error)
        this.authError = error.message || "Login failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async loginWithGoogle() {
      try {
        this.isLoading = true
        this.authError = null
        
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
        this.authError = error.message || "Google login failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async initAuth() {
      this.isLoading = true
      this.authError = null

      return new Promise((resolve) => {
        try {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
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
                  // Handle case where user exists in Auth but not in Firestore
                  const userData = {
                    id: user.uid,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    role: "user",
                    createdAt: new Date().toISOString(),
                  }
                  await setDoc(doc(db, "users", user.uid), userData)
                  this.user = userData
                  this.userRole = "user"
                  this.userProfile = userData
                }
              } catch (error) {
                console.error("Error in initAuth:", error)
                this.authError = error.message || "Authentication initialization failed"
                this.clearUser()
              }
            } else {
              this.clearUser()
            }

            this.isLoading = false
            resolve(this.user)
            unsubscribe()
          }, (error) => {
            console.error("Auth state observer error:", error)
            this.authError = error.message || "Authentication observer failed"
            this.isLoading = false
            this.clearUser()
            resolve(null)
            unsubscribe()
          })
        } catch (error) {
          console.error("Setup auth observer error:", error)
          this.authError = error.message || "Authentication setup failed"
          this.isLoading = false
          this.clearUser()
          resolve(null)
        }
      })
    },

    setUser(userData) {
      this.user = userData
      this.userRole = userData?.role || "user"
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
        this.isLoading = true
        
        await setDoc(
          doc(db, "users", this.user.id),
          {
            ...this.userProfile,
            ...profileData,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        )

        this.userProfile = { ...this.userProfile, ...profileData }
        return this.userProfile
      } catch (error) {
        console.error("Error updating profile:", error)
        this.authError = error.message || "Profile update failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        this.isLoading = true
        this.authError = null
        
        await auth.signOut()
        this.clearUser()
        return true
      } catch (error) {
        console.error("Logout error:", error)
        this.authError = error.message || "Logout failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})