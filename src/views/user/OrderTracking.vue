<template>
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6 flex items-center">
        <router-link to="/user/order-history" class="text-green-600 hover:text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Order History
        </router-link>
      </div>
      
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
        <p>{{ error }}</p>
        <router-link to="/user/order-history" class="text-red-600 hover:text-red-800 font-medium mt-2 inline-block">
          Return to Order History
        </router-link>
      </div>
      
      <div v-else>
        <!-- Order Status Card -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div class="p-4 border-b border-gray-200">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex items-center">
                  <h1 class="text-xl font-bold text-gray-800">Order #{{ order.id.substring(0, 8) }}</h1>
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': order.status === 'completed',
                      'bg-red-100 text-red-800': order.status === 'cancelled',
                      'bg-blue-100 text-blue-800': order.status === 'in-progress'
                    }"
                    class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ formatDate(order.date) }}</p>
              </div>
              <div class="mt-2 md:mt-0">
                <p class="text-sm text-gray-600">Estimated Delivery Time:</p>
                <p class="text-lg font-bold text-gray-800">{{ estimatedDeliveryTime }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="flex flex-col md:flex-row md:justify-between">
              <div>
                <h4 class="font-medium text-gray-700">Service Details</h4>
                <p class="text-sm text-gray-600 mt-1">{{ order.service }}</p>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">From:</span> {{ order.pickup }}
                </p>
                <p class="text-sm text-gray-600 mt-1" v-if="order.destination">
                  <span class="font-medium">To:</span> {{ order.destination }}
                </p>
              </div>
              <div class="mt-4 md:mt-0">
                <h4 class="font-medium text-gray-700">Payment</h4>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">Method:</span> {{ order.paymentMethod }}
                </p>
                <p class="text-lg font-bold text-gray-800 mt-1">₱{{ order.amount.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Progress -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Order Progress</h2>
          
          <div class="relative">
            <!-- Progress Bar -->
            <div class="h-1 bg-gray-200 absolute top-5 left-6 right-6 md:left-10 md:right-10 z-0"></div>
            <div 
              class="h-1 bg-green-500 absolute top-5 left-6 md:left-10 z-10 transition-all duration-500"
              :style="{ width: progressWidth }"
            ></div>
            
            <!-- Progress Steps -->
            <div class="flex justify-between relative z-20">
              <div v-for="(step, index) in progressSteps" :key="index" class="flex flex-col items-center">
                <div 
                  :class="{
                    'bg-green-500 text-white': step.completed,
                    'bg-white border-2 border-gray-300 text-gray-400': !step.completed
                  }"
                  class="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                >
                  <svg v-if="step.completed" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <p class="text-xs md:text-sm font-medium text-gray-700 mt-2 text-center">{{ step.label }}</p>
                <p v-if="step.timestamp" class="text-xs text-gray-500 mt-1">
                  {{ formatTime(step.timestamp) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Map and Driver Info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Map -->
          <div class="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800">Live Tracking</h2>
            </div>
            <div class="h-80 bg-gray-100 relative">
              <div id="map" class="h-full w-full"></div>
              
              <!-- Fallback if map doesn't load -->
              <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center">
                <p class="text-gray-500">Loading map...</p>
              </div>
            </div>
          </div>
          
          <!-- Driver Info -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800">Driver Information</h2>
            </div>
            <div class="p-4">
              <div v-if="order.driver">
                <div class="flex items-center">
                  <div class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl">
                    {{ order.driver.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-800">{{ order.driver.name }}</h3>
                    <div class="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm text-gray-600 ml-1">{{ order.driver.rating || '4.8' }} ({{ order.driver.totalRatings || '124' }} ratings)</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 space-y-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">Phone</p>
                      <p class="text-sm text-gray-500">{{ order.driver.phone }}</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">Vehicle</p>
                      <p class="text-sm text-gray-500">{{ order.driver.vehicle || 'Motorcycle' }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 grid grid-cols-2 gap-3">
                  <a :href="`tel:${order.driver.phone}`" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                  <button @click="openChat" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p class="mt-2 text-gray-500">Driver not yet assigned</p>
                <p class="text-sm text-gray-400">A driver will be assigned to your order soon</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Cancel Order Button (only show if order is in progress) -->
        <div v-if="order.status === 'in-progress'" class="mt-6 flex justify-center">
          <button 
            @click="showCancelModal = true" 
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel Order
          </button>
        </div>
      </div>
      
      <!-- Cancel Order Modal -->
      <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md mx-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Cancel Order</h3>
          <p class="text-sm text-gray-500 mb-4">
            Are you sure you want to cancel this order? You can only cancel within the next:
          </p>
          
          <div class="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <div class="text-center text-red-800 font-bold text-xl">
              {{ formatCountdown(cancelCountdown) }}
            </div>
          </div>
          
          <div class="mb-4">
            <label for="cancel-reason" class="block text-sm font-medium text-gray-700 mb-1">
              Reason for cancellation
            </label>
            <select 
              id="cancel-reason" 
              v-model="cancelReason" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            >
              <option value="">Select a reason</option>
              <option value="changed_mind">Changed my mind</option>
              <option value="long_wait">Wait time too long</option>
              <option value="wrong_address">Entered wrong address</option>
              <option value="duplicate_order">Duplicate order</option>
              <option value="other">Other reason</option>
            </select>
          </div>
          
          <div v-if="cancelReason === 'other'" class="mb-4">
            <label for="cancel-other-reason" class="block text-sm font-medium text-gray-700 mb-1">
              Please specify
            </label>
            <textarea 
              id="cancel-other-reason" 
              v-model="cancelOtherReason" 
              rows="2" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="showCancelModal = false" 
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Keep Order
            </button>
            <button 
              @click="cancelOrder" 
              :disabled="!cancelReason || (cancelReason === 'other' && !cancelOtherReason)"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  import { db } from '../../firebase/config';
  import L from 'leaflet';
  
  const route = useRoute();
  const router = useRouter();
  const orderId = route.params.id;
  
  // State
  const order = ref({});
  const loading = ref(true);
  const error = ref(null);
  const mapLoaded = ref(false);
  const map = ref(null);
  const driverMarker = ref(null);
  const pickupMarker = ref(null);
  const destinationMarker = ref(null);
  const showCancelModal = ref(false);
  const cancelCountdown = ref(300); // 5 minutes in seconds
  const cancelReason = ref('');
  const cancelOtherReason = ref('');
  const countdownInterval = ref(null);
  
  // Fetch order data
  onMounted(async () => {
    try {
      loading.value = true;
      
      const orderDoc = await getDoc(doc(db, "bookings", orderId));
      
      if (orderDoc.exists()) {
        order.value = {
          id: orderDoc.id,
          ...orderDoc.data()
        };
        
        // Initialize map after order data is loaded
        initMap();
        
        // Start cancel countdown if order is in progress
        if (order.value.status === 'in-progress') {
          startCancelCountdown();
        }
      } else {
        error.value = "Order not found";
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      error.value = "Failed to load order details";
    } finally {
      loading.value = false;
    }
  });
  
  onUnmounted(() => {
    if (countdownInterval.value) {
      clearInterval(countdownInterval.value);
    }
    
    // Clean up map if it exists
    if (map.value) {
      map.value.remove();
    }
  });
  
  // Computed properties
  const estimatedDeliveryTime = computed(() => {
    if (!order.value.estimatedDelivery) {
      return "Calculating...";
    }
    
    return formatTime(order.value.estimatedDelivery);
  });
  
  const progressSteps = computed(() => {
    return [
      {
        label: "Order Placed",
        completed: true,
        timestamp: order.value.date
      },
      {
        label: "Driver Assigned",
        completed: !!order.value.driver,
        timestamp: order.value.driverAssignedAt
      },
      {
        label: "Pickup",
        completed: order.value.status === 'in-progress' && order.value.pickedUpAt,
        timestamp: order.value.pickedUpAt
      },
      {
        label: "Delivered",
        completed: order.value.status === 'completed',
        timestamp: order.value.completedAt
      }
    ];
  });
  
  const progressWidth = computed(() => {
    const completedSteps = progressSteps.value.filter(step => step.completed).length;
    const totalSteps = progressSteps.value.length;
    const percentage = (completedSteps / (totalSteps - 1)) * 100;
    return `${percentage}%`;
  });
  
  // Methods
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const initMap = () => {
    if (!order.value.pickup) return;
    
    // Default coordinates (Manila, Philippines)
    const defaultLat = 14.5995;
    const defaultLng = 120.9842;
    
    // Create map
    map.value = L.map('map').setView([defaultLat, defaultLng], 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
    
    // Add markers for pickup and destination
    // In a real app, you would geocode the addresses to get coordinates
    // For this demo, we'll use dummy coordinates
    
    // Pickup marker
    const pickupIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-xs">P</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    pickupMarker.value = L.marker([defaultLat, defaultLng], { icon: pickupIcon })
      .addTo(map.value)
      .bindPopup("Pickup Location");
    
    // Destination marker (if available)
    if (order.value.destination) {
      const destIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-xs">D</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      // Slightly offset destination for demo purposes
      destinationMarker.value = L.marker([defaultLat + 0.01, defaultLng + 0.01], { icon: destIcon })
        .addTo(map.value)
        .bindPopup("Destination");
      
      // Create a line between pickup and destination
      const polyline = L.polyline([
        [defaultLat, defaultLng],
        [defaultLat + 0.01, defaultLng + 0.01]
      ], { color: 'blue', weight: 3, opacity: 0.7 }).addTo(map.value);
      
      // Fit bounds to show both markers
      map.value.fitBounds([
        [defaultLat, defaultLng],
        [defaultLat + 0.01, defaultLng + 0.01]
      ]);
    }
    
    // Driver marker (if assigned)
    if (order.value.driver) {
      const driverIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center text-white text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0010 5.05V5a1 1 0 00-1-1H3z" />
                </svg>
              </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      // Position driver between pickup and destination for demo
      driverMarker.value = L.marker([defaultLat + 0.005, defaultLng + 0.005], { icon: driverIcon })
        .addTo(map.value)
        .bindPopup(`Driver: ${order.value.driver.name}`);
      
      // Simulate driver movement in a real app
      // This would be replaced with real-time updates from a database or websocket
      simulateDriverMovement();
    }
    
    mapLoaded.value = true;
  };
  
  const simulateDriverMovement = () => {
    if (!driverMarker.value || !map.value) return;
    
    // In a real app, you would subscribe to real-time updates
    // For this demo, we'll just simulate movement with a timer
    setInterval(() => {
      if (!driverMarker.value) return;
      
      const currentLatLng = driverMarker.value.getLatLng();
      const newLat = currentLatLng.lat + (Math.random() - 0.5) * 0.001;
      const newLng = currentLatLng.lng + (Math.random() - 0.5) * 0.001;
      
      driverMarker.value.setLatLng([newLat, newLng]);
    }, 3000);
  };
  
  const startCancelCountdown = () => {
    countdownInterval.value = setInterval(() => {
      if (cancelCountdown.value > 0) {
        cancelCountdown.value--;
      } else {
        clearInterval(countdownInterval.value);
      }
    }, 1000);
  };
  
  const openChat = () => {
    // In a real app, this would open a chat interface
    alert("Chat functionality would open here");
  };
  
  const cancelOrder = async () => {
    try {
      if (cancelCountdown.value <= 0) {
        alert("Cancellation time has expired");
        showCancelModal.value = false;
        return;
      }
      
      if (!cancelReason.value || (cancelReason.value === 'other' && !cancelOtherReason.value)) {
        alert("Please select a reason for cancellation");
        return;
      }
      
      // Update order status in Firestore
      await updateDoc(doc(db, "bookings", orderId), {
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: cancelReason.value === 'other' ? cancelOtherReason.value : cancelReason.value
      });
      
      // Update local state
      order.value.status = 'cancelled';
      
      // Close modal
      showCancelModal.value = false;
      
      // Show success message
      alert("Order cancelled successfully");
      
      // Redirect to order history
      router.push('/user/order-history');
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  
  