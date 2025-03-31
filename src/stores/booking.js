import { defineStore } from "pinia"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuthStore } from "./auth"

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    authStore: useAuthStore(), // Initialize authStore in the state
  }),

  actions: {
    async createBooking(bookingData) {
      this.loading = true
      this.error = null

      try {
        if (!this.authStore.user) throw new Error("User not authenticated")

        // Validate required fields
        const requiredFields = ["service", "pickupLocation", "dropLocation", "details", "paymentMethod"]
        for (const field of requiredFields) {
          if (!bookingData[field]) {
            throw new Error(`Missing required field: ${field}`)
          }
        }

        // Add booking to Firestore
        const bookingRef = await addDoc(collection(db, "bookings"), {
          userId: this.authStore.user.uid,
          userName: this.authStore.user.displayName || "",
          userPhone: this.authStore.userProfile?.phone || "",
          userAddress: this.authStore.userProfile?.address || "",
          service: bookingData.service,
          details: bookingData.details,
          pickupLocation: bookingData.pickupLocation,
          dropLocation: bookingData.dropLocation,
          paymentMethod: bookingData.paymentMethod,
          amount: bookingData.amount || 0,
          status: "pending",
          isPaid: false,
          createdAt: serverTimestamp(),
          weather: bookingData.weather || "normal",
          additionalFees: bookingData.additionalFees || 0,
          totalAmount: bookingData.totalAmount || 0,
          // Add restaurant info for food delivery
          restaurant: bookingData.restaurant || null,
          // Add recipient info for delivery services
          recipientName: bookingData.recipientName || null,
          recipientContact: bookingData.recipientContact || null,
        })

        // Get the created booking
        const newBooking = await getDoc(bookingRef)

        if (!newBooking.exists()) {
          throw new Error("Failed to create booking")
        }

        this.currentBooking = {
          id: newBooking.id,
          ...newBooking.data(),
        }

        // Refresh the bookings list
        await this.getUserBookings()

        this.loading = false
        return this.currentBooking
      } catch (error) {
        console.error("Booking creation error:", error)
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async getUserBookings() {
      this.loading = true
      this.error = null

      try {
        if (!this.authStore.user) {
          console.error("No authenticated user in booking store")
          throw new Error("User not authenticated")
        }

        console.log("Fetching bookings for user:", this.authStore.user.uid)

        // Query bookings for current user without orderBy (temporary workaround)
        const q = query(collection(db, "bookings"), where("userId", "==", this.authStore.user.uid))

        const querySnapshot = await getDocs(q)
        console.log("Fetched bookings count:", querySnapshot.size)

        const bookings = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Ensure numerical values are properly converted
          return {
            id: doc.id,
            ...data,
            amount: Number(data.amount) || 0,
            additionalFees: Number(data.additionalFees) || 0,
            totalAmount: Number(data.totalAmount) || 0,
          }
        })

        // Sort by createdAt in descending order
        bookings.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0)
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0)
          return dateB - dateA
        })

        this.bookings = bookings
        console.log("Processed bookings:", this.bookings.length)

        this.loading = false
        return this.bookings
      } catch (error) {
        console.error("Error in getUserBookings:", error)
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    // Rest of the methods remain the same
    async getBookingById(id) {
      this.loading = true
      this.error = null

      try {
        const bookingDoc = await getDoc(doc(db, "bookings", id))

        if (!bookingDoc.exists()) {
          throw new Error("Booking not found")
        }

        this.currentBooking = {
          id: bookingDoc.id,
          ...bookingDoc.data(),
        }

        this.loading = false
        return this.currentBooking
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async cancelBooking(bookingId, reason) {
      try {
        const bookingRef = doc(db, "bookings", bookingId)

        await updateDoc(bookingRef, {
          status: "cancelled",
          cancelReason: reason,
          cancelledAt: serverTimestamp(),
        })

        // Update local state
        const index = this.bookings.findIndex((booking) => booking.id === bookingId)
        if (index !== -1) {
          this.bookings[index].status = "cancelled"
          this.bookings[index].cancelReason = reason
        }

        return true
      } catch (error) {
        console.error("Error cancelling booking:", error)
        throw error
      }
    },

    async deleteBooking(id) {
      this.loading = true
      this.error = null

      try {
        await deleteDoc(doc(db, "bookings", id))

        // Remove from bookings list
        this.bookings = this.bookings.filter((booking) => booking.id !== id)

        // Clear current booking if it's the one being deleted
        if (this.currentBooking && this.currentBooking.id === id) {
          this.currentBooking = null
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async updatePaymentStatus(id, isPaid, proofOfPayment) {
      this.loading = true
      this.error = null

      try {
        await updateDoc(doc(db, "bookings", id), {
          isPaid,
          proofOfPayment,
          paidAt: isPaid ? serverTimestamp() : null,
        })

        // Update local booking
        if (this.currentBooking && this.currentBooking.id === id) {
          this.currentBooking.isPaid = isPaid
          this.currentBooking.proofOfPayment = proofOfPayment
        }

        // Update bookings list
        const index = this.bookings.findIndex((booking) => booking.id === id)
        if (index !== -1) {
          this.bookings[index].isPaid = isPaid
          this.bookings[index].proofOfPayment = proofOfPayment
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async confirmBooking(id) {
      this.loading = true
      this.error = null

      try {
        await updateDoc(doc(db, "bookings", id), {
          status: "confirmed",
          confirmedAt: serverTimestamp(),
        })

        // Update local booking
        if (this.currentBooking && this.currentBooking.id === id) {
          this.currentBooking.status = "confirmed"
        }

        // Update bookings list
        const index = this.bookings.findIndex((booking) => booking.id === id)
        if (index !== -1) {
          this.bookings[index].status = "confirmed"
        }

        this.loading = false
        return true
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },
  },
})

