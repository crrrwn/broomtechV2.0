<template>
  <div class="min-h-screen bg-white py-10">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-black mb-2">Order History</h1>
      <p class="text-green-600 mb-8 text-lg">Track and manage your service requests</p>
      
      <!-- Filters with enhanced design -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-full sm:w-48">
              <label for="status-filter" class="block text-sm font-semibold text-black mb-2">Filter by Status</label>
              <div class="relative">
                <select 
                  id="status-filter" 
                  v-model="statusFilter" 
                  class="w-full appearance-none rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-10 text-black shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full sm:w-48">
              <label for="date-filter" class="block text-sm font-semibold text-black mb-2">Filter by Date</label>
              <div class="relative">
                <select 
                  id="date-filter" 
                  v-model="dateFilter" 
                  class="w-full appearance-none rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-10 text-black shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full md:w-64">
            <label for="search-orders" class="block text-sm font-semibold text-black mb-2">Search Orders</label>
            <div class="relative">
              <input 
                id="search-orders"
                type="text" 
                v-model="searchQuery" 
                placeholder="Search orders..." 
                class="w-full rounded-lg border-gray-300 pl-10 pr-4 py-2.5 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
              />
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading indicator with enhanced design -->
      <div v-if="loading" class="flex flex-col items-center justify-center my-16">
        <svg class="animate-spin h-12 w-12 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-lg font-medium text-black">Loading your orders...</p>
      </div>
      
      <!-- Orders List with enhanced design -->
      <div v-else-if="filteredOrders.length > 0" class="space-y-6">
        <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
          <div class="p-5 border-b border-gray-200 bg-green-50">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex items-center">
                  <h3 class="text-xl font-bold text-black">Order #{{ order.id.substring(0, 8) }}</h3>
                  <span 
                    :class="{
                      'bg-green-100 text-green-800 border-green-200': order.status === 'completed',
                      'bg-red-100 text-red-800 border-red-200': order.status === 'cancelled',
                      'bg-blue-100 text-blue-800 border-blue-200': order.status === 'in_progress' || order.status === 'assigned',
                      'bg-yellow-100 text-yellow-800 border-yellow-200': order.status === 'pending' && (order.isPaid || order.paymentMethod === 'cash'),
                      'bg-orange-100 text-orange-800 border-orange-200': order.status === 'pending' && !order.isPaid && order.paymentMethod !== 'cash'
                    }"
                    class="ml-3 px-3 py-1 text-xs font-semibold rounded-full border"
                  >
                    {{ order.status === 'pending' && !order.isPaid && order.paymentMethod !== 'cash' ? 'Pending Payment' : formatStatus(order.status) }}
                  </span>
                </div>
                <p class="text-sm text-black mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(order.createdAt) }}
                </p>
              </div>
              <div class="mt-3 md:mt-0 flex items-center space-x-3">
                <button 
                  v-if="order.status === 'completed'"
                  @click="confirmDelete(order.id)" 
                  class="text-sm font-medium text-red-600 hover:text-red-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
                <button 
                  v-if="['pending', 'assigned', 'in_progress'].includes(order.status) && !order.isPaid && order.paymentMethod !== 'cash'"
                  @click="payNow(order)" 
                  class="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Pay Now
                </button>
                <button 
                  v-if="['pending', 'assigned', 'in_progress'].includes(order.status)"
                  @click="trackOrder(order)" 
                  class="text-sm font-medium text-green-600 hover:text-green-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Track Order
                </button>
                <button 
                  v-if="order.status === 'pending' && order.paymentMethod === 'cash' && !order.isPaid"
                  @click="confirmCashOrder(order.id)" 
                  class="text-sm font-medium text-orange-600 hover:text-orange-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Order
                </button>
                <!-- New button to view proof of payment -->
                <button 
                  v-if="order.proofOfPayment"
                  @click="viewProofOfPayment(order.proofOfPayment)" 
                  class="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Payment Proof
                </button>
              </div>
            </div>
          </div>
          <div class="p-5">
            <div class="flex flex-col md:flex-row md:justify-between gap-6">
              <div class="flex-1">
                <h4 class="font-semibold text-black text-lg mb-3 flex items-center">
                  <span class="w-1 h-5 bg-green-500 rounded-full mr-2"></span>
                  Service Details
                </h4>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center mb-3">
                    <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p class="text-base font-medium text-black">{{ order.service }}</p>
                  </div>
                  <div class="space-y-2 text-sm">
                    <div class="flex">
                      <div class="w-20 flex-shrink-0 font-medium text-green-600">From:</div>
                      <div class="text-black">{{ order.pickupLocation || 'N/A' }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-20 flex-shrink-0 font-medium text-green-600">To:</div>
                      <div class="text-black">{{ order.dropLocation || 'N/A' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:w-64">
                <h4 class="font-semibold text-black text-lg mb-3 flex items-center">
                  <span class="w-1 h-5 bg-green-500 rounded-full mr-2"></span>
                  Payment
                </h4>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center mb-3">
                    <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p class="text-base font-medium text-black">{{ order.paymentMethod || 'N/A' }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-2xl font-bold text-green-600">₱{{ (order.totalAmount || 0).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-5" v-if="order.driverId">
              <h4 class="font-semibold text-black text-lg mb-3 flex items-center">
                <span class="w-1 h-5 bg-green-500 rounded-full mr-2"></span>
                Driver
              </h4>
              <div class="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                  {{ (order.driverName || 'D').charAt(0) }}
                </div>
                <div class="ml-4">
                  <p class="text-base font-medium text-black">{{ order.driverName || 'Assigned Driver' }}</p>
                  <p class="text-sm text-black flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ order.driverPhone || 'No phone number' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State with enhanced design -->
      <div v-else class="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
        <div class="bg-green-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-black mb-2">No orders found</h3>
        <p class="text-base text-black max-w-md mx-auto mb-8">
          {{ searchQuery || statusFilter !== 'all' || dateFilter !== 'all' ? 'Try adjusting your filters or search criteria to see more results.' : 'You haven\'t placed any orders yet. Start by booking a service.' }}
        </p>
        <router-link to="/user/book-service" class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Book a Service
        </router-link>
      </div>
      
      <!-- Delete Confirmation Modal with enhanced design -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
          <div class="text-center mb-5">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Confirm Deletion</h3>
            <p class="text-black mb-6">
              Are you sure you want to delete this order from your history? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-center space-x-4">
            <button 
              @click="showDeleteModal = false" 
              class="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              @click="deleteOrder" 
              class="px-5 py-2.5 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Delete Order
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
      
      <!-- Payment Modal -->
      <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
          <div class="text-center mb-5">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Complete Your Payment</h3>
            <p class="text-black mb-6">
              Please complete your payment for order #{{ selectedOrder?.id.substring(0, 8) }}
            </p>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Payment Method:</span>
                <span class="font-medium">{{ selectedOrder?.paymentMethod }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Amount:</span>
                <span class="font-medium">₱{{ (selectedOrder?.totalAmount || 0).toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 class="font-medium text-left mb-2">Payment Instructions:</h4>
              <p class="text-left text-sm" v-if="paymentInstructions">
                <strong>Account Name:</strong> {{ paymentInstructions.accountName }}<br>
                <strong>Account Number:</strong> {{ paymentInstructions.accountNumber }}<br>
                <strong>Instructions:</strong> {{ paymentInstructions.instructions }}
              </p>
            </div>
            
            <div class="mb-4">
              <label class="block text-left text-sm font-medium text-gray-700 mb-2">
                Upload Payment Proof
              </label>
              <input 
                type="file" 
                @change="handleFileUpload" 
                accept="image/*"
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </div>
          <div class="flex justify-center space-x-4">
            <button 
              @click="closePaymentModal" 
              class="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              @click="submitPayment" 
              :disabled="!paymentFile || isSubmitting"
              class="px-5 py-2.5 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Submit Payment</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Confirm Cash Order Modal -->
      <div v-if="showConfirmCashModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
          <div class="text-center mb-5">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Confirm Cash on Delivery</h3>
            <p class="text-black mb-6">
              Are you sure you want to confirm this order? You will pay in cash when your order is delivered.
            </p>
          </div>
          <div class="flex justify-center space-x-4">
            <button 
              @click="showConfirmCashModal = false" 
              class="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              @click="processCashOrder" 
              :disabled="isSubmitting"
              class="px-5 py-2.5 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Processing...</span>
              <span v-else>Confirm</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Proof of Payment Modal -->
      <div v-if="showProofOfPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
          <div class="text-center mb-5">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Proof of Payment</h3>
            <p class="text-black mb-6">
              Your uploaded payment proof for this order.
            </p>
          </div>
          <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg mb-4">
            <img 
              :src="proofOfPaymentUrl" 
              alt="Proof of Payment" 
              class="max-w-full max-h-[300px] object-contain rounded-md"
            />
          </div>
          <div class="flex justify-center">
            <button 
              @click="showProofOfPaymentModal = false" 
              class="px-5 py-2.5 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// Fix the import path to match your project structure
import { auth, db, storage, analytics } from '../../firebase/config';
import { useAuthStore } from '../../stores/auth';
import { useBookingStore } from '../../stores/booking';
import TrackingModal from '../../components/tracking/TrackingModal.vue';
import { sendEmailNotification } from '../../utils/email';

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
const showPaymentModal = ref(false);
const showConfirmCashModal = ref(false);
const paymentFile = ref(null);
const isSubmitting = ref(false);
const paymentInstructions = ref(null);
const orderToConfirm = ref(null);
const showProofOfPaymentModal = ref(false);
const proofOfPaymentUrl = ref('');

// Use authStore from the store
const authStore = useAuthStore();

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
        totalAmount: Number(data.totalAmount) || 0,
        isPaid: data.isPaid || false // Ensure isPaid is a boolean
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

const payNow = (order) => {
  selectedOrder.value = order;
  paymentInstructions.value = getPaymentInstructions(order.paymentMethod);
  showPaymentModal.value = true;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
  selectedOrder.value = null;
  paymentFile.value = null;
};

const handleFileUpload = (event) => {
  paymentFile.value = event.target.files[0];
};

// Get payment instructions based on payment method
const getPaymentInstructions = (paymentMethod) => {
  switch (paymentMethod?.toLowerCase()) {
    case 'gcash':
      return {
        accountName: 'Service Provider',
        accountNumber: '09123456789',
        instructions: 'Please send the exact amount to the GCash number provided and upload a screenshot of the payment confirmation.'
      };
    case 'bank transfer':
      return {
        accountName: 'Service Provider Inc.',
        accountNumber: '1234-5678-9012-3456',
        instructions: 'Please transfer the exact amount to the bank account provided and upload a screenshot of the payment confirmation.'
      };
    default:
      return {
        accountName: 'Service Provider',
        accountNumber: '09123456789',
        instructions: 'Please send the payment using your preferred method and upload proof of payment.'
      };
  }
};

// Upload payment proof to Firebase Storage
const uploadPaymentProof = async (orderId, file) => {
  try {
    // Create a reference to the file in Firebase Storage
    const fileRef = storageRef(storage, `payment-proofs/${orderId}/${file.name}`);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw error;
  }
};

const submitPayment = async () => {
  if (!paymentFile.value || !selectedOrder.value) return;
  
  try {
    isSubmitting.value = true;
    console.log("Starting payment submission process");
    
    // Upload payment proof to Firebase Storage
    console.log("Uploading payment proof file:", paymentFile.value.name);
    const downloadURL = await uploadPaymentProof(selectedOrder.value.id, paymentFile.value);
    
    console.log("File uploaded successfully, URL:", downloadURL);
    
    if (!downloadURL) {
      throw new Error("Failed to upload payment proof");
    }
    
    // Update order with payment proof URL
    console.log("Updating order payment status in Firestore");
    const orderRef = doc(db, "bookings", selectedOrder.value.id);
    await updateDoc(orderRef, {
      proofOfPayment: downloadURL,
      isPaid: true,
      paidAt: serverTimestamp()
    });
    
    console.log("Order payment status updated successfully");
    
    // Send email notification
    console.log("Sending confirmation email");
    await sendOrderConfirmationEmail(selectedOrder.value);
    
    console.log("Payment process completed successfully");
    
    // Close modal and refresh orders
    closePaymentModal();
    refreshOrders();
    
    // Show success message
    if (window.$notification) {
      window.$notification.success({
        title: 'Payment Submitted',
        message: 'Your payment proof has been uploaded successfully'
      });
    }
  } catch (error) {
    console.error("Error submitting payment:", error);
    if (window.$notification) {
      window.$notification.error({
        title: 'Error',
        message: 'Failed to upload payment proof: ' + error.message
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

// View proof of payment
const viewProofOfPayment = (proofUrl) => {
  proofOfPaymentUrl.value = proofUrl;
  showProofOfPaymentModal.value = true;
};

const confirmCashOrder = (orderId) => {
  orderToConfirm.value = orderId;
  showConfirmCashModal.value = true;
};

const processCashOrder = async () => {
  if (!orderToConfirm.value) return;
  
  try {
    isSubmitting.value = true;
    
    // Get the order
    const orderToProcess = orders.value.find(order => order.id === orderToConfirm.value);
    
    if (!orderToProcess) {
      throw new Error("Order not found");
    }
    
    // Update order status - automatically set to assigned for COD orders
    const orderRef = doc(db, "bookings", orderToConfirm.value);
    await updateDoc(orderRef, {
      status: 'assigned', // Auto-accept by setting to assigned instead of confirmed
      confirmedAt: serverTimestamp(),
      isPaid: true, // Mark as paid since it's cash on delivery
      paidAt: serverTimestamp()
    });
    
    // Send email notification
    await sendOrderConfirmationEmail(orderToProcess);
    
    // Close modal and refresh orders
    showConfirmCashModal.value = false;
    orderToConfirm.value = null;
    refreshOrders();
    
    // Show success message
    if (window.$notification) {
      window.$notification.success({
        title: 'Order Accepted',
        message: 'Your order has been automatically accepted and assigned'
      });
    }
  } catch (error) {
    console.error("Error confirming order:", error);
    if (window.$notification) {
      window.$notification.error({
        title: 'Error',
        message: 'Failed to confirm order: ' + error.message
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

const sendOrderConfirmationEmail = async (order) => {
  try {
    if (!authStore.user || !authStore.user.email) {
      console.error("No user email found");
      return;
    }
    
    // Prepare email data
    const emailData = {
      to: authStore.user.email,
      subject: `Your Order #${order.id.substring(0, 8)} ${order.isPaid ? 'Payment Confirmation' : 'has been placed'}`,
      template: 'order-confirmation',
      data: {
        orderNumber: order.id.substring(0, 8),
        customerName: authStore.user.displayName || 'Valued Customer',
        service: order.service,
        pickupLocation: order.pickupLocation,
        dropLocation: order.dropLocation,
        paymentMethod: order.paymentMethod,
        subtotal: order.amount || 0,
        deliveryFee: order.additionalFees || 0,
        total: order.totalAmount || 0,
        isPaid: order.isPaid,
        paymentProof: order.proofOfPayment,
        date: new Date().toLocaleString()
      }
    };
    
    // Send email notification
    await sendEmailNotification(emailData);
    
    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
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

<style scoped>
/* Optional: Add custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Optional: Add hover effects */
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}
</style>