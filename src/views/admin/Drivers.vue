<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">Driver Applications</h1>
          <p class="mt-2 max-w-xl text-green-50">Review and manage driver applications for your delivery service</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {{ drivers.length }} Applications
          </span>
        </div>
      </div>
    </div>
    
    <!-- Search and Filter -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="relative flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search drivers..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div>
          <select 
            v-model="statusFilter" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Driver Applications List -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 class="text-lg leading-6 font-medium text-gray-900">Driver Applications</h2>
        <span class="inline-flex items-center rounded-full bg-grab-green-light px-2.5 py-0.5 text-xs font-medium text-grab-green">
          {{ totalDrivers }} Total
        </span>
      </div>
      
      <div class="border-t border-gray-200">
        <!-- Loading State -->
        <div v-if="loading" class="px-4 py-12 text-center">
          <svg class="animate-spin h-8 w-8 mx-auto text-grab-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-2 text-sm text-gray-500">Loading driver applications...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="drivers.length === 0" class="px-4 py-12 text-center">
          <svg class="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <p class="mt-2 text-base font-medium text-gray-900">No driver applications</p>
          <p class="mt-1 text-sm text-gray-500">No driver applications have been submitted yet.</p>
        </div>
        
        <!-- Driver List -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-grab-green-light">
              <tr>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="relative px-4 sm:px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="driver in filteredDrivers" :key="driver.id" class="hover:bg-grab-green-light/30 transition-colors duration-150">
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-grab-green-light flex items-center justify-center">
                        <span class="text-grab-green font-medium text-sm">{{ getInitials(driver.fullName) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ driver.fullName }}
                      </div>
                      <div class="text-xs sm:text-sm text-gray-500">
                        ID: {{ driver.id.substring(0, 8) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ driver.email }}</div>
                  <div class="text-xs sm:text-sm text-gray-500">{{ driver.phoneNumber }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ driver.vehicleType || 'N/A' }}</div>
                  <div class="text-xs sm:text-sm text-gray-500">{{ driver.vehiclePlate || 'N/A' }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(driver.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ formatStatus(driver.status) }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {{ formatDate(driver.createdAt) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                  <button 
                    @click="viewDriverDetails(driver)" 
                    class="text-grab-green hover:text-grab-green-dark transition-colors duration-150"
                  >
                    View Details
                  </button>
                </td>
              </tr>
              
              <!-- No Results -->
              <tr v-if="filteredDrivers.length === 0">
                <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                  <p class="text-sm">No drivers found matching your criteria.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalDrivers > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages" 
              class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ paginationStart }}</span>
                to
                <span class="font-medium">{{ paginationEnd }}</span>
                of
                <span class="font-medium">{{ totalDrivers }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg 
                    class="h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                      clip-rule="evenodd" 
                    />
                  </svg>
                </button>
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    page === currentPage ? 'z-10 bg-grab-green-light border-grab-green text-grab-green' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Driver Details Modal -->
    <div v-if="selectedDriver" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Driver Application Details</h3>
                  <div class="flex space-x-2">
                    <button
                      v-if="selectedDriver.status === 'pending'"
                      @click="updateDriverStatus('approved')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                    >
                      Approve
                    </button>
                    <button
                      v-if="selectedDriver.status === 'pending'"
                      @click="updateDriverStatus('rejected')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-150"
                    >
                      Reject
                    </button>
                    <button
                      v-if="selectedDriver.status === 'rejected'"
                      @click="updateDriverStatus('approved')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                    >
                      Approve
                    </button>
                    <button
                      v-if="selectedDriver.status === 'approved'"
                      @click="updateDriverStatus('rejected')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-150"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Full name</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.fullName }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Email address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.email }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Phone number</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.phoneNumber }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.address }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle type</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.vehicleType || 'N/A' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle model</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.vehicleModel || 'N/A' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">License plate</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.vehiclePlate || 'N/A' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Driver's license</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.licenseNumber || 'N/A' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Status</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span :class="getStatusBadgeClass(selectedDriver.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                          {{ formatStatus(selectedDriver.status) }}
                        </span>
                      </dd>
                    </div>
                    <div v-if="selectedDriver.availableDays" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Available Days</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="flex flex-wrap gap-2">
                          <span v-for="(value, day) in selectedDriver.availableDays" :key="day" 
                                v-if="value" 
                                class="px-2 py-1 bg-grab-green-light rounded-md text-xs">
                            {{ day.charAt(0).toUpperCase() + day.slice(1) }}
                          </span>
                        </div>
                      </dd>
                    </div>
                    <div v-if="selectedDriver.availability" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Availability</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatAvailability(selectedDriver.availability) }}
                      </dd>
                    </div>
                    <div v-if="selectedDriver.startTime && selectedDriver.endTime" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Working Hours</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatTime(selectedDriver.startTime) }} - {{ formatTime(selectedDriver.endTime) }}
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">License Photo</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="getLicensePhoto(selectedDriver)"
                            alt="License"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle Photo</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="getVehiclePhoto(selectedDriver)"
                            alt="Vehicle"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Application Date</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ selectedDriver.createdAt ? formatDate(selectedDriver.createdAt) : 'N/A' }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { collection, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDriverStore } from '../../stores/driver';

