<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Driver Profile</h1>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Driver Information</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and vehicle information.</p>
            </div>
            <span :class="[
              'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
              driverProfile.availability === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]">
              {{ driverProfile.availability === 'active' ? 'Available' : 'Unavailable' }}
            </span>
          </div>
          
          <div class="border-t border-gray-200">
            <dl>
              <!-- Personal Information -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ driverProfile.fullName }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">License number</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ driverProfile.licenseNumber }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">License expiry</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(driverProfile.licenseExpiry) }}</dd>
              </div>
              
              <!-- Vehicle Information -->
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Vehicle type</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatVehicleType(driverProfile.vehicleType) }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Vehicle plate</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ driverProfile.vehiclePlate }}</dd>
              </div>
              
              <!-- Documents -->
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Documents</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div class="w-0 flex-1 flex items-center">
                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3H8z" clip-rule="evenodd" />
                          <path d="M6 7a1 1 0 012 0v4a3 3 0 106 0V7a1 1 0 112 0v4a5 5 0 11-10 0V7z" />
                        </svg>
                        <span class="ml-2 flex-1 w-0 truncate">
                          Driver's License
                        </span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a :href="driverProfile.licenseUrl" target="_blank" class="font-medium text-primary-600 hover:text-primary-500">
                          View
                        </a>
                      </div>
                    </li>
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div class="w-0 flex-1 flex items-center">
                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3H8z" clip-rule="evenodd" />
                          <path d="M6 7a1 1 0 012 0v4a3 3 0 106 0V7a1 1 0 112 0v4a5 5 0 11-10 0V7z" />
                        </svg>
                        <span class="ml-2 flex-1 w-0 truncate">
                          Vehicle Photo
                        </span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a :href="driverProfile.vehicleUrl" target="_blank" class="font-medium text-primary-600 hover:text-primary-500">
                          View
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              
              <!-- Availability -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Availability</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="flex items-center">
                    <button 
                      @click="toggleAvailability"
                      :class="[
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                        isAvailable ? 'bg-primary-600' : 'bg-gray-200'
                      ]"
                    >
                      <span 
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          isAvailable ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      ></span>
                    </button>
                    <span class="ml-3 text-sm font-medium text-gray-900">
                      {{ isAvailable ? 'Available' : 'Unavailable' }}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Toggle your availability to receive delivery tasks.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <!-- Performance Stats -->
        <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Performance Statistics</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Your delivery performance metrics.</p>
          </div>
          
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Total deliveries</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ stats.totalDeliveries }}</dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Completed deliveries</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ stats.completedDeliveries }}</dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Completion rate</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ stats.completionRate }}%</dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Average delivery time</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ stats.avgDeliveryTime }} minutes</dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Total earnings</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ stats.totalEarnings.toFixed(2) }}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <!-- Account Settings -->
        <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Update your account information.</p>
          </div>
          
          <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form @submit.prevent="updateProfile">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone-number" 
                    v-model="profileData.phone"
                    required
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                  />
                </div>
                
                <div class="col-span-6 sm:col-span-3">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="profileData.email"
                    required
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                  />
                </div>
                
                <div class="col-span-6">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <textarea 
                    id="address" 
                    v-model="profileData.address"
                    required
                    rows="3" 
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div class="mt-6">
                <button 
                  type="submit"
                  :disabled="updating"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {{ updating ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useDriverStore } from '../../stores/driver';
  import { useAuthStore } from '../../stores/auth';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '../../firebase/config';
  
  const driverStore = useDriverStore();
  const authStore = useAuthStore();
  
  const loading = ref(true);
  const updating = ref(false);
  const driverProfile = ref({});
  const isAvailable = ref(false);
  
  const profileData = reactive({
    phone: '',
    email: '',
    address: ''
  });
  
  const stats = reactive({
    totalDeliveries: 0,
    completedDeliveries: 0,
    completionRate: 0,
    avgDeliveryTime: 0,
    totalEarnings: 0
  });
  
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    
    return date.toDate ? date.toDate().toLocaleDateString() : new Date(date).toLocaleDateString();
  };
  
  const formatVehicleType = (type) => {
    if (!type) return 'N/A';
    
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  const toggleAvailability = async () => {
    try {
      isAvailable.value = !isAvailable.value;
      await driverStore.updateDriverAvailability(isAvailable.value ? 'active' : 'inactive');
      
      // Update local driver profile
      driverProfile.value.availability = isAvailable.value ? 'active' : 'inactive';
      
      window.$notification?.success(
        'Status Updated', 
        isAvailable.value ? 'You are now available for tasks' : 'You are now unavailable for tasks'
      );
    } catch (error) {
      console.error('Error updating availability:', error);
      isAvailable.value = !isAvailable.value; // Revert on error
      window.$notification?.error('Error', 'Failed to update availability status');
    }
  };
  
  const fetchDriverProfile = async () => {
    loading.value = true;
  
    try {
      // Get driver profile
      const profile = await driverStore.getDriverProfile();
      
      if (!profile) {
        window.$notification?.error('Error', 'Driver profile not found');
        return;
      }
      
      driverProfile.value = profile;
      isAvailable.value = profile.availability === 'active';
      
      // Load user profile data
      if (authStore.userProfile) {
        profileData.phone = authStore.userProfile.phone || '';
        profileData.email = authStore.user?.email || '';
        profileData.address = authStore.userProfile.address || '';
      }
      
      // Fetch performance stats
      await fetchPerformanceStats();
    } catch (error) {
      console.error('Error fetching driver profile:', error);
      window.$notification?.error('Error', 'Failed to load driver profile');
    } finally {
      loading.value = false;
    }
  };
  
  const fetchPerformanceStats = async () => {
    try {
      // Get all tasks assigned to this driver
      const tasksQuery = query(
        collection(db, 'bookings'),
        where('driverId', '==', authStore.user.uid)
      );
      
      const tasksSnapshot = await getDocs(tasksQuery);
      
      // Calculate stats
      stats.totalDeliveries = tasksSnapshot.size;
      
      let completedTasks = 0;
      let totalDeliveryTime = 0;
      let totalEarnings = 0;
      
      tasksSnapshot.forEach(doc => {
        const task = doc.data();
        
        if (task.status === 'completed') {
          completedTasks++;
          totalEarnings += task.driverPayout || (task.totalAmount * 0.8);
          
          // Calculate delivery time if available
          if (task.completedAt && task.in_progressAt) {
            const startTime = task.in_progressAt.toDate();
            const endTime = task.completedAt.toDate();
            const deliveryTimeMinutes = (endTime - startTime) / (1000 * 60);
            totalDeliveryTime += deliveryTimeMinutes;
          }
        }
      });
      
      stats.completedDeliveries = completedTasks;
      stats.completionRate = stats.totalDeliveries > 0 
        ? Math.round((completedTasks / stats.totalDeliveries) * 100) 
        : 0;
      
      stats.avgDeliveryTime = completedTasks > 0 
        ? Math.round(totalDeliveryTime / completedTasks) 
        : 0;
      
      stats.totalEarnings = totalEarnings;
    } catch (error) {
      console.error('Error fetching performance stats:', error);
    }
  };
  
  const updateProfile = async () => {
    updating.value = true;
  
    try {
      await authStore.updateUserProfile({
        phone: profileData.phone,
        email: profileData.email,
        address: profileData.address
      });
      
      window.$notification?.success('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      window.$notification?.error('Error', 'Failed to update profile');
    } finally {
      updating.value = false;
    }
  };
  
  onMounted(() => {
    fetchDriverProfile();
  });
  </script>
  
  