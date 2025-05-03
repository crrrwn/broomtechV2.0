<template>
  <div :class="[isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-emerald-50', 'min-h-screen transition-colors duration-300 pb-16']">
    <!-- Theme Toggle -->
    <div class="fixed top-6 right-6 z-50">
      <button 
        @click="toggleDarkMode" 
        class="p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        :class="isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'"
      >
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
      <!-- Dashboard Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-12">
        <div class="mb-6 md:mb-0">
          <h1 :class="[isDarkMode ? 'text-white' : 'text-green-900', 'text-3xl sm:text-4xl font-bold mb-2 transition-colors duration-300']">Dashboard</h1>
          <p :class="[isDarkMode ? 'text-gray-300' : 'text-green-600', 'text-lg transition-colors duration-300']">
            Manage your services and track your orders
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <router-link 
            to="/user/book-service" 
            :class="[
              isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white',
              'inline-flex items-center px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 text-sm font-medium'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book Service
          </router-link>
          <router-link 
            to="/user/order-history" 
            :class="[
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-700',
              'inline-flex items-center px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 text-sm font-medium'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order History
          </router-link>
        </div>
      </div>
      
      <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-32">
          <div class="loader">
            <div class="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p :class="[isDarkMode ? 'text-gray-300' : 'text-green-600', 'mt-4 text-center font-medium']">Loading your dashboard...</p>
          </div>
        </div>
        
        <div v-else>
          <!-- Welcome Card with Animated Background -->
          <div 
            :class="[
              isDarkMode ? 'from-green-800 to-emerald-900' : 'from-green-500 to-emerald-600',
              'bg-gradient-to-r overflow-hidden shadow-2xl rounded-3xl mb-10 text-white relative'
            ]"
          >
            <!-- Animated Circles Background -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="circle-1"></div>
              <div class="circle-2"></div>
              <div class="circle-3"></div>
              <div class="circle-4"></div>
            </div>
            
            <div class="px-6 py-10 sm:p-12 relative z-10">
              <div class="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
                <svg class="h-48 w-48" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="relative z-10 max-w-3xl">
                <h2 class="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-4 text-white">Welcome, {{ userName }}!</h2>
                <p class="text-green-100 text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed">
                  What would you like to do today? Check your orders or book a new service for your home or office.
                </p>
                <div class="mt-6 flex flex-wrap gap-4">
                  <router-link 
                    to="/user/book-service" 
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-green-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Book a Service
                    <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                  <router-link 
                    to="/user/order-history" 
                    class="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-xl shadow-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                  >
                    View Orders
                    <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="h-2 bg-gradient-to-r from-yellow-400 via-green-300 to-green-500"></div>
          </div>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <!-- Total Orders Card -->
            <div 
              :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-green-100 hover:bg-gray-50',
                'overflow-hidden shadow-xl rounded-3xl transition-all duration-300 hover:shadow-2xl border transform hover:-translate-y-1'
              ]"
            >
              <div class="px-6 py-8">
                <div class="flex items-center">
                  <div 
                    :class="[
                      isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600',
                      'flex-shrink-0 rounded-2xl p-4 transition-colors duration-300'
                    ]"
                  >
                    <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt 
                        :class="[
                          isDarkMode ? 'text-green-400' : 'text-green-600',
                          'text-sm font-medium truncate transition-colors duration-300'
                        ]"
                      >
                        Total Orders
                      </dt>
                      <dd>
                        <div 
                          :class="[
                            isDarkMode ? 'text-white' : 'text-gray-900',
                            'text-4xl font-bold transition-colors duration-300'
                          ]"
                        >
                          {{ stats.totalOrders }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div 
                :class="[
                  isDarkMode ? 'bg-gray-700/50' : 'bg-green-50',
                  'px-6 py-4 transition-colors duration-300'
                ]"
              >
                <div class="text-sm">
                  <router-link 
                    to="/user/order-history" 
                    :class="[
                      isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700',
                      'font-medium flex items-center transition-colors duration-300'
                    ]"
                  >
                    View all orders
                    <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
            
            <!-- Active Orders Card -->
            <div 
              :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-green-100 hover:bg-gray-50',
                'overflow-hidden shadow-xl rounded-3xl transition-all duration-300 hover:shadow-2xl border transform hover:-translate-y-1'
              ]"
            >
              <div class="px-6 py-8">
                <div class="flex items-center">
                  <div 
                    :class="[
                      isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
                      'flex-shrink-0 rounded-2xl p-4 transition-colors duration-300'
                    ]"
                  >
                    <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt 
                        :class="[
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
                          'text-sm font-medium truncate transition-colors duration-300'
                        ]"
                      >
                        Active Orders
                      </dt>
                      <dd>
                        <div 
                          :class="[
                            isDarkMode ? 'text-white' : 'text-gray-900',
                            'text-4xl font-bold transition-colors duration-300'
                          ]"
                        >
                          {{ stats.activeOrders }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div 
                :class="[
                  isDarkMode ? 'bg-gray-700/50' : 'bg-emerald-50',
                  'px-6 py-4 transition-colors duration-300'
                ]"
              >
                <div class="text-sm">
                  <router-link 
                    to="/user/order-history" 
                    :class="[
                      isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700',
                      'font-medium flex items-center transition-colors duration-300'
                    ]"
                  >
                    Track active orders
                    <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
            
            <!-- Total Spent Card -->
            <div 
              :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-green-100 hover:bg-gray-50',
                'overflow-hidden shadow-xl rounded-3xl transition-all duration-300 hover:shadow-2xl border transform hover:-translate-y-1'
              ]"
            >
              <div class="px-6 py-8">
                <div class="flex items-center">
                  <div 
                    :class="[
                      isDarkMode ? 'bg-teal-900/50 text-teal-400' : 'bg-teal-100 text-teal-600',
                      'flex-shrink-0 rounded-2xl p-4 transition-colors duration-300'
                    ]"
                  >
                    <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt 
                        :class="[
                          isDarkMode ? 'text-teal-400' : 'text-teal-600',
                          'text-sm font-medium truncate transition-colors duration-300'
                        ]"
                      >
                        Total Spent
                      </dt>
                      <dd>
                        <div 
                          :class="[
                            isDarkMode ? 'text-white' : 'text-gray-900',
                            'text-4xl font-bold transition-colors duration-300'
                          ]"
                        >
                          ₱{{ stats.totalSpent.toFixed(2) }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div 
                :class="[
                  isDarkMode ? 'bg-gray-700/50' : 'bg-teal-50',
                  'px-6 py-4 transition-colors duration-300'
                ]"
              >
                <div class="text-sm">
                  <span 
                    :class="[
                      isDarkMode ? 'text-teal-400' : 'text-teal-600',
                      'font-medium transition-colors duration-300'
                    ]"
                  >
                    Lifetime spending
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Orders -->
          <div class="mt-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 
                :class="[
                  isDarkMode ? 'text-white' : 'text-green-900',
                  'text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 transition-colors duration-300'
                ]"
              >
                Recent Orders
              </h2>
              <router-link 
                to="/user/order-history" 
                :class="[
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-green-600',
                  'text-sm font-medium flex items-center py-2.5 px-5 rounded-xl shadow-md hover:shadow transition-all duration-200'
                ]"
              >
                View all orders
                <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
            
            <div 
              v-if="recentOrders.length === 0" 
              :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100',
                'overflow-hidden shadow-xl rounded-3xl border transition-colors duration-300'
              ]"
            >
              <div class="px-6 py-16 text-center">
                <div class="flex justify-center">
                  <div class="empty-orders-icon">
                    <svg 
                      :class="[
                        isDarkMode ? 'text-green-700' : 'text-green-300',
                        'h-20 w-20 transition-colors duration-300'
                      ]" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <p 
                  :class="[
                    isDarkMode ? 'text-gray-200' : 'text-green-800',
                    'mt-6 text-xl font-medium transition-colors duration-300'
                  ]"
                >
                  You don't have any recent orders.
                </p>
                <p 
                  :class="[
                    isDarkMode ? 'text-gray-400' : 'text-green-600',
                    'mt-2 transition-colors duration-300 max-w-md mx-auto'
                  ]"
                >
                  Ready to get started? Book your first service now and experience hassle-free cleaning.
                </p>
                <router-link 
                  to="/user/book-service" 
                  :class="[
                    isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700',
                    'mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200'
                  ]"
                >
                  Book a Service
                </router-link>
              </div>
            </div>
            
            <div 
              v-else 
              :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100',
                'shadow-xl overflow-hidden rounded-3xl border transition-colors duration-300'
              ]"
            >
              <ul 
                :class="[
                  isDarkMode ? 'divide-gray-700' : 'divide-green-100',
                  'divide-y transition-colors duration-300'
                ]"
              >
                <li 
                  v-for="order in recentOrders" 
                  :key="order.id" 
                  :class="[
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-green-50',
                    'transition-all duration-200'
                  ]"
                >
                  <div class="block cursor-pointer" @click="openTrackingModal(order)">
                    <div class="px-6 py-6">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div class="flex items-center space-x-3 mb-2 sm:mb-0">
                          <p 
                            :class="[
                              isDarkMode ? 'text-green-400' : 'text-green-700',
                              'text-base font-medium truncate transition-colors duration-300'
                            ]"
                          >
                            {{ order.service }}
                          </p>
                          <div class="flex-shrink-0 flex">
                            <p 
                              :class="[
                                isDarkMode ? darkModeStatusClasses[order.status] || 'bg-gray-600 text-gray-200' : statusClasses[order.status] || 'bg-gray-100 text-gray-800',
                                'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors duration-300'
                              ]"
                            >
                              {{ formatStatus(order.status) }}
                            </p>
                          </div>
                        </div>
                        <div class="flex-shrink-0 flex">
                          <p 
                            :class="[
                              isDarkMode ? 'text-white' : 'text-gray-900',
                              'text-base font-medium transition-colors duration-300'
                            ]"
                          >
                            ₱{{ order.totalAmount.toFixed(2) }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-3 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p 
                            :class="[
                              isDarkMode ? 'text-gray-400' : 'text-gray-500',
                              'flex items-center text-sm transition-colors duration-300'
                            ]"
                          >
                            <svg 
                              :class="[
                                isDarkMode ? 'text-green-500' : 'text-green-400',
                                'flex-shrink-0 mr-1.5 h-5 w-5 transition-colors duration-300'
                              ]" 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                            {{ truncateText(order.dropLocation, 30) }}
                          </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm sm:mt-0">
                          <svg 
                            :class="[
                              isDarkMode ? 'text-green-500' : 'text-green-400',
                              'flex-shrink-0 mr-1.5 h-5 w-5 transition-colors duration-300'
                            ]" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                          </svg>
                          <p :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'transition-colors duration-300']">
                            {{ formatDate(order.createdAt) }}
                          </p>
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

    <!-- Tracking Modal -->
    <TrackingModal 
      :show="showTrackingModal"
      :order="selectedOrder"
      :dark-mode="isDarkMode"
      @close="closeTrackingModal"
      @order-cancelled="handleOrderCancelled"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useBookingStore } from '../../stores/booking';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import TrackingModal from '../../components/tracking/TrackingModal.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const bookingStore = useBookingStore();
