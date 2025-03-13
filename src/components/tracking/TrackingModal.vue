<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Header -->
          <div class="flex items-center justify-between border-b pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Order Tracking - #{{ order?.id?.substring(0, 8) }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Map -->
          <div class="mt-4 h-64 w-full rounded-lg bg-gray-100 relative">
            <div id="tracking-map" class="h-full w-full"></div>
            
            <!-- Loading indicator -->
            <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
            
            <!-- Map error message -->
            <div v-if="mapError" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-red-600 font-medium">Failed to load map</p>
              <p class="text-gray-600 text-sm text-center mt-1">{{ mapErrorMessage }}</p>
              <button 
                @click="retryLoadMap" 
                class="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Retry
              </button>
            </div>
          </div>

          <!-- Order Status -->
          <div class="mt-4">
            <div class="relative">
              <div class="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
              
              <div class="space-y-6">
                <!-- Pending -->
                <div class="relative flex items-center">
                  <div class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full" :class="[
                    order?.status === 'pending' ? 'bg-blue-500' : 'bg-green-500'
                  ]">
                    <svg v-if="order?.status === 'pending'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-12">
                    <h4 class="text-sm font-medium text-gray-900">Order Placed</h4>
                    <p class="text-sm text-gray-500">{{ formatDate(order?.createdAt) }}</p>
                  </div>
                </div>

                <!-- Assigned -->
                <div class="relative flex items-center">
                  <div class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full" :class="[
                    order?.status === 'assigned' ? 'bg-blue-500' : 
                    order?.status === 'in_progress' || order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  ]">
                    <svg v-if="order?.status === 'assigned'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <svg v-else-if="order?.status === 'in_progress' || order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-12">
                    <h4 class="text-sm font-medium text-gray-900">Driver Assigned</h4>
                    <p v-if="order?.driver" class="text-sm text-gray-500">
                      {{ order.driver.name }} - {{ order.driver.phone }}
                    </p>
                  </div>
                </div>

                <!-- In Progress -->
                <div class="relative flex items-center">
                  <div class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full" :class="[
                    order?.status === 'in_progress' ? 'bg-blue-500' : 
                    order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  ]">
                    <svg v-if="order?.status === 'in_progress'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg v-else-if="order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-12">
                    <h4 class="text-sm font-medium text-gray-900">In Progress</h4>
                    <p v-if="order?.status === 'in_progress'" class="text-sm text-gray-500">
                      Driver is {{ currentStatus }}
                    </p>
                  </div>
                </div>

                <!-- Completed -->
                <div class="relative flex items-center">
                  <div class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full" :class="[
                    order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  ]">
                    <svg v-if="order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-12">
                    <h4 class="text-sm font-medium text-gray-900">Completed</h4>
                    <p v-if="order?.completedAt" class="text-sm text-gray-500">
                      {{ formatDate(order.completedAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancel Button -->
          <div v-if="order?.status === 'pending'" class="mt-6">
            <button 
              @click="showCancelConfirmation = true"
              class="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelConfirmation" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Cancel Order
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </p>
                  <div class="mt-4">
                    <label for="cancel-reason" class="block text-sm font-medium text-gray-700">
                      Reason for cancellation
                    </label>
                    <select
                      id="cancel-reason"
                      v-model="cancelReason"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="">Select a reason</option>
                      <option value="changed_mind">Changed my mind</option>
                      <option value="wrong_address">Wrong address</option>
                      <option value="too_long">Taking too long</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="cancelOrder"
              :disabled="!cancelReason || cancelling"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ cancelling ? 'Cancelling...' : 'Cancel Order' }}
            </button>
            <button
              @click="showCancelConfirmation = false"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Never mind
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useBookingStore } from '../../stores/booking';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress } from '../../utils/gomaps';
import { Icon } from 'leaflet';

const props = defineProps({
  show: Boolean,
  order: Object,
});

const emit = defineEmits(['close', 'order-cancelled']);

const bookingStore = useBookingStore();
const map = ref(null);
const marker = ref(null);
const pickupMarker = ref(null);
const dropMarker = ref(null);
const showCancelConfirmation = ref(false);
const cancelReason = ref('');
const cancelling = ref(false);
const mapLoaded = ref(false);
const mapError = ref(false);
const mapErrorMessage = ref('');

const currentStatus = ref('');
let statusUpdateInterval;

// Fix Leaflet default icon path issue
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const closeModal = () => {
  emit('close');
};

const retryLoadMap = () => {
  mapError.value = false;
  mapErrorMessage.value = '';
  initMap();
};

