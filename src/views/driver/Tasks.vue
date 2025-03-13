<template>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-gray-900">My Tasks</h1>
          <div class="flex space-x-2">
            <select 
              v-model="statusFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="all">All Tasks</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6">
          <div v-if="loading" class="flex justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          
          <div v-else>
            <!-- Tasks List -->
            <div v-if="filteredTasks.length === 0" class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:p-6 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ statusFilter === 'all' ? 'You don\'t have any tasks at the moment.' : `You don't have any ${statusFilter} tasks.` }}
                </p>
              </div>
            </div>
            
            <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul class="divide-y divide-gray-200">
                <li v-for="task in filteredTasks" :key="task.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <p class="text-sm font-medium text-primary-600 truncate">
                            {{ task.service }}
                          </p>
                          <div class="ml-2 flex-shrink-0 flex">
                            <p :class="[
                              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                              statusClasses[task.status] || 'bg-gray-100 text-gray-800'
                            ]">
                              {{ formatStatus(task.status) }}
                            </p>
                          </div>
                        </div>
                        <div class="ml-2 flex-shrink-0 flex">
                          <p class="text-sm text-gray-500">
                            ₱{{ task.driverPayout ? task.driverPayout.toFixed(2) : (task.totalAmount * 0.8).toFixed(2) }}
                          </p>
                        </div>
                      </div>
                      
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p class="flex items-center text-sm text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                            {{ truncateText(task.dropLocation, 30) }}
                          </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                          </svg>
                          <p>
                            {{ formatDate(task.createdAt) }}
                          </p>
                        </div>
                      </div>
                      
                      <!-- Task Details -->
                      <div class="mt-4 border-t border-gray-200 pt-4">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <h4 class="text-sm font-medium text-gray-500">Pickup Location</h4>
                            <p class="mt-1 text-sm text-gray-900">{{ task.pickupLocation }}</p>
                          </div>
                          <div>
                            <h4 class="text-sm font-medium text-gray-500">Delivery Location</h4>
                            <p class="mt-1 text-sm text-gray-900">{{ task.dropLocation }}</p>
                          </div>
                        </div>
                        
                        <div class="mt-4">
                          <h4 class="text-sm font-medium text-gray-500">Order Details</h4>
                          <p class="mt-1 text-sm text-gray-900">{{ task.details }}</p>
                        </div>
                        
                        <div class="mt-4">
                          <h4 class="text-sm font-medium text-gray-500">Customer</h4>
                          <p class="mt-1 text-sm text-gray-900">{{ task.userName }} ({{ task.userPhone }})</p>
                        </div>
                        
                        <!-- Task Actions -->
                        <div class="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                          <!-- Status Update Buttons -->
                          <button 
                            v-if="task.status === 'assigned'"
                            @click="updateTaskStatus(task.id, 'in_progress')"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Start Delivery
                          </button>
                          
                          <button 
                            v-if="task.status === 'in_progress'"
                            @click="updateTaskStatus(task.id, 'completed')"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Complete Delivery
                          </button>
                          
                          <!-- Navigation Button -->
                          <button 
                            v-if="['assigned', 'in_progress'].includes(task.status)"
                            @click="navigateToTask(task)"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Navigate
                          </button>
                          
                          <!-- Call Customer Button -->
                          <a 
                            v-if="['assigned', 'in_progress'].includes(task.status)"
                            :href="`tel:${task.userPhone}`"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <svg class="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Customer
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    
    <script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useDriverStore } from '../../stores/driver';
    import { useCurrentLocation } from '../../utils/tracking';
    
    const route = useRoute();
    const driverStore = useDriverStore();
    const { currentLocation, getCurrentLocation } = useCurrentLocation();
    
    const loading = ref(true);
    const tasks = ref([]);
    const statusFilter = ref('all');
    
    const statusClasses = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'assigned': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-indigo-100 text-indigo-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    
    const filteredTasks = computed(() => {
      if (statusFilter.value === 'all') {
        return tasks.value;
      }
      return tasks.value.filter(task => task.status === statusFilter.value);
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
    
    const truncateText = (text, maxLength) => {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    
    const fetchTasks = async () => {
      loading.value = true;
    
      try {
        await driverStore.getDriverTasks();
        tasks.value = driverStore.tasks;
        
        // Check if there's a status filter in the URL
        if (route.query.status && ['assigned', 'in_progress', 'completed', 'cancelled'].includes(route.query.status)) {
          statusFilter.value = route.query.status;
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        window.$notification?.error('Error', 'Failed to load tasks');
      } finally {
        loading.value = false;
      }
    };
    
    const updateTaskStatus = async (taskId, status) => {
      try {
        // Get current location
        await getCurrentLocation();
        
        if (!currentLocation.value) {
          window.$notification?.error('Error', 'Unable to get your current location. Please enable location services and try again.');
          return;
        }
        
        await driverStore.updateTaskStatus(taskId, status, currentLocation.value);
        
        // Update local task status
        const taskIndex = tasks.value.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          tasks.value[taskIndex].status = status;
        }
        
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
    
    const navigateToTask = (task) => {
      // Check if the Geolocation API is available
      if (!navigator.geolocation) {
        window.$notification?.error('Error', 'Geolocation is not supported by your browser');
        return;
      }
      
      // Get current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Determine destination based on task status
          let destination = '';
          if (task.status === 'assigned') {
            // Navigate to pickup location
            destination = encodeURIComponent(task.pickupLocation);
          } else {
            // Navigate to delivery location
            destination = encodeURIComponent(task.dropLocation);
          }
          
          // Open in Google Maps
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
          window.$notification?.error('Error', 'Unable to get your current location. Please enable location services and try again.');
        }
      );
    };
    
    onMounted(() => {
      fetchTasks();
    });
    </script>
    
    