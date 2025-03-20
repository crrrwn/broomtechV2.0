<template>
  <div class="fixed bottom-4 right-4 z-50">
    <div v-if="unreadNotifications.length > 0" class="bg-white rounded-lg shadow-lg p-4 max-w-md">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-900">New Notifications</h3>
        <button @click="markAllAsRead" class="text-sm text-primary-600 hover:text-primary-800">
          Mark all as read
        </button>
      </div>
      
      <div class="max-h-80 overflow-y-auto">
        <div v-for="notification in unreadNotifications" :key="notification.id" class="mb-2 p-3 bg-gray-50 rounded-md">
          <div class="flex justify-between">
            <p class="font-medium text-gray-900">{{ notification.title }}</p>
            <button @click="markAsRead(notification.id)" class="text-gray-400 hover:text-gray-600">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-600">{{ notification.message }}</p>
          <div class="mt-1 text-xs text-gray-500">
            {{ formatTime(notification.createdAt) }}
          </div>
        </div>
      </div>
    </div>
    
    <button 
      @click="toggleNotifications" 
      class="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
    >
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ unreadCount }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { collection, query, where, onSnapshot, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

const showNotifications = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);

const unreadNotifications = computed(() => {
  return notifications.value.filter(notification => !notification.isRead);
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAsRead = async (notificationId) => {
  try {
    await updateDoc(doc(db, 'adminNotifications', notificationId), {
      isRead: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

const markAllAsRead = async () => {
  try {
    const promises = unreadNotifications.value.map(notification => 
      updateDoc(doc(db, 'adminNotifications', notification.id), {
        isRead: true
      })
    );
    await Promise.all(promises);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

let unsubscribe;

onMounted(() => {
  const q = query(
    collection(db, 'adminNotifications'),
    orderBy('createdAt', 'desc')
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
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

