<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
    
    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center space-x-4">
          <div>
            <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select 
              id="status-filter" 
              v-model="statusFilter" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label for="date-filter" class="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
            <select 
              id="date-filter" 
              v-model="dateFilter" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search orders..." 
            class="w-full md:w-64 pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading indicator -->
    <div v-if="loading" class="flex justify-center my-8">
      <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    
    <!-- Orders List -->
    <div v-else-if="filteredOrders.length > 0">
      <div class="space-y-4">
        <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex items-center">
                  <h3 class="text-lg font-semibold text-gray-800">Order #{{ order.id.substring(0, 8) }}</h3>
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': order.status === 'completed',
                      'bg-red-100 text-red-800': order.status === 'cancelled',
                      'bg-blue-100 text-blue-800': order.status === 'in_progress' || order.status === 'assigned',
                      'bg-yellow-100 text-yellow-800': order.status === 'pending'
                    }"
                    class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ formatStatus(order.status) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="mt-2 md:mt-0 flex items-center space-x-2">
                <button 
                  v-if="order.status === 'completed'"
                  @click="confirmDelete(order.id)" 
                  class="text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
                <button 
                  v-if="['pending', 'assigned', 'in_progress'].includes(order.status)"
                  @click="trackOrder(order)" 
                  class="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Track Order
                </button>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="flex flex-col md:flex-row md:justify-between">
              <div>
                <h4 class="font-medium text-gray-700">Service Details</h4>
                <p class="text-sm text-gray-600 mt-1">{{ order.service }}</p>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">From:</span> {{ order.pickupLocation || 'N/A' }}
                </p>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">To:</span> {{ order.dropLocation || 'N/A' }}
                </p>
              </div>
              <div class="mt-4 md:mt-0">
                <h4 class="font-medium text-gray-700">Payment</h4>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">Method:</span> {{ order.paymentMethod || 'N/A' }}
                </p>
                <p class="text-lg font-bold text-gray-800 mt-1">₱{{ (order.totalAmount || 0).toFixed(2) }}</p>
              </div>
            </div>
            
            <div class="mt-4" v-if="order.driverId">
              <h4 class="font-medium text-gray-700">Driver</h4>
              <div class="flex items-center mt-1">
                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {{ (order.driverName || 'D').charAt(0) }}
                </div>
                <div class="ml-2">
                  <p class="text-sm font-medium text-gray-700">{{ order.driverName || 'Assigned Driver' }}</p>
                  <p class="text-xs text-gray-500">{{ order.driverPhone || 'No phone number' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ searchQuery || statusFilter !== 'all' || dateFilter !== 'all' ? 'Try adjusting your filters' : 'You haven\'t placed any orders yet' }}
      </p>
      <div class="mt-6">
        <router-link to="/user/book-service" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Book a Service
        </router-link>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
        <p class="text-sm text-gray-500 mb-4">
          Are you sure you want to delete this order from your history? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button 
            @click="deleteOrder" 
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  
    <!-- Tracking Modal -->
    <TrackingModal 
      :show="showTrackingModal"
      :order="selectedOrder"
      @close="closeTrackingModal"
      @order-cancelled="refreshOrders"
    />
  </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
  import { db } from '../../firebase/config';
  import { useAuthStore } from '../../stores/auth';
  import { useBookingStore } from '../../stores/booking';
  import TrackingModal from '../../components/tracking/TrackingModal.vue';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const bookingStore = useBookingStore();
  
  // State
  const orders = ref([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const statusFilter = ref('all');
  const dateFilter = ref('all');
  const showDeleteModal = ref(false);
  const orderToDelete = ref(null);
  const showTrackingModal = ref(false);
  const selectedOrder = ref(null);
  
  // Fetch orders
  const fetchOrders = async () => {
    try {
      loading.value = true;
      console.log('Fetching orders for user:', authStore.user?.uid);
      
      if (!authStore.user) {
        console.error('No authenticated user found');
        throw new Error('User not authenticated');
      }
      
      // Create a query against the bookings collection
      const q = query(collection(db, "bookings"), where("userId", "==", authStore.user.uid));
      const querySnapshot = await getDocs(q);
      
      console.log('Fetched orders count:', querySnapshot.size);
      
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedOrders.push({
          id: doc.id,
          ...data,
          // Ensure numerical values
          amount: Number(data.amount) || 0,
          additionalFees: Number(data.additionalFees) || 0,
          totalAmount: Number(data.totalAmount) || 0
        });
      });
      
      // Sort by date (newest first)
      orders.value = fetchedOrders.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      console.log('Processed orders:', orders.value.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (window.$notification) {
        window.$notification.error({
          title: 'Error',
          message: 'Failed to load order history: ' + error.message
        });
      }
    } finally {
      loading.value = false;
    }
  };
  
  // Computed properties
  const filteredOrders = computed(() => {
    let result = orders.value;
  
    // Filter by status
    if (statusFilter.value !== 'all') {
      result = result.filter(order => order.status === statusFilter.value);
    }
  
    // Filter by date
    if (dateFilter.value !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (dateFilter.value === 'today') {
        result = result.filter(order => {
          const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt || 0);
          return orderDate >= today;
        });
      } else if (dateFilter.value === 'week') {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        result = result.filter(order => {
          const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt || 0);
          return orderDate >= weekStart;
        });
      } else if (dateFilter.value === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        
        result = result.filter(order => {
          const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt || 0);
          return orderDate >= monthStart;
        });
      }
    }
  
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        (order.service && order.service.toLowerCase().includes(query)) ||
        (order.pickupLocation && order.pickupLocation.toLowerCase().includes(query)) ||
        (order.dropLocation && order.dropLocation.toLowerCase().includes(query))
      );
    }
  
    return result;
  });
  
  // Methods
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
  
  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    
    return status
      .replace('_', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const trackOrder = (order) => {
    selectedOrder.value = order;
    showTrackingModal.value = true;
  };
  
  const closeTrackingModal = () => {
    showTrackingModal.value = false;
    selectedOrder.value = null;
  };
  
  const confirmDelete = (orderId) => {
    orderToDelete.value = orderId;
    showDeleteModal.value = true;
  };
  
  const deleteOrder = async () => {
    try {
      if (!orderToDelete.value) return;
      
      await deleteDoc(doc(db, "bookings", orderToDelete.value));
      
      // Remove from local state
      orders.value = orders.value.filter(order => order.id !== orderToDelete.value);
      
      // Close modal
      showDeleteModal.value = false;
      orderToDelete.value = null;
      
      // Show success message
      if (window.$notification) {
        window.$notification.success({
          title: 'Success',
          message: 'Order deleted successfully'
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      if (window.$notification) {
        window.$notification.error({
          title: 'Error',
          message: 'Failed to delete order: ' + error.message
        });
      }
    }
  };
  
  const refreshOrders = () => {
    fetchOrders();
  };
  
  onMounted(async () => {
    // Wait for auth to be initialized
    if (!authStore.user) {
      console.log('Waiting for auth to initialize...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (authStore.user) {
      console.log('Auth initialized, fetching orders...');
      await fetchOrders();
    } else {
      console.error('Still no authenticated user after waiting');
      if (window.$notification) {
        window.$notification.error({
          title: 'Error',
          message: 'Please log in to view your order history'
        });
      }
    }
  });
  
  // Watch for auth changes
  watch(() => authStore.user, (newUser) => {
    if (newUser) {
      console.log('Auth state changed, refreshing orders...');
      fetchOrders();
    }
  });
  </script>
  
  