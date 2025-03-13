import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase/config"
import { useBookingStore } from "../stores/booking"
import { useNotificationStore } from "../stores/notification"

export async function uploadPaymentProof(bookingId, file) {
  if (!bookingId || !file) {
    throw new Error("Booking ID and file are required")
  }

  try {
    // Upload file to Firebase Storage
    const fileRef = storageRef(storage, `payment-proofs/${bookingId}/${file.name}`)
    await uploadBytes(fileRef, file)

    // Get download URL
    const downloadURL = await getDownloadURL(fileRef)

    // Update booking with payment proof
    const bookingStore = useBookingStore()
    await bookingStore.updatePaymentStatus(bookingId, true, downloadURL)

    // Create notification for admin
    const notificationStore = useNotificationStore()
    await notificationStore.createNotification({
      title: "Payment Submitted",
      message: `Payment proof submitted for booking #${bookingId.substring(0, 8)}`,
      type: "payment",
      link: `/admin/bookings/${bookingId}`,
    })

    return downloadURL
  } catch (error) {
    console.error("Error uploading payment proof:", error)
    throw error
  }
}

export function getPaymentInstructions(method) {
  switch (method) {
    case "gcash":
      return {
        accountName: "BroomTech Inc.",
        accountNumber: "09123456789",
        instructions: "Send payment to the GCash number above. Include your booking ID in the reference/notes section.",
      }
    case "paymaya":
      return {
        accountName: "BroomTech Inc.",
        accountNumber: "09123456789",
        instructions:
          "Send payment to the PayMaya account above. Include your booking ID in the reference/notes section.",
      }
    case "gotyme":
      return {
        accountName: "BroomTech Inc.",
        accountNumber: "1234567890",
        instructions:
          "Send payment to the GoTyme Bank account above. Include your booking ID in the reference/notes section.",
      }
    case "cash":
      return {
        instructions: "Please prepare the exact amount for cash payment upon delivery.",
      }
    default:
      return {
        instructions: "Please contact customer support for payment instructions.",
      }
  }
}

export function calculateFees(service, distance, weather) {
  let baseFee = 0

  // Base fee by service type
  switch (service) {
    case "FOOD DELIVERY":
      baseFee = 55
      break
    case "PABILI SERVICE":
      baseFee = 50
      break
    case "PAY BILLS":
      baseFee = 60
      break
    case "PICKUP & DROP":
      baseFee = 70
      break
    case "SURPRISE / GIFTS DELIVERY":
      baseFee = 65
      break
    case "REMITTANCES / PADALA MONEY":
      baseFee = 80
      break
    case "GROCERIES / SHOPPING":
      baseFee = 100
      break
    case "MEDICINES / DRUGSTORE":
      baseFee = 75
      break
    default:
      baseFee = 50
  }

  // Distance fee
  let distanceFee = 0
  if (distance) {
    // First 3 km is included in base fee
    if (distance > 3) {
      distanceFee = Math.ceil(distance - 3) * 10 // 10 PHP per additional km
    }
  }

  // Weather fee
  let weatherFee = 0
  switch (weather) {
    case "rainy":
      weatherFee = 10
      break
    case "stormy":
      weatherFee = 20
      break
    default:
      weatherFee = 0
  }

  // Calculate total fee
  const totalFee = baseFee + distanceFee + weatherFee

  return {
    baseFee,
    distanceFee,
    weatherFee,
    totalFee,
  }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount)
}

