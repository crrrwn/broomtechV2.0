<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Notification Panel -->
    <div v-if="showNotifications && notifications.length > 0" class="bg-white rounded-lg shadow-lg p-4 max-w-md mb-2 border border-gray-200">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold text-gray-900">New Notifications</h3>
        <div class="flex space-x-2">
          <button @click="markAllAsRead" class="text-sm text-primary-600 hover:text-primary-800 px-2 py-1 rounded hover:bg-gray-100">
            Mark all as read
          </button>
          <button @click="toggleNotifications" class="text-gray-500 hover:text-gray-700">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="max-h-80 overflow-y-auto">
        <div v-for="notification in sortedNotifications" :key="notification.id" 
             class="mb-3 p-3 rounded-md hover:bg-gray-100 transition-colors duration-150"
             :class="notification.isRead ? 'bg-white border border-gray-100' : 'bg-gray-50 border-l-4 border-l-blue-500 border border-gray-200'">
          <div class="flex justify-between">
            <p class="font-medium text-gray-900">{{ notification.title }}</p>
            <button @click="markAsRead(notification.id)" class="text-gray-400 hover:text-gray-600">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
          <div class="mt-2 flex justify-between items-center">
            <span class="text-xs text-gray-500">
              {{ formatTime(notification.createdAt) }}
            </span>
            
            <!-- Action buttons based on notification type -->
            <div class="flex space-x-2">
              <button 
                @click="viewNotificationDetails(notification)" 
                class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                View Details
              </button>
              
              <button 
                v-if="notification.type === 'driver_application'" 
                @click="handleDriverApplication(notification)" 
                class="text-xs bg-grab-green text-white px-2 py-1 rounded hover:bg-grab-green-dark"
              >
                Review
              </button>
              
              <button 
                v-if="notification.type === 'payment_verification'" 
                @click="handlePaymentVerification(notification)" 
                class="text-xs bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600"
              >
                Verify
              </button>
              
              <button 
                v-if="notification.type === 'booking_request'" 
                @click="handleBookingRequest(notification)" 
                class="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
              >
                Assign
              </button>

              <button 
                v-if="notification.type === 'refund_request'" 
                @click="handleRefundRequest(notification)" 
                class="text-xs bg-rose-500 text-white px-2 py-1 rounded hover:bg-rose-600"
              >
                Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Notification Bell Button -->
    <button 
      @click="toggleNotifications" 
      class="bg-white hover:bg-gray-50 text-gray-700 rounded-full p-3 shadow-lg flex items-center justify-center border border-gray-200"
      aria-label="Notifications"
    >
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>
    
    <!-- Notification Details Modal -->
    <div v-if="selectedNotification" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeNotificationDetails">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ selectedNotification.title }}
                </h3>
                <div class="mt-4 border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Type</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span :class="getNotificationTypeBadgeClass(selectedNotification.type)">
                          {{ formatNotificationType(selectedNotification.type) }}
                        </span>
                      </dd>
                    </div>
                    
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Message</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedNotification.message }}</dd>
                    </div>
                    
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Date</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(selectedNotification.createdAt) }}</dd>
                    </div>
                    
                    <!-- Booking Request Details -->
                    <div v-if="selectedNotification.type === 'booking_request' && notificationDetails">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Customer</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.customerName || notificationDetails.userName || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Service</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.serviceType || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Amount</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ notificationDetails.totalAmount ? notificationDetails.totalAmount.toLocaleString() : '0.00' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Status</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span :class="getStatusBadgeClass(notificationDetails.status)">
                            {{ formatStatus(notificationDetails.status) }}
                          </span>
                        </dd>
                      </div>
                    </div>
                    
                    <!-- Payment Verification Details -->
                    <div v-if="selectedNotification.type === 'payment_verification' && notificationDetails">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Customer</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.customerName || notificationDetails.userName || 'N/A' }}</dd>
                      </div>

                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.paymentMethod || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Amount</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ notificationDetails.totalAmount ? notificationDetails.totalAmount.toLocaleString() : '0.00' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Payment Proof</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <div v-if="notificationDetails.proofOfPayment" class="border border-gray-200 rounded-md overflow-hidden">
                            <img
                              :src="notificationDetails.proofOfPayment"
                              alt="Payment Proof"
                              class="w-full h-auto max-h-48 object-contain"
                            />
                          </div>
                          <div v-else class="text-gray-500">No payment proof available</div>
                        </dd>
                      </div>
                    </div>
                    
                    <!-- Driver Application Details -->
                    <div v-if="selectedNotification.type === 'driver_application' && notificationDetails">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Driver Name</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.fullName || notificationDetails.displayName || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Phone</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.phone || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Vehicle</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.vehicleType || 'N/A' }} - {{ notificationDetails.vehiclePlate || 'N/A' }}</dd>
                      </div>
                    </div>
                    
                    <!-- Contact Form Details -->
                    <div v-if="selectedNotification.type === 'contact_form' && notificationDetails">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Name</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.name || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.email || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Subject</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.subject || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Message</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.message || notificationDetails.details || 'N/A' }}</dd>
                      </div>
                    </div>
                    
                    <!-- Refund Request Details -->
                    <div v-if="selectedNotification.type === 'refund_request' && notificationDetails">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Customer</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.userName || notificationDetails.customerName || 'N/A' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Amount</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ notificationDetails.amount || notificationDetails.totalAmount ? (notificationDetails.amount || notificationDetails.totalAmount).toLocaleString() : '0.00' }}</dd>
                      </div>
                      
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm font-medium text-gray-500">Reason</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ notificationDetails.reason || notificationDetails.cancelReason || 'No reason provided' }}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              v-if="selectedNotification.type === 'booking_request'"
              @click="handleBookingRequest(selectedNotification)"
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Assign Driver
            </button>
            
            <button 
              v-if="selectedNotification.type === 'payment_verification'"
              @click="handlePaymentVerification(selectedNotification)"
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Verify Payment
            </button>
            
            <button 
              v-if="selectedNotification.type === 'driver_application'"
              @click="handleDriverApplication(selectedNotification)"
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm"
            >
              Review Application
            </button>
            
            <button 
              v-if="selectedNotification.type === 'refund_request'"
              @click="handleRefundRequest(selectedNotification)"
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Process Refund
            </button>
            
            <button 
              @click="closeNotificationDetails" 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { collection, query, where, onSnapshot, updateDoc, doc, orderBy, limit, serverTimestamp, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useRouter } from 'vue-router';
