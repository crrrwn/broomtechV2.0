<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">Driver Management</h1>
          <p class="mt-2 max-w-xl text-green-50">Create and manage driver accounts for your delivery service</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {{ drivers.length }} Active Drivers
          </span>
          <button 
            @click="showCreateForm = !showCreateForm"
            class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
          >
            <span class="mr-1.5 h-2 w-2 rounded-full bg-amber-400"></span>
            {{ showCreateForm ? 'Hide Form' : 'Create New Driver' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Create Driver Account Form -->
    <div v-if="showCreateForm" class="mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <div class="flex items-center">
          <div class="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Create Driver Account</h2>
        </div>
      </div>
      
      <div v-if="createError" class="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs sm:text-sm text-red-700">{{ createError }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="createSuccess" class="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 mb-4">
        <div class="flex flex-col sm:flex-row">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-0 sm:ml-3 mt-2 sm:mt-0">
            <p class="text-xs sm:text-sm text-green-700">{{ createSuccess }}</p>
            <div v-if="generatedCredentials" class="mt-2 p-2 sm:p-3 bg-green-100 rounded-md">
              <p class="text-xs sm:text-sm font-medium text-green-800">Generated Credentials:</p>
              <p class="text-xs sm:text-sm text-green-800">Email: {{ generatedCredentials.email }}</p>
              <p class="text-xs sm:text-sm text-green-800">Password: {{ generatedCredentials.password }}</p>
              <p class="text-xs mt-1 text-green-700">Make sure to save or send these credentials to the driver.</p>
            </div>
          </div>
        </div>
      </div>
      
      <form @submit.prevent="createDriverAccount" class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6">
          <div class="sm:col-span-3">
            <label for="full-name" class="block text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="full-name" 
              v-model="newDriver.fullName"
              required
              class="mt-1 focus:ring-grab-green focus:border-grab-green block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md" 
            />
          </div>
          
          <div class="sm:col-span-3">
            <label for="email" class="block text-xs sm:text-sm font-medium text-gray-700">
              Email Address
              <span class="ml-1 text-xs text-gray-500">(Auto-generated if left empty)</span>
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input 
                type="email" 
                id="email" 
                v-model="newDriver.email"
                :placeholder="emailPlaceholder"
                class="focus:ring-grab-green focus:border-grab-green flex-1 block w-full rounded-none rounded-l-md text-xs sm:text-sm border-gray-300" 
              />
              <button
                type="button"
                @click="generateEmail"
                class="inline-flex items-center px-2 sm:px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-xs sm:text-sm"
              >
                Generate
              </button>
            </div>
          </div>
          
          <div class="sm:col-span-3">
            <label for="phone" class="block text-xs sm:text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="newDriver.phone"
              required
              class="mt-1 focus:ring-grab-green focus:border-grab-green block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md" 
            />
          </div>
          
          <div class="sm:col-span-3">
            <label for="password" class="block text-xs sm:text-sm font-medium text-gray-700">
              Password
              <span class="ml-1 text-xs text-gray-500">(Auto-generated if left empty)</span>
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <div class="relative flex-grow">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="newDriver.password"
                  :placeholder="passwordPlaceholder"
                  minlength="6"
                  class="focus:ring-grab-green focus:border-grab-green block w-full pr-10 text-xs sm:text-sm border-gray-300 rounded-l-md" 
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <svg v-if="showPassword" class="h-4 sm:h-5 w-4 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="h-4 sm:h-5 w-4 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="button"
                @click="generatePassword"
                class="inline-flex items-center px-2 sm:px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-xs sm:text-sm"
              >
                Generate
              </button>
            </div>
            <p class="mt-1 text-xs sm:text-sm text-gray-500">Password must be at least 6 characters</p>
          </div>
          
          <div class="sm:col-span-6">
            <label for="address" class="block text-xs sm:text-sm font-medium text-gray-700">Address</label>
            <textarea 
              id="address" 
              v-model="newDriver.address"
              rows="3" 
              class="mt-1 focus:ring-grab-green focus:border-grab-green block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          </div>
          
          <div class="sm:col-span-3">
            <label for="vehicle-type" class="block text-xs sm:text-sm font-medium text-gray-700">Vehicle Type</label>
            <select 
              id="vehicle-type" 
              v-model="newDriver.vehicleType"
              required
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-grab-green focus:border-grab-green text-xs sm:text-sm"
            >
              <option value="">Select vehicle type</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          
          <div class="sm:col-span-3">
            <label for="vehicle-plate" class="block text-xs sm:text-sm font-medium text-gray-700">Vehicle Plate Number</label>
            <input 
              type="text" 
              id="vehicle-plate" 
              v-model="newDriver.vehiclePlate"
              required
              class="mt-1 focus:ring-grab-green focus:border-grab-green block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md" 
            />
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:justify-end">
          <button 
            type="button"
            @click="showCreateForm = false"
            class="mb-2 sm:mb-0 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mr-3"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="creating"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-grab-green hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green disabled:opacity-50"
          >
            {{ creating ? 'Creating...' : 'Create Driver Account' }}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Stats Overview with Clean Cards -->
    <div class="mb-6 sm:mb-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Drivers -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <svg class="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Total Drivers</h2>
        <div v-if="loading" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ drivers.length }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+{{ Math.floor(Math.random() * 10) }}% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-purple-500" style="width: 75%"></div>
        </div>
      </div>
      
      <!-- Active Drivers -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-grab-green-light">
          <svg class="h-6 w-6 text-grab-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Active Drivers</h2>
        <div v-if="loading" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ drivers.length }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+{{ Math.floor(Math.random() * 8) }}% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-grab-green" style="width: 65%"></div>
        </div>
      </div>
      
      <!-- Motorcycle Drivers -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0m-5-6a7 7 0 1114 0H3m18 0h-1.26a1 1 0 01-.968-.79l-1.04-3.13A2 2 0 0017 3H7c-1.11 0-2.08.89-2 2v4.17l-1.03 3.13A1 1 0 013.74 11H3" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Motorcycle Drivers</h2>
        <div v-if="loading" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ getDriversByVehicleType('motorcycle') }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+{{ Math.floor(Math.random() * 15) }}% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-amber-500" style="width: 85%"></div>
        </div>
      </div>
      
      <!-- Other Vehicle Drivers -->
      <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-100">
          <svg class="h-6 w-6 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        </div>
        
        <h2 class="mt-4 text-sm font-medium text-gray-500">Other Vehicle Drivers</h2>
        <div v-if="loading" class="mt-1 h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div v-else class="mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ getDriversByVehicleType('other') }}</span>
          <span class="ml-2 text-xs sm:text-sm font-medium text-green-600">+{{ Math.floor(Math.random() * 5) }}% <span class="text-gray-400">vs last month</span></span>
        </div>
        
        <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div class="h-full rounded-full bg-fuchsia-500" style="width: 55%"></div>
        </div>
      </div>
    </div>
    
    <!-- Driver Accounts List -->
    <div class="overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4">
        <div class="flex items-center">
          <div class="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Driver Accounts</h2>
        </div>
        <span class="inline-flex items-center rounded-full bg-purple-100 px-2 sm:px-3 py-0.5 text-xs sm:text-sm font-medium text-purple-800">
          {{ drivers.length }}
        </span>
      </div>
      
      <div v-if="loading" class="divide-y divide-gray-100">
        <div v-for="i in 3" :key="i" class="px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
              <div class="ml-4">
                <div class="h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
                <div class="mt-2 h-3 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div class="ml-2 flex flex-shrink-0 flex-wrap gap-2">
              <div class="h-8 w-16 sm:w-20 animate-pulse rounded bg-gray-200"></div>
              <div class="h-8 w-16 sm:w-20 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
          <div class="mt-3 sm:flex sm:justify-between">
            <div class="sm:flex flex-wrap gap-2">
              <div class="h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
              <div class="mt-2 sm:mt-0 h-4 w-20 sm:w-24 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div class="mt-2 sm:mt-0 h-4 w-24 sm:w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="drivers.length === 0" class="p-6 sm:p-8 text-center">
        <div class="mx-auto mb-4 inline-flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p class="text-base sm:text-lg font-medium text-gray-900">No driver accounts found</p>
        <p class="mt-1 text-sm text-gray-500">Create a new driver account to get started</p>
      </div>
      
      <div v-else>
        <!-- Desktop Table View -->
        <table class="min-w-full divide-y divide-gray-200 hidden sm:table">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="driver in drivers" :key="driver.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span class="text-green-800 font-medium text-sm">{{ getInitials(driver.fullName) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ driver.fullName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ driver.email }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ driver.phone }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatVehicleType(driver.vehicleType) }}</div>
                <div class="text-sm text-gray-500">{{ driver.vehiclePlate }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(driver.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="sendCredentials(driver)"
                  class="text-grab-green hover:text-grab-green-dark mr-4"
                >
                  Send Credentials
                </button>
                <button 
                  @click="confirmDeleteDriver(driver)"
                  class="text-rose-600 hover:text-rose-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Mobile Card View -->
        <div class="sm:hidden divide-y divide-gray-200">
          <div v-for="driver in drivers" :key="driver.id" class="p-4 hover:bg-gray-50">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-800 font-medium text-xs">{{ getInitials(driver.fullName) }}</span>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ driver.fullName }}</div>
                  <span class="px-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div class="text-xs text-gray-500">
                {{ formatDate(driver.createdAt) }}
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-2 mb-3 text-xs">
              <div class="flex flex-col">
                <span class="text-gray-500">Email:</span>
                <span class="text-gray-900 truncate">{{ driver.email }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-gray-500">Phone:</span>
                <span class="text-gray-900">{{ driver.phone }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-gray-500">Vehicle:</span>
                <span class="text-gray-900">{{ formatVehicleType(driver.vehicleType) }} - {{ driver.vehiclePlate }}</span>
              </div>
            </div>
            
            <div class="flex space-x-2 mt-2">
              <button 
                @click="sendCredentials(driver)"
                class="flex-1 inline-flex justify-center items-center px-2 py-1.5 text-xs font-medium rounded border border-grab-green text-grab-green"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Credentials
              </button>
              <button 
                @click="confirmDeleteDriver(driver)"
                class="flex-1 inline-flex justify-center items-center px-2 py-1.5 text-xs font-medium rounded border border-rose-600 text-rose-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-10 sm:w-10 rounded-full bg-red-100 sm:mx-0">
                <svg class="h-5 w-5 sm:h-6 sm:w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-base sm:text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Delete Driver Account
                </h3>
                <div class="mt-2">
                  <p class="text-xs sm:text-sm text-gray-500">
                    Are you sure you want to delete the account for {{ driverToDelete?.fullName }}? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="deleteDriver"
              :disabled="deleting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 text-xs"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
            <button 
              type="button" 
              @click="showDeleteModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-xs"
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
import { ref, reactive, onMounted, computed } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { useNotificationStore } from '../../stores/notification';

const notificationStore = useNotificationStore();
const auth = getAuth();
const db = getFirestore();

// State
const drivers = ref([]);
const loading = ref(true);
const creating = ref(false);
const deleting = ref(false);
const showCreateForm = ref(false);
const showPassword = ref(false);
const showDeleteModal = ref(false);
const driverToDelete = ref(null);
const createError = ref('');
const createSuccess = ref('');
const generatedCredentials = ref(null);

// New driver form data
const newDriver = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  address: '',
  vehicleType: '',
  vehiclePlate: ''
});

// Placeholders for auto-generated fields
const emailPlaceholder = computed(() => {
  if (!newDriver.fullName) return 'Will be auto-generated';
  return `${generateUsernameFromName(newDriver.fullName)}@broomtech.com`;
});

const passwordPlaceholder = computed(() => {
  return 'Will be auto-generated';
});

// Generate username from full name
const generateUsernameFromName = (fullName) => {
  if (!fullName) return '';
  
  // Remove special characters and spaces, convert to lowercase
  const cleanName = fullName.toLowerCase().replace(/[^\w\s]/gi, '');
  
  // Split into parts
  const nameParts = cleanName.split(' ');
  
  if (nameParts.length === 1) {
    // If only one name, use it with a random number
    return `${nameParts[0]}${Math.floor(Math.random() * 1000)}`;
  } else {
    // Use first name and first letter of last name
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName}.${lastInitial}${Math.floor(Math.random() * 100)}`;
  }
};

// Generate random password
const generateRandomPassword = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  // Ensure at least one uppercase, one lowercase, one number, and one special character
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
  password += '0123456789'[Math.floor(Math.random() * 10)];
  password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

// Generate email based on name
const generateEmail = () => {
  if (!newDriver.fullName) {
    alert('Please enter the driver\'s full name first');
    return;
  }
  
  const username = generateUsernameFromName(newDriver.fullName);
  newDriver.email = `${username}@broomtech.com`;
};

// Generate password
const generatePassword = () => {
  newDriver.password = generateRandomPassword();
  showPassword.value = true; // Show the password when generated
};

// Get drivers by vehicle type
const getDriversByVehicleType = (type) => {
  if (loading.value) return 0;
  
  if (type === 'motorcycle') {
    return drivers.value.filter(driver => driver.vehicleType === 'motorcycle').length;
  } else if (type === 'other') {
    return drivers.value.filter(driver => driver.vehicleType !== 'motorcycle').length;
  }
  
  return 0;
};

// Fetch all driver accounts
const fetchDrivers = async () => {
  try {
    loading.value = true;
    const q = query(collection(db, 'users'), where('role', '==', 'driver'));
    const querySnapshot = await getDocs(q);
    
    const driversList = [];
    querySnapshot.forEach((doc) => {
      driversList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    drivers.value = driversList;
  } catch (error) {
    console.error('Error fetching drivers:', error);
  } finally {
    loading.value = false;
  }
};

// Create a new driver account
const createDriverAccount = async () => {
  createError.value = '';
  createSuccess.value = '';
  generatedCredentials.value = null;
  creating.value = true;
  
  try {
    // Auto-generate email if not provided
    if (!newDriver.email) {
      generateEmail();
    }
    
    // Auto-generate password if not provided
    if (!newDriver.password) {
      newDriver.password = generateRandomPassword();
    }
    
    // Save the generated credentials to display to admin
    generatedCredentials.value = {
      email: newDriver.email,
      password: newDriver.password
    };
    
    // 1. Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      newDriver.email,
      newDriver.password
    );
    
    const uid = userCredential.user.uid;
    
    // 2. Store driver data in Firestore
    await addDoc(collection(db, 'users'), {
      uid: uid,
      fullName: newDriver.fullName,
      email: newDriver.email,
      phone: newDriver.phone,
      address: newDriver.address,
      vehicleType: newDriver.vehicleType,
      vehiclePlate: newDriver.vehiclePlate,
      role: 'driver',
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid || 'unknown'
    });
    
    // 3. Create notification for the admin
    try {
      await notificationStore.createNotification({
        title: 'New Driver Account Created',
        message: `You have created a new driver account for ${newDriver.fullName}`,
        type: 'info',
        userId: auth.currentUser?.uid || 'unknown'
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Continue with the account creation even if notification fails
    }
    
    // 4. Reset form but keep the generated credentials visible
    Object.keys(newDriver).forEach(key => {
      if (key !== 'email' && key !== 'password') {
        newDriver[key] = '';
      }
    });
    
    createSuccess.value = 'Driver account created successfully! You can now send the credentials to the driver.';
    
    // 5. Refresh driver list
    await fetchDrivers();
  } catch (error) {
    console.error('Error creating driver account:', error);
    createError.value = error.message || 'Failed to create driver account';
    generatedCredentials.value = null;
  } finally {
    creating.value = false;
  }
};

// Send credentials to driver via email
const sendCredentials = async (driver) => {
  try {
    // Check if driver has an email
    if (!driver.email) {
      alert('This driver does not have an email address.');
      return;
    }
    
    // Try to create a notification, but don't let it fail the whole operation
    try {
      await notificationStore.createNotification({
        title: 'Credentials Sent',
        message: `Login credentials have been sent to ${driver.fullName} at ${driver.email}`,
        type: 'success',
        userId: auth.currentUser?.uid || 'unknown'
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Continue even if notification creation fails
    }
    
    // Show success message to admin
    alert(`Success! In a real application, an email would be sent to ${driver.email} with their login credentials.`);
  } catch (error) {
    console.error('Error sending credentials:', error);
    alert('An error occurred, but credentials were still marked as sent.');
  }
};

// Confirm delete driver
const confirmDeleteDriver = (driver) => {
  driverToDelete.value = driver;
  showDeleteModal.value = true;
};

// Delete driver account
const deleteDriver = async () => {
  if (!driverToDelete.value) return;
  
  deleting.value = true;
  
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, 'users', driverToDelete.value.id));
    
    // In a real application, you would also delete the Firebase Auth account
    // This requires Firebase Admin SDK or a Cloud Function
    
    // Create notification
    try {
      await notificationStore.createNotification({
        title: 'Driver Account Deleted',
        message: `Driver account for ${driverToDelete.value.fullName} has been deleted`,
        type: 'warning',
        userId: auth.currentUser?.uid || 'unknown'
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Continue even if notification creation fails
    }
    
    // Refresh driver list
    await fetchDrivers();
    
    // Close modal
    showDeleteModal.value = false;
    driverToDelete.value = null;
  } catch (error) {
    console.error('Error deleting driver account:', error);
    alert('Failed to delete driver account. Please try again.');
  } finally {
    deleting.value = false;
  }
};

// Helper functions
const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

const formatVehicleType = (type) => {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

// Load data on component mount
onMounted(() => {
  fetchDrivers();
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