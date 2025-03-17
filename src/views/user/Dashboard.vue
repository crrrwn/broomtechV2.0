<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else>
          <!-- Welcome Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900">Welcome, {{ userName }}!</h2>
              <p class="mt-1 text-sm text-gray-500">
                What would you like to do today?
              </p>
              <div class="mt-4">
                <router-link to="/user/book-service" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Book a Service
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Total Orders Card -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg class="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ stats.totalOrders }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <router-link to="/user/order-history" class="font-medium text-primary-600 hover:text-primary-500">
                    View all orders
                  </router-link>
                </div>
              </div>
            </div>
            
            <!-- Active Orders Card -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Active Orders
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ stats.activeOrders }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <router-link to="/user/order-history" class="font-medium text-primary-600 hover:text-primary-500">
                    Track active orders
                  </router-link>
                </div>
              </div>
            </div>
            
            <!-- Total Spent Card -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Spent
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          ₱{{ stats.totalSpent.toFixed(2) }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <span class="font-medium text-gray-500">
                    Lifetime spending
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Orders -->
          <div class="mt-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Orders</h2>
            
            <div v-if="recentOrders.length === 0" class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6 text-center">
                <p class="text-gray-500">You don't have any recent orders.</p>
                <router-link to="/user/book-service" class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Book a Service
                </router-link>
              </div>
            </div>
            
            <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
              <ul class="divide-y divide-gray-200">
                <li v-for="order in recentOrders" :key="order.id">
                  <div class="block hover:bg-gray-50 cursor-pointer" @click="openTrackingModal(order)">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <p class="text-sm font-medium text-primary-600 truncate">
                            {{ order.service }}
                          </p>
                          <div class="ml-2 flex-shrink-0 flex">
                            <p :class="[
                              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                              statusClasses[order.status] || 'bg-gray-100 text-gray-800'
                            ]">
                              {{ formatStatus(order.status) }}
                            </p>
                          </div>
                        </div>
                        <div class="ml-2 flex-shrink-0 flex">
                          <p class="text-sm text-gray-500">
                            ₱{{ order.totalAmount.toFixed(2) }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p class="flex items-center text-sm text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                            {{ truncateText(order.dropLocation, 30) }}
                          </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                          </svg>
                          <p>
                            {{ formatDate(order.createdAt) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <router-link to="/user/order-history" class="font-medium text-primary-600 hover:text-primary-500">
                  View all orders
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tracking Modal -->
    <TrackingModal 
      :show="showTrackingModal"
      :order="selectedOrder"
      @close="closeTrackingModal"
      @order-cancelled="handleOrderCancelled"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useBookingStore } from '../../stores/booking';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import TrackingModal from '../../components/tracking/TrackingModal.vue';

const authStore = useAuthStore();
const bookingStore = useBookingStore();

const loading = ref(true);
const recentOrders = ref([]);
const showTrackingModal = ref(false);
const selectedOrder = ref(null);
const stats = ref({
  totalOrders: 0,
  activeOrders: 0,
  totalSpent: 0
});

const userName = computed(() => {
  return authStore.user?.displayName || 'User';
});

const statusClasses = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'assigned': 'bg-blue-100 text-blue-800',
  'in_progress': 'bg-indigo-100 text-indigo-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800'
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  
  return status
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const openTrackingModal = (order) => {
  selectedOrder.value = order;
  showTrackingModal.value = true;
};

const closeTrackingModal = () => {
  showTrackingModal.value = false;
  selectedOrder.value = null;
};

const handleOrderCancelled = () => {
  fetchDashboardData();
};

const fetchDashboardData = async () => {
  loading.value = true;

  try {
    if (!authStore.user) {
      console.error('No authenticated user found');
      throw new Error('User not authenticated');
    }
    
    console.log('Fetching bookings for user:', authStore.user.uid);
    
    // Fetch orders without orderBy (temporary workaround until index is created)
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', authStore.user.uid)
    );
    
    const querySnapshot = await getDocs(q);
    console.log('Fetched bookings:', querySnapshot.size);
    
    // Sort the results in memory instead of using orderBy
    const allOrders = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure numerical values
        amount: Number(data.amount) || 0,
        additionalFees: Number(data.additionalFees) || 0,
        totalAmount: Number(data.totalAmount) || 0
      };
    });
    
    // Sort by createdAt in descending order
    allOrders.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
      return dateB - dateA;
    });
    
    // Take only the 5 most recent orders
    recentOrders.value = allOrders.slice(0, 5);
    
    // Calculate stats
    stats.value = {
      totalOrders: allOrders.length,
      activeOrders: allOrders.filter(booking => 
        ['pending', 'assigned', 'in_progress'].includes(booking.status)
      ).length,
      totalSpent: allOrders
        .filter(booking => booking.status === 'completed')
        .reduce((total, booking) => total + (Number(booking.totalAmount) || 0), 0)
    };
    
    console.log('Updated stats:', stats.value);
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    if (window.$notification) {
      window.$notification.error({
        title: 'Error',
        message: 'Failed to load dashboard data: ' + error.message
      });
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Wait for auth to be initialized
  if (!authStore.user) {
    console.log('Waiting for auth to initialize...');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  if (authStore.user) {
    console.log('Auth initialized, fetching dashboard data...');
    await fetchDashboardData();
  } else {
    console.error('Still no authenticated user after waiting');
    if (window.$notification) {
      window.$notification.error({
        title: 'Error',
        message: 'Please log in to view your dashboard'
      });
    }
  }
});

// Watch for auth changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    console.log('Auth state changed, refreshing dashboard...');
    fetchDashboardData();
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
