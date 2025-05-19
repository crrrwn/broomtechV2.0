import { defineStore } from "pinia"
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  serverTimestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore"
import { db, auth } from "../firebase/config"

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  }),

  getters: {
    unreadCount: (state) => {
      return state.notifications.filter((notification) => !notification.isRead).length
    },
  },

  actions: {
    async fetchNotifications() {
      this.loading = true
      this.error = null

      try {
        const user = auth.currentUser
        if (!user) throw new Error("User not authenticated")

        const q = query(collection(db, "notifications"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)

        this.notifications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        this.unreadCount = this.notifications.filter((notification) => !notification.isRead).length
        this.loading = false
      } catch (error) {
        console.error("Error fetching notifications:", error)
        this.error = error.message
        this.loading = false
      }
    },

    async createNotification(notificationData) {
      try {
        const user = auth.currentUser
        if (!user) throw new Error("No authenticated user found")

        const notification = {
          userId: user.uid,
          title: notificationData.title,
          message: notificationData.message,
          type: notificationData.type || "info",
          link: notificationData.link || null,
          isRead: false,
          createdAt: serverTimestamp(),
        }

        const docRef = await addDoc(collection(db, "notifications"), notification)

        // Add to local state
        this.notifications.unshift({
          id: docRef.id,
          ...notification,
          createdAt: new Date(),
        })

        this.unreadCount++

        return docRef.id
      } catch (error) {
        console.error("Error creating notification:", error)
        throw error
      }
    },

    async createDriverApplicationNotification(driverName, applicationId) {
      try {
        await addDoc(collection(db, "notifications"), {
          type: "driver_application",
          title: "New Driver Application",
          message: `${driverName} has submitted a driver application`,
          driverApplicationId: applicationId,
          status: "unread",
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating notification:", error)
        throw error
      }
    },

    async createInterviewNotification(userId, interviewDate, interviewTime) {
      try {
        const formattedDate = new Date(interviewDate).toLocaleDateString()
        const message = `Your interview has been scheduled for ${formattedDate} at ${interviewTime}. Please be prepared.`

        await addDoc(collection(db, "notifications"), {
          userId,
          title: "Interview Scheduled",
          message,
          type: "interview",
          link: "/driver/profile",
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating interview notification:", error)
        throw error
      }
    },

    async createDriverApprovalNotification(userId, approved) {
      try {
        const title = approved ? "Application Approved" : "Application Rejected"
        const message = approved
          ? "Your driver application has been approved! You can now start accepting delivery tasks."
          : "Your driver application has been rejected. Please contact support for more information."

        await addDoc(collection(db, "notifications"), {
          userId,
          title,
          message,
          type: "driver",
          link: "/driver/profile",
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating driver approval notification:", error)
        throw error
      }
    },

    async markAsRead(notificationId) {
      try {
        await updateDoc(doc(db, "notifications", notificationId), {
          isRead: true,
          readAt: serverTimestamp(),
        })

        // Update local state
        const index = this.notifications.findIndex((n) => n.id === notificationId)
        if (index !== -1) {
          this.notifications[index].isRead = true
          this.unreadCount--
        }
      } catch (error) {
        console.error("Error marking notification as read:", error)
        throw error
      }
    },

    async markAllAsRead() {
      try {
        const unreadNotifications = this.notifications.filter((n) => !n.isRead)

        for (const notification of unreadNotifications) {
          await updateDoc(doc(db, "notifications", notification.id), {
            isRead: true,
            readAt: serverTimestamp(),
          })

          // Update local state
          const index = this.notifications.findIndex((n) => n.id === notification.id)
          if (index !== -1) {
            this.notifications[index].isRead = true
          }
        }
        this.unreadCount = 0
      } catch (error) {
        console.error("Error marking all notifications as read:", error)
        throw error
      }
    },

    async deleteNotification(notificationId) {
      try {
        await deleteDoc(doc(db, "notifications", notificationId))

        // Update local state
        this.notifications = this.notifications.filter((n) => n.id !== notificationId)
        this.unreadCount = this.notifications.filter((notification) => !notification.isRead).length
      } catch (error) {
        console.error("Error deleting notification:", error)
        throw error
      }
    },

    async deleteAllNotifications() {
      try {
        for (const notification of this.notifications) {
          await deleteDoc(doc(db, "notifications", notification.id))
        }

        // Update local state
        this.notifications = []
        this.unreadCount = 0
      } catch (error) {
        console.error("Error deleting all notifications:", error)
        throw error
      }
    },

    async createAdminNotification(notificationData) {
      try {
        const notification = {
          title: notificationData.title,
          message: notificationData.message,
          type: notificationData.type || "info",
          link: notificationData.link || null,
          isRead: false,
          createdAt: serverTimestamp(),
        }

        const docRef = await addDoc(collection(db, "adminNotifications"), notification)

        return docRef.id
      } catch (error) {
        console.error("Error creating admin notification:", error)
        throw error
      }
    },

    async createBookingNotification(bookingData) {
      try {
        await addDoc(collection(db, "adminNotifications"), {
          title: "New Booking Request",
          message: `${bookingData.userName || "A user"} has placed a new booking for ${bookingData.service || "a service"}.`,
          type: "booking_request",
          bookingId: bookingData.id,
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating booking notification:", error)
        throw error
      }
    },

    async createPaymentVerificationNotification(paymentData) {
      try {
        await addDoc(collection(db, "adminNotifications"), {
          title: "Payment Verification Required",
          message: `${paymentData.userName || "A user"} has submitted payment proof for order #${paymentData.id.substring(0, 8)}.`,
          type: "payment_verification",
          bookingId: paymentData.id,
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating payment verification notification:", error)
        throw error
      }
    },

    async createContactFormNotification(contactData) {
      try {
        await addDoc(collection(db, "adminNotifications"), {
          title: "New Contact Form Submission",
          message: `${contactData.name || "Someone"} has submitted a contact form: "${contactData.subject || "No subject"}"`,
          type: "contact_form",
          contactId: contactData.id,
          email: contactData.email || "",
          details: contactData.message || "",
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating contact form notification:", error)
        throw error
      }
    },

    async createRefundRequestNotification(refundData) {
      try {
        await addDoc(collection(db, "adminNotifications"), {
          title: "Refund Request",
          message: `${refundData.userName || "A user"} has requested a refund for order #${refundData.id.substring(0, 8)}.`,
          type: "refund_request",
          bookingId: refundData.id,
          amount: refundData.amount || 0,
          reason: refundData.cancelReason || "",
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating refund request notification:", error)
        throw error
      }
    },

    async createDriverNotification(driverData) {
      try {
        await addDoc(collection(db, "adminNotifications"), {
          title: "New Driver Application",
          message: `${driverData.fullName || "A driver"} has submitted a new driver application.`,
          type: "driver_application",
          driverId: driverData.id,
          isRead: false,
          createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error creating driver notification:", error)
        throw error
      }
    },
  },
})
