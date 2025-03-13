"use client"

import { defineStore } from "pinia"
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const user = ref(null)
  const loading = ref(false)

  // Set user data
  function setUser(userData) {
    user.value = userData
  }

  // Clear user data
  function clearUser() {
    user.value = null
  }

  // Check if user is authenticated
  function isAuthenticated() {
    return !!user.value
  }

  // Check if user is admin
  function isAdmin() {
    return user.value?.role === "admin"
  }

  // Check if user is driver
  function isDriver() {
    return user.value?.role === "driver"
  }

  // Logout user
  async function logout() {
    const auth = getAuth()
    const router = useRouter()

    try {
      await signOut(auth)
      clearUser()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return {
    user,
    loading,
    setUser,
    clearUser,
    isAuthenticated,
    isAdmin,
    isDriver,
    logout,
  }
})

