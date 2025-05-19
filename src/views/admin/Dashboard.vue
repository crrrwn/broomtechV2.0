<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white md:text-4xl">Admin Dashboard</h1>
          <p class="mt-2 max-w-xl text-green-50">Get a comprehensive overview of your business metrics and operations</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            System Online
          </span>
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-amber-400"></span>
            Last updated: {{ new Date().toLocaleTimeString() }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Stats Overview with Clean Cards -->
    <div class="mb-6 sm:mb-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Bookings -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <svg class="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Total Bookings</h2>
        <div v-if="isLoadingStats" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ dashboardStats.totalBookings }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+12% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-purple-500" style="width: 75%"></div>
        </div>
      </div>
      
      <!-- Completed Deliveries -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-grab-green-light">
          <svg class="h-6 w-6 text-grab-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Completed Deliveries</h2>
        <div v-if="isLoadingStats" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ dashboardStats.completedBookings }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+8% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-grab-green" style="width: 65%"></div>
        </div>
      </div>
      
      <!-- Total Revenue -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Total Revenue</h2>
        <div v-if="isLoadingStats" class="mt-1 h-8 w-28 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1 flex flex-col sm:flex-row sm:items-center">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">₱{{ dashboardStats.totalEarnings.toLocaleString() }}</span>
          <span class="mt-1 sm:mt-0 ml-0 sm:ml-2 text-xs sm:text-sm font-medium text-green-600">+15% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-amber-500" style="width: 85%"></div>
        </div>
      </div>
      
      <!-- Active Users -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-100">
          <svg class="h-6 w-6 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Active Users</h2>
        <div v-if="isLoadingStats" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ dashboardStats.totalUsers }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+5% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-fuchsia-500" style="width: 55%"></div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions with Clean Cards -->
    <div class="mb-6 sm:mb-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
      <div class="overflow-hidden rounded-xl bg-purple-500 p-4 sm:p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="ml-3 text-sm sm:text-base font-medium text-white">Pending Driver Approvals</h3>
          </div>
          <div v-if="isLoadingStats" class="h-8 w-8 animate-pulse rounded-full bg-white/30"></div>
          <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium text-white">
            {{ pendingDriversCount }}
          </div>
        </div>
        <router-link to="/admin/drivers" class="mt-3 sm:mt-4 inline-flex items-center rounded-lg bg-white/10 px-3 py-2 sm:px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20">
          Review Applications
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
      
      <div class="overflow-hidden rounded-xl bg-amber-500 p-4 sm:p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="ml-3 text-sm sm:text-base font-medium text-white">Unassigned Bookings</h3>
          </div>
          <div v-if="isLoadingStats" class="h-8 w-8 animate-pulse rounded-full bg-white/30"></div>
          <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium text-white">
            {{ unassignedBookingsCount }}
          </div>
        </div>
        <router-link to="/admin/bookings" class="mt-3 sm:mt-4 inline-flex items-center rounded-lg bg-white/10 px-3 py-2 sm:px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20">
          Assign Drivers
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
      
      <div class="overflow-hidden rounded-xl bg-rose-500 p-4 sm:p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h3 class="ml-3 text-sm sm:text-base font-medium text-white">Pending Refunds</h3>
          </div>
          <div v-if="isLoadingStats" class="h-8 w-8 animate-pulse rounded-full bg-white/30"></div>
          <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium text-white">
            {{ pendingRefundsCount }}
          </div>
        </div>
        <router-link to="/admin/payments" class="mt-3 sm:mt-4 inline-flex items-center rounded-lg bg-white/10 px-3 py-2 sm:px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20">
          Process Refunds
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
    </div>
    
    <!-- Main Content with Clean Cards -->
    <div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
      <!-- Pending Payment Verifications -->
      <div class="lg:col-span-2">
        <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4">
            <div class="flex items-center">
              <div class="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Pending Payment Verifications</h2>
            </div>
            <span class="inline-flex items-center rounded-full bg-amber-100 px-2 sm:px-3 py-0.5 text-xs sm:text-sm font-medium text-amber-800">
              {{ pendingPayments.length }}
            </span>
          </div>
          
          <div v-if="isLoadingPayments" class="divide-y divide-gray-100">
            <div v-for="i in 3" :key="i" class="px-4 sm:px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
                  <div class="ml-2 h-4 w-16 sm:w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div class="ml-2 flex flex-shrink-0 flex-wrap gap-2">
                  <div class="h-8 w-16 sm:w-20 animate-pulse rounded bg-gray-200"></div>
                  <div class="h-8 w-16 sm:w-20 animate-pulse rounded bg-gray-200"></div>
                  <div class="h-8 w-16 sm:w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
              <div class="mt-3 sm:flex sm:justify-between">
                <div class="sm:flex flex-wrap gap-2">
                  <div class="h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
                  <div class="mt-2 sm:mt-0 h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
                  <div class="mt-2 sm:mt-0 h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div class="mt-2 sm:mt-0 h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
          
          <div v-else-if="pendingPayments.length === 0" class="p-6 sm:p-8 text-center">
            <div class="mx-auto mb-4 inline-flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-base sm:text-lg font-medium text-gray-900">All caught up!</p>
            <p class="mt-1 text-sm text-gray-500">No pending payment verifications at the moment.</p>
          </div>
          
          <ul v-else class="divide-y divide-gray-100">
            <li v-for="payment in pendingPayments" :key="payment.id" class="transition-colors duration-150 hover:bg-gray-50">
              <div class="px-4 sm:px-6 py-4">
                <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div class="mb-3 flex items-center sm:mb-0">
                    <div class="mr-3 h-10 w-1 rounded-full bg-amber-500"></div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        Order #{{ payment.id.substring(0, 8) }}
                      </p>
                      <p class="text-xs text-gray-500">Awaiting verification</p>
                    </div>
                    <span class="ml-3 inline-flex items-center rounded-full bg-amber-100 px-2 sm:px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Pending
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <button 
                      @click="viewPaymentProof(payment)" 
                      class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-2 sm:px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 sm:mr-1.5 h-3 sm:h-3.5 w-3 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      View
                    </button>
                    <button 
                      @click="approvePayment(payment)" 
                      class="inline-flex items-center rounded-lg border border-transparent bg-grab-green px-2 sm:px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-grab-green-dark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 sm:mr-1.5 h-3 sm:h-3.5 w-3 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button 
                      @click="rejectPayment(payment)" 
                      class="inline-flex items-center rounded-lg border border-transparent bg-rose-500 px-2 sm:px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-rose-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 sm:mr-1.5 h-3 sm:h-3.5 w-3 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs text-gray-500">
                  <div class="flex items-center rounded-lg bg-gray-50 p-2">
                    <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    <span class="truncate">{{ payment.userName || 'Unknown User' }}</span>
                  </div>
                  <div class="flex items-center rounded-lg bg-gray-50 p-2">
                    <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                    <span class="truncate">₱{{ payment.totalAmount ? payment.totalAmount.toLocaleString() : '0.00' }}</span>
                  </div>
                  <div class="flex items-center rounded-lg bg-gray-50 p-2">
                    <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    <span class="truncate">{{ payment.service || 'Service' }}</span>
                  </div>
                  <div class="flex items-center rounded-lg bg-gray-50 p-2">
                    <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    <span class="truncate">{{ formatDate(payment.paidAt) }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="lg:col-span-1">
        <div class="h-full overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4">
            <div class="flex items-center">
              <div class="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <button class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
          
          <div v-if="isLoadingActivities" class="divide-y divide-gray-100">
            <div v-for="i in 4" :key="i" class="px-4 sm:px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
                <div class="h-5 w-12 sm:w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div class="mt-2">
                <div class="h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div class="mt-2">
                <div class="h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
          
          <div v-else-if="recentActivities.length === 0" class="p-6 sm:p-8 text-center">
            <div class="mx-auto mb-4 inline-flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-base sm:text-lg font-medium text-gray-900">No recent activity</p>
            <p class="mt-1 text-sm text-gray-500">Activities will appear here as they occur.</p>
          </div>
          
          <div v-else class="max-h-[400px] sm:max-h-[500px] divide-y divide-gray-100 overflow-y-auto">
            <div v-for="(activity, index) in recentActivities" :key="index" class="px-4 sm:px-6 py-4 transition-colors duration-150 hover:bg-gray-50">
              <div class="flex items-center justify-between">
                <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {{ activity.description }}
                </p>
                <span :class="getStatusClass(activity.status)" class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
                  {{ activity.status }}
                </span>
              </div>
              <div class="mt-2 flex items-center text-xs text-gray-500">
                <svg class="mr-1.5 h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <span class="truncate">{{ activity.user }}</span>
              </div>
              <div class="mt-2 flex items-center text-xs text-gray-500">
                <svg class="mr-1.5 h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                {{ activity.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Admin Notifications Component -->
    <AdminNotifications />
    
    <!-- Payment Proof Modal -->
    <div v-if="showProofModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div class="relative max-w-3xl w-full overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-lg">
        <!-- Modal Header -->
        <div class="relative border-b border-gray-200 px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="ml-3 text-lg sm:text-xl font-bold text-gray-900">Payment Proof Verification</h3>
            </div>
            <button @click="closeProofModal" class="rounded-full p-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 sm:h-6 w-5 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="relative p-4 sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <div>
              <h4 class="mb-3 text-sm font-medium text-gray-500">Order Details</h4>
              <div class="rounded-xl bg-gray-50 p-4 sm:p-5">
                <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-sm font-medium text-gray-500">Order ID:</span>
                  <span class="text-sm font-semibold text-gray-900">#{{ selectedPayment?.id.substring(0, 8) }}</span>
                </div>
                <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-sm font-medium text-gray-500">Customer:</span>
                  <span class="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{{ selectedPayment?.userName }}</span>
                </div>
                <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-sm font-medium text-gray-500">Service:</span>
                  <span class="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{{ selectedPayment?.service }}</span>
                </div>
                <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-sm font-medium text-gray-500">Amount:</span>
                  <span class="text-sm font-semibold text-gray-900">₱{{ selectedPayment?.totalAmount ? selectedPayment.totalAmount.toLocaleString() : '0.00' }}</span>
                </div>
                <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-sm font-medium text-gray-500">Payment Method:</span>
                  <span class="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{{ selectedPayment?.paymentMethod }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-500">Date:</span>
                  <span class="text-sm font-semibold text-gray-900">{{ formatDate(selectedPayment?.paidAt) }}</span>
                </div>
              </div>
              
              <div class="mt-5">
                <h4 class="mb-3 text-sm font-medium text-gray-500">Verification Actions</h4>
                <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button 
                    @click="approvePayment(selectedPayment)" 
                    class="flex-1 inline-flex items-center justify-center rounded-lg border border-transparent bg-grab-green px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-grab-green-dark"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve Payment
                  </button>
                  <button 
                    @click="rejectPayment(selectedPayment)" 
                    class="flex-1 inline-flex items-center justify-center rounded-lg border border-transparent bg-rose-500 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-rose-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject Payment
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="mb-3 text-sm font-medium text-gray-500">Payment Proof Image</h4>
              <div class="flex h-56 sm:h-72 items-center justify-center rounded-xl bg-gray-50 p-4 sm:p-5">
                <img 
                  v-if="selectedPayment?.proofOfPayment" 
                  :src="selectedPayment.proofOfPayment" 
                  alt="Payment Proof" 
                  class="max-h-full max-w-full rounded-lg object-contain shadow-sm"
                />
                <div v-else class="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-3 text-sm sm:text-base">No payment proof available</p>
                </div>
              </div>
              
              <div class="mt-5">
                <h4 class="mb-3 text-sm font-medium text-gray-500">Notes</h4>
                <textarea 
                  v-model="verificationNotes" 
                  rows="3" 
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-grab-green focus:ring-grab-green sm:text-sm" 
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
// Add the import for AdminNotifications component at the top of the script section
import AdminNotifications from '../../components/admin/AdminNotifications.vue';
import { useNotificationStore } from '../../stores/notification';

const adminStore = useAdminStore();
const { showNotification } = useNotification();

// Add the notification store to the existing stores
const notificationStore = useNotificationStore();

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

// Add this to the existing refs
const adminNotifications = ref([]);
const isLoadingNotifications = ref(true);

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'in progress':
      return 'bg-sky-100 text-sky-800';
    case 'cancelled':
      return 'bg-rose-100 text-rose-800';
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
      fetchPendingRefunds(),
      // Add this to the fetchDashboardData function's promises array
      fetchAdminNotifications(),
    ];
    
    // Wait for analytics data
    const analytics = await promises[0];
    dashboardStats.value = analytics;
    isLoadingStats.value = false;
    
    // Wait for pending drivers
    const pendingDrivers = await promises[1];
    pendingDriversCount.value = pendingDrivers.length;

    // Check for unread notifications
    const unreadNotificationsQuery = query(
      collection(db, 'adminNotifications'),
      where('isRead', '==', false)
    );
    const unreadNotificationsSnapshot = await getDocs(unreadNotificationsQuery);
    const unreadNotificationsCount = unreadNotificationsSnapshot.size;
    console.log("Unread notifications:", unreadNotificationsCount);
    
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