const router = useRouter();

const loading = ref(true);
const recentOrders = ref([]);
const showTrackingModal = ref(false);
const selectedOrder = ref(null);
const stats = ref({
  totalOrders: 0,
  activeOrders: 0,
  totalSpent: 0
});

// Dark mode state
const isDarkMode = ref(false);

// Check for user preference on initial load
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  isDarkMode.value = savedMode === 'true';
});

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
};

const userName = computed(() => {
  return authStore.user?.displayName || 'User';
});

// Status classes for light mode
const statusClasses = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'assigned': 'bg-blue-100 text-blue-800',
  'in_progress': 'bg-green-100 text-green-800',
  'completed': 'bg-emerald-100 text-emerald-800',
  'cancelled': 'bg-red-100 text-red-800'
};

// Status classes for dark mode
const darkModeStatusClasses = {
  'pending': 'bg-yellow-900 text-yellow-300',
  'assigned': 'bg-blue-900 text-blue-300',
  'in_progress': 'bg-green-900 text-green-300',
  'completed': 'bg-emerald-900 text-emerald-300',
  'cancelled': 'bg-red-900 text-red-300'
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  
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

const openTrackingModal = (order) => {
  selectedOrder.value = order;
  showTrackingModal.value = true;
};

const closeTrackingModal = () => {
  showTrackingModal.value = false;
  selectedOrder.value = null;
};

const handleOrderCancelled = () => {
  fetchDashboardData();
};

// Use the booking store to fetch user bookings
const fetchBookingsFromStore = async () => {
  try {
    console.log('Fetching bookings from store...');
    await bookingStore.getUserBookings();
    
    // Get the bookings from the store
    const allOrders = bookingStore.bookings;
    console.log('Fetched bookings from store:', allOrders.length);
    
    // Take only the 5 most recent orders
    recentOrders.value = allOrders.slice(0, 5);
    
    // Calculate stats
    stats.value = {
      totalOrders: allOrders.length,
      activeOrders: allOrders.filter(booking => 
        ['pending', 'assigned', 'in_progress'].includes(booking.status)
      ).length,
      totalSpent: allOrders
        .filter(booking => booking.status === 'completed')
        .reduce((total, booking) => total + (Number(booking.totalAmount) || 0), 0)
    };
    
    console.log('Updated stats:', stats.value);
    loading.value = false;
  } catch (error) {
    console.error('Error fetching bookings from store:', error);
    loading.value = false;
  }
};

// Fetch data directly from Firestore
const fetchDashboardData = async () => {
  loading.value = true;

  try {
    // Check if user is authenticated
    if (!authStore.user || !authStore.user.uid) {
      console.log('No authenticated user, showing empty dashboard');
      // Instead of showing an error, just show empty data
      stats.value = {
        totalOrders: 0,
        activeOrders: 0,
        totalSpent: 0
      };
      recentOrders.value = [];
      loading.value = false;
      return;
    }
    
    console.log('Fetching bookings for user:', authStore.user.uid);
    
    // Fetch orders without orderBy (temporary workaround until index is created)
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', authStore.user.uid)
    );
    
    // Set up a real-time listener for bookings
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('Fetched bookings:', querySnapshot.size);
      
      // Sort the results in memory instead of using orderBy
      const allOrders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Ensure numerical values
          amount: Number(data.amount) || 0,
          additionalFees: Number(data.additionalFees) || 0,
          totalAmount: Number(data.totalAmount) || 0
        };
      });
      
      // Sort by createdAt in descending order
      allOrders.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      // Take only the 5 most recent orders
      recentOrders.value = allOrders.slice(0, 5);
      
      // Calculate stats
      stats.value = {
        totalOrders: allOrders.length,
        activeOrders: allOrders.filter(booking => 
          ['pending', 'assigned', 'in_progress'].includes(booking.status)
        ).length,
        totalSpent: allOrders
          .filter(booking => booking.status === 'completed')
          .reduce((total, booking) => total + (Number(booking.totalAmount) || 0), 0)
      };
      
      console.log('Updated stats:', stats.value);
      loading.value = false;
    }, (error) => {
      console.error('Error fetching dashboard data:', error);
      loading.value = false;
    });
    
    // Clean up the listener when component is unmounted
    onUnmounted(() => {
      unsubscribe();
    });
    
  } catch (error) {
    console.error('Error setting up dashboard data listener:', error);
    loading.value = false;
  }
};

