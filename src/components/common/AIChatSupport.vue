<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Button -->
    <button 
      @click="toggleChat"
      class="bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      <svg v-if="!isChatOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- Chat Window -->
    <div 
      v-if="isChatOpen"
      class="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
      style="height: 500px;"
    >
      <!-- Chat Header -->
      <div class="bg-primary-600 text-white px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6-8h6M9 20h6M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
          </svg>
          <h3 class="font-medium">BroomTech Support</h3>
        </div>
        <button @click="toggleChat" class="text-white hover:text-gray-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- Chat Messages -->
      <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <!-- AI Message -->
          <div v-if="message.sender === 'ai'" class="flex items-start">
            <div class="flex-shrink-0 bg-primary-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6-8h6M9 20h6M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div class="ml-3 bg-gray-100 rounded-lg py-2 px-3 max-w-[80%]">
              <p class="text-sm text-gray-800" v-html="formatMessage(message.text)"></p>
              <div v-if="message.actions && message.actions.length > 0" class="mt-2 space-y-2">
                <button 
                  v-for="action in message.actions" 
                  :key="action.text"
                  @click="handleAction(action)"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ action.text }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- User Message -->
          <div v-else class="flex items-start justify-end">
            <div class="mr-3 bg-primary-600 rounded-lg py-2 px-3 max-w-[80%]">
              <p class="text-sm text-white">{{ message.text }}</p>
            </div>
            <div class="flex-shrink-0 bg-gray-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex items-start">
          <div class="flex-shrink-0 bg-primary-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6-8h6M9 20h6M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div class="ml-3 bg-gray-100 rounded-lg py-2 px-3">
            <div class="flex space-x-1">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- File Upload Preview -->
      <div v-if="uploadedFile" class="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span class="text-sm text-gray-600 truncate">{{ uploadedFile.name }}</span>
          </div>
          <button @click="removeFile" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Chat Input -->
      <div class="border-t border-gray-200 p-3 flex items-center">
        <button @click="triggerFileUpload" class="text-gray-400 hover:text-gray-500 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <input 
            type="file" 
            ref="fileInput" 
            class="hidden" 
            @change="handleFileUpload" 
            accept="image/*,.pdf"
          />
        </button>
        <input 
          type="text" 
          v-model="userInput" 
          @keyup.enter="sendMessage"
          placeholder="Type your message..." 
          class="flex-1 border-0 focus:ring-0 focus:outline-none text-sm"
        />
        <button 
          @click="sendMessage" 
          :disabled="!userInput.trim() && !uploadedFile"
          class="ml-2 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useBookingStore } from '../../stores/booking';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';

const authStore = useAuthStore();
const bookingStore = useBookingStore();

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const isTyping = ref(false);
const messagesContainer = ref(null);
const fileInput = ref(null);
const uploadedFile = ref(null);

// Welcome message with quick actions
const welcomeMessage = {
  sender: 'ai',
  text: 'Hello! I\'m your BroomTech assistant. How can I help you today?',
  actions: [
    { text: 'Payment Instructions', handler: 'showPaymentInstructions' },
    { text: 'Track My Order', handler: 'trackOrder' },
    { text: 'Request Refund', handler: 'requestRefund' },
    { text: 'Report an Issue', handler: 'reportIssue' }
  ]
};

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  
  // If opening chat and no messages, add welcome message
  if (isChatOpen.value && messages.value.length === 0) {
    messages.value.push(welcomeMessage);
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() && !uploadedFile.value) return;
  
  // Add user message to chat
  const userMessage = userInput.value.trim();
  messages.value.push({
    sender: 'user',
    text: userMessage || 'Sent an attachment'
  });
  
  // Clear input
  userInput.value = '';
  
  // Show typing indicator
  isTyping.value = true;
  
  // Scroll to bottom
  await scrollToBottom();
  
  // Process message
  setTimeout(async () => {
    let response;
    
    // Handle file upload if present
    if (uploadedFile.value) {
      if (userMessage.toLowerCase().includes('refund') || userMessage.toLowerCase().includes('payment proof')) {
        response = {
          sender: 'ai',
          text: 'Thank you for submitting your proof of payment. Our team will verify it and process your request within 24 hours. You will receive a confirmation email once it\'s processed.',
          actions: [
            { text: 'Check Status', handler: 'checkRefundStatus' }
          ]
        };
      } else {
        response = {
          sender: 'ai',
          text: 'I\'ve received your attachment. How can I help you with this?',
          actions: [
            { text: 'Submit as Payment Proof', handler: 'submitPaymentProof' },
            { text: 'Request Refund', handler: 'requestRefund' }
          ]
        };
      }
      
      // Clear uploaded file
      uploadedFile.value = null;
    } else {
      // Process text message
      response = await processUserMessage(userMessage);
    }
    
    // Hide typing indicator
    isTyping.value = false;
    
    // Add AI response
    messages.value.push(response);
    
    // Scroll to bottom
    await scrollToBottom();
  }, 1000);
};