// Add this function to fetch admin notifications
const fetchAdminNotifications = async () => {
  try {
    isLoadingNotifications.value = true;
    
    // Query admin notifications
    const q = query(
      collection(db, 'adminNotifications'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const notificationsSnapshot = await getDocs(q);
    const notifications = [];
    
    notificationsSnapshot.forEach(doc => {
      notifications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    adminNotifications.value = notifications;
    
    // Also fetch regular notifications for the admin user
    await notificationStore.fetchNotifications();
    
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to load notifications'
    });
  } finally {
    isLoadingNotifications.value = false;
  }
};

// Enhance the notification fetching system by adding a function to create notification records
// when specific events happen - Add this after the fetchAdminNotifications function

// Add this function to register notifications for new bookings
const registerBookingNotification = async (bookingData) => {
  try {
    await notificationStore.createBookingNotification(bookingData);
  } catch (error) {
    console.error('Error creating booking notification:', error);
  }
};

// Add this function to register notifications for payment verifications
const registerPaymentNotification = async (paymentData) => {
  try {
    await notificationStore.createPaymentVerificationNotification(paymentData);
  } catch (error) {
    console.error('Error creating payment notification:', error);
  }
};

// Add this function to register notifications for refund requests
const registerRefundNotification = async (refundData) => {
  try {
    await notificationStore.createRefundRequestNotification(refundData);
  } catch (error) {
    console.error('Error creating refund notification:', error);
  }
};

// Add this function to register notifications for driver applications
const registerDriverNotification = async (driverData) => {
  try {
    await notificationStore.createDriverNotification(driverData);
  } catch (error) {
    console.error('Error creating driver notification:', error);
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

// Add this to the existing fetchDashboardData function
// This code should be REMOVED as it's a duplicate function declaration
// const fetchDashboardData = async () => {
//   try {
//     // Fetch all data in parallel for faster loading
//     const promises = [
//       adminStore.getAnalytics(),
//       adminStore.getPendingDrivers(),
//       fetchPendingPayments(),
//       fetchRecentActivities(),
//       fetchUnassignedBookings(),
//       fetchPendingRefunds(),
//       // Add this to the fetchDashboardData function's promises array
//       fetchAdminNotifications(),
//     ];
//     
//     // Wait for analytics data
//     const analytics = await promises[0];
//     dashboardStats.value = analytics;
//     isLoadingStats.value = false;
//     
//     // Wait for pending drivers
//     const pendingDrivers = await promises[1];
//     pendingDriversCount.value = pendingDrivers.length;
//
//     const unreadNotificationsQuery = query(
//       collection(db, 'adminNotifications'),
//       where('isRead', '==', false)
//     );
//     const unreadNotificationsSnapshot = await getDocs(unreadNotificationsQuery);
//     const unreadNotificationsCount = unreadNotificationsSnapshot.size;
//     console.log("Unread notifications:", unreadNotificationsCount)
//     
//     // Other data will resolve on their own and update the UI
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     isLoadingStats.value = false;
//     showNotification({
//       type: 'error',
//       title: 'Error',
//       message: 'Failed to load dashboard data'
//     });
//   }
// };
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

.focus\:border-grab-green:focus {
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

/* Additional responsive styles for small screens */
@media (max-width: 480px) {
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .p-4 {
    padding: 0.75rem;
  }
  
  .rounded-lg {
    border-radius: 0.375rem;
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .text-xs {
    font-size: 0.7rem;
  }
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
  a[role="button"],
  .router-link {
    min-height: 2.5rem;
    min-width: 2.5rem;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
}

/* Responsive modal for very small screens */
@media (max-width: 360px) {
  .fixed.inset-0.z-50.flex.items-center.justify-center .max-w-3xl {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
