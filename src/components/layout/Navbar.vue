<template>
  <nav class="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-xl relative z-50">
    <!-- Top highlight line -->
    <div class="h-1 bg-gradient-to-r from-green-300 to-green-400"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold flex items-center group">
              <!-- Logo with animation -->
              <div class="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center mr-2 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <span class="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-100 group-hover:from-green-100 group-hover:to-white transition-all duration-300">
                BroomTech
              </span>
            </router-link>
          </div>
          <div class="hidden sm:ml-10 sm:flex sm:space-x-8">
            <!-- User Navigation -->
            <template v-if="authStore.userRole === 'user'">
              <router-link 
                to="/user" 
                class="nav-link" 
                :class="{ 'active': isActive('/user') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </router-link>
              <router-link 
                to="/user/book-service" 
                class="nav-link" 
                :class="{ 'active': isActive('/user/book-service') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Book Service
              </router-link>
              <router-link 
                to="/user/order-history" 
                class="nav-link" 
                :class="{ 'active': isActive('/user/order-history') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Order History
              </router-link>
            </template>
            
            <!-- Driver Navigation -->
            <template v-if="authStore.userRole === 'driver'">
              <router-link 
                to="/driver" 
                class="nav-link" 
                :class="{ 'active': isActive('/driver') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </router-link>
              <router-link 
                to="/driver/tasks" 
                class="nav-link" 
                :class="{ 'active': isActive('/driver/tasks') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                My Tasks
              </router-link>
            </template>
            
            <!-- Admin Navigation -->
            <template v-if="authStore.userRole === 'admin'">
              <router-link 
                to="/admin" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </router-link>
              <router-link 
                to="/admin/bookings" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/bookings') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Bookings
              </router-link>
              <router-link 
                to="/admin/drivers" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/drivers') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                Drivers
              </router-link>
              <router-link 
                to="/admin/users" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/users') }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Users
              </router-link>
            </template>
          </div>
        </div>
        
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Notification Bell -->
          <NotificationBell v-if="authStore.user" class="mr-4" />
          
          <div class="ml-3 relative">
            <div v-if="authStore.user">
              <button 
                @click="toggleDropdown" 
                class="flex items-center text-sm font-medium text-white hover:text-gray-200 focus:outline-none bg-green-700 bg-opacity-30 px-4 py-2 rounded-full transition-all duration-300 hover:bg-opacity-50 hover:shadow-md"
              >
                <div class="h-7 w-7 rounded-full bg-white text-green-600 flex items-center justify-center font-bold mr-2 shadow-sm">
                  {{ authStore.user.displayName ? authStore.user.displayName.charAt(0).toUpperCase() : 'U' }}
                </div>
                <span class="mr-2">{{ authStore.user.displayName || 'User' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{'rotate-180': isDropdownOpen}" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div 
                v-if="isDropdownOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transform transition-all duration-200 ease-out"
              >
                <router-link 
                  :to="profileRoute" 
                  class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md mx-1 my-1 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </router-link>
                <button 
                  @click="logout" 
                  class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md mx-1 my-1 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
            <div v-else>
              <router-link to="/login" class="text-white hover:text-gray-200 bg-green-700 bg-opacity-30 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-opacity-50 hover:shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Sign in
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="-mr-2 flex items-center sm:hidden">
          <button 
            @click="toggleMobileMenu" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-green-700 focus:outline-none transition-all duration-300 hover:shadow-md"
            aria-label="Main menu"
          >
            <svg 
              :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div 
      :class="{ 'translate-x-0 opacity-100': isMobileMenuOpen, '-translate-x-full opacity-0': !isMobileMenuOpen }" 
      class="sm:hidden fixed inset-0 z-40 bg-green-900 bg-opacity-95 transform transition-all duration-300 ease-in-out"
      style="height: 100vh;"
    >
      <div class="pt-5 pb-6 px-5">
        <div class="flex items-center justify-between">
          <div>
            <router-link to="/" class="text-xl font-bold flex items-center" @click="isMobileMenuOpen = false">
              <div class="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <span class="font-extrabold tracking-tight text-white">BroomTech</span>
            </router-link>
          </div>
          <div>
            <button 
              @click="toggleMobileMenu" 
              class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-green-800 focus:outline-none"
            >
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-8 space-y-3">
          <!-- User Navigation -->
          <template v-if="authStore.userRole === 'user'">
            <router-link 
              to="/user" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/user') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </router-link>
            <router-link 
              to="/user/book-service" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/user/book-service') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              Book Service
            </router-link>
            <router-link 
              to="/user/order-history" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/user/order-history') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Order History
            </router-link>
          </template>
          
          <!-- Driver Navigation -->
          <template v-if="authStore.userRole === 'driver'">
            <router-link 
              to="/driver" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/driver') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </router-link>
            <router-link 
              to="/driver/tasks" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/driver/tasks') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              My Tasks
            </router-link>
          </template>
          
          <!-- Admin Navigation -->
          <template v-if="authStore.userRole === 'admin'">
            <router-link 
              to="/admin" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/admin') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </router-link>
            <router-link 
              to="/admin/bookings" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/admin/bookings') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Bookings
            </router-link>
            <router-link 
              to="/admin/drivers" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/admin/drivers') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
              Drivers
            </router-link>
            <router-link 
              to="/admin/users" 
              class="mobile-nav-link" 
              :class="{ 'bg-green-700': isActive('/admin/users') }"
              @click="isMobileMenuOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Users
            </router-link>
          </template>
        </div>
      </div>
      
      <div class="pt-4 pb-3 border-t border-green-700">
        <div v-if="authStore.user" class="flex items-center px-5">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 rounded-full bg-white flex items-center justify-center text-green-600 font-bold text-lg shadow-md">
              {{ authStore.user.displayName ? authStore.user.displayName.charAt(0).toUpperCase() : 'U' }}
            </div>
          </div>
          <div class="ml-4">
            <div class="text-base font-medium text-white">{{ authStore.user.displayName || 'User' }}</div>
            <div class="text-sm font-medium text-green-200">{{ authStore.user.email }}</div>
          </div>
          <NotificationBell v-if="authStore.user" class="ml-auto" />
        </div>
        <div class="mt-6 space-y-3 px-5">
          <router-link 
            v-if="authStore.user"
            :to="profileRoute" 
            class="mobile-nav-link flex items-center"
            @click="isMobileMenuOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </router-link>
          <button 
            v-if="authStore.user"
            @click="logout" 
            class="mobile-nav-link w-full text-left flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign out
          </button>
          <router-link 
            v-else
            to="/login" 
            class="mobile-nav-link flex items-center"
            @click="isMobileMenuOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import NotificationBell from '../common/NotificationBell.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  // Prevent scrolling when mobile menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const isActive = (path) => {
  return route.path.startsWith(path);
};

const profileRoute = computed(() => {
  if (authStore.userRole === 'user') {
    return '/user/profile';
  } else if (authStore.userRole === 'driver') {
    return '/driver/profile';
  } else if (authStore.userRole === 'admin') {
    return '/admin/settings';
  }
  return '/';
});

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isDropdownOpen.value) {
    const dropdown = document.querySelector('.origin-top-right');
    if (dropdown && !dropdown.contains(event.target) && !event.target.closest('button')) {
      isDropdownOpen.value = false;
    }
  }
};

// Close mobile menu on route change
watch(() => route.path, () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-white hover:border-white hover:text-gray-200 transition-all duration-300;
}

.nav-link.active {
  @apply border-white text-white font-semibold;
  /* Add glow effect for active link */
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.mobile-nav-link {
  @apply flex items-center px-4 py-3.5 text-base font-medium text-white hover:bg-green-700 rounded-xl transition-all duration-300;
}

/* Add subtle hover effect to all interactive elements */
button, a {
  @apply transition-all duration-300;
}

/* Add animation for dropdown */
.origin-top-right {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>