const initMap = async () => {
  if (!props.order) return;
  
  try {
    // Default coordinates (Oriental Mindoro, Philippines) if geocoding fails
    const defaultLat = 13.0565;
    const defaultLng = 121.4069;
    
    // Set initial center to Oriental Mindoro
    let centerLat = defaultLat;
    let centerLng = defaultLng;
    
    // Clear previous map instance if it exists
    if (map.value) {
      map.value.remove();
      map.value = null;
    }
    
    console.log("Initializing map...");
    
    // Make sure the map container exists
    const mapContainer = document.getElementById('tracking-map');
    if (!mapContainer) {
      console.error("Map container not found");
      mapError.value = true;
      mapErrorMessage.value = "Map container not found";
      return;
    }
    
    // Initialize map
    map.value = L.map('tracking-map').setView([centerLat, centerLng], 13);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
    
    console.log("Map initialized");
    
    // Add marker for driver location (default position)
    const driverIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center text-white text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0010 5.05V5a1 1 0 00-1-1H3z" />
              </svg>
            </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    marker.value = L.marker([centerLat, centerLng], { icon: driverIcon }).addTo(map.value);
    
    // Try to geocode pickup location
    if (props.order.pickupLocation) {
      console.log("Geocoding pickup location:", props.order.pickupLocation);
      try {
        const pickupCoords = await geocodeAddress(props.order.pickupLocation);
        if (pickupCoords) {
          console.log("Pickup coordinates:", pickupCoords);
          centerLat = pickupCoords.lat;
          centerLng = pickupCoords.lng;
          
          const pickupIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-xs">P</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          pickupMarker.value = L.marker([pickupCoords.lat, pickupCoords.lng], { icon: pickupIcon })
            .addTo(map.value)
            .bindPopup("Pickup Location: " + props.order.pickupLocation);
            
          // Update driver marker position
          marker.value.setLatLng([pickupCoords.lat, pickupCoords.lng]);
          
          // Center map on pickup location
          map.value.setView([pickupCoords.lat, pickupCoords.lng], 15);
        }
      } catch (error) {
        console.error("Error geocoding pickup location:", error);
        // If geocoding fails, use default coordinates (Oriental Mindoro)
        console.warn('Geocoding failed, using default coordinates');
      }
    }
    
    // Add drop-off marker
    if (props.order.dropLocation) {
      console.log("Geocoding drop location:", props.order.dropLocation);
      try {
        const dropCoords = await geocodeAddress(props.order.dropLocation);
        if (dropCoords) {
          console.log("Drop coordinates:", dropCoords);
          const dropIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-xs">D</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          dropMarker.value = L.marker([dropCoords.lat, dropCoords.lng], { icon: dropIcon })
            .addTo(map.value)
            .bindPopup("Drop-off Location: " + props.order.dropLocation);
            
          // Draw a line between pickup and drop-off
          if (pickupMarker.value) {
            const pickupPos = pickupMarker.value.getLatLng();
            L.polyline([
              [pickupPos.lat, pickupPos.lng],
              [dropCoords.lat, dropCoords.lng]
            ], { color: 'blue', weight: 3, opacity: 0.7 }).addTo(map.value);
            
            // Fit bounds to show both markers
            map.value.fitBounds([
              [pickupPos.lat, pickupPos.lng],
              [dropCoords.lat, dropCoords.lng]
            ]);
          }
        }
      } catch (error) {
        console.error("Error geocoding drop location:", error);
        // If geocoding fails, use default coordinates (Oriental Mindoro)
        console.warn('Geocoding failed, using default coordinates');
      }
    }
    
    // Update driver location
    if (props.order?.status === 'in_progress' || props.order?.status === 'assigned') {
      startLocationUpdates();
    }
    
    // Force a map resize to ensure it renders properly
    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize();
        console.log("Map size invalidated");
      }
    }, 100);
    
    mapLoaded.value = true;
  } catch (error) {
    console.error("Error initializing map:", error);
    mapError.value = true;
    mapErrorMessage.value = error.message || "Failed to initialize map";
  }
};

const startLocationUpdates = () => {
  // Simulate driver location updates
  statusUpdateInterval = setInterval(() => {
    const statuses = [
      'heading to pickup location',
      'arrived at pickup location',
      'picked up the order',
      'on the way to delivery location'
    ];
    currentStatus.value = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Simulate marker movement
    if (marker.value && map.value) {
      const currentPos = marker.value.getLatLng();
      const newLat = currentPos.lat + (Math.random() - 0.5) * 0.001;
      const newLng = currentPos.lng + (Math.random() - 0.5) * 0.001;
      marker.value.setLatLng([newLat, newLng]);
    }
  }, 3000);
};

const cancelOrder = async () => {
  if (!cancelReason.value) return;
  
  cancelling.value = true;
  try {
    await bookingStore.cancelBooking(props.order.id, cancelReason.value);
    emit('order-cancelled');
    showCancelConfirmation.value = false;
    closeModal();
  } catch (error) {
    console.error('Error cancelling order:', error);
    window.$notification?.error('Error', 'Failed to cancel order. Please try again.');
  } finally {
    cancelling.value = false;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    // Initialize map when modal is shown
    console.log("Modal shown, initializing map");
    mapLoaded.value = false;
    mapError.value = false;
    
    // Wait for the DOM to update before initializing the map
    setTimeout(() => {
      initMap();
    }, 100);
  }
});

onMounted(() => {
  if (props.show) {
    console.log("Component mounted and modal is shown");
    initMap();
  }
});

onUnmounted(() => {
  if (statusUpdateInterval) {
    clearInterval(statusUpdateInterval);
  }
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});
</script>

<style>
/* Leaflet specific styles */
#tracking-map {
  border-radius: 0.5rem;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.leaflet-control-container .leaflet-control {
  z-index: 1;
}

/* Custom marker styles */
.custom-div-icon {
  background: transparent;
  border: none;
}

.custom-div-icon div {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

/* Fix for Leaflet CSS */
.leaflet-container {
  height: 100%;
  width: 100%;
}

.leaflet-pane {
  z-index: 1;
}

.leaflet-top,
.leaflet-bottom {
  z-index: 1;
}
</style>