const driverStore = useDriverStore();
const drivers = ref([]);
const selectedDriver = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
let unsubscribe = null;
const loading = ref(false);
const error = ref(null);

// Format date from Firestore timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  // Handle Firestore timestamp objects
  const date = timestamp instanceof Timestamp 
    ? timestamp.toDate() 
    : new Date(timestamp);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format time (HH:MM)
const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // If already in HH:MM format, return as is
  if (timeString.includes(':')) {
    return timeString;
  }
  
  // Otherwise, assume it's a 24-hour format and convert
  try {
    const date = new Date();
    const [hours, minutes] = timeString.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return timeString;
  }
};

// Format availability string
const formatAvailability = (availability) => {
  if (!availability) return 'Not specified';
  
  // Convert kebab-case or snake_case to readable format
  return availability
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get license photo URL
const getLicensePhoto = (driver) => {
  // Check for different possible sources of license photo
  if (driver.licenseURL) {
    return driver.licenseURL;
  } else if (driver.licensePhotoBase64) {
    return driver.licensePhotoBase64;
  } else {
    return 'https://via.placeholder.com/300?text=License+Photo';
  }
};

// Get vehicle photo URL
const getVehiclePhoto = (driver) => {
  // Check for different possible sources of vehicle photo
  if (driver.vehicleURL) {
    return driver.vehicleURL;
  } else if (driver.vehiclePhotoBase64) {
    return driver.vehiclePhotoBase64;
  } else {
    return 'https://via.placeholder.com/300?text=Vehicle+Photo';
  }
};

// Format status text
const formatStatus = (status) => {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Get status badge class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get initials from name
const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

// Fetch drivers from Firestore with real-time updates
const setupDriversListener = () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Use the correct collection: "driver-applications"
    const driversQuery = query(
      collection(db, "driver-applications"),
      orderBy('createdAt', 'desc')
    );
    
    unsubscribe = onSnapshot(driversQuery, (snapshot) => {
      const driversList = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        driversList.push({
          id: doc.id,
          ...data,
          // Set default status if not present
          status: data.status || 'pending'
        });
      });
      
      drivers.value = driversList;
      loading.value = false;
    }, (err) => {
      console.error('Error in drivers listener:', err);
      error.value = 'Failed to load driver applications';
      loading.value = false;
    });
  } catch (err) {
    console.error('Error setting up drivers listener:', err);
    error.value = 'Failed to set up driver applications listener';
    loading.value = false;
  }
};

// Alternative method using the store
const fetchDriverApplications = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const applications = await driverStore.getDriverApplications();
    drivers.value = applications;
    loading.value = false;
  } catch (err) {
    console.error('Error fetching driver applications:', err);
    error.value = 'Failed to fetch driver applications';
    loading.value = false;
  }
};