import { useNotification } from '../../composables/useNotification';

const router = useRouter();
const { showNotification } = useNotification();

const showNotifications = ref(false);
const notifications = ref([]);
const selectedNotification = ref(null);
const notificationDetails = ref(null);
let unsubscribe = null;

const sortedNotifications = computed(() => {
  // Sort notifications with unread first, then by date
  return [...notifications.value].sort((a, b) => {
    // First sort by read status (unread first)
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    // Then sort by date (newest first)
    const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
    const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
    return dateB - dateA;
  });
});

const unreadCount = computed(() => {
  return notifications.value.filter(notification => !notification.isRead).length;
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAsRead = async (notificationId) => {
  try {
    await updateDoc(doc(db, 'adminNotifications', notificationId), {
      isRead: true,
      readAt: serverTimestamp()
    });
    
    // Update local state
    const index = notifications.value.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications.value[index].isRead = true;
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to mark notification as read'
    });
  }
};

const markAllAsRead = async () => {
  try {
    const batch = [];
    
    sortedNotifications.value.forEach(notification => {
      if (!notification.isRead) {
        batch.push(
          updateDoc(doc(db, 'adminNotifications', notification.id), {
            isRead: true,
            readAt: serverTimestamp()
          })
        );
      }
    });
    
    await Promise.all(batch);
    
    // Update local state
    notifications.value = notifications.value.map(notification => ({
      ...notification,
      isRead: true
    }));
    
    unreadCount.value = 0;
    showNotifications.value = false;
    
    showNotification({
      type: 'success',
      title: 'Success',
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to mark all notifications as read'
    });
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// View notification details
const viewNotificationDetails = async (notification) => {
  try {
    selectedNotification.value = notification;
    notificationDetails.value = null;
    
    // Fetch additional details based on notification type
    if (notification.type === 'booking_request' && notification.bookingId) {
      const bookingDoc = await getDoc(doc(db, 'bookings', notification.bookingId));
      if (bookingDoc.exists()) {
        const bookingData = bookingDoc.data();
        
        // If we have a userId, get the user's name for more accurate information
        let customerName = bookingData.userName || 'Unknown Customer';
        if (bookingData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', bookingData.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              customerName = userData.displayName || userData.fullName || customerName;
            }
          } catch (userError) {
            console.error('Error fetching user details:', userError);
          }
        }
        
        notificationDetails.value = {
          ...bookingData,
          customerName: customerName,
          serviceType: bookingData.service || 'Unknown Service'
        };
      }
    } 
    else if (notification.type === 'payment_verification' && notification.bookingId) {
      const bookingDoc = await getDoc(doc(db, 'bookings', notification.bookingId));
      if (bookingDoc.exists()) {
        const bookingData = bookingDoc.data();
        
        // Get customer name if possible
        let customerName = bookingData.userName || 'Unknown Customer';
        if (bookingData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', bookingData.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              customerName = userData.displayName || userData.fullName || customerName;
            }
          } catch (userError) {
            console.error('Error fetching user details:', userError);
          }
        }
        
        notificationDetails.value = {
          ...bookingData,
          customerName: customerName
        };
      }
    }
    else if (notification.type === 'driver_application' && notification.driverId) {
      const driverDoc = await getDoc(doc(db, 'users', notification.driverId));
      if (driverDoc.exists()) {
        notificationDetails.value = driverDoc.data();
      }
    }
    else if (notification.type === 'contact_form' && notification.contactId) {
      const contactDoc = await getDoc(doc(db, 'contactForms', notification.contactId));
      if (contactDoc.exists()) {
        notificationDetails.value = contactDoc.data();
      } else {
        // If we can't find the contact form, use the data from the notification
        notificationDetails.value = {
          name: notification.name || 'Unknown',
          email: notification.email || 'No email provided',
          subject: notification.subject || 'No subject',
          message: notification.details || 'No message'
        };
      }
    }
    else if (notification.type === 'refund_request' && notification.bookingId) {
      const bookingDoc = await getDoc(doc(db, 'bookings', notification.bookingId));
      if (bookingDoc.exists()) {
        const bookingData = bookingDoc.data();
        
        // Get customer name if possible
        let customerName = bookingData.userName || 'Unknown Customer';
        if (bookingData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', bookingData.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              customerName = userData.displayName || userData.fullName || customerName;
            }
          } catch (userError) {
            console.error('Error fetching user details:', userError);
          }
        }
        
        notificationDetails.value = {
          ...bookingData,
          customerName: customerName,
          reason: notification.reason || 'No reason provided',
          amount: notification.amount
        };
      }
    }
    
    // Mark notification as read
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
  } catch (error) {
    console.error('Error fetching notification details:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to load notification details'
    });
  }
};