onMounted(async () => {
  // Try to use the booking store first
  if (authStore.user) {
    console.log('User already authenticated, fetching bookings...');
    fetchBookingsFromStore();
  } else {
    console.log('Waiting for auth to initialize...');
    
    // Set a maximum wait time
    const maxWaitTime = 5000; // 5 seconds
    const startTime = Date.now();
    
    // Wait for auth to initialize or timeout
    while (!authStore.user && (Date.now() - startTime) < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (authStore.user) {
      console.log('Auth initialized, fetching bookings...');
      fetchBookingsFromStore();
    } else {
      console.log('Auth timeout, showing empty dashboard');
      loading.value = false;
    }
  }
});

// Watch for auth changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    console.log('Auth state changed, refreshing dashboard...');
    fetchBookingsFromStore();
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Add hover transform effect */
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animated circles for welcome card */
.circle-1 {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  top: -150px;
  right: -100px;
  animation: float 15s ease-in-out infinite;
}

.circle-2 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  bottom: -100px;
  left: 10%;
  animation: float 20s ease-in-out infinite;
}

.circle-3 {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: 30%;
  left: 20%;
  animation: float 12s ease-in-out infinite;
}

.circle-4 {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  top: 20%;
  right: 15%;
  animation: float 18s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

/* Enhanced loader animation */
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.spinner div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #16a34a;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.spinner div:nth-child(1) {
  left: 8px;
  animation: spinner1 0.6s infinite;
}

.spinner div:nth-child(2) {
  left: 8px;
  animation: spinner2 0.6s infinite;
}

.spinner div:nth-child(3) {
  left: 32px;
  animation: spinner2 0.6s infinite;
}

.spinner div:nth-child(4) {
  left: 56px;
  animation: spinner3 0.6s infinite;
}

@keyframes spinner1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spinner3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes spinner2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

/* Empty orders animation */
.empty-orders-icon {
  position: relative;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .circle-1, .circle-2, .circle-3, .circle-4 {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@media (max-width: 480px) {
  .spinner {
    width: 60px;
    height: 60px;
  }
  
  .spinner div {
    width: 10px;
    height: 10px;
  }
}

/* Dark mode specific styles */
:deep(.dark-mode) {
  background-color: #121212;
  color: #e0e0e0;
}

/* Custom bg-gray-750 for dark mode hover states */
.bg-gray-750 {
  background-color: #2d3748;
}
</style>