// Filter drivers based on search query and status
const filteredDrivers = computed(() => {
  let filtered = drivers.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(driver => 
      (driver.fullName && driver.fullName.toLowerCase().includes(query)) || 
      (driver.email && driver.email.toLowerCase().includes(query)) ||
      (driver.phoneNumber && driver.phoneNumber.includes(query)) ||
      (driver.vehiclePlate && driver.vehiclePlate.toLowerCase().includes(query))
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(driver => driver.status === statusFilter.value);
  }

  // Apply pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filtered.slice(startIndex, endIndex);
});

// Total number of drivers after filtering
const totalDrivers = computed(() => {
  let filtered = drivers.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(driver => 
      (driver.fullName && driver.fullName.toLowerCase().includes(query)) || 
      (driver.email && driver.email.toLowerCase().includes(query)) ||
      (driver.phoneNumber && driver.phoneNumber.includes(query)) ||
      (driver.vehiclePlate && driver.vehiclePlate.toLowerCase().includes(query))
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(driver => driver.status === statusFilter.value);
  }

  return filtered.length;
});

// Calculate total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(totalDrivers.value / itemsPerPage) || 1;
});

// Calculate displayed pages for pagination
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 7) {
    // If 7 or fewer pages, show all
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    // Show dots if current page is more than 3
    if (current > 3) {
      pages.push('...');
    }
    
    // Show pages around current page
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Show dots if current page is less than total - 2
    if (current < total - 2) {
      pages.push('...');
    }
    
    // Always show last page
    pages.push(total);
  }

  return pages;
});

// Calculate pagination start and end
const paginationStart = computed(() => {
  return totalDrivers.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, totalDrivers.value);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page;
  }
};

// View driver details
const viewDriverDetails = (driver) => {
  selectedDriver.value = driver;
};

// Close modal
const closeModal = () => {
  selectedDriver.value = null;
};

// Update driver status
const updateDriverStatus = async (status) => {
  try {
    if (status === 'rejected' && selectedDriver.value.status === 'pending') {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "driver-applications", selectedDriver.value.id));
      
      // Remove from local array
      const index = drivers.value.findIndex(d => d.id === selectedDriver.value.id);
      if (index !== -1) {
        drivers.value.splice(index, 1);
      }
      
      // Close the modal
      selectedDriver.value = null;
      
      alert('Driver application has been rejected and removed');
    } else {
      // Use the driver store to update status
      await driverStore.updateDriverApplicationStatus(selectedDriver.value.id, status);
      
      // Update local state
      selectedDriver.value.status = status;
      
      // Update in the drivers array
      const index = drivers.value.findIndex(d => d.id === selectedDriver.value.id);
      if (index !== -1) {
        drivers.value[index].status = status;
      }
      
      alert(`Driver status updated to ${status}`);
    }
  } catch (error) {
    console.error('Error updating driver status:', error);
    alert('Failed to update driver status');
  }
};

onMounted(() => {
  // Choose one of these methods:
  setupDriversListener(); // Real-time updates
  // fetchDriverApplications(); // One-time fetch using store
});

onUnmounted(() => {
  // Clean up the listener when component is unmounted
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style>
:root {
  --grab-green: #00B14F;
  --grab-green-dark: #009a44;
  --grab-green-light: #e6f7ee;
}

.bg-grab-green {
  background-color: var(--grab-green);
}

.bg-grab-green-dark {
  background-color: var(--grab-green-dark);
}

.bg-grab-green-light {
  background-color: var(--grab-green-light);
}

.text-grab-green {
  color: var(--grab-green);
}

.border-grab-green {
  border-color: var(--grab-green);
}

.focus\:ring-grab-green:focus {
  --tw-ring-color: var(--grab-green);
}

.hover\:bg-grab-green-dark:hover {
  background-color: var(--grab-green-dark);
}

/* Animation for skeleton loaders */
@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Ensure text doesn't overflow on small screens */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Improve touch targets on mobile */
@media (max-width: 640px) {
  button, 
  a[role="button"] {
    min-height: 2.5rem;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
}
</style>