const closeNotificationDetails = () => {
  selectedNotification.value = null;
  notificationDetails.value = null;
};

// Format notification type for display
const formatNotificationType = (type) => {
  if (!type) return 'General';
  
  switch (type) {
    case 'booking_request':
      return 'Booking Request';
    case 'payment_verification':
      return 'Payment Verification';
    case 'driver_application':
      return 'Driver Application';
    case 'contact_form':
      return 'Contact Form';
    case 'refund_request':
      return 'Refund Request';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  }
};

// Get badge class for notification type
const getNotificationTypeBadgeClass = (type) => {
  switch (type) {
    case 'booking_request':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800';
    case 'payment_verification':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800';
    case 'driver_application':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
    case 'contact_form':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800';
    case 'refund_request':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800';
    default:
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
  }
};

// Get badge class for status
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
    case 'assigned':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800';
    case 'completed':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
    case 'cancelled':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
    default:
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
  }
};

// Format status for display
const formatStatus = (status) => {
  if (!status) return 'Unknown';
  
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
};

// Handle different notification types
const handleDriverApplication = (notification) => {
  markAsRead(notification.id);
  closeNotificationDetails();
  router.push('/admin/drivers');
};

const handlePaymentVerification = (notification) => {
  markAsRead(notification.id);
  closeNotificationDetails();
  router.push('/admin/payments');
};

const handleBookingRequest = (notification) => {
  markAsRead(notification.id);
  closeNotificationDetails();
  router.push('/admin/bookings');
};

const handleContactForm = (notification) => {
  markAsRead(notification.id);
  
  // Show the notification with detailed information
  showNotification({
    type: 'info',
    title: 'Contact Form Details',
    message: `From: ${notification.email || 'Not provided'}\n\nMessage: ${notification.details || 'No message'}`
  });
};

const handleRefundRequest = (notification) => {
  markAsRead(notification.id);
  closeNotificationDetails();
  router.push('/admin/payments');
};

// Set up real-time listener for admin notifications
const setupNotificationsListener = () => {
  const q = query(
    collection(db, 'adminNotifications'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  
  unsubscribe = onSnapshot(q, (snapshot) => {
    const notificationData = [];
    snapshot.forEach(doc => {
      notificationData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    notifications.value = notificationData;
    unreadCount.value = notificationData.filter(n => !n.isRead).length;
  }, (error) => {
    console.error('Error in notifications listener:', error);
  });
};

// Check for new notifications periodically
const checkForNewNotifications = async () => {
  try {
    const q = query(
      collection(db, 'adminNotifications'),
      where('isRead', '==', false),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    unreadCount.value = snapshot.size;
  } catch (error) {
    console.error('Error checking for new notifications:', error);
  }
};

// Set up interval to check for new notifications
let notificationInterval;

const handleClickOutside = (event) => {
  if (showNotifications.value && !event.target.closest('.fixed.bottom-4.right-4')) {
    showNotifications.value = false;
  }
};

onMounted(() => {
  setupNotificationsListener();
  
  // Check for new notifications every 2 minutes
  notificationInterval = setInterval(checkForNewNotifications, 120000);
  
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
  
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
  
  document.removeEventListener('click', handleClickOutside);
});

// Watch for route changes to close notifications panel
watch(() => router.currentRoute.value, () => {
  showNotifications.value = false;
});
</script>

<style scoped>
.max-h-80 {
  max-height: 20rem;
}

/* Animation for notification panel */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white.rounded-lg.shadow-lg {
  animation: slideIn 0.2s ease-out;
}

/* Improve scrollbar appearance */
.max-h-80::-webkit-scrollbar {
  width: 6px;
}

.max-h-80::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-80::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.max-h-80::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
