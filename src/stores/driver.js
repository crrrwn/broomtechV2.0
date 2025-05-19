import { defineStore } from "pinia"
import { getAuth } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { useNotificationStore } from "./notification"

const auth = getAuth()
const storage = getStorage()

export const useDriverStore = defineStore("driver", {
  state: () => ({
    driverApplications: [],
    driverAccounts: [],
    driverProfile: null,
    driverApplicationId: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Register a driver application (for public form)
    async registerDriverWithoutAuth(driverData, licenseFile, vehicleFile) {
      try {
        const db = getFirestore()

        // Add driver application to Firestore
        const docRef = await addDoc(collection(db, "driver-applications"), {
          ...driverData,
          status: "pending",
          licenseFileName: licenseFile ? licenseFile.name : null,
          vehicleFileName: vehicleFile ? vehicleFile.name : null,
          createdAt: serverTimestamp(),
        })

        // Create notification for admin
        const notificationStore = useNotificationStore()

        // Create driver application notification
        await notificationStore.createDriverApplicationNotification(driverData.fullName || driverData.name, docRef.id)

        return docRef.id
      } catch (error) {
        console.error("Error registering driver:", error)
        throw new Error("Failed to submit driver application. Please try again.")
      }
    },

    // Get all driver applications (for admin)
    async getDriverApplications() {
      this.loading = true
      this.error = null

      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, "driver-applications"))

        const applications = []
        querySnapshot.forEach((doc) => {
          applications.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        this.driverApplications = applications
        return applications
      } catch (error) {
        console.error("Error fetching driver applications:", error)
        this.error = "Failed to fetch driver applications"
        throw error
      } finally {
        this.loading = false
      }
    },

    // Get driver application by ID
    async getDriverApplicationById(id) {
      try {
        const db = getFirestore()
        const docRef = doc(db, "driver-applications", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data(),
          }
        } else {
          throw new Error("Driver application not found")
        }
      } catch (error) {
        console.error("Error fetching driver application:", error)
        throw error
      }
    },

    // Update driver application status
    async updateDriverApplicationStatus(id, status) {
      try {
        const db = getFirestore()
        const docRef = doc(db, "driver-applications", id)

        await updateDoc(docRef, {
          status: status,
          updatedAt: serverTimestamp(),
        })

        return true
      } catch (error) {
        console.error("Error updating driver application status:", error)
        throw error
      }
    },

    // Get current driver profile (for logged-in driver)
    async getCurrentDriverProfile() {
      try {
        const auth = getAuth()
        if (!auth.currentUser) {
          throw new Error("User not authenticated")
        }

        const db = getFirestore()
        const q = query(
          collection(db, "users"),
          where("uid", "==", auth.currentUser.uid),
          where("role", "==", "driver"),
        )

        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          throw new Error("Driver profile not found")
        }

        let driverData = null
        querySnapshot.forEach((doc) => {
          driverData = {
            id: doc.id,
            ...doc.data(),
          }
        })

        return driverData
      } catch (error) {
        console.error("Error fetching driver profile:", error)
        throw error
      }
    },

    // Update driver profile
    async updateDriverProfile(driverId, profileData) {
      try {
        const db = getFirestore()
        const docRef = doc(db, "users", driverId)

        await updateDoc(docRef, {
          ...profileData,
          updatedAt: serverTimestamp(),
        })

        return true
      } catch (error) {
        console.error("Error updating driver profile:", error)
        throw error
      }
    },

    async registerDriverWithAuth(driverData, licenseFile, vehicleFile) {
      this.loading = true
      this.error = null

      try {
        if (!auth.currentUser) {
          throw new Error("You must be logged in to register as a driver")
        }

        const db = getFirestore()
        const userId = auth.currentUser.uid
        let licenseURL = null
        let vehicleURL = null

        // Upload license file if provided
        if (licenseFile) {
          const licenseFileRef = storageRef(storage, `driver-licenses/${userId}_${Date.now()}_${licenseFile.name}`)
          await uploadBytes(licenseFileRef, licenseFile)
          licenseURL = await getDownloadURL(licenseFileRef)
        }

        // Upload vehicle file if provided
        if (vehicleFile) {
          const vehicleFileRef = storageRef(storage, `vehicle-photos/${userId}_${Date.now()}_${vehicleFile.name}`)
          await uploadBytes(vehicleFileRef, vehicleFile)
          vehicleURL = await getDownloadURL(vehicleFileRef)
        }

        // Create driver application document
        const applicationData = {
          ...driverData,
          userId: userId,
          licenseURL: licenseURL,
          vehicleURL: vehicleURL,
          status: "pending",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }

        const applicationRef = await addDoc(collection(db, "driver-applications"), applicationData)

        // Create notification for admin
        const notificationStore = useNotificationStore()

        // Create driver application notification
        await notificationStore.createDriverApplicationNotification(
          driverData.fullName || driverData.name,
          applicationRef.id,
        )

        this.driverApplicationId = applicationRef.id
        this.loading = false
        return applicationRef.id
      } catch (error) {
        console.error("Error in registerDriverWithAuth:", error)
        this.loading = false
        this.error = error.message
        throw error
      }
    },
  },
})
