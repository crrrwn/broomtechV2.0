import { ref, onUnmounted } from "vue"
import { doc, onSnapshot, updateDoc, GeoPoint, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"

export function useOrderTracking(orderId) {
  const order = ref(null)
  const driverLocation = ref(null)
  const error = ref(null)
  const unsubscribe = ref(null)

  // Subscribe to real-time updates for the order
  const startTracking = () => {
    if (!orderId) {
      error.value = "Order ID is required"
      return
    }

    try {
      const orderRef = doc(db, "bookings", orderId)

      unsubscribe.value = onSnapshot(
        orderRef,
        (doc) => {
          if (doc.exists()) {
            order.value = {
              id: doc.id,
              ...doc.data(),
            }

            // Extract driver location if available
            if (order.value.currentLocation) {
              driverLocation.value = order.value.currentLocation
            }
          } else {
            error.value = "Order not found"
          }
        },
        (err) => {
          console.error("Error tracking order:", err)
          error.value = "Failed to track order"
        },
      )
    } catch (err) {
      console.error("Error setting up tracking:", err)
      error.value = "Failed to set up tracking"
    }
  }

  // Stop tracking when component is unmounted
  const stopTracking = () => {
    if (unsubscribe.value) {
      unsubscribe.value()
      unsubscribe.value = null
    }
  }

  // Update driver location (for driver app)
  const updateDriverLocation = async (latitude, longitude) => {
    if (!orderId) {
      error.value = "Order ID is required"
      return
    }

    try {
      const orderRef = doc(db, "bookings", orderId)

      await updateDoc(orderRef, {
        currentLocation: new GeoPoint(latitude, longitude),
        locationUpdatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error updating driver location:", err)
      error.value = "Failed to update location"
      throw err
    }
  }

  // Clean up on unmount
  onUnmounted(() => {
    stopTracking()
  })

  return {
    order,
    driverLocation,
    error,
    startTracking,
    stopTracking,
    updateDriverLocation,
  }
}

// Get user's current location
export function useCurrentLocation() {
  const currentLocation = ref(null)
  const locationError = ref(null)
  const isLoading = ref(false)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      locationError.value = "Geolocation is not supported by your browser"
      return Promise.reject(locationError.value)
    }

    isLoading.value = true

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          currentLocation.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          isLoading.value = false
          resolve(currentLocation.value)
        },
        (error) => {
          console.error("Error getting location:", error)

          switch (error.code) {
            case error.PERMISSION_DENIED:
              locationError.value = "User denied the request for Geolocation"
              break
            case error.POSITION_UNAVAILABLE:
              locationError.value = "Location information is unavailable"
              break
            case error.TIMEOUT:
              locationError.value = "The request to get user location timed out"
              break
            default:
              locationError.value = "An unknown error occurred"
              break
          }

          isLoading.value = false
          reject(locationError.value)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }

  // Watch position continuously
  let watchId = null

  const startWatchingPosition = (callback) => {
    if (!navigator.geolocation) {
      locationError.value = "Geolocation is not supported by your browser"
      return
    }

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        currentLocation.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        if (callback && typeof callback === "function") {
          callback(currentLocation.value)
        }
      },
      (error) => {
        console.error("Error watching position:", error)
        locationError.value = "Failed to track location"
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const stopWatchingPosition = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
    }
  }

  // Clean up on unmount
  onUnmounted(() => {
    stopWatchingPosition()
  })

  return {
    currentLocation,
    locationError,
    isLoading,
    getCurrentLocation,
    startWatchingPosition,
    stopWatchingPosition,
  }
}

// Calculate distance between two points
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