const processUserMessage = async (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Payment related queries
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('gcash') || lowerMessage.includes('paymaya')) {
    return {
      sender: 'ai',
      text: 'Here are the payment options available:<br><br>' +
            '<strong>GCash:</strong> Send payment to 09123456789<br>' +
            '<strong>PayMaya:</strong> Send payment to 09123456789<br>' +
            '<strong>GoTyme Bank:</strong> Send payment to account number 1234567890<br><br>' +
            'After making the payment, please upload a screenshot of the payment confirmation as proof.',
      actions: [
        { text: 'Upload Payment Proof', handler: 'uploadPaymentProof' }
      ]
    };
  }
  
  // Order tracking queries
  else if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('status') || lowerMessage.includes('delivery')) {
    // Get user's recent orders
    const orders = await bookingStore.getUserBookings();
    
    if (orders.length === 0) {
      return {
        sender: 'ai',
        text: 'You don\'t have any active orders to track. Would you like to book a service?',
        actions: [
          { text: 'Book a Service', handler: 'bookService' }
        ]
      };
    } else {
      const activeOrders = orders.filter(order => ['pending', 'assigned', 'in_progress'].includes(order.status));
      
      if (activeOrders.length === 0) {
        return {
          sender: 'ai',
          text: 'You don\'t have any active orders at the moment. Your previous orders have been completed or cancelled. Would you like to book a new service?',
          actions: [
            { text: 'Book a Service', handler: 'bookService' },
            { text: 'View Order History', handler: 'viewOrderHistory' }
          ]
        };
      } else {
        let responseText = 'Here are your active orders:<br><br>';
        
        activeOrders.forEach((order, index) => {
          responseText += `<strong>Order #${order.id.substring(0, 8)}</strong><br>`;
          responseText += `Service: ${order.service}<br>`;
          responseText += `Status: ${formatStatus(order.status)}<br>`;
          
          if (order.driverName) {
            responseText += `Driver: ${order.driverName}<br>`;
          }
          
          responseText += `<a href="/user/order-tracking/${order.id}" class="text-primary-600 hover:underline">View Details</a>`;
          
          if (index < activeOrders.length - 1) {
            responseText += '<br><br>';
          }
        });
        
        return {
          sender: 'ai',
          text: responseText
        };
      }
    }
  }
  
  // Refund queries
  else if (lowerMessage.includes('refund') || lowerMessage.includes('money back') || lowerMessage.includes('cancel')) {
    return {
      sender: 'ai',
      text: 'To process a refund request, we\'ll need the following information:<br><br>' +
            '1. Order number<br>' +
            '2. Reason for refund<br>' +
            '3. Proof of payment<br><br>' +
            'Please provide these details, and our team will review your request within 24-48 hours.',
      actions: [
        { text: 'Upload Proof of Payment', handler: 'uploadPaymentProof' },
        { text: 'View My Orders', handler: 'viewOrderHistory' }
      ]
    };
  }
  
  // Help or general queries
  else {
    return {
      sender: 'ai',
      text: 'I can help you with the following:<br><br>' +
            '• Payment instructions<br>' +
            '• Order tracking<br>' +
            '• Refund requests<br>' +
            '• General inquiries<br><br>' +
            'What would you like assistance with?',
      actions: [
        { text: 'Payment Instructions', handler: 'showPaymentInstructions' },
        { text: 'Track My Order', handler: 'trackOrder' },
        { text: 'Request Refund', handler: 'requestRefund' }
      ]
    };
  }
};

