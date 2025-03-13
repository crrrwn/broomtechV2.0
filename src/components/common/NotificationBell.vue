<template>
  <div class="relative">
    <button 
      @click="toggleNotifications"
      class="relative p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      <span class="sr-only">View notifications</span>
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
    </button>
    
    <!-- Notification Panel -->
    <div 
      v-if="showNotifications"
      class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
    >
      <div class="px-4 py-2 border-b border-gray-200">
        <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
      </div>
      
      <div v-if="notifications.length === 0" class="px-4 py-6 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <p class="mt-2 text-sm text-gray-500">No notifications yet</p>
      </div>
      
      <div v-else class="max-h-60 overflow-y-auto">
        <a 
          v-for="notification in notifications" 
          :key="notification.id"
          :href="notification.link"
          :class="['block px-4 py-2 hover:bg-gray-100', { 'bg-gray-50': !notification.read }]"
          @click="markAsRead(notification.id)"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span v-if="notification.type === 'order'" class="inline-block h-8 w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span v-else-if="notification.type === 'payment'" class="inline-block h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <span v-else class="inline-block h-8 w-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-sm text-gray-500 truncate">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.timestamp) }}</p>
            </div>
            <div v-if="!notification.read" class="ml-2 flex-shrink-0">
              <span class="inline-block h-2 w-2 rounded-full bg-primary-600"></span>
            </div>
          </div>
        </a>
      </div>
      
      <div v-if="notifications.length > 0" class="border-t border-gray-200 px-4 py-2 flex justify-between">
        <button 
          @click="markAllAsRead"
          class="text-xs text-primary-600 hover:text-primary-500"
        >
          Mark all as read
        </button>
        <button 
          @click="clearAllNotifications"
          class="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const showNotifications = ref(false);
const notifications = ref([]);
const unsubscribe = ref(null);

const unreadCount = computed(() => {
  return notifications.value.filter(notification => !notification.read).length;
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAsRead = async (notificationId) => {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true,
      readAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

const markAllAsRead = async () => {
  try {
    const unreadNotifications = notifications.value.filter(notification => !notification.read);
    
    for (const notification of unreadNotifications) {
      await updateDoc(doc(db, 'notifications', notification.id), {
        read: true,
        readAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
};

const clearAllNotifications = async () => {
  try {
    for (const notification of notifications.value) {
      await deleteDoc(doc(db, 'notifications', notification.id));
    }
    
    notifications.value = [];
    showNotifications.value = false;
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  
  // Check if it's today
  if (date.toDateString() === now.toDateString()) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
  
  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Check if it's within the last week
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);
  if (date > lastWeek) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long'
    }).format(date);
  }
  
  // Otherwise, show the date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Listen for clicks outside to close the notification panel
const handleClickOutside = (event) => {
  const target = event.target;
  if (showNotifications.value && !target.closest('.notification-panel')) {
    showNotifications.value = false;
  }
};

onMounted(() => {
  // Add click event listener to close notifications when clicking outside
  document.addEventListener('click', handleClickOutside);
  
  // Subscribe to notifications
  if (authStore.user) {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', authStore.user.uid),
      orderBy('timestamp', 'desc')
    );
    
    unsubscribe.value = onSnapshot(q, (snapshot) => {
      notifications.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  }
});

onUnmounted(() => {
  // Remove event listener
  document.removeEventListener('click', handleClickOutside);
  
  // Unsubscribe from notifications
  if (unsubscribe.value) {
    unsubscribe.value();
  }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>

