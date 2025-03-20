<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900">Task Details</h1>
        <router-link 
          to="/driver/tasks" 
          class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Back to Tasks
        </router-link>
      </div>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
        
        <div v-else>
          <!-- Task Status Card -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Order #{{ task.id.substring(0, 8) }}</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.service }}</p>
              </div>
              <div>
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  statusClasses[task.status] || 'bg-gray-100 text-gray-800'
                ]">
                  {{ formatStatus(task.status) }}
                </span>
              </div>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Created at</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(task.createdAt) }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Pickup location</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ task.pickupLocation }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Delivery location</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ task.dropLocation }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Details</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ task.details }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Payment method</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatPaymentMethod(task.paymentMethod) }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Total amount</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ task.totalAmount.toFixed(2) }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Your earnings</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ task.driverPayout ? task.driverPayout.toFixed(2) : (task.totalAmount * 0.8).toFixed(2) }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Customer</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ task.userName }} ({{ task.userPhone }})</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <!-- Map View -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Navigation</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Route to {{ task.status === 'assigned' ? 'pickup' : 'delivery' }} location</p>
            </div>
            <div class="border-t border-gray-200">
              <div class="h-64 bg-gray-200" id="map"></div>
            </div>
          </div>
          
          <!-- Status Update -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Status Update</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Update the delivery status</p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div class="space-y-4">
                <!-- Status Timeline -->
                <div class="flow-root">
                  <ul class="-mb-8">
                    <li v-for="(status, index) in statusTimeline" :key="status.id">
                      <div class="relative pb-8">
                        <span v-if="index !== statusTimeline.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div class="relative flex space-x-3">
                          <div>
                            <span :class="[
                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                              status.bgColor
                            ]">
                              <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" :d="status.icon" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </div>
                          <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p class="text-sm text-gray-500">{{ status.content }}</p>
                            </div>
                            <div class="text-right text-sm whitespace-nowrap text-gray-500">
                              <time :datetime="status.datetime">{{ status.date }}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <!-- Status Update Buttons -->
                <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                  <button 
                    v-if="task.status === 'assigned'"
                    @click="updateTaskStatus('in_progress')"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Start Delivery
                  </button>
                  
                  <button 
                    v-if="task.status === 'in_progress'"
                    @click="updateTaskStatus('completed')"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Complete Delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Communication -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Customer Communication</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Contact the customer</p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                <a 
                  :href="`tel:${task.userPhone}`"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Customer
                </a>
                
                <button 
                  @click="sendSMS"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg class="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Send SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDriverStore } from '../../stores/driver';
  import { useCurrentLocation } from '../../utils/tracking';
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from '../../firebase/config';
  import L from 'leaflet';
  
  const route = useRoute();
  const driverStore = useDriverStore();
  const { currentLocation, getCurrentLocation } = useCurrentLocation();
  
  const loading = ref(true);
  const error = ref('');
  const task = ref({});
  const map = ref(null);
  const markers = ref({
    pickup: null,
    delivery: null,
    driver: null
  });
  const locationUpdateInterval = ref(null);
  
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'assigned': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-indigo-100 text-indigo-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  const statusTimeline = computed(() => {
    const timeline = [];
  
    // Created
    if (task.value.createdAt) {
      timeline.push({
        id: 'created',
        content: 'Order created',
        date: formatDate(task.value.createdAt),
        datetime: task.value.createdAt,
        bgColor: 'bg-gray-500',
        icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
      });
    }
  
    // Assigned
    if (task.value.assignedAt) {
      timeline.push({
        id: 'assigned',
        content: 'Assigned to you',
        date: formatDate(task.value.assignedAt),
        datetime: task.value.assignedAt,
        bgColor: 'bg-blue-500',
        icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z'
      });
    }
  
    // In Progress
    if (task.value.in_progressAt) {
      timeline.push({
        id: 'in_progress',
        content: 'Delivery started',
        date: formatDate(task.value.in_progressAt),
        datetime: task.value.in_progressAt,
        bgColor: 'bg-indigo-500',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      });
    }
  
    // Completed
    if (task.value.completedAt) {
      timeline.push({
        id: 'completed',
        content: 'Delivery completed',
        date: formatDate(task.value.completedAt),
        datetime: task.value.completedAt,
        bgColor: 'bg-green-500',
        icon: 'M5 13l4 4L19 7'
      });
    }
  
    // Cancelled
    if (task.value.cancelledAt) {
      timeline.push({
        id: 'cancelled',
        content: `Delivery cancelled${task.value.cancelReason ? ': ' + task.value.cancelReason : ''}`,
        date: formatDate(task.value.cancelledAt),
        datetime: task.value.cancelledAt,
        bgColor: 'bg-red-500',
        icon: 'M6 18L18 6M6 6l12 12'
      });
    }
  
    return timeline.sort((a, b) => {
      const dateA = a.datetime instanceof Date ? a.datetime : a.datetime?.toDate();
      const dateB = b.datetime instanceof Date ? b.datetime : b.datetime?.toDate();
      return dateA - dateB;
    });
  });
  
  const formatStatus = (status) => {
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
  
  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'cash':
        return 'Cash on Delivery';
      case 'gcash':
        return 'GCash';
      case 'paymaya':
        return 'PayMaya';
      case 'gotyme':
        return 'GoTyme Bank';
      default:
        return method;
    }
  };
  
  const fetchTask = async () => {
    loading.value = true;
    error.value = '';
  
    try {
      const taskId = route.params.id;
      
      if (!taskId) {
        error.value = 'Task ID is missing';
        loading.value = false;
        return;
      }
  
      // Get task details
      const taskDoc = await getDoc(doc(db, 'bookings', taskId));
      
      if (!taskDoc.exists()) {
        error.value = 'Task not found';
        loading.value = false;
        return;
      }
  
      task.value = {
        id: taskDoc.id,
        ...taskDoc.data()
      };
  
      // Initialize map after task is loaded
      initMap();
      
      // Start location tracking
      startLocationTracking();
    } catch (err) {
      console.error('Error fetching task:', err);
      error.value = 'Failed to load task details';
    } finally {
      loading.value = false;
    }
  };
  
  const initMap = async () => {
    // Wait for DOM to be ready
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement) return;
      
      // Initialize map
      map.value = L.map('map').setView([14.5995, 120.9842], 13); // Manila coordinates
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);
      
      // Add markers for pickup and delivery locations
      // In a real app, these would be geocoded from the addresses
      // For demo purposes, we'll use placeholder coordinates
      
      // Pickup marker (green)
      markers.value.pickup = L.marker([14.5995, 120.9842], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #10B981; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(map.value);
      markers.value.pickup.bindPopup('Pickup: ' + task.value.pickupLocation);
      
      // Delivery marker (red)
      markers.value.delivery = L.marker([14.6091, 121.0223], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #EF4444; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(map.value);
      markers.value.delivery.bindPopup('Delivery: ' + task.value.dropLocation);
      
      // Fit bounds to show both markers
      const bounds = L.latLngBounds([
        [14.5995, 120.9842],
        [14.6091, 121.0223]
      ]);
      map.value.fitBounds(bounds, { padding: [50, 50] });
      
      // Add driver marker if we have location
      updateDriverMarker();
    }, 500);
  };
  
  const updateDriverMarker = async () => {
    if (!map.value) return;
    
    try {
      // Get current location
      await getCurrentLocation();
      
      if (currentLocation.value) {
        const { latitude, longitude } = currentLocation.value;
        
        // If driver marker already exists, update its position
        if (markers.value.driver) {
          markers.value.driver.setLatLng([latitude, longitude]);
        } else {
          // Create new driver marker
          markers.value.driver = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: #3B82F6; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })
          }).addTo(map.value);
          markers.value.driver.bindPopup('Your Location');
        }
      }
    } catch (error) {
      console.error('Error updating driver marker:', error);
    }
  };
  
  const startLocationTracking = () => {
    // Update driver location every 30 seconds
    locationUpdateInterval.value = setInterval(async () => {
      await updateDriverMarker();
      
      // Update location in database if task is in progress
      if (task.value.status === 'in_progress' && currentLocation.value) {
        try {
          await driverStore.updateTaskStatus(
            task.value.id, 
            'in_progress', 
            currentLocation.value
          );
        } catch (error) {
          console.error('Error updating location:', error);
        }
      }
    }, 30000);
    
    // Initial update
    updateDriverMarker();
  };
  
  const updateTaskStatus = async (status) => {
    try {
      // Get current location
      await getCurrentLocation();
      
      if (!currentLocation.value) {
        window.$notification?.error('Error', 'Unable to get your current location. Please enable location services and try again.');
        return;
      }
      
      await driverStore.updateTaskStatus(task.value.id, status, currentLocation.value);
      
      // Update local task status
      task.value.status = status;
      
      // Add timestamp
      task.value[`${status}At`] = new Date();
      
      // Show success notification
      let message = '';
      switch (status) {
        case 'in_progress':
          message = 'You have started the delivery';
          break;
        case 'completed':
          message = 'Delivery completed successfully';
          break;
        default:
          message = 'Task status updated';
      }
      
      window.$notification?.success('Status Updated', message);
    } catch (error) {
      console.error('Error updating task status:', error);
      window.$notification?.error('Error', 'Failed to update task status');
    }
  };
  
  const sendSMS = () => {
    if (!task.value.userPhone) {
      window.$notification?.error('Error', 'Customer phone number not available');
      return;
    }
    
    // Open SMS app with pre-filled message
    const message = `Hello from BroomTech! I'm your delivery driver for order #${task.value.id.substring(0, 8)}. I'll be delivering your order soon.`;
    window.open(`sms:${task.value.userPhone}?body=${encodeURIComponent(message)}`, '_blank');
  };
  
  onMounted(() => {
    fetchTask();
  });
  
  onUnmounted(() => {
    // Clean up map
    if (map.value) {
      map.value.remove();
    }
    
    // Clear location tracking interval
    if (locationUpdateInterval.value) {
      clearInterval(locationUpdateInterval.value);
    }
  });
  </script>
  
  