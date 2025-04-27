<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Bookings -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Bookings
                </dt>
                <dd>
                  <div v-if="isLoadingStats" class="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div v-else class="text-lg font-medium text-gray-900">
                    {{ dashboardStats.totalBookings }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Completed Deliveries -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Completed Deliveries
                </dt>
                <dd>
                  <div v-if="isLoadingStats" class="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div v-else class="text-lg font-medium text-gray-900">
                    {{ dashboardStats.completedBookings }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Total Revenue -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Revenue
                </dt>
                <dd>
                  <div v-if="isLoadingStats" class="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div v-else class="text-lg font-medium text-gray-900">
                    ₱{{ dashboardStats.totalEarnings.toLocaleString() }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Active Users -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Active Users
                </dt>
                <dd>
                  <div v-if="isLoadingStats" class="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div v-else class="text-lg font-medium text-gray-900">
                    {{ dashboardStats.totalUsers }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pending Payment Verifications -->
    <div class="mt-8">
      <h2 class="text-lg leading-6 font-medium text-gray-900 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pending Payment Verifications
        <span class="ml-2 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          {{ pendingPayments.length }}
        </span>
      </h2>
      
      <div class="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="isLoadingPayments" class="divide-y divide-gray-200">
          <div v-for="i in 3" :key="i" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div class="ml-2 h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <div class="h-6 bg-gray-200 rounded w-20 animate-pulse mr-2"></div>
                <div class="h-6 bg-gray-200 rounded w-20 animate-pulse mr-2"></div>
                <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div class="mt-2 h-4 bg-gray-200 rounded w-24 animate-pulse sm:mt-0 sm:ml-6"></div>
                <div class="mt-2 h-4 bg-gray-200 rounded w-24 animate-pulse sm:mt-0 sm:ml-6"></div>
              </div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-32 animate-pulse sm:mt-0"></div>
            </div>
          </div>
        </div>
        
        <div v-else-if="pendingPayments.length === 0" class="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-2 text-gray-600">No pending payment verifications at the moment.</p>
        </div>
        
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="payment in pendingPayments" :key="payment.id" class="hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-green-600 truncate">
                    Order #{{ payment.id.substring(0, 8) }}
                  </p>
                  <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending Verification
                  </span>
                </div>
                <div class="ml-2 flex-shrink-0 flex">
                  <button 
                    @click="viewPaymentProof(payment)" 
                    class="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Proof
                  </button>
                  <button 
                    @click="approvePayment(payment)" 
                    class="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button 
                    @click="rejectPayment(payment)" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    {{ payment.userName || 'Unknown User' }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                    ₱{{ payment.totalAmount ? payment.totalAmount.toLocaleString() : '0.00' }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                    {{ payment.service || 'Service' }}
                  </p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span>
                    {{ formatDate(payment.paidAt) }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="mt-8">
      <h2 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
      <div class="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="isLoadingActivities" class="divide-y divide-gray-200">
          <div v-for="i in 3" :key="i" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div class="ml-2 h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div class="mt-2 h-4 bg-gray-200 rounded w-32 animate-pulse sm:mt-0 sm:ml-6"></div>
              </div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-32 animate-pulse sm:mt-0"></div>
            </div>
          </div>
        </div>
        
        <div v-else-if="recentActivities.length === 0" class="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-2 text-gray-600">No recent activities found.</p>
        </div>
        
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="(activity, index) in recentActivities" :key="index">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-green-600 truncate">
                  {{ activity.description }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p :class="getStatusClass(activity.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ activity.status }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    {{ activity.user }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" clip-rule="evenodd" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {{ activity.email }}
                  </p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span>
                    {{ activity.date }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Pending Driver Approvals</h3>
          <div v-if="isLoadingStats" class="mt-2 h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div v-else class="mt-2 text-3xl font-semibold text-green-600">{{ pendingDriversCount }}</div>
          <div class="mt-4">
            <router-link to="/admin/drivers" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Review Applications
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Unassigned Bookings</h3>
          <div v-if="isLoadingStats" class="mt-2 h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div v-else class="mt-2 text-3xl font-semibold text-yellow-600">{{ unassignedBookingsCount }}</div>
          <div class="mt-4">
            <router-link to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Assign Drivers
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Pending Refunds</h3>
          <div v-if="isLoadingStats" class="mt-2 h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div v-else class="mt-2 text-3xl font-semibold text-red-600">{{ pendingRefundsCount }}</div>
          <div class="mt-4">
            <router-link to="/admin/payments" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Process Refunds
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Payment Proof Modal -->
    <div v-if="showProofModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-900">Payment Proof Verification</h3>
          <button @click="closeProofModal" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="border-t border-gray-200 pt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">Order Details</h4>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm mb-2"><span class="font-medium">Order ID:</span> #{{ selectedPayment?.id.substring(0, 8) }}</p>
                <p class="text-sm mb-2"><span class="font-medium">Customer:</span> {{ selectedPayment?.userName }}</p>
                <p class="text-sm mb-2"><span class="font-medium">Service:</span> {{ selectedPayment?.service }}</p>
                <p class="text-sm mb-2"><span class="font-medium">Amount:</span> ₱{{ selectedPayment?.totalAmount ? selectedPayment.totalAmount.toLocaleString() : '0.00' }}</p>
                <p class="text-sm mb-2"><span class="font-medium">Payment Method:</span> {{ selectedPayment?.paymentMethod }}</p>
                <p class="text-sm"><span class="font-medium">Date:</span> {{ formatDate(selectedPayment?.paidAt) }}</p>
              </div>
              
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-500 mb-2">Verification Actions</h4>
                <div class="flex space-x-3">
                  <button 
                    @click="approvePayment(selectedPayment)" 
                    class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve Payment
                  </button>
                  <button 
                    @click="rejectPayment(selectedPayment)" 
                    class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject Payment
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">Payment Proof Image</h4>
              <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-64">
                <img 
                  v-if="selectedPayment?.proofOfPayment" 
                  :src="selectedPayment.proofOfPayment" 
                  alt="Payment Proof" 
                  class="max-h-full max-w-full object-contain rounded-md shadow-sm"
                />
                <div v-else class="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-2">No payment proof available</p>
                </div>
              </div>
              
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                <textarea 
                  v-model="verificationNotes" 
                  rows="3" 
                  class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                  placeholder="Add verification notes here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { collection, query, where, getDocs, orderBy, limit, doc, updateDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAdminStore } from '../../stores/admin';
import { useNotification } from '../../composables/useNotification';

const adminStore = useAdminStore();
const { showNotification } = useNotification();

// Loading states
const isLoadingStats = ref(true);
const isLoadingPayments = ref(true);
const isLoadingActivities = ref(true);

// Dashboard data
const dashboardStats = ref({
  totalBookings: 0,
  completedBookings: 0,
  totalEarnings: 0,
  totalUsers: 0,
  totalDrivers: 0,
  cancelledBookings: 0
});

const recentActivities = ref([]);
const pendingPayments = ref([]);
const showProofModal = ref(false);
const selectedPayment = ref(null);
const verificationNotes = ref('');

// Computed values for quick action cards
const pendingDriversCount = ref(0);
const unassignedBookingsCount = ref(0);
const pendingRefundsCount = ref(0);

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
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

// Initialize with skeleton loaders for immediate display
const initializeDashboard = () => {
  // Start fetching real data immediately
  fetchDashboardData();
};

const fetchDashboardData = async () => {
  try {
    // Fetch all data in parallel for faster loading
    const promises = [
      adminStore.getAnalytics(),
      adminStore.getPendingDrivers(),
      fetchPendingPayments(),
      fetchRecentActivities(),
      fetchUnassignedBookings(),
      fetchPendingRefunds()
    ];
    
    // Wait for analytics data
    const analytics = await promises[0];
    dashboardStats.value = analytics;
    isLoadingStats.value = false;
    
    // Wait for pending drivers
    const pendingDrivers = await promises[1];
    pendingDriversCount.value = pendingDrivers.length;
    
    // Other data will resolve on their own and update the UI
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    isLoadingStats.value = false;
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to load dashboard data'
    });
  }
};

const fetchPendingPayments = async () => {
  try {
    isLoadingPayments.value = true;
    
    // Query bookings with payment proof but not yet verified
    const paymentsQuery = query(
      collection(db, 'bookings'),
      where('proofOfPayment', '!=', null),
      where('isPaid', '==', false),
      orderBy('proofOfPayment'),
      orderBy('createdAt', 'desc')
    );
    
    const paymentsSnapshot = await getDocs(paymentsQuery);
    const payments = [];
    
    paymentsSnapshot.forEach(doc => {
      const payment = doc.data();
      payments.push({
        id: doc.id,
        ...payment
      });
    });
    
    pendingPayments.value = payments;
    console.log('Pending payments fetched:', payments.length);
    
    if (payments.length === 0) {
      console.log('No pending payments found with proof of payment');
    }
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to load pending payments'
    });
  } finally {
    isLoadingPayments.value = false;
  }
};

const fetchUnassignedBookings = async () => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('status', '==', 'pending'),
      where('driverId', '==', null)
    );
    
    const snapshot = await getDocs(q);
    unassignedBookingsCount.value = snapshot.size;
  } catch (error) {
    console.error('Error fetching unassigned bookings:', error);
  }
};

const fetchPendingRefunds = async () => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('status', '==', 'cancelled'),
      where('isRefunded', '==', false),
      where('isPaid', '==', true)
    );
    
    const snapshot = await getDocs(q);
    pendingRefundsCount.value = snapshot.size;
  } catch (error) {
    console.error('Error fetching pending refunds:', error);
  }
};

const fetchRecentActivities = async () => {
  try {
    isLoadingActivities.value = true;
    
    // Query the actual activities from Firebase
    const activitiesQuery = query(
      collection(db, 'activities'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    
    const activitiesSnapshot = await getDocs(activitiesQuery);
    const activities = [];
    
    if (!activitiesSnapshot.empty) {
      activitiesSnapshot.forEach(doc => {
        const activity = doc.data();
        activities.push({
          description: activity.type,
          details: activity.details,
          user: activity.userName || 'Unknown User',
          email: activity.userEmail || 'N/A',
          status: activity.status || 'Pending',
          date: activity.timestamp ? formatDate(activity.timestamp) : 'N/A'
        });
      });
      recentActivities.value = activities;
    } else {
      // If no activities found, check for bookings to show as activities
      const bookingsQuery = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const bookingsSnapshot = await getDocs(bookingsQuery);
      
      if (!bookingsSnapshot.empty) {
        bookingsSnapshot.forEach(doc => {
          const booking = doc.data();
          activities.push({
            description: `Booking #${doc.id.substring(0, 8)}`,
            details: booking.service || 'Service Booking',
            user: booking.userName || 'Unknown User',
            email: booking.userEmail || 'N/A',
            status: booking.status || 'Pending',
            date: booking.createdAt ? formatDate(booking.createdAt) : 'N/A'
          });
        });
        recentActivities.value = activities;
      }
    }
  } catch (error) {
    console.error('Error loading activities:', error);
  } finally {
    isLoadingActivities.value = false;
  }
};

const viewPaymentProof = (payment) => {
  selectedPayment.value = payment;
  verificationNotes.value = '';
  showProofModal.value = true;
};

const closeProofModal = () => {
  showProofModal.value = false;
  selectedPayment.value = null;
  verificationNotes.value = '';
};

const approvePayment = async (payment) => {
  if (!payment) return;
  
  try {
    // Use the admin store's verifyPayment method
    await adminStore.verifyPayment(payment.id);
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Verification',
      details: `Payment for order #${payment.id.substring(0, 8)} was approved`,
      bookingId: payment.id,
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    showNotification({
      type: 'success',
      title: 'Payment Approved',
      message: `Payment for order #${payment.id.substring(0, 8)} has been approved`
    });
    
    // Remove from pending payments list
    pendingPayments.value = pendingPayments.value.filter(p => p.id !== payment.id);
    
    // Close modal if open
    if (showProofModal.value) {
      closeProofModal();
    }
    
    // Refresh data
    fetchDashboardData();
  } catch (error) {
    console.error('Error approving payment:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to approve payment'
    });
  }
};

const rejectPayment = async (payment) => {
  if (!payment) return;
  
  try {
    const bookingRef = doc(db, 'bookings', payment.id);
    
    // Update booking with verification status
    await updateDoc(bookingRef, {
      isPaid: false,
      paymentVerifiedAt: serverTimestamp(),
      paymentVerificationNotes: verificationNotes.value,
      paymentStatus: 'rejected',
      proofOfPayment: null
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Verification',
      details: `Payment for order #${payment.id.substring(0, 8)} was rejected`,
      bookingId: payment.id,
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      status: 'Rejected',
      timestamp: serverTimestamp()
    });
    
    showNotification({
      type: 'success',
      title: 'Payment Rejected',
      message: `Payment for order #${payment.id.substring(0, 8)} has been rejected`
    });
    
    // Remove from pending payments list
    pendingPayments.value = pendingPayments.value.filter(p => p.id !== payment.id);
    
    // Close modal if open
    if (showProofModal.value) {
      closeProofModal();
    }
    
    // Refresh data
    fetchDashboardData();
  } catch (error) {
    console.error('Error rejecting payment:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to reject payment'
    });
  }
};

// Initialize dashboard immediately
onBeforeMount(() => {
  initializeDashboard();
});

// No need for additional onMounted since we're already fetching data in onBeforeMount
</script>

<style scoped>
.max-h-full {
  max-height: 100%;
}

/* Add animation for skeleton loaders */
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
</style>