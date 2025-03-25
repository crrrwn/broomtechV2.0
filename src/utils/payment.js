import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase/config"

// New function for local file handling
export const uploadPaymentProofLocal = async (orderId, file) => {
  try {
    if (!file) {
      console.error("No file provided for upload")
      throw new Error("No file provided")
    }

    console.log(`Processing local file for order ${orderId}, file: ${file.name}, size: ${file.size} bytes`)

    // Create a unique filename
    const timestamp = new Date().getTime()
    const uniqueFilename = `payment_${orderId}_${timestamp}_${file.name}`

    // In a real implementation, you would use a server endpoint to save the file
    // For now, we'll simulate success and return a path to where the file would be
    const localPath = `/images/payment_proofs/${uniqueFilename}`

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Local file processing completed, path:", localPath)

    // Return the local path
    return localPath
  } catch (error) {
    console.error("Error in uploadPaymentProofLocal:", error)
    throw error
  }
}

// Keep the original function for reference or future use
export const uploadPaymentProof = async (orderId, file) => {
  try {
    if (!file) {
      console.error("No file provided for upload")
      throw new Error("No file provided")
    }

    console.log(`Starting upload for order ${orderId}, file: ${file.name}, size: ${file.size} bytes`)

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `payment_proofs/${orderId}/${file.name}`)
    console.log("Storage reference created")

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file)
    console.log("Upload task started")

    // Return a promise that resolves with the download URL when the upload completes
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload progress: ${progress.toFixed(2)}%`)
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error during file upload:", error)
          console.error("Error code:", error.code)
          console.error("Error message:", error.message)
          reject(error)
        },
        async () => {
          try {
            // Handle successful uploads
            console.log("Upload completed successfully, getting download URL")
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            console.log("File available at", downloadURL)
            resolve(downloadURL)
          } catch (urlError) {
            console.error("Error getting download URL:", urlError)
            reject(urlError)
          }
        },
      )
    })
  } catch (error) {
    console.error("Error in uploadPaymentProof:", error)
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

