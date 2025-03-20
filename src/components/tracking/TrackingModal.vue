<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Backdrop with improved opacity transition -->
      <div class="fixed inset-0 transition-opacity duration-300" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal panel with enhanced styling and animations -->
      <div class="inline-block transform overflow-hidden rounded-xl bg-white text-left align-bottom shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
        <div class="bg-white px-6 pt-6 pb-6">
          <!-- Header with improved spacing and typography -->
          <div class="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 class="text-xl font-bold leading-6 text-gray-900 flex items-center">
              <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </span>
              Order Tracking <span class="text-green-600 ml-2">#{{ order?.id?.substring(0, 8) }}</span>
            </h3>
            <button @click="closeModal" class="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Map with enhanced styling -->
          <div class="mt-5 h-72 w-full rounded-xl bg-gray-100 relative overflow-hidden shadow-inner border border-gray-200">
            <div id="tracking-map" class="h-full w-full"></div>
            
            <!-- Loading indicator with improved animation -->
            <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-xl">
              <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-3"></div>
                <p class="text-sm text-gray-600 font-medium">Loading map...</p>
              </div>
            </div>
            
            <!-- Map error message with improved styling -->
            <div v-if="mapError" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 rounded-xl p-4">
              <div class="bg-red-50 rounded-full p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p class="text-red-600 font-medium text-lg mb-1">Failed to load map</p>
              <p class="text-gray-600 text-sm text-center mb-4">{{ mapErrorMessage }}</p>
              <button 
                @click="retryLoadMap" 
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
              >
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </span>
              </button>
            </div>
          </div>

          <!-- Location details with improved design -->
          <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pickup Location
              </h4>
              <p class="text-gray-700 text-sm">{{ order?.pickupLocation || 'Not specified' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Delivery Location
              </h4>
              <p class="text-gray-700 text-sm">{{ order?.dropLocation || 'Not specified' }}</p>
            </div>
          </div>

          <!-- Order Status with enhanced timeline design -->
          <div class="mt-6">
            <h4 class="font-bold text-gray-900 mb-4">Order Status</h4>
            <div class="relative">
              <div class="absolute left-5 top-0 h-full w-1 bg-gray-200 rounded-full"></div>
              
              <div class="space-y-8">
                <!-- Pending -->
                <div class="relative flex items-start">
                  <div class="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full shadow-md" 
                       :class="[order?.status === 'pending' ? 'bg-blue-500 animate-pulse' : 'bg-green-500']">
                    <svg v-if="order?.status === 'pending'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-14">
                    <h4 class="text-base font-semibold text-gray-900">Order Placed</h4>
                    <p class="text-sm text-gray-600 mt-1">{{ formatDate(order?.createdAt) }}</p>
                    <div v-if="order?.status === 'pending'" class="mt-2 text-sm text-blue-600 font-medium">
                      Waiting for driver assignment
                    </div>
                  </div>
                </div>

                <!-- Assigned -->
                <div class="relative flex items-start">
                  <div class="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full shadow-md" 
                       :class="[
                         order?.status === 'assigned' ? 'bg-blue-500 animate-pulse' : 
                         order?.status === 'in_progress' || order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                       ]">
                    <svg v-if="order?.status === 'assigned'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <svg v-else-if="order?.status === 'in_progress' || order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-14">
                    <h4 class="text-base font-semibold text-gray-900">Driver Assigned</h4>
                    <div v-if="order?.driverName" class="mt-1 flex items-center">
                      <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mr-2">
                        {{ (order.driverName || 'D').charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-800">{{ order.driverName }}</p>
                        <p v-if="order?.driverPhone" class="text-xs text-gray-600 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {{ order.driverPhone }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- In Progress -->
                <div class="relative flex items-start">
                  <div class="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full shadow-md" 
                       :class="[
                         order?.status === 'in_progress' ? 'bg-blue-500 animate-pulse' : 
                         order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                       ]">
                    <svg v-if="order?.status === 'in_progress'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg v-else-if="order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-14">
                    <h4 class="text-base font-semibold text-gray-900">In Progress</h4>
                    <div v-if="order?.status === 'in_progress'" class="mt-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-100 animate-pulse">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Driver is {{ currentStatus }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Completed -->
                <div class="relative flex items-start">
                  <div class="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full shadow-md" 
                       :class="[order?.status === 'completed' ? 'bg-green-500' : 'bg-gray-300']">
                    <svg v-if="order?.status === 'completed'" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-14">
                    <h4 class="text-base font-semibold text-gray-900">Completed</h4>
                    <p v-if="order?.completedAt" class="text-sm text-gray-600 mt-1">
                      {{ formatDate(order.completedAt) }}
                    </p>
                    <div v-if="order?.status === 'completed'" class="mt-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-100">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Order successfully delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancel Button with improved styling -->
          <div v-if="order?.status === 'pending'" class="mt-8 flex justify-end">
            <button 
              @click="showCancelConfirmation = true"
              class="inline-flex items-center rounded-lg border border-transparent bg-red-100 px-5 py-2.5 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal with enhanced design -->
    <div v-if="showCancelConfirmation" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity duration-300" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block transform overflow-hidden rounded-xl bg-white text-left align-bottom shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div class="bg-white px-6 pt-6 pb-6">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-12 sm:w-12">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-xl font-bold leading-6 text-gray-900 mb-1">
                  Cancel Order
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-600">
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </p>
                  <div class="mt-4">
                    <label for="cancel-reason" class="block text-sm font-medium text-gray-700 mb-2">
                      Reason for cancellation <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <select
                        id="cancel-reason"
                        v-model="cancelReason"
                        class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50 py-2.5 pl-3 pr-10 text-gray-700 transition-colors duration-200"
                        :disabled="cancelTimerExpired"
                      >
                        <option value="">Select a reason</option>
                        <option value="changed_mind">Changed my mind</option>
                        <option value="wrong_address">Wrong address</option>
                        <option value="too_long">Taking too long</option>
                        <option value="other">Other</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="!cancelReason && showReasonError" class="mt-2 text-sm text-red-600">
                      Please select a reason for cancellation
                    </p>
                  </div>
                  
                  <!-- Timer display -->
                  <div v-if="cancelReason && !cancelTimerExpired" class="mt-4">
                    <div class="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="text-sm font-medium text-yellow-700">Time remaining to cancel:</span>
                        </div>
                        <div class="text-lg font-bold text-yellow-700">{{ formatTime(cancelTimeRemaining) }}</div>
                      </div>
                      <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-yellow-500 h-2.5 rounded-full" :style="{ width: `${(cancelTimeRemaining / 30) * 100}%` }"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Timer expired message -->
                  <div v-if="cancelTimerExpired" class="mt-4">
                    <div class="bg-red-50 border border-red-100 rounded-lg p-3">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm font-medium text-red-700">Time to cancel has expired</span>
                      </div>
                      <p class="text-xs text-red-600 mt-1">You can no longer cancel this order.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="cancelOrder"
              :disabled="!cancelReason || cancelling || cancelTimerExpired"
              class="inline-flex w-full justify-center rounded-lg border border-transparent bg-red-600 px-5 py-2.5 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <svg v-if="cancelling" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ cancelling ? 'Cancelling...' : 'Cancel Order' }}
            </button>
            <button
              @click="showCancelConfirmation = false"
              class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 sm:mt-0 sm:w-auto sm:text-sm"
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
const showReasonError = ref(false);

// Cancel timer related refs
const cancelTimeRemaining = ref(30); // 30 seconds timer
const cancelTimerExpired = ref(false);
const cancelTimerInterval = ref(null);

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
    // Default coordinates (Calapan City, Oriental Mindoro, Philippines) if geocoding fails
    const defaultLat = 13.4105;
    const defaultLng = 121.1817;
    
    // Set initial center to Calapan City
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
    
    // Add OpenStreetMap tile layer with improved styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 3
    }).addTo(map.value);
    
    console.log("Map initialized");
    
    // Add marker for driver location with enhanced icon
    const driverIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; color: white;" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1  viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0010 5.05V5a1 1 0 00-1-1H3z" />
              </svg>
            </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    
    marker.value = L.marker([centerLat, centerLng], { icon: driverIcon }).addTo(map.value);
    
    // Try to geocode pickup location with enhanced markers
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
            html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; display: flex; align-items: center; justify-center; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); color: white; font-weight: bold; font-size: 12px;">P</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          
          pickupMarker.value = L.marker([pickupCoords.lat, pickupCoords.lng], { icon: pickupIcon })
            .addTo(map.value)
            .bindPopup(`<div class="font-medium">Pickup Location</div><div class="text-sm">${props.order.pickupLocation}</div>`, {
              className: 'custom-popup'
            });
            
          // Update driver marker position
          marker.value.setLatLng([pickupCoords.lat, pickupCoords.lng]);
          
          // Center map on pickup location
          map.value.setView([pickupCoords.lat, pickupCoords.lng], 15);
        }
      } catch (error) {
        console.error("Error geocoding pickup location:", error);
        // If geocoding fails, use default coordinates (Calapan City)
        console.warn('Geocoding failed, using default coordinates');
      }
    }
    
    // Add drop-off marker with enhanced styling
    if (props.order.dropLocation) {
      console.log("Geocoding drop location:", props.order.dropLocation);
      try {
        const dropCoords = await geocodeAddress(props.order.dropLocation);
        if (dropCoords) {
          console.log("Drop coordinates:", dropCoords);
          const dropIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ef4444; width: 24px; height: 24px; display: flex; align-items: center; justify-center; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); color: white; font-weight: bold; font-size: 12px;">D</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          
          dropMarker.value = L.marker([dropCoords.lat, dropCoords.lng], { icon: dropIcon })
            .addTo(map.value)
            .bindPopup(`<div class="font-medium">Delivery Location</div><div class="text-sm">${props.order.dropLocation}</div>`, {
              className: 'custom-popup'
            });
            
          // Draw a line between pickup and drop-off with improved styling
          if (pickupMarker.value) {
            const pickupPos = pickupMarker.value.getLatLng();
            L.polyline([
              [pickupPos.lat, pickupPos.lng],
              [dropCoords.lat, dropCoords.lng]
            ], { 
              color: '#3b82f6', 
              weight: 4, 
              opacity: 0.7,
              dashArray: '10, 10',
              lineCap: 'round'
            }).addTo(map.value);
            
            // Fit bounds to show both markers with padding
            map.value.fitBounds([
              [pickupPos.lat, pickupPos.lng],
              [dropCoords.lat, dropCoords.lng]
            ], { padding: [50, 50] });
          }
        }
      } catch (error) {
        console.error("Error geocoding drop location:", error);
        // If geocoding fails, use default coordinates (Calapan City)
        console.warn('Geocoding failed, using default coordinates');
      }
    }
    
    // Update driver location with improved animation
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
  // Simulate driver location updates with more realistic statuses
  const statuses = [
    'heading to pickup location',
    'approaching pickup location',
    'arrived at pickup location',
    'picking up the order',
    'order picked up',
    'on the way to delivery location',
    'approaching delivery location'
  ];
  
  let statusIndex = 0;
  currentStatus.value = statuses[statusIndex];
  
  statusUpdateInterval = setInterval(() => {
    // Cycle through statuses to create a more realistic flow
    statusIndex = (statusIndex + 1) % statuses.length;
    currentStatus.value = statuses[statusIndex];
    
    // Simulate marker movement with smoother animation
    if (marker.value && map.value && pickupMarker.value && dropMarker.value) {
      const pickupPos = pickupMarker.value.getLatLng();
      const dropPos = dropMarker.value.getLatLng();
      
      // Calculate position along the route based on status
      const progress = statusIndex / (statuses.length - 1);
      const newLat = pickupPos.lat + (dropPos.lat - pickupPos.lat) * progress;
      const newLng = pickupPos.lng + (dropPos.lng - pickupPos.lng) * progress;
      
      // Add some randomness to make movement look more natural
      const jitter = 0.0005;
      const randomLat = newLat + (Math.random() - 0.5) * jitter;
      const randomLng = newLng + (Math.random() - 0.5) * jitter;
      
      marker.value.setLatLng([randomLat, randomLng]);
    }
  }, 5000); // Update every 5 seconds for a more realistic pace
};