const handleAction = (action) => {
  switch (action.handler) {
    case 'showPaymentInstructions':
      messages.value.push({
        sender: 'user',
        text: 'Show me payment instructions'
      });
      isTyping.value = true;
      scrollToBottom();
      
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: 'ai',
          text: 'Here are our payment options:<br><br>' +
                '<strong>GCash:</strong><br>' +
                'Account Name: BroomTech Inc.<br>' +
                'Account Number: 09123456789<br><br>' +
                '<strong>PayMaya:</strong><br>' +
                'Account Name: BroomTech Inc.<br>' +
                'Account Number: 09123456789<br><br>' +
                '<strong>GoTyme Bank:</strong><br>' +
                'Account Name: BroomTech Inc.<br>' +
                'Account Number: 1234567890<br><br>' +
                'After making the payment, please upload a screenshot as proof of payment.',
          actions: [
            { text: 'Upload Payment Proof', handler: 'uploadPaymentProof' }
          ]
        });
        scrollToBottom();
      }, 1000);
      break;
      
    case 'trackOrder':
      messages.value.push({
        sender: 'user',
        text: 'Track my order'
      });
      sendMessage();
      break;
      
    case 'requestRefund':
      messages.value.push({
        sender: 'user',
        text: 'I want to request a refund'
      });
      sendMessage();
      break;
      
    case 'reportIssue':
      messages.value.push({
        sender: 'user',
        text: 'I want to report an issue'
      });
      isTyping.value = true;
      scrollToBottom();
      
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: 'ai',
          text: 'I\'m sorry to hear you\'re experiencing an issue. Please provide the following details:<br><br>' +
                '1. Order number (if applicable)<br>' +
                '2. Description of the issue<br>' +
                '3. Any relevant screenshots or photos<br><br>' +
                'Our support team will address your concern as soon as possible.',
          actions: [
            { text: 'Upload Screenshot', handler: 'uploadPaymentProof' }
          ]
        });
        scrollToBottom();
      }, 1000);
      break;
      
    case 'uploadPaymentProof':
      triggerFileUpload();
      break;
      
    case 'submitPaymentProof':
      messages.value.push({
        sender: 'user',
        text: 'Submit as payment proof'
      });
      isTyping.value = true;
      scrollToBottom();
      
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: 'ai',
          text: 'Thank you for submitting your proof of payment. Our team will verify it shortly. You will receive a confirmation once it\'s processed. Is there anything else you need help with?',
          actions: [
            { text: 'Track My Order', handler: 'trackOrder' },
            { text: 'No, that\'s all', handler: 'endConversation' }
          ]
        });
        scrollToBottom();
      }, 1000);
      break;
      
    case 'bookService':
      window.location.href = '/user/book-service';
      break;
      
    case 'viewOrderHistory':
      window.location.href = '/user/order-history';
      break;
      
    case 'checkRefundStatus':
      messages.value.push({
        sender: 'user',
        text: 'Check refund status'
      });
      isTyping.value = true;
      scrollToBottom();
      
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: 'ai',
          text: 'Your refund request is currently being processed. The typical processing time is 3-5 business days. You will receive an email notification once the refund has been issued. Is there anything else you need help with?'
        });
        scrollToBottom();
      }, 1000);
      break;
      
    case 'endConversation':
      messages.value.push({
        sender: 'user',
        text: 'No, that\'s all. Thank you!'
      });
      isTyping.value = true;
      scrollToBottom();
      
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: 'ai',
          text: 'You\'re welcome! If you need any further assistance, feel free to chat with me anytime. Have a great day!'
        });
        scrollToBottom();
      }, 1000);
      break;
  }
};

const formatMessage = (text) => {
  // Convert URLs to clickable links
  return text.replace(
    /(https?:\/\/[^\s]+)/g, 
    '<a href="$1" target="_blank" class="text-primary-600 hover:underline">$1</a>'
  );
};

const formatStatus = (status) => {
  return status
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Store the file for preview
  uploadedFile.value = file;
  
  // Reset file input
  fileInput.value.value = '';
};

const removeFile = () => {
  uploadedFile.value = null;
};

// Watch for changes in messages to scroll to bottom
watch(messages, () => {
  scrollToBottom();
});

onMounted(() => {
  // Initialize chat if needed
});
</script>

<style scoped>
.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #9CA3AF;
  border-radius: 50%;
  animation: typing 1.5s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}
</style>

