const functions = require("firebase-functions")
const admin = require("firebase-admin")
const nodemailer = require("nodemailer")

admin.initializeApp()

// Configure nodemailer with your email service provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
})

// Cloud Function to send emails
exports.sendEmail = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.")
  }

  try {
    const { to, subject, template, data: templateData } = data

    // Generate email content based on template
    let html = ""

    if (template === "order-confirmation") {
      html = generateOrderConfirmationEmail(templateData)
    } else {
      html = `<p>${JSON.stringify(templateData)}</p>`
    }

    // Send email
    const mailOptions = {
      from: `BroomTech <${functions.config().email.user}>`,
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new functions.https.HttpsError("internal", error.message)
  }
})

// Function to generate order confirmation email
function generateOrderConfirmationEmail(order) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #22c55e; margin-bottom: 5px;">Order Confirmation</h1>
        <p style="color: #666;">Thank you for your order!</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Order #${order.orderNumber}</h2>
        <p style="color: #666; margin: 5px 0;">Date: ${order.date}</p>
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
          <span style="color: #333;">₱${order.subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span style="color: #666;">Delivery Fee:</span>
          <span style="color: #333;">₱${order.deliveryFee.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0; font-weight: bold;">
          <span style="color: #333;">Total:</span>
          <span style="color: #22c55e;">₱${order.total.toFixed(2)}</span>
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