// Format time for the cancel timer (MM:SS format)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Start the cancel timer when a reason is selected
const startCancelTimer = () => {
  // Clear any existing interval
  if (cancelTimerInterval.value) {
    clearInterval(cancelTimerInterval.value);
  }
  
  // Reset timer state
  cancelTimeRemaining.value = 30;
  cancelTimerExpired.value = false;
  
  // Start the countdown
  cancelTimerInterval.value = setInterval(() => {
    if (cancelTimeRemaining.value > 0) {
      cancelTimeRemaining.value--;
    } else {
      // Timer expired
      cancelTimerExpired.value = true;
      clearInterval(cancelTimerInterval.value);
    }
  }, 1000);
};

const cancelOrder = async () => {
  if (!cancelReason.value) {
    showReasonError.value = true;
    return;
  }
  
  if (cancelTimerExpired.value) {
    return; // Cannot cancel if timer expired
  }
  
  cancelling.value = true;
  try {
    await bookingStore.cancelBooking(props.order.id, cancelReason.value);
    emit('order-cancelled');
    showCancelConfirmation.value = false;
    closeModal();
    
    // Show success notification
    if (window.$notification) {
      window.$notification.success({
        title: 'Order Cancelled',
        message: 'Your order has been successfully cancelled'
      });
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    if (window.$notification) {
      window.$notification.error({
        title: 'Error',
        message: 'Failed to cancel order. Please try again.'
      });
    }
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
    
    // Reset cancel reason
    cancelReason.value = '';
    showReasonError.value = false;
    cancelTimerExpired.value = false;
    
    // Wait for the DOM to update before initializing the map
    setTimeout(() => {
      initMap();
    }, 100);
  } else {
    // Clean up when modal is hidden
    if (statusUpdateInterval) {
      clearInterval(statusUpdateInterval);
    }
    
    // Clear cancel timer
    if (cancelTimerInterval.value) {
      clearInterval(cancelTimerInterval.value);
      cancelTimerInterval.value = null;
    }
  }
});

watch(() => cancelReason.value, (newVal) => {
  if (newVal) {
    showReasonError.value = false;
    // Start the timer when a reason is selected
    startCancelTimer();
  }
});

watch(() => showCancelConfirmation.value, (newVal) => {
  if (!newVal && cancelTimerInterval.value) {
    // Clear the timer if the cancel confirmation is closed
    clearInterval(cancelTimerInterval.value);
    cancelTimerInterval.value = null;
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
  if (cancelTimerInterval.value) {
    clearInterval(cancelTimerInterval.value);
  }
});
</script>

<style>
/* Leaflet specific styles */
#tracking-map {
  border-radius: 0.75rem;
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

/* Fix for Leaflet CSS */
.leaflet-container {
  height: 100%;
  width: 100%;
  font-family: inherit;
  border-radius: 0.75rem;
}

.leaflet-pane {
  z-index: 1;
}

.leaflet-top,
.leaflet-bottom {
  z-index: 1;
}

/* Custom popup styling */
.custom-popup .leaflet-popup-content-wrapper {
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.custom-popup .leaflet-popup-content {
  margin: 0.5rem;
  font-family: inherit;
}

/* Animation for status updates */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;  
}

/* Transition animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}
</style>