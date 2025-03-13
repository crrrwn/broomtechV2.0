import { defineStore } from "pinia"
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
  setDoc,
} from "firebase/firestore"
import { db } from "../firebase/config"

export const useAdminStore = defineStore("admin", {
  state: () => ({
    users: [],
    drivers: [],
    bookings: [],
    pendingDrivers: [],
    analytics: {
      totalUsers: 0,
      totalDrivers: 0,
      totalBookings: 0,
      totalEarnings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
    },
    loading: false,
    error: null,
  }),

  actions: {
    async getUsers() {
      this.loading = true
      this.error = null

      try {
        const q = query(collection(db, "users"), where("role", "==", "user"), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)

        this.users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        this.loading = false
        return this.users
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async getDrivers() {
      this.loading = true
      this.error = null

      try {
        const q = query(collection(db, "drivers"), where("status", "==", "approved"), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)

        this.drivers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        this.loading = false
        return this.drivers
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async getPendingDrivers() {
      this.loading = true
      this.error = null

      try {
        const q = query(collection(db, "drivers"), where("status", "==", "pending"), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)

        this.pendingDrivers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        this.loading = false
        return this.pendingDrivers
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async approveDriver(driverId) {
      this.loading = true
      this.error = null

      try {
        // Get driver document
        const driverDoc = await getDoc(doc(db, "drivers", driverId))

        if (!driverDoc.exists()) {
          throw new Error("Driver not found")
        }

        const driverData = driverDoc.data()

        // Update driver status
        await updateDoc(doc(db, "drivers", driverId), {
          status: "approved",
          approvedAt: serverTimestamp(),
        })

        // Update user role
        await updateDoc(doc(db, "users", driverData.userId), {
          role: "driver",
          pendingDriverRole: false,
        })

        // Update local pending drivers list
        const index = this.pendingDrivers.findIndex((driver) => driver.id === driverId)
        if (index !== -1) {
          this.pendingDrivers.splice(index, 1)
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async rejectDriver(driverId, reason) {
      this.loading = true
      this.error = null

      try {
        // Get driver document
        const driverDoc = await getDoc(doc(db, "drivers", driverId))

        if (!driverDoc.exists()) {
          throw new Error("Driver not found")
        }

        const driverData = driverDoc.data()

        // Update driver status
        await updateDoc(doc(db, "drivers", driverId), {
          status: "rejected",
          rejectionReason: reason,
          rejectedAt: serverTimestamp(),
        })

        // Update user role
        await updateDoc(doc(db, "users", driverData.userId), {
          pendingDriverRole: false,
        })

        // Update local pending drivers list
        const index = this.pendingDrivers.findIndex((driver) => driver.id === driverId)
        if (index !== -1) {
          this.pendingDrivers.splice(index, 1)
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async getBookings() {
      this.loading = true
      this.error = null

      try {
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)

        this.bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        this.loading = false
        return this.bookings
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async assignBookingToDriver(bookingId, driverId, driverName) {
      this.loading = true
      this.error = null

      try {
        await updateDoc(doc(db, "bookings", bookingId), {
          driverId,
          driverName,
          status: "assigned",
          assignedAt: serverTimestamp(),
        })

        // Update local bookings list
        const index = this.bookings.findIndex((booking) => booking.id === bookingId)
        if (index !== -1) {
          this.bookings[index].driverId = driverId
          this.bookings[index].driverName = driverName
          this.bookings[index].status = "assigned"
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async verifyPayment(bookingId) {
      this.loading = true
      this.error = null

      try {
        await updateDoc(doc(db, "bookings", bookingId), {
          isPaid: true,
          paymentVerifiedAt: serverTimestamp(),
          paymentVerifiedBy: "admin",
        })

        // Update local bookings list
        const index = this.bookings.findIndex((booking) => booking.id === bookingId)
        if (index !== -1) {
          this.bookings[index].isPaid = true
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async processRefund(bookingId, refundProof) {
      this.loading = true
      this.error = null

      try {
        await updateDoc(doc(db, "bookings", bookingId), {
          isRefunded: true,
          refundProof,
          refundedAt: serverTimestamp(),
        })

        // Update local bookings list
        const index = this.bookings.findIndex((booking) => booking.id === bookingId)
        if (index !== -1) {
          this.bookings[index].isRefunded = true
          this.bookings[index].refundProof = refundProof
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    async getAnalytics() {
      this.loading = true
      this.error = null

      try {
        // Get total users
        const usersSnapshot = await getDocs(collection(db, "users"))
        this.analytics.totalUsers = usersSnapshot.size

        // Get total drivers
        const driversQuery = query(collection(db, "drivers"), where("status", "==", "approved"))
        const driversSnapshot = await getDocs(driversQuery)
        this.analytics.totalDrivers = driversSnapshot.size

        // Get total bookings
        const bookingsSnapshot = await getDocs(collection(db, "bookings"))
        this.analytics.totalBookings = bookingsSnapshot.size

        // Get completed bookings
        const completedQuery = query(collection(db, "bookings"), where("status", "==", "completed"))
        const completedSnapshot = await getDocs(completedQuery)
        this.analytics.completedBookings = completedSnapshot.size

        // Get cancelled bookings
        const cancelledQuery = query(collection(db, "bookings"), where("status", "==", "cancelled"))
        const cancelledSnapshot = await getDocs(cancelledQuery)
        this.analytics.cancelledBookings = cancelledSnapshot.size

        // Calculate total earnings
        let totalEarnings = 0
        completedSnapshot.forEach((doc) => {
          const data = doc.data()
          totalEarnings += data.totalAmount || 0
        })
        this.analytics.totalEarnings = totalEarnings

        this.loading = false
        return this.analytics
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    // For auto-accepting cash-on-delivery orders
    async autoAcceptCODBookings() {
      this.loading = true
      this.error = null

      try {
        const q = query(
          collection(db, "bookings"),
          where("status", "==", "pending"),
          where("paymentMethod", "==", "cod"),
          where("autoAccepted", "==", false),
        )

        const querySnapshot = await getDocs(q)

        const batch = writeBatch(db)

        querySnapshot.forEach((doc) => {
          batch.update(doc.ref, {
            status: "accepted",
            autoAccepted: true,
            acceptedAt: serverTimestamp(),
          })
        })

        await batch.commit()

        this.loading = false
        return querySnapshot.size // Return number of auto-accepted bookings
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    // For tracking driver performance
    async getDriverPerformance(driverId) {
      this.loading = true
      this.error = null

      try {
        // Get completed bookings for this driver
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("driverId", "==", driverId),
          where("status", "==", "completed"),
        )

        const bookingsSnapshot = await getDocs(bookingsQuery)

        let totalDeliveryTime = 0
        let totalEarnings = 0
        let totalRating = 0
        let ratingCount = 0

        bookingsSnapshot.forEach((doc) => {
          const booking = doc.data()

          // Calculate delivery time if available
          if (booking.completedAt && booking.acceptedAt) {
            const deliveryTime = (booking.completedAt.toDate() - booking.acceptedAt.toDate()) / (1000 * 60) // in minutes
            totalDeliveryTime += deliveryTime
          }

          // Sum up earnings
          totalEarnings += booking.driverEarnings || 0

          // Sum up ratings
          if (booking.rating) {
            totalRating += booking.rating
            ratingCount++
          }
        })

        const performance = {
          completedDeliveries: bookingsSnapshot.size,
          avgDeliveryTime: bookingsSnapshot.size > 0 ? Math.round(totalDeliveryTime / bookingsSnapshot.size) : 0,
          totalEarnings: totalEarnings,
          avgRating: ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : "N/A",
        }

        this.loading = false
        return performance
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    // For managing AI chat support settings
    async updateAIChatSettings(settings) {
      this.loading = true
      this.error = null

      try {
        await setDoc(doc(db, "settings", "aiChatSupport"), settings)

        this.loading = false
        return true
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },

    // For getting AI chat support settings
    async getAIChatSettings() {
      this.loading = true
      this.error = null

      try {
        const settingsDoc = await getDoc(doc(db, "settings", "aiChatSupport"))

        this.loading = false

        if (settingsDoc.exists()) {
          return settingsDoc.data()
        } else {
          // Return default settings if not found
          return {
            enabled: true,
            welcomeMessage: "Welcome to BroomTech Support! How can I assist you today?",
            paymentInstructions:
              "Please send your payment of {amount} to our {method} account: {account}. After payment, please upload a screenshot of your payment confirmation.",
            refundTemplate:
              "Your refund of {amount} has been processed on {date}. It should reflect in your account within 3-5 business days.",
          }
        }
      } catch (error) {
        this.loading = false
        this.error = error.message
        throw error
      }
    },
  },
})

