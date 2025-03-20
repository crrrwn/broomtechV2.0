<template>
  <div class="user-dashboard-container">
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Welcome, {{ userDisplayName }}</h1>
      <p class="text-gray-600">Manage your cleaning services and track your orders all in one place.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Quick Actions Card -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="space-y-3">
          <router-link to="/user/book-service" class="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition duration-150 ease-in-out">
            Book a Service
          </router-link>
          <router-link to="/user/order-history" class="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-center transition duration-150 ease-in-out">
            View Order History
          </router-link>
          <router-link to="/user/profile" class="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-center transition duration-150 ease-in-out">
            Update Profile
          </router-link>
        </div>
      </div>

      <!-- Recent Orders Card -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div v-if="recentOrders.length > 0" class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="border-b pb-3 last:border-b-0">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium text-gray-900">{{ order.serviceType }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(order.date) }}</p>
              </div>
            </div>
            <router-link :to="`/user/order-tracking/${order.id}`" class="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
              View Details
            </router-link>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-4">
          No recent orders found.
        </div>
      </div>

      <!-- Upcoming Service Card -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Service</h2>
        <div v-if="upcomingService" class="space-y-3">
          <div class="bg-blue-50 p-4 rounded-md">
            <p class="font-medium text-gray-900">{{ upcomingService.serviceType }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ formatDate(upcomingService.date) }} at {{ formatTime(upcomingService.time) }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ upcomingService.address }}</p>
            <div class="mt-3 flex justify-between items-center">
              <span :class="getStatusClass(upcomingService.status)">{{ upcomingService.status }}</span>
              <router-link :to="`/user/order-tracking/${upcomingService.id}`" class="text-sm text-blue-600 hover:text-blue-800">
                Track Order
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-4">
          No upcoming services scheduled.
        </div>
      </div>
    </div>

    <!-- Service History Summary -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Service History Summary</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gray-100 p-4 rounded-md text-center">
          <p class="text-2xl font-bold text-blue-600">{{ totalOrders }}</p>
          <p class="text-sm text-gray-600">Total Orders</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-md text-center">
          <p class="text-2xl font-bold text-green-600">{{ completedOrders }}</p>
          <p class="text-sm text-gray-600">Completed</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-md text-center">
          <p class="text-2xl font-bold text-yellow-600">{{ pendingOrders }}</p>
          <p class="text-sm text-gray-600">Pending</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-md text-center">
          <p class="text-2xl font-bold text-gray-600">{{ cancelledOrders }}</p>
          <p class="text-sm text-gray-600">Cancelled</p>
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

<script>
import { ref, computed, onMounted } from 'vue'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthStore } from '../../stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    const orders = ref([])
    const isLoading = ref(true)

    const userDisplayName = computed(() => {
      if (authStore.user && authStore.user.firstName) {
        return authStore.user.firstName
      }
      return authStore.user?.displayName || 'User'
    })

    const recentOrders = computed(() => {
      return orders.value.slice(0, 3)
    })

    const upcomingService = computed(() => {
      const upcoming = orders.value.find(order => 
        (order.status === 'Scheduled' || order.status === 'In Progress') && 
        new Date(order.date) >= new Date()
      )
      return upcoming
    })

    const totalOrders = computed(() => orders.value.length)
    
    const completedOrders = computed(() => 
      orders.value.filter(order => order.status === 'Completed').length
    )
    
    const pendingOrders = computed(() => 
      orders.value.filter(order => ['Pending', 'Scheduled', 'In Progress'].includes(order.status)).length
    )
    
    const cancelledOrders = computed(() => 
      orders.value.filter(order => order.status === 'Cancelled').length
    )

    const fetchOrders = async () => {
      if (!authStore.user) return

      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', authStore.user.id),
          orderBy('date', 'desc'),
          limit(10)
        )
        
        const querySnapshot = await getDocs(q)
        const orderData = []
        
        querySnapshot.forEach((doc) => {
          orderData.push({
            id: doc.id,
            ...doc.data()
          })
        })
        
        orders.value = orderData
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatTime = (timeString) => {
      return timeString
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'Completed':
          return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
        case 'In Progress':
          return 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'
        case 'Scheduled':
          return 'px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800'
        case 'Pending':
          return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800'
        case 'Cancelled':
          return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
        default:
          return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800'
      }
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      userDisplayName,
      recentOrders,
      upcomingService,
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      isLoading,
      formatDate,
      formatTime,
      getStatusClass
    }
  }
}
</script>

