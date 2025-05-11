<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
      <!-- Header with subtle animation -->
      <div class="text-center sm:text-left animate-fade-in">
        <h1 class="text-4xl font-extrabold mb-2 tracking-tight text-green-900">Book a Service</h1>
        <p class="mb-12 text-lg font-medium max-w-2xl text-green-600">Select from our premium range of services to get started</p>
      </div>
      
      <!-- Progress Steps with improved design -->
      <div class="mb-12 hidden sm:block">
        <div class="max-w-4xl mx-auto px-4">
          <div class="relative flex items-center justify-between">
            <div class="w-full flex items-center">
              <div class="relative flex flex-col items-center">
                <div 
                  class="rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold z-10 shadow-lg transform transition-transform duration-300 hover:scale-110 bg-green-600 text-white"
                >1</div>
                <div class="text-sm font-medium mt-3 text-green-600">Select Service</div>
              </div>
              <div 
                class="flex-1 h-1.5 mx-4 rounded-full transition-colors duration-300" 
                :class="currentStep > 1 ? 'bg-green-600' : 'bg-gray-300'"
              ></div>
              <div class="relative flex flex-col items-center">
                <div 
                  class="rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold z-10 shadow-lg transform transition-transform duration-300 hover:scale-110 transition-colors duration-300"
                  :class="currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'"
                >2</div>
                <div 
                  class="text-sm font-medium mt-3 transition-colors duration-300" 
                  :class="currentStep >= 2 ? 'text-green-600' : 'text-gray-500'"
                >Service Details</div>
              </div>
              <div 
                class="flex-1 h-1.5 mx-4 rounded-full transition-colors duration-300" 
                :class="currentStep > 2 ? 'bg-green-600' : 'bg-gray-300'"
              ></div>
              <div class="relative flex flex-col items-center">
                <div 
                  class="rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold z-10 shadow-lg transform transition-transform duration-300 hover:scale-110 transition-colors duration-300"
                  :class="currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'"
                >3</div>
                <div 
                  class="text-sm font-medium mt-3 transition-colors duration-300" 
                  :class="currentStep >= 3 ? 'text-green-600' : 'text-gray-500'"
                >Payment</div>
              </div>
              <div 
                class="flex-1 h-1.5 mx-4 rounded-full transition-colors duration-300" 
                :class="currentStep > 3 ? 'bg-green-600' : 'bg-gray-300'"
              ></div>
              <div class="relative flex flex-col items-center">
                <div 
                  class="rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold z-10 shadow-lg transform transition-transform duration-300 hover:scale-110 transition-colors duration-300"
                  :class="currentStep >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'"
                >4</div>
                <div 
                  class="text-sm font-medium mt-3 transition-colors duration-300" 
                  :class="currentStep >= 4 ? 'text-green-600' : 'text-gray-500'"
                >Confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center py-24">
          <div class="loader-container">
            <svg 
              class="animate-spin h-16 w-16 text-green-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-4 font-medium text-lg animate-pulse text-green-600">Loading services...</p>
          </div>
        </div>
        
        <div v-else>
          <!-- Service Selection with enhanced card design -->
          <div 
            v-if="currentStep === 1" 
            class="bg-white border-green-100 shadow-xl overflow-hidden rounded-2xl border transition-all duration-300 animate-fade-in"
          >
            <div class="px-8 py-10">
              <h2 class="text-2xl font-bold mb-8 flex items-center text-green-900">
                <span class="inline-flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                Select a Service
              </h2>
              
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div 
                  v-for="service in services" 
                  :key="service.id"
                  @click="selectService(service)"
                  class="relative rounded-xl px-6 py-8 shadow-lg flex flex-col items-center space-y-5 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
                  :class="selectedService?.id === service.id 
                    ? 'ring-4 ring-green-400 border-green-500 bg-white' 
                    : 'border border-gray-200 bg-white'"
                >
                  <div class="flex-shrink-0">
                    <div 
                      class="h-20 w-20 rounded-full flex items-center justify-center transition-colors duration-300 bg-green-100 group-hover:bg-green-600"
                    >
                      <svg 
                        class="h-10 w-10 transition-colors duration-300 text-green-600 group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-center">
                    <p class="text-lg font-bold group-hover:text-green-600 transition-colors duration-300 text-green-900">{{ service.name }}</p>
                    <p class="text-sm mt-2 leading-relaxed transition-colors duration-300 text-gray-500">{{ service.description }}</p>
                    <p class="text-lg font-semibold mt-4 group-hover:scale-110 transform transition-transform duration-300 text-green-600">₱{{ service.baseRate.toFixed(2) }}</p>
                  </div>
                  <div 
                    class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    v-if="selectedService?.id === service.id"
                  >
                    <span class="rounded-full p-1 flex items-center justify-center bg-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="mt-10 flex justify-end">
                <button 
                  @click="nextStep" 
                  :disabled="!selectedService"
                  class="bg-green-600 hover:bg-green-700 focus:ring-green-300 disabled:bg-gray-300 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white focus:outline-none focus:ring-4 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  Next Step
                  <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Service Details Form with enhanced inputs and validation -->
          <div 
            v-if="currentStep === 2" 
            class="bg-white border-green-100 shadow-xl overflow-hidden rounded-2xl border transition-all duration-300 animate-fade-in"
          >
            <div class="px-8 py-10">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold flex items-center text-green-900">
                  <span class="inline-flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </span>
                  {{ selectedService.name }} Details
                </h2>
                <button 
                  @click="currentStep = 1"
                  class="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-500 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-x-1"
                >
                  <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  Back
                </button>
              </div>
              
              <form @submit.prevent="validateAndProceed" class="rounded-lg">
                <!-- Food Delivery Form with validation -->
                <div v-if="selectedService.id === 'food_delivery'" class="space-y-6">
                  <div class="p-6 rounded-xl mb-8 border-l-4 bg-green-50 border-green-500">
                    <p class="font-medium text-green-800">Please provide details about your food delivery order.</p>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="col-span-1">
                      <label for="restaurant" class="block text-sm font-medium mb-1 text-gray-700">
                        Restaurant / Fast Food Name <span class="text-red-500">*</span>
                      </label>
                      <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="restaurant" 
                          v-model="bookingData.restaurant"
                          :class="[
                            'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                            errors.restaurant 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          ]"
                          maxlength="100"
                          placeholder="e.g., Jollibee, McDonald's, etc."
                          @blur="validateField('restaurant')"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.restaurant">
                          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.restaurant && !errors.restaurant">
                          <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p class="mt-1 text-sm text-red-600" v-if="errors.restaurant">{{ errors.restaurant }}</p>
                      <p class="mt-1 text-xs text-gray-500" v-else>Enter the restaurant name (max 100 characters)</p>
                    </div>
                    
                    <div class="col-span-1">
                      <label for="restaurant-location" class="block text-sm font-medium mb-1 text-gray-700">
                        Restaurant Location <span class="text-red-500">*</span>
                      </label>
                      <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="restaurant-location" 
                          v-model="bookingData.pickupLocation"
                          :class="[
                            'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                            errors.pickupLocation 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          ]"
                          maxlength="200"
                          placeholder="Enter restaurant address or location"
                          @blur="validateField('pickupLocation')"
                          ref="pickupLocationInput"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.pickupLocation">
                          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.pickupLocation && !errors.pickupLocation">
                          <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p class="mt-1 text-sm text-red-600" v-if="errors.pickupLocation">{{ errors.pickupLocation }}</p>
                      <p class="mt-1 text-xs text-gray-500" v-else>Enter a valid location address (max 200 characters)</p>
                      
                      <!-- Map Button -->
                      <button 
                        type="button"
                        @click="openMapModal('pickup')"
                        class="mt-2 inline-flex items-center px-3 py-1.5 border border-green-500 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Select on Map
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label for="order-details" class="block text-sm font-medium mb-1 text-gray-700">
                      Order Details <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <textarea 
                        id="order-details" 
                        v-model="bookingData.details"
                        :class="[
                          'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                          errors.details 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        ]"
                        rows="4" 
                        maxlength="500"
                        placeholder="List the items you want to order, including quantities and any special instructions"
                        @blur="validateField('details')"
                      ></textarea>
                      <div class="absolute top-3 right-3 pointer-events-none" v-if="errors.details">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="absolute top-3 right-3 pointer-events-none" v-else-if="bookingData.details && !errors.details">
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex justify-between mt-1">
                      <p class="text-sm text-red-600" v-if="errors.details">{{ errors.details }}</p>
                      <p class="text-xs text-gray-500" v-else>Provide detailed order information</p>
                      <p class="text-xs text-gray-500">{{ bookingData.details.length }}/500</p>
                    </div>
                  </div>
                  
                  <div>
                    <label for="delivery-address" class="block text-sm font-medium mb-1 text-gray-700">
                      Delivery Address <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        id="delivery-address" 
                        v-model="bookingData.dropLocation"
                        :class="[
                          'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                          errors.dropLocation 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        ]"
                        maxlength="200"
                        placeholder="Enter your delivery address"
                        @blur="validateField('dropLocation')"
                        ref="dropLocationInput"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.dropLocation">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.dropLocation && !errors.dropLocation">
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p class="mt-1 text-sm text-red-600" v-if="errors.dropLocation">{{ errors.dropLocation }}</p>
                    <p class="mt-1 text-xs text-gray-500" v-else>Enter a valid delivery address (max 200 characters)</p>
                    
                    <!-- Map Button -->
                    <button 
                      type="button"
                      @click="openMapModal('drop')"
                      class="mt-2 inline-flex items-center px-3 py-1.5 border border-green-500 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Select on Map
                    </button>
                  </div>
                </div>
                
                <!-- Pabili Service Form -->
                <div v-if="selectedService.id === 'pabili_service'" class="space-y-6">
                  <div class="p-6 rounded-xl mb-8 border-l-4 bg-green-50 border-green-500">
                    <p class="font-medium text-green-800">Please provide details about the items you want us to buy for you.</p>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="col-span-1">
                      <label for="store" class="block text-sm font-medium mb-1 text-gray-700">
                        Store / Shop Name <span class="text-red-500">*</span>
                      </label>
                      <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="store" 
                          v-model="bookingData.store"
                          :class="[
                            'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                            errors.store 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          ]"
                          maxlength="100"
                          placeholder="e.g., SM Supermarket, 7-Eleven, etc."
                          @blur="validateField('store')"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.store">
                          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.store && !errors.store">
                          <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p class="mt-1 text-sm text-red-600" v-if="errors.store">{{ errors.store }}</p>
                      <p class="mt-1 text-xs text-gray-500" v-else>Enter the store name (max 100 characters)</p>
                    </div>
                    
                    <div class="col-span-1">
                      <label for="store-location" class="block text-sm font-medium mb-1 text-gray-700">
                        Store Location <span class="text-red-500">*</span>
                      </label>
                      <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="store-location" 
                          v-model="bookingData.pickupLocation"
                          :class="[
                            'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                            errors.pickupLocation 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                          ]"
                          maxlength="200"
                          placeholder="Enter store address or location"
                          @blur="validateField('pickupLocation')"
                          ref="pickupLocationInput"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.pickupLocation">
                          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.pickupLocation && !errors.pickupLocation">
                          <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p class="mt-1 text-sm text-red-600" v-if="errors.pickupLocation">{{ errors.pickupLocation }}</p>
                      <p class="mt-1 text-xs text-gray-500" v-else>Enter a valid location address (max 200 characters)</p>
                      
                      <!-- Map Button -->
                      <button 
                        type="button"
                        @click="openMapModal('pickup')"
                        class="mt-2 inline-flex items-center px-3 py-1.5 border border-green-500 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Select on Map
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label for="items-details" class="block text-sm font-medium mb-1 text-gray-700">
                      Items to Purchase <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <textarea 
                        id="items-details" 
                        v-model="bookingData.details"
                        :class="[
                          'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                          errors.details 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        ]"
                        rows="4" 
                        maxlength="500"
                        placeholder="List the items you want us to buy, including quantities, brands, and any specific instructions"
                        @blur="validateField('details')"
                      ></textarea>
                      <div class="absolute top-3 right-3 pointer-events-none" v-if="errors.details">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="absolute top-3 right-3 pointer-events-none" v-else-if="bookingData.details && !errors.details">
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex justify-between mt-1">
                      <p class="text-sm text-red-600" v-if="errors.details">{{ errors.details }}</p>
                      <p class="text-xs text-gray-500" v-else>Provide detailed information about the items</p>
                      <p class="text-xs text-gray-500">{{ bookingData.details.length }}/500</p>
                    </div>
                  </div>
                  
                  <div>
                    <label for="delivery-address-pabili" class="block text-sm font-medium mb-1 text-gray-700">
                      Delivery Address <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        id="delivery-address-pabili" 
                        v-model="bookingData.dropLocation"
                        :class="[
                          'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                          errors.dropLocation 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        ]"
                        maxlength="200"
                        placeholder="Enter your delivery address"
                        @blur="validateField('dropLocation')"
                        ref="dropLocationInput"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.dropLocation">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.dropLocation && !errors.dropLocation">
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p class="mt-1 text-sm text-red-600" v-if="errors.dropLocation">{{ errors.dropLocation }}</p>
                    <p class="mt-1 text-xs text-gray-500" v-else>Enter a valid delivery address (max 200 characters)</p>
                    
                    <!-- Map Button -->
                    <button 
                      type="button"
                      @click="openMapModal('drop')"
                      class="mt-2 inline-flex items-center px-3 py-1.5 border border-green-500 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Select on Map
                    </button>
                  </div>
                </div>
                
                <!-- Pay Bills Form -->
                <div v-if="selectedService.id === 'pay_bills'" class="space-y-6">
                  <!-- Similar pattern for other service forms - adding map buttons to location fields -->
                  <!-- ... existing code ... -->
                  
                  <div class="col-span-1">
                    <label for="payment-location" class="block text-sm font-medium mb-1 text-gray-700">
                      Payment Location <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        id="payment-location" 
                        v-model="bookingData.pickupLocation"
                        :class="[
                          'pl-10 block w-full sm:text-sm rounded-lg transition-colors duration-200',
                          errors.pickupLocation 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-red-50'
                            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                        ]"
                        maxlength="200"
                        placeholder="Enter payment center location"
                        @blur="validateField('pickupLocation')"
                        ref="pickupLocationInput"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="errors.pickupLocation">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-else-if="bookingData.pickupLocation && !errors.pickupLocation">
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p class="mt-1 text-sm text-red-600" v-if="errors.pickupLocation">{{ errors.pickupLocation }}</p>
                    <p class="mt-1 text-xs text-gray-500" v-else>Enter a valid payment center location (max 200 characters)</p>
                    
                    <!-- Map Button -->
                    <button 
                      type="button"
                      @click="openMapModal('pickup')"
                      class="mt-2 inline-flex items-center px-3 py-1.5 border border-green-500 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Select on Map
                    </button>
                  </div>
                </div>
                
                <!-- Form validation summary -->
                <div 
                  v-if="hasErrors" 
                  class="mt-6 p-4 rounded-md border-l-4 bg-red-50 border-red-500"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">Please correct the following errors before proceeding:</h3>
                      <div class="mt-2 text-sm text-red-700">
                        <ul class="list-disc pl-5 space-y-1">
                          <li v-for="(error, field) in errors" :key="field" v-if="error">
                            {{ error }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-10 flex justify-end space-x-4">
                  <button 
                    type="button"
                    @click="currentStep = 1"
                    class="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-500 inline-flex items-center px-5 py-3 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-x-1"
                  >
                    <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    Back
                  </button>
                  <button 
                    type="submit"
                    class="bg-green-600 hover:bg-green-700 focus:ring-green-300 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white focus:outline-none focus:ring-4 transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Payment
                    <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Payment and Confirmation with enhanced visuals -->
          <div 
            v-if="currentStep === 3" 
            class="bg-white border-green-100 shadow-xl overflow-hidden rounded-2xl border transition-all duration-300 animate-fade-in"
          >
            <div class="px-8 py-10">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold flex items-center text-green-900">
                  <span class="inline-flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Payment & Confirmation
                </h2>
                <button 
                  @click="currentStep = 2"
                  class="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-500 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-x-1"
                >
                  <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  Back
                </button>
              </div>
              
              <!-- Order Summary with enhanced styling -->
              <div class="p-8 rounded-xl mb-8 border shadow-sm bg-gradient-to-br from-green-50 to-white border-green-100">
                <h3 class="text-xl font-bold mb-6 flex items-center text-green-900">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 mr-2 text-green-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 013 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L7 4.323V3a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Order Summary
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between pb-4 items-center border-b border-green-100">
                    <span class="text-sm font-medium text-gray-600">Service:</span>
                    <span class="text-sm font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">{{ selectedService.name }}</span>
                  </div>
                  <div 
                    v-if="bookingData.restaurant" 
                    class="flex justify-between pb-4 items-center border-b border-green-100"
                  >
                    <span class="text-sm font-medium text-gray-600">Restaurant:</span>
                    <span class="text-sm font-bold text-green-800">{{ bookingData.restaurant }}</span>
                  </div>
                  <div class="flex justify-between pb-4 items-center border-b border-green-100">
                    <span class="text-sm font-medium text-gray-600">Pickup Location:</span>
                    <span class="text-sm font-bold max-w-xs text-right text-green-800">{{ bookingData.pickupLocation }}</span>
                  </div>
                  <div class="flex justify-between pb-4 items-center border-b border-green-100">
                    <span class="text-sm font-medium text-gray-600">Delivery Location:</span>
                    <span class="text-sm font-bold max-w-xs text-right text-green-800">{{ bookingData.dropLocation }}</span>
                  </div>
                  <div class="flex justify-between pb-4 items-start">
                    <span class="text-sm font-medium text-gray-600">Details:</span>
                    <span class="text-sm font-bold text-right max-w-xs text-green-800">{{ bookingData.details }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Payment Method Selection with enhanced styling and validation -->
              <div class="mb-8 p-8 rounded-xl border shadow-sm bg-white border-green-100">
                <h3 class="text-xl font-bold mb-6 flex items-center text-green-900">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 mr-2 text-green-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                  </svg>
                  Payment Method
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id" 
                    :class="[
                      'relative flex items-center p-5 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border',
                      bookingData.paymentMethod === method.id 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-green-300',
                      errors.paymentMethod && !bookingData.paymentMethod 
                        ? 'border-red-300' 
                        : ''
                    ]"
                    @click="selectPaymentMethod(method.id)"
                  >
                    <input 
                      :id="method.id" 
                      name="payment-method" 
                      type="radio" 
                      :value="method.id"
                      v-model="bookingData.paymentMethod"
                      class="text-green-600 border-gray-300 focus:ring-green-500 h-5 w-5"
                      @blur="validateField('paymentMethod')"
                    />
                    <label 
                      :for="method.id" 
                      class="ml-3 block font-medium cursor-pointer w-full text-gray-700"
                    >
                      {{ method.name }}
                    </label>
                  </div>
                </div>
                <p class="mt-2 text-sm text-red-600" v-if="errors.paymentMethod">{{ errors.paymentMethod }}</p>
              </div>
              
              <!-- Fee Calculation with enhanced styling -->
              <div class="p-8 rounded-xl mb-8 border shadow-sm bg-gradient-to-br from-green-50 to-white border-green-100">
                <h3 class="text-xl font-bold mb-6 flex items-center text-green-900">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 mr-2 text-green-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 013 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L7 4.323V3a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Fee Calculation
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between pb-4 items-center border-b border-green-100">
                    <span class="text-sm font-medium text-gray-600">Base Fee:</span>
                    <span class="text-sm font-bold text-green-800">₱{{ baseRate.toFixed(2) }}</span>
                  </div>
                  <div 
                    v-if="weatherFee > 0" 
                    class="flex justify-between pb-4 items-center border-b border-green-100"
                  >
                    <span class="text-sm font-medium text-gray-600">Bad Weather Fee:</span>
                    <span class="text-sm font-bold text-green-800">₱{{ weatherFee.toFixed(2) }}</span>
                  </div>
                  <div 
                    v-if="distanceFee > 0" 
                    class="flex justify-between pb-4 items-center border-b border-green-100"
                  >
                    <span class="text-sm font-medium text-gray-600">Distance Fee:</span>
                    <span class="text-sm font-bold text-green-800">₱{{ distanceFee.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between pt-3">
                    <span class="text-lg font-bold text-green-900">Total Fee:</span>
                    <span class="text-lg font-bold px-4 py-1 rounded-lg bg-green-100 text-green-600">₱{{ totalFee.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Submit Button with enhanced styling -->
              <div class="flex justify-end">
                <button 
                  @click="validateAndSubmit"
                  :disabled="submitting || !bookingData.paymentMethod"
                  class="bg-green-600 hover:bg-green-700 focus:ring-green-300 disabled:bg-gray-300 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white focus:outline-none focus:ring-4 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  <span class="relative">
                    {{ submitting ? 'Processing...' : 'Confirm Booking' }}
                    <span v-if="submitting" class="absolute bottom-0 left-0 w-full h-0.5 bg-white animate-progress"></span>
                  </span>
                  <svg v-if="!submitting" class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else class="animate-spin ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Success Message with enhanced styling -->
          <div 
            v-if="currentStep === 4" 
            class="bg-white border-green-100 shadow-xl overflow-hidden rounded-2xl border transition-all duration-300 animate-fade-in"
          >
            <div class="px-8 py-12 text-center">
              <div class="rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 animate-success-appear bg-green-100">
                <svg 
                  class="h-14 w-14 text-green-600" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold mb-4 animate-success-appear text-green-900">Booking Successful!</h3>
              <p class="text-lg mb-10 max-w-lg mx-auto animate-success-appear delay-100 text-gray-600">
                Your booking has been successfully submitted. You can track your order status in the order history.
              </p>
              <div class="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-success-appear delay-200">
                <router-link 
                  :to="`/user/order-tracking/${createdBookingId}`"
                  class="bg-green-600 hover:bg-green-700 focus:ring-green-300 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white focus:outline-none focus:ring-4 transition-all duration-300 transform hover:scale-105"
                >
                  Track Order
                  <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </router-link>
                <button 
                  @click="resetForm"
                  class="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-500 inline-flex items-center justify-center px-8 py-4 border text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Google Maps Modal -->
  <div v-if="showMapModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeMapModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Select Location on Map
              </h3>
              <div class="mt-4">
                <div class="mb-4">
                  <div class="relative rounded-md shadow-sm">
                    <input 
                      type="text" 
                      v-model="searchQuery"
                      class="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Search for a location..."
                      @keyup.enter="searchLocation"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button @click="searchLocation" class="text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Map Container -->
                <div id="map" class="w-full h-96 rounded-lg border border-gray-300"></div>
                
                <!-- Selected Location Display -->
                <div class="mt-4 p-3 bg-green-50 rounded-md border border-green-200" v-if="selectedLocation">
                  <p class="text-sm text-green-800">
                    <span class="font-medium">Selected Location:</span> {{ selectedLocation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="confirmLocation"
          >
            Confirm Location
          </button>
          <button 
            type="button" 
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeMapModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  import { useBookingStore } from '../../stores/booking';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const bookingStore = useBookingStore();
  
  const loading = ref(false);
  const submitting = ref(false);
  const currentStep = ref(1);
  const selectedService = ref(null);
  const createdBookingId = ref(null);
  const errors = reactive({});
  
  // Google Maps related refs
  const showMapModal = ref(false);
  const map = ref(null);
  const marker = ref(null);
  const geocoder = ref(null);
  const searchQuery = ref('');
  const selectedLocation = ref('');
  const currentLocationField = ref(''); // 'pickup' or 'drop'
  const pickupLocationInput = ref(null);
  const dropLocationInput = ref(null);
  
  const bookingData = reactive({
    service: '',
    restaurant: '',
    store: '',
    biller: '',
    pickupLocation: '',
    dropLocation: '',
    details: '',
    recipientName: '',
    recipientContact: '',
    paymentMethod: 'cash',
    amount: 0,
    weather: 'normal', // normal, rainy, stormy
    additionalFees: 0,
    totalAmount: 0,
    // New fields for coordinates
    pickupLat: null,
    pickupLng: null,
    dropLat: null,
    dropLng: null
  });
  
  const services = ref([
    {
      id: 'food_delivery',
      name: 'FOOD DELIVERY',
      description: 'Get your favorite food delivered to your doorstep.',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      baseRate: 55
    },
    {
      id: 'pabili_service',
      name: 'PABILI SERVICE',
      description: 'We can buy items for you and deliver them to your location.',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      baseRate: 50
    },
    {
      id: 'pay_bills',
      name: 'PAY BILLS',
      description: 'Save time by having someone pay your bills for you.',
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      baseRate: 60
    },
    {
      id: 'pickup_drop',
      name: 'PICKUP & DROP',
      description: 'We can pick up and deliver parcels or items for you.',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
      baseRate: 70
    },
    {
      id: 'gifts_delivery',
      name: 'SURPRISE / GIFTS DELIVERY',
      description: 'Send gifts and surprises to your loved ones.',
      icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
      baseRate: 65
    },
    {
      id: 'remittances',
      name: 'REMITTANCES / PADALA MONEY',
      description: 'Send money to your loved ones through our secure service.',
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      baseRate: 80
    },
    {
      id: 'groceries',
      name: 'GROCERIES / SHOPPING',
      description: 'Let us do your grocery shopping for you.',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      baseRate: 100
    },
    {
      id: 'medicines',
      name: 'MEDICINES / DRUGSTORE',
      description: 'Need medicine but can\'t leave home? We can help.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      baseRate: 75
    }
  ]);
  
  const paymentMethods = ref([
    { id: 'cash', name: 'Cash on Delivery' },
    { id: 'gcash', name: 'GCash' },
    { id: 'paymaya', name: 'PayMaya' },
    { id: 'gotyme', name: 'GoTyme Bank' }
  ]);
  
  const baseRate = computed(() => {
    return selectedService.value ? selectedService.value.baseRate : 0;
  });
  
  const weatherFee = computed(() => {
    // Add 10 PHP for bad weather
    return bookingData.weather === 'rainy' ? 10 : 
           bookingData.weather === 'stormy' ? 20 : 0;
  });
  
  const distanceFee = computed(() => {
    // Calculate distance fee based on coordinates if available
    if (bookingData.pickupLat && bookingData.pickupLng && bookingData.dropLat && bookingData.dropLng) {
      const distance = calculateDistance(
        bookingData.pickupLat, 
        bookingData.pickupLng, 
        bookingData.dropLat, 
        bookingData.dropLng
      );
      
      // Apply a rate of 5 PHP per kilometer
      return Math.round(distance * 5);
    }
    
    // Fallback to default fee if coordinates not available
    return 15;
  });
  
  const totalFee = computed(() => {
    return baseRate.value + weatherFee.value + distanceFee.value;
  });
  
  const hasErrors = computed(() => {
    return Object.values(errors).some(error => !!error);
  });
  
  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };
  
  // Validation rules
  const validateField = (field) => {
    errors[field] = '';
  
    switch(field) {
      case 'restaurant':
        if (selectedService.value?.id === 'food_delivery' && !bookingData.restaurant.trim()) {
          errors.restaurant = 'Restaurant name is required';
        } else if (bookingData.restaurant && bookingData.restaurant.length < 3) {
          errors.restaurant = 'Restaurant name must be at least 3 characters';
        }
        break;
      
      case 'store':
        if (selectedService.value?.id === 'pabili_service' && !bookingData.store.trim()) {
          errors.store = 'Store name is required';
        } else if (bookingData.store && bookingData.store.length < 3) {
          errors.store = 'Store name must be at least 3 characters';
        }
        break;
      
      case 'biller':
        if (selectedService.value?.id === 'pay_bills' && !bookingData.biller.trim()) {
          errors.biller = 'Biller name is required';
        } else if (bookingData.biller && bookingData.biller.length < 3) {
          errors.biller = 'Biller name must be at least 3 characters';
        }
        break;
      
      case 'pickupLocation':
        if (!bookingData.pickupLocation.trim()) {
          errors.pickupLocation = 'Pickup location is required';
        } else if (bookingData.pickupLocation.length < 5) {
          errors.pickupLocation = 'Please enter a valid pickup location (minimum 5 characters)';
        }
        break;
      
      case 'dropLocation':
        if (!bookingData.dropLocation.trim()) {
          errors.dropLocation = 'Delivery location is required';
        } else if (bookingData.dropLocation.length < 5) {
          errors.dropLocation = 'Please enter a valid delivery address (minimum 5 characters)';
        }
        break;
      
      case 'details':
        if (!bookingData.details.trim()) {
          errors.details = 'Details are required';
        } else if (bookingData.details.length < 10) {
          errors.details = 'Please provide more detailed information (minimum 10 characters)';
        }
        break;
      
      case 'recipientName':
        if (selectedService.value?.id === 'pickup_drop' && !bookingData.recipientName.trim()) {
          errors.recipientName = 'Recipient name is required';
        } else if (bookingData.recipientName && bookingData.recipientName.length < 3) {
          errors.recipientName = 'Recipient name must be at least 3 characters';
        }
        break;
      
      case 'recipientContact':
        if (selectedService.value?.id === 'pickup_drop' && !bookingData.recipientContact.trim()) {
          errors.recipientContact = 'Recipient contact number is required';
        } else if (bookingData.recipientContact) {
          const phonePattern = /^(\+?63|0)9\d{9}$/;
          if (!phonePattern.test(bookingData.recipientContact.replace(/\s/g, ''))) {
            errors.recipientContact = 'Please enter a valid Philippine phone number (+63/09 format)';
          }
        }
        break;
      
      case 'paymentMethod':
        if (!bookingData.paymentMethod) {
          errors.paymentMethod = 'Please select a payment method';
        }
        break;
    }
  
    return !errors[field];
  };
  
  // Validate all form fields based on the current service type
  const validateForm = () => {
    let isValid = true;
  
    // Common validation for all services
    isValid = validateField('pickupLocation') && isValid;
    isValid = validateField('dropLocation') && isValid;
    isValid = validateField('details') && isValid;
  
    // Service-specific validation
    if (selectedService.value?.id === 'food_delivery') {
      isValid = validateField('restaurant') && isValid;
    }
  
    if (selectedService.value?.id === 'pabili_service') {
      isValid = validateField('store') && isValid;
    }
  
    if (selectedService.value?.id === 'pay_bills') {
      isValid = validateField('biller') && isValid;
    }
  
    if (selectedService.value?.id === 'pickup_drop') {
      isValid = validateField('recipientName') && isValid;
      isValid = validateField('recipientContact') && isValid;
    }
  
    return isValid;
  };
  
  const validatePaymentForm = () => {
    return validateField('paymentMethod');
  };
  
  // Formats phone number with spaces for better readability
  const formatPhoneNumber = (event) => {
    let input = event.target.value.replace(/\D/g, ''); // Remove all non-digits
  
    // Format as +63 9XX XXX XXXX or 09XX XXX XXXX
    if (input.startsWith('63')) {
      input = '+' + input.substring(0, 2) + ' ' + input.substring(2);
      if (input.length > 6) {
        input = input.substring(0, 6) + ' ' + input.substring(6);
      }
      if (input.length > 10) {
        input = input.substring(0, 10) + ' ' + input.substring(10);
      }
    } else if (input.startsWith('0')) {
      input = input.substring(0, 2) + ' ' + input.substring(2);
      if (input.length > 5) {
        input = input.substring(0, 5) + ' ' + input.substring(5);
      }
      if (input.length > 9) {
        input = input.substring(0, 9) + ' ' + input.substring(9);
      }
    }
  
    // Limit to 15 characters total (with spaces and plus)
    bookingData.recipientContact = input.substring(0, 15);
  };
  
  const selectService = (service) => {
    selectedService.value = service;
    bookingData.service = service.name;
  };
  
  const selectPaymentMethod = (methodId) => {
    bookingData.paymentMethod = methodId;
    validateField('paymentMethod');
  };
  
  const validateAndProceed = () => {
    if (validateForm()) {
      // Calculate fees
      bookingData.amount = baseRate.value;
      bookingData.additionalFees = weatherFee.value + distanceFee.value;
      bookingData.totalAmount = totalFee.value;
      
      currentStep.value = 3;
    } else {
      // Show validation errors at the top of the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const validateAndSubmit = async () => {
    if (!validatePaymentForm()) {
      return;
    }
  
    submitting.value = true;
  
    try {
      if (!authStore.user) {
        throw new Error("Please login to create a booking");
      }
  
      // Validate required fields again just to be sure
      if (!bookingData.pickupLocation || !bookingData.dropLocation || !bookingData.details) {
        throw new Error("Please fill in all required fields");
      }
  
      // Create booking in Firestore with coordinates
      const booking = await bookingStore.createBooking({
        service: selectedService.value.name,
        details: bookingData.details,
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        paymentMethod: bookingData.paymentMethod,
        amount: bookingData.amount,
        weather: bookingData.weather,
        additionalFees: bookingData.additionalFees,
        totalAmount: bookingData.totalAmount,
        restaurant: bookingData.restaurant,
        recipientName: bookingData.recipientName,
        recipientContact: bookingData.recipientContact,
        // Add coordinates
        pickupLat: bookingData.pickupLat,
        pickupLng: bookingData.pickupLng,
        dropLat: bookingData.dropLat,
        dropLng: bookingData.dropLng
      });
  
      createdBookingId.value = booking.id;
      currentStep.value = 4;
  
      window.$notification?.success('Success', 'Your booking has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      window.$notification?.error('Error', error.message || 'Failed to submit booking. Please try again.');
    } finally {
      submitting.value = false;
    }
  };
  
  const nextStep = () => {
    if (currentStep.value === 1 && !selectedService.value) {
      window.$notification?.error('Error', 'Please select a service');
      return;
    }
  
    currentStep.value += 1;
  };
  
  const resetForm = () => {
    // Clear all form data
    selectedService.value = null;
    Object.keys(bookingData).forEach(key => {
      if (key === 'weather') {
        bookingData[key] = 'normal';
      } else if (key === 'paymentMethod') {
        bookingData[key] = 'cash';
      } else {
        bookingData[key] = '';
      }
    });
    bookingData.amount = 0;
    bookingData.additionalFees = 0;
    bookingData.totalAmount = 0;
    bookingData.pickupLat = null;
    bookingData.pickupLng = null;
    bookingData.dropLat = null;
    bookingData.dropLng = null;
  
    // Clear all errors
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
  
    // Reset to first step
    currentStep.value = 1;
  };
  
  // Google Maps related functions
  const initMap = () => {
    // Default to Philippines center
    const defaultLocation = { lat: 14.5995, lng: 120.9842 };
    
    // Check if google maps is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.error('Google Maps API not loaded');
      return;
    }

    // Create map instance
    map.value = new google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 12,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });
    
    // Create geocoder instance
    geocoder.value = new google.maps.Geocoder();
    
    // Create marker instance
    marker.value = new google.maps.Marker({
      map: map.value,
      draggable: true,
      position: defaultLocation
    });
    
    // Add event listener for marker drag end
    google.maps.event.addListener(marker.value, 'dragend', function() {
      const position = marker.value.getPosition();
      reverseGeocode(position.lat(), position.lng());
    });
    
    // Add event listener for map click
    google.maps.event.addListener(map.value, 'click', function(event) {
      marker.value.setPosition(event.latLng);
      reverseGeocode(event.latLng.lat(), event.latLng.lng());
    });
  };
  
  const openMapModal = (locationType) => {
    currentLocationField.value = locationType;
    showMapModal.value = true;
    
    // Initialize map after modal is shown
    setTimeout(() => {
      if (!map.value) {
        initMap();
      }
      
      // Try to center map on existing location if available
      if (locationType === 'pickup' && bookingData.pickupLat && bookingData.pickupLng) {
        const position = { lat: bookingData.pickupLat, lng: bookingData.pickupLng };
        map.value.setCenter(position);
        marker.value.setPosition(position);
      } else if (locationType === 'drop' && bookingData.dropLat && bookingData.dropLng) {
        const position = { lat: bookingData.dropLat, lng: bookingData.dropLng };
        map.value.setCenter(position);
        marker.value.setPosition(position);
      } else {
        // Try to get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map.value.setCenter(pos);
              marker.value.setPosition(pos);
              reverseGeocode(pos.lat, pos.lng);
            },
            () => {
              // Handle location error - use default location
              console.log('Error: The Geolocation service failed.');
            }
          );
        }
      }
    }, 300);
  };
  
  const closeMapModal = () => {
    showMapModal.value = false;
    searchQuery.value = '';
  };
  
  const searchLocation = () => {
    if (!searchQuery.value.trim()) return;
    
    geocoder.value.geocode({ address: searchQuery.value }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        map.value.setCenter(location);
        marker.value.setPosition(location);
        
        // Update selected location
        selectedLocation.value = results[0].formatted_address;
      } else {
        window.$notification?.error('Error', 'Location not found. Please try a different search.');
      }
    });
  };
  
  const reverseGeocode = (lat, lng) => {
    const latlng = { lat, lng };
    
    geocoder.value.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        selectedLocation.value = results[0].formatted_address;
      } else {
        selectedLocation.value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
      }
    });
  };
  
  const confirmLocation = () => {
    if (!selectedLocation.value) {
      window.$notification?.error('Error', 'Please select a location on the map first.');
      return;
    }
    
    const position = marker.value.getPosition();
    const lat = position.lat();
    const lng = position.lng();
    
    if (currentLocationField.value === 'pickup') {
      bookingData.pickupLocation = selectedLocation.value;
      bookingData.pickupLat = lat;
      bookingData.pickupLng = lng;
      validateField('pickupLocation');
    } else if (currentLocationField.value === 'drop') {
      bookingData.dropLocation = selectedLocation.value;
      bookingData.dropLat = lat;
      bookingData.dropLng = lng;
      validateField('dropLocation');
    }
    
    closeMapModal();
  };
  
  // Load Google Maps API
  const loadGoogleMapsAPI = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDAY9tsXQublAc2y54vPqMy2bZuXYY6I5o&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Google Maps API is loaded, you can now use 'google'
      console.log('Google Maps API loaded');
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps API');
    };
  };
  
  // Initialize component
  onMounted(() => {
    // Check if user is logged in
    if (!authStore.user) {
      window.$notification?.warning('Authentication Required', 'Please login to book a service');
      router.push('/login?redirect=/book-service');
    }
    
    // Load Google Maps API
    loadGoogleMapsAPI();
  });
  
  onUnmounted(() => {
    // Clean up Google Maps instances
    if (map.value) {
      google.maps.event.clearInstanceListeners(map.value);
    }
    if (marker.value) {
      google.maps.event.clearInstanceListeners(marker.value);
    }
  });
  </script>
  
  <style scoped>
  /* Base transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  /* Transform effects */
  .transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  
  /* Fade-in animation */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Form validation shake animation */
  .input-error {
    animation: shakeX 0.5s;
  }
  
  @keyframes shakeX {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  /* Success animations */
  .animate-success-appear {
    opacity: 0;
    transform: scale(0.9);
    animation: successAppear 0.6s ease-out forwards;
  }
  
  .delay-100 {
    animation-delay: 0.1s;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  
  @keyframes successAppear {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  /* Button progress animation */
  .animate-progress {
    animation: progress 2s linear infinite;
  }
  
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  
  /* Pulse animation */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  /* Input focus outline animation */
  input:focus, textarea:focus {
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.3);
    transition: box-shadow 0.2s ease-in-out;
  }
  
  /* Invalid input shake animation */
  input:invalid:focus, textarea:invalid:focus {
    animation: shakeX 0.5s;
  }
  </style>