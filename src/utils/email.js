import { httpsCallable, getFunctions } from "firebase/functions"
import { getApp } from "firebase/app"

// Function to send email notifications
export async function sendEmailNotification(emailData) {
  try {
    // Get Firebase Functions instance
    const functions = getFunctions(getApp())

    // Call the sendEmail Cloud Function
    const sendEmail = httpsCallable(functions, "sendEmail")

    // Send the email
    const result = await sendEmail(emailData)

    console.log("Email sent successfully:", result.data)
    return result.data
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

// Function to format order details for email
export function formatOrderDetailsForEmail(order) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #22c55e; margin-bottom: 5px;">Order Confirmation</h1>
        <p style="color: #666;">Thank you for your order!</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Order #${order.id.substring(0, 8)}</h2>
        <p style="color: #666; margin: 5px 0;">Date: ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Service Details</h2>
        <p style="color: #666; margin: 5px 0;"><strong>Service:</strong> ${order.service}</p>
        <p style="color: #666; margin: 5px 0;"><strong>From:</strong> ${order.pickupLocation}</p>
        <p style="color: #666; margin: 5px 0;"><strong>To:</strong> ${order.dropLocation}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Payment Summary</h2>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span style="color: #666;">Subtotal:</span>
          <span style="color: #333;">₱${(order.amount || 0).toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span style="color: #666;">Delivery Fee:</span>
          <span style="color: #333;">₱${(order.additionalFees || 0).toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0; font-weight: bold;">
          <span style="color: #333;">Total:</span>
          <span style="color: #22c55e;">₱${(order.totalAmount || 0).toFixed(2)}</span>
        </div>
        <p style="color: #666; margin: 10px 0;">
          <strong>Payment Method:</strong> ${order.paymentMethod}
        </p>
        <p style="color: #666; margin: 10px 0;">
          <strong>Payment Status:</strong> ${order.isPaid ? "Paid" : "Pending"}
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #666; margin: 5px 0;">If you have any questions, please contact our support team.</p>
        <p style="color: #666; margin: 5px 0;">Thank you for choosing BroomTech!</p>
      </div>
    </div>
  `
}

