<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">Booking Management</h1>
          <p class="mt-2 max-w-xl text-green-50">Manage and track all customer bookings in one place</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {{ bookings.length }} Total Bookings
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
            placeholder="Search bookings..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <select 
            v-model="statusFilter" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            v-model="paymentFilter" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Bookings Table -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-grab-green-light">
            <tr>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Booking
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Service
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in paginatedBookings" :key="booking.id" class="hover:bg-grab-green-light/30 transition-colors duration-150">
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ booking.id.substring(0, 8) }}</div>
                <div class="text-xs sm:text-sm text-gray-500">{{ formatDate(booking.createdAt) }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ booking.customerName }}</div>
                <div class="text-xs sm:text-sm text-gray-500">{{ booking.customerPhone }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ booking.serviceType }}</div>
                <div class="text-xs sm:text-sm text-gray-500">₱{{ booking.totalAmount.toLocaleString() }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(booking.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatus(booking.status) }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <span :class="getPaymentBadgeClass(booking.paymentStatus)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatPaymentStatus(booking.paymentStatus) }}
                </span>
                <div class="text-xs text-gray-500 mt-1">{{ booking.paymentMethod }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap gap-2">
                  <button @click="viewBooking(booking)" class="text-grab-green hover:text-grab-green-dark transition-colors duration-150">
                    View
                  </button>
                  <button 
                    v-if="booking.status === 'pending' && !booking.driverId" 
                    @click="assignDriver(booking)" 
                    class="text-grab-green hover:text-grab-green-dark transition-colors duration-150"
                  >
                    Assign
                  </button>
                  <button 
                    v-if="booking.paymentStatus === 'unpaid' && booking.paymentMethod !== 'cod'" 
                    @click="verifyPayment(booking)" 
                    class="text-grab-green hover:text-grab-green-dark transition-colors duration-150"
                  >
                    Verify
                  </button>
                  <button 
                    v-if="booking.status !== 'cancelled' && booking.status !== 'completed'" 
                    @click="cancelBooking(booking)" 
                    class="text-rose-600 hover:text-rose-800 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty state -->
            <tr v-if="paginatedBookings.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-grab-green-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="mt-2 text-sm sm:text-base">No bookings found matching your criteria.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalBookings) }}</span>
              of
              <span class="font-medium">{{ totalBookings }}</span>
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
    
    <!-- Booking Detail Modal -->
    <div v-if="selectedBooking" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeBookingDetail">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Booking Details
                </h3>
                
                <div class="mb-6">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="text-xl font-bold text-grab-green">Order #{{ selectedBooking.id.substring(0, 8) }}</h4>
                    <span :class="getStatusBadgeClass(selectedBooking.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ formatStatus(selectedBooking.status) }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm">{{ formatDate(selectedBooking.createdAt) }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Customer</p>
                    <p class="font-medium text-sm sm:text-base truncate">{{ selectedBooking.customerName }}</p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Phone</p>
                    <p class="font-medium text-sm sm:text-base truncate">{{ selectedBooking.customerPhone }}</p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Service Type</p>
                    <p class="font-medium text-sm sm:text-base truncate">{{ selectedBooking.serviceType }}</p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Total Amount</p>
                    <p class="font-medium text-sm sm:text-base">₱{{ selectedBooking.totalAmount.toLocaleString() }}</p>
                  </div>
                </div>
                
                <div class="mb-6">
                  <p class="text-xs sm:text-sm text-gray-500 mb-1">Pickup Address</p>
                  <p class="font-medium text-sm sm:text-base">{{ selectedBooking.pickupAddress }}</p>
                </div>
                
                <div class="mb-6">
                  <p class="text-xs sm:text-sm text-gray-500 mb-1">Delivery Address</p>
                  <p class="font-medium text-sm sm:text-base">{{ selectedBooking.deliveryAddress }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Payment Method</p>
                    <p class="font-medium text-sm sm:text-base">{{ selectedBooking.paymentMethod }}</p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm text-gray-500">Payment Status</p>
                    <span :class="getPaymentBadgeClass(selectedBooking.paymentStatus)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ formatPaymentStatus(selectedBooking.paymentStatus) }}
                    </span>
                  </div>
                </div>
                
                <!-- Payment Proof Image -->
                <div v-if="selectedBooking.proofOfPayment || selectedBooking.paymentProofImage" class="mb-6">
                  <p class="text-xs sm:text-sm text-gray-500 mb-2">Payment Proof</p>
                  <div class="border rounded-lg overflow-hidden">
                    <img 
                      :src="selectedBooking.paymentProofImage || selectedBooking.proofOfPayment" 
                      alt="Payment Proof" 
                      class="w-full h-auto max-h-48 sm:max-h-64 object-contain"
                      @click="openFullImage(selectedBooking.paymentProofImage || selectedBooking.proofOfPayment)"
                    />
                  </div>
                  <p class="text-xs text-gray-500 mt-1 text-center">Click on image to view full size</p>
                </div>
                
                <div v-if="selectedBooking.driverId" class="mb-6">
                  <p class="text-xs sm:text-sm text-gray-500 mb-1">Assigned Driver</p>
                  <div class="flex items-center">
                    <img class="h-8 w-8 rounded-full mr-2" :src="selectedBooking.driverPhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedBooking.driverName) + '&background=random'" alt="" />
                    <div>
                      <p class="font-medium text-sm sm:text-base">{{ selectedBooking.driverName }}</p>
                      <p class="text-xs sm:text-sm text-gray-500">{{ selectedBooking.driverPhone }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="closeBookingDetail" 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
            <button 
              v-if="selectedBooking.status === 'pending' && !selectedBooking.driverId" 
              @click="assignDriver(selectedBooking)" 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Assign Driver
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Full Image Modal -->
    <div v-if="fullImageUrl" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeFullImage">
          <div class="absolute inset-0 bg-black opacity-90"></div>
        </div>
        
        <div class="relative max-w-4xl w-full">
          <button 
            @click="closeFullImage" 
            class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img :src="fullImageUrl" alt="Payment Proof" class="w-full h-auto max-h-[80vh] object-contain" />
        </div>
      </div>
    </div>
    
    <!-- Assign Driver Modal -->
    <div v-if="showAssignDriverModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeAssignDriverModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Assign Driver to Booking #{{ bookingToAssign?.id.substring(0, 8) }}
                </h3>
                
                <div class="mb-4">
                  <label for="driver-search" class="block text-sm font-medium text-gray-700 mb-1">
                    Search for a driver
                  </label>
                  <div class="relative">
                    <input
                      id="driver-search"
                      type="text"
                      v-model="driverSearchQuery"
                      placeholder="Search by name or phone..."
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
                    />
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="max-h-60 overflow-y-auto mb-4">
                  <div v-if="filteredDrivers.length === 0" class="text-center py-4 text-gray-500">
                    No drivers found matching your search.
                  </div>
                  
                  <div v-else>
                    <div
                      v-for="driver in filteredDrivers"
                      :key="driver.id"
                      @click="selectDriver(driver)"
                      :class="[
                        'flex items-center p-3 rounded-lg cursor-pointer transition-colors',
                        selectedDriver?.id === driver.id ? 'bg-grab-green-light border border-grab-green' : 'hover:bg-gray-50'
                      ]"
                    >
                      <img class="h-10 w-10 rounded-full mr-3" :src="driver.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(driver.displayName) + '&background=random'" alt="" />
                      <div class="flex-1">
                        <div class="font-medium text-gray-900">{{ driver.displayName }}</div>
                        <div class="text-sm text-gray-500">{{ driver.phone }}</div>
                      </div>
                      <div class="text-right text-sm">
                        <div class="font-medium text-gray-900">{{ driver.stats?.completedDeliveries || 0 }} deliveries</div>
                        <div class="text-sm text-gray-500">{{ driver.stats?.rating || 'N/A' }}/5 rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="confirmAssignDriver" 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="!selectedDriver"
              :class="{'opacity-50 cursor-not-allowed': !selectedDriver}"
            >
              <span v-if="isAssigning" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Assigning...
              </span>
              <span v-else>Assign Driver</span>
            </button>
            <button 
              @click="closeAssignDriverModal" 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc, getDoc, query, where, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

// Booking data
const bookings = ref([]);
const selectedBooking = ref(null);
const fullImageUrl = ref(null);

// Filters
const searchQuery = ref('');
const statusFilter = ref('all');
const paymentFilter = ref('all');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Driver assignment
const showAssignDriverModal = ref(false);
const bookingToAssign = ref(null);
const drivers = ref([]);
const driverSearchQuery = ref('');
const selectedDriver = ref(null);
const isAssigning = ref(false);

// List of payment methods that should be automatically marked as paid
const autoPaymentMethods = ['gcash', 'gotyme', 'paymaya'];

// Fetch payment proof directly
const fetchPaymentProof = async (bookingId) => {
  try {
    // Try different possible locations for the payment proof
    
    // 1. Check in the bookings collection for proofOfPayment field
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists() && bookingDoc.data().proofOfPayment) {
      return bookingDoc.data().proofOfPayment;
    }
    
    // 2. Check in a payments collection using the booking ID
    const paymentRef = doc(db, 'payments', bookingId);
    const paymentDoc = await getDoc(paymentRef);
    
    if (paymentDoc.exists() && paymentDoc.data().imageUrl) {
      return paymentDoc.data().imageUrl;
    }
    
    // 3. Check if there's a payments subcollection in the booking document
    const paymentsCollectionRef = collection(db, 'bookings', bookingId, 'payments');
    const paymentsSnapshot = await getDocs(paymentsCollectionRef);
    
    if (!paymentsSnapshot.empty) {
      const paymentData = paymentsSnapshot.docs[0].data();
      if (paymentData.imageUrl || paymentData.proofOfPayment) {
        return paymentData.imageUrl || paymentData.proofOfPayment;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching payment proof:', error);
    return null;
  }
};

// Load data on component mount
onMounted(async () => {
  try {
    // Load bookings
    const bookingsQuery = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const bookingsSnapshot = await getDocs(bookingsQuery);
    const bookingsData = [];
    
    for (const doc of bookingsSnapshot.docs) {
      const bookingData = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      };
      
      // Auto-mark payments as paid for specific payment methods
      if (autoPaymentMethods.includes(bookingData.paymentMethod?.toLowerCase())) {
        if (bookingData.paymentStatus === 'unpaid' || !bookingData.paymentStatus) {
          updateBookingPaymentStatus(doc.id);
          bookingData.paymentStatus = 'paid';
        }
      }
      
      // If the booking is marked as paid but doesn't have a payment proof image,
      // try to fetch it
      if ((bookingData.paymentStatus === 'paid' || bookingData.isPaid === true) && 
          !bookingData.paymentProofImage && !bookingData.proofOfPayment) {
        const proofImage = await fetchPaymentProof(doc.id);
        if (proofImage) {
          bookingData.proofOfPayment = proofImage;
        }
      }
      
      bookingsData.push(bookingData);
    }
    
    bookings.value = bookingsData;
    
    // Load drivers
    const driversQuery = query(
      collection(db, 'users'),
      where('role', '==', 'driver'),
      where('status', '==', 'active')
    );
    const driversSnapshot = await getDocs(driversQuery);
    const driversData = [];
    
    driversSnapshot.forEach(doc => {
      driversData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    drivers.value = driversData;
  } catch (error) {
    console.error('Error loading data:', error);
  }
});

// Function to update payment status in Firestore
const updateBookingPaymentStatus = async (bookingId) => {
  try {
    await updateDoc(doc(db, 'bookings', bookingId), {
      paymentStatus: 'paid',
      paymentVerifiedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
  }
};

// Filtered bookings
const filteredBookings = computed(() => {
  let result = bookings.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(booking => 
      booking.id.toLowerCase().includes(query) ||
      booking.customerName?.toLowerCase().includes(query) ||
      booking.customerPhone?.toLowerCase().includes(query) ||
      booking.serviceType?.toLowerCase().includes(query)
    );
  }
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(booking => booking.status === statusFilter.value);
  }
  
  // Apply payment filter
  if (paymentFilter.value !== 'all') {
    if (paymentFilter.value === 'cod') {
      result = result.filter(booking => booking.paymentMethod === 'cod');
    } else {
      result = result.filter(booking => booking.paymentStatus === paymentFilter.value);
    }
  }
  
  return result;
});

// Filtered drivers
const filteredDrivers = computed(() => {
  if (!driverSearchQuery.value) return drivers.value;
  
  const query = driverSearchQuery.value.toLowerCase();
  return drivers.value.filter(driver => 
    driver.displayName?.toLowerCase().includes(query) ||
    driver.phone?.toLowerCase().includes(query)
  );
});

// Pagination computed properties
const totalBookings = computed(() => filteredBookings.value.length);
const totalPages = computed(() => Math.ceil(totalBookings.value / itemsPerPage));
const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBookings.value.slice(start, end);
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

// Pagination methods
const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Image handling
const openFullImage = (imageUrl) => {
  fullImageUrl.value = imageUrl;
};

const closeFullImage = () => {
  fullImageUrl.value = null;
};

// Booking actions
const viewBooking = async (booking) => {
  try {
    // Create a copy of the booking to avoid modifying the original data directly
    const bookingCopy = { ...booking };
    
    // Check for different ways the payment proof might be stored
    if (!bookingCopy.paymentProofImage) {
      // Check for proofOfPayment field
      if (bookingCopy.proofOfPayment) {
        // If it's already a URL, use it directly
        if (typeof bookingCopy.proofOfPayment === 'string' && 
            (bookingCopy.proofOfPayment.startsWith('http') || 
             bookingCopy.proofOfPayment.startsWith('data:'))) {
          bookingCopy.paymentProofImage = bookingCopy.proofOfPayment;
        } 
        // If it's a reference to another document
        else if (typeof bookingCopy.proofOfPayment === 'string') {
          try {
            // First try as a direct path in payments collection
            const paymentRef = doc(db, 'payments', bookingCopy.proofOfPayment);
            const paymentDoc = await getDoc(paymentRef);
            
            if (paymentDoc.exists() && paymentDoc.data().imageUrl) {
              bookingCopy.paymentProofImage = paymentDoc.data().imageUrl;
            }
          } catch (error) {
            console.error('Error fetching from payments collection:', error);
            // If that fails, try using the proofOfPayment as a direct path
            bookingCopy.paymentProofImage = bookingCopy.proofOfPayment;
          }
        }
      }
      
      // Check for paymentProofRef field
      else if (bookingCopy.paymentProofRef) {
        const paymentRef = doc(db, 'payments', bookingCopy.paymentProofRef);
        const paymentDoc = await getDoc(paymentRef);
        
        if (paymentDoc.exists() && paymentDoc.data().imageUrl) {
          bookingCopy.paymentProofImage = paymentDoc.data().imageUrl;
        }
      }
      
      // Check for isPaid and proofOfPayment fields
      else if (bookingCopy.isPaid === true && !bookingCopy.paymentProofImage) {
        // Try to fetch the payment document using the booking ID
        try {
          const paymentRef = doc(db, 'payments', bookingCopy.id);
          const paymentDoc = await getDoc(paymentRef);
          
          if (paymentDoc.exists() && paymentDoc.data().imageUrl) {
            bookingCopy.paymentProofImage = paymentDoc.data().imageUrl;
          }
        } catch (error) {
          console.error('Error fetching payment by booking ID:', error);
        }
      }
    }
    
    // Set the selected booking to our modified copy
    selectedBooking.value = bookingCopy;
  } catch (error) {
    console.error('Error fetching payment proof:', error);
    // Still show the booking even if there's an error fetching the payment proof
    selectedBooking.value = booking;
  }
};

const closeBookingDetail = () => {
  selectedBooking.value = null;
};

const assignDriver = (booking) => {
  bookingToAssign.value = booking;
  showAssignDriverModal.value = true;
  driverSearchQuery.value = '';
  selectedDriver.value = null;
};

const selectDriver = (driver) => {
  selectedDriver.value = driver;
};

const closeAssignDriverModal = () => {
  showAssignDriverModal.value = false;
  bookingToAssign.value = null;
  selectedDriver.value = null;
};

const confirmAssignDriver = async () => {
  if (!selectedDriver.value || !bookingToAssign.value) return;
  
  isAssigning.value = true;
  
  try {
    // Update booking with driver info
    await updateDoc(doc(db, 'bookings', bookingToAssign.value.id), {
      driverId: selectedDriver.value.id,
      driverName: selectedDriver.value.displayName,
      driverPhone: selectedDriver.value.phone,
      driverPhoto: selectedDriver.value.photoURL,
      status: 'assigned',
      assignedAt: new Date()
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Driver Assignment',
      details: `Driver ${selectedDriver.value.displayName} assigned to booking #${bookingToAssign.value.id.substring(0, 8)}`,
      bookingId: bookingToAssign.value.id,
      driverId: selectedDriver.value.id,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    // Update local state
    const index = bookings.value.findIndex(b => b.id === bookingToAssign.value.id);
    if (index !== -1) {
      bookings.value[index].driverId = selectedDriver.value.id;
      bookings.value[index].driverName = selectedDriver.value.displayName;
      bookings.value[index].driverPhone = selectedDriver.value.phone;
      bookings.value[index].driverPhoto = selectedDriver.value.photoURL;
      bookings.value[index].status = 'assigned';
      bookings.value[index].assignedAt = new Date();
    }
    
    // If the booking detail modal is open, update it too
    if (selectedBooking.value && selectedBooking.value.id === bookingToAssign.value.id) {
      selectedBooking.value.driverId = selectedDriver.value.id;
      selectedBooking.value.driverName = selectedDriver.value.displayName;
      selectedBooking.value.driverPhone = selectedDriver.value.phone;
      selectedBooking.value.driverPhoto = selectedDriver.value.photoURL;
      selectedBooking.value.status = 'assigned';
      selectedBooking.value.assignedAt = new Date();
    }
    
    alert(`Driver ${selectedDriver.value.displayName} has been assigned to booking #${bookingToAssign.value.id.substring(0, 8)}.`);
    closeAssignDriverModal();
  } catch (error) {
    console.error('Error assigning driver:', error);
    alert('Failed to assign driver. Please try again.');
  } finally {
    isAssigning.value = false;
  }
};

const verifyPayment = async (booking) => {
  try {
    await updateDoc(doc(db, 'bookings', booking.id), {
      paymentStatus: 'paid',
      paymentVerifiedAt: new Date()
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Verification',
      details: `Payment for booking #${booking.id.substring(0, 8)} was verified`,
      bookingId: booking.id,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    // Update local state
    const index = bookings.value.findIndex(b => b.id === booking.id);
    if (index !== -1) {
      bookings.value[index].paymentStatus = 'paid';
      bookings.value[index].paymentVerifiedAt = new Date();
    }
    
    // If the booking detail modal is open, update it too
    if (selectedBooking.value && selectedBooking.value.id === booking.id) {
      selectedBooking.value.paymentStatus = 'paid';
      selectedBooking.value.paymentVerifiedAt = new Date();
    }
    
    alert(`Payment for booking #${booking.id.substring(0, 8)} has been verified.`);
  } catch (error) {
    console.error('Error verifying payment:', error);
    alert('Failed to verify payment. Please try again.');
  }
};

const cancelBooking = async (booking) => {
  if (!confirm(`Are you sure you want to cancel booking #${booking.id.substring(0, 8)}?`)) return;
  
  try {
    await updateDoc(doc(db, 'bookings', booking.id), {
      status: 'cancelled',
      cancelledAt: new Date(),
      cancellationReason: 'Cancelled by admin'
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Booking Cancellation',
      details: `Booking #${booking.id.substring(0, 8)} was cancelled by admin`,
      bookingId: booking.id,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    // Update local state
    const index = bookings.value.findIndex(b => b.id === booking.id);
    if (index !== -1) {
      bookings.value[index].status = 'cancelled';
      bookings.value[index].cancelledAt = new Date();
      bookings.value[index].cancellationReason = 'Cancelled by admin';
    }
    
    // If the booking detail modal is open, update it too
    if (selectedBooking.value && selectedBooking.value.id === booking.id) {
      selectedBooking.value.status = 'cancelled';
      selectedBooking.value.cancelledAt = new Date();
      selectedBooking.value.cancellationReason = 'Cancelled by admin';
    }
    
    alert(`Booking #${booking.id.substring(0, 8)} has been cancelled.`);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    alert('Failed to cancel booking. Please try again.');
  }
};

// Helper functions
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString();
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'assigned':
      return 'Assigned';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const formatPaymentStatus = (status) => {
  if (!status) return 'Unknown';
  
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'unpaid':
      return 'Unpaid';
    case 'refunded':
      return 'Refunded';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'assigned':
      return 'bg-grab-green-light text-grab-green';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentBadgeClass = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'unpaid':
      return 'bg-yellow-100 text-yellow-800';
    case 'refunded':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
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

/* Responsive modal for very small screens */
@media (max-width: 360px) {
  .fixed.inset-0.z-50.flex.items-center.justify-center .max-w-lg {
    width: 95%;
    margin: 0 auto;
  }
}
</style>