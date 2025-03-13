<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Book a Service</h1>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else>
          <!-- Service Selection -->
          <div v-if="currentStep === 1" class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Select a Service</h2>
              
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div 
                  v-for="service in services" 
                  :key="service.id"
                  @click="selectService(service)"
                  class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-500 hover:ring-1 hover:ring-primary-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 cursor-pointer"
                  :class="{ 'border-primary-500 ring-1 ring-primary-500': selectedService?.id === service.id }"
                >
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg class="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <a href="#" class="focus:outline-none">
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                      <p class="text-sm text-gray-500 truncate">{{ service.description }}</p>
                    </a>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 flex justify-end">
                <button 
                  @click="nextStep" 
                  :disabled="!selectedService"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
          <!-- Service Details Form -->
          <div v-if="currentStep === 2" class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg leading-6 font-medium text-gray-900">{{ selectedService.name }} Details</h2>
                <button 
                  @click="currentStep = 1"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
              </div>
              
              <form @submit.prevent="nextStep">
                <!-- Different forms based on service type -->
                <!-- Food Delivery Form -->
                <div v-if="selectedService.id === 'food_delivery'" class="space-y-6">
                  <div>
                    <label for="restaurant" class="block text-sm font-medium text-gray-700">Restaurant / Fast Food Name</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="restaurant" 
                        v-model="bookingData.restaurant"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="e.g., Jollibee, McDonald's, etc."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="restaurant-location" class="block text-sm font-medium text-gray-700">Restaurant Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="restaurant-location" 
                        v-model="bookingData.pickupLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter restaurant address or location"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="order-details" class="block text-sm font-medium text-gray-700">Order Details</label>
                    <div class="mt-1">
                      <textarea 
                        id="order-details" 
                        v-model="bookingData.details"
                        required
                        rows="3" 
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List the items you want to order, including quantities and any special instructions"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label for="delivery-address" class="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="delivery-address" 
                        v-model="bookingData.dropLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Pabili Service Form -->
                <div v-else-if="selectedService.id === 'pabili_service'" class="space-y-6">
                  <div>
                    <label for="store" class="block text-sm font-medium text-gray-700">Store Name</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="store" 
                        v-model="bookingData.store"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="e.g., 7-Eleven, Mercury Drug, etc."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="store-location" class="block text-sm font-medium text-gray-700">Store Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="store-location" 
                        v-model="bookingData.pickupLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter store address or location"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="items-to-buy" class="block text-sm font-medium text-gray-700">Items to Buy</label>
                    <div class="mt-1">
                      <textarea 
                        id="items-to-buy" 
                        v-model="bookingData.details"
                        required
                        rows="3" 
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List the items you want to buy, including quantities and any specific brands"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label for="delivery-address" class="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="delivery-address" 
                        v-model="bookingData.dropLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Pay Bills Form -->
                <div v-else-if="selectedService.id === 'pay_bills'" class="space-y-6">
                  <div>
                    <label for="biller" class="block text-sm font-medium text-gray-700">Biller Name</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="biller" 
                        v-model="bookingData.biller"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="e.g., Meralco, PLDT, Maynilad, etc."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="payment-location" class="block text-sm font-medium text-gray-700">Payment Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="payment-location" 
                        v-model="bookingData.pickupLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter payment center location"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="bill-details" class="block text-sm font-medium text-gray-700">Bill Details</label>
                    <div class="mt-1">
                      <textarea 
                        id="bill-details" 
                        v-model="bookingData.details"
                        required
                        rows="3" 
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Include account number, amount, due date, and any other relevant information"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label for="receipt-delivery" class="block text-sm font-medium text-gray-700">Receipt Delivery Address</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="receipt-delivery" 
                        v-model="bookingData.dropLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Where should we deliver the receipt?"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Pickup & Drop Form -->
                <div v-else-if="selectedService.id === 'pickup_drop'" class="space-y-6">
                  <div>
                    <label for="pickup-location" class="block text-sm font-medium text-gray-700">Pickup Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="pickup-location" 
                        v-model="bookingData.pickupLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter pickup address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="drop-location" class="block text-sm font-medium text-gray-700">Drop-off Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="drop-location" 
                        v-model="bookingData.dropLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter drop-off address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="item-details" class="block text-sm font-medium text-gray-700">Item Details</label>
                    <div class="mt-1">
                      <textarea 
                        id="item-details" 
                        v-model="bookingData.details"
                        required
                        rows="3" 
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe the item(s) to be picked up and delivered, including size, weight, and any special handling instructions"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label for="recipient-name" class="block text-sm font-medium text-gray-700">Recipient Name</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="recipient-name" 
                        v-model="bookingData.recipientName"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Who will receive the item?"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="recipient-contact" class="block text-sm font-medium text-gray-700">Recipient Contact Number</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="recipient-contact" 
                        v-model="bookingData.recipientContact"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Recipient's phone number"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Generic Form for Other Services -->
                <div v-else class="space-y-6">
                  <div>
                    <label for="pickup-location" class="block text-sm font-medium text-gray-700">Pickup Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="pickup-location" 
                        v-model="bookingData.pickupLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter pickup address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="drop-location" class="block text-sm font-medium text-gray-700">Delivery Location</label>
                    <div class="mt-1">
                      <input 
                        type="text" 
                        id="drop-location" 
                        v-model="bookingData.dropLocation"
                        required
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        placeholder="Enter delivery address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="service-details" class="block text-sm font-medium text-gray-700">Service Details</label>
                    <div class="mt-1">
                      <textarea 
                        id="service-details" 
                        v-model="bookingData.details"
                        required
                        rows="3" 
                        class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Provide all necessary details for this service"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button"
                    @click="currentStep = 1"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Payment and Confirmation -->
          <div v-if="currentStep === 3" class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Payment & Confirmation</h2>
                <button 
                  @click="currentStep = 2"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
              </div>
              
              <!-- Order Summary -->
              <div class="bg-gray-50 p-4 rounded-md mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-2">Order Summary</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-500">Service:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedService.name }}</span>
                  </div>
                  <div v-if="bookingData.restaurant" class="flex justify-between">
                    <span class="text-sm text-gray-500">Restaurant:</span>
                    <span class="text-sm font-medium text-gray-900">{{ bookingData.restaurant }}</span>
                  </div>
                  <div v-if="bookingData.store" class="flex justify-between">
                    <span class="text-sm text-gray-500">Store:</span>
                    <span class="text-sm font-medium text-gray-900">{{ bookingData.store }}</span>
                  </div>
                  <div v-if="bookingData.biller" class="flex justify-between">
                    <span class="text-sm text-gray-500">Biller:</span>
                    <span class="text-sm font-medium text-gray-900">{{ bookingData.biller }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-500">Pickup Location:</span>
                    <span class="text-sm font-medium text-gray-900">{{ bookingData.pickupLocation }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-500">Delivery Location:</span>
                    <span class="text-sm font-medium text-gray-900">{{ bookingData.dropLocation }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-500">Details:</span>
                    <span class="text-sm font-medium text-gray-900 text-right max-w-xs">{{ bookingData.details }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Payment Method Selection -->
              <div class="mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-2">Payment Method</h3>
                <div class="space-y-2">
                  <div v-for="method in paymentMethods" :key="method.id" class="flex items-center">
                    <input 
                      :id="method.id" 
                      name="payment-method" 
                      type="radio" 
                      :value="method.id"
                      v-model="bookingData.paymentMethod"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                    />
                    <label :for="method.id" class="ml-3 block text-sm font-medium text-gray-700">
                      {{ method.name }}
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Fee Calculation -->
              <div class="bg-gray-50 p-4 rounded-md mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-2">Fee Calculation</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-500">Base Fee:</span>
                    <span class="text-sm font-medium text-gray-900">₱{{ baseRate.toFixed(2) }}</span>
                  </div>
                  <div v-if="weatherFee > 0" class="flex justify-between">
                    <span class="text-sm text-gray-500">Bad Weather Fee:</span>
                    <span class="text-sm font-medium text-gray-900">₱{{ weatherFee.toFixed(2) }}</span>
                  </div>
                  <div v-if="distanceFee > 0" class="flex justify-between">
                    <span class="text-sm text-gray-500">Distance Fee:</span>
                    <span class="text-sm font-medium text-gray-900">₱{{ distanceFee.toFixed(2) }}</span>
                  </div>
                  <div class="border-t border-gray-200 pt-2 flex justify-between">
                    <span class="text-sm font-medium text-gray-900">Total Fee:</span>
                    <span class="text-sm font-medium text-primary-600">₱{{ totalFee.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Submit Button -->
              <div class="flex justify-end">
                <button 
                  @click="submitBooking"
                  :disabled="submitting || !bookingData.paymentMethod"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {{ submitting ? 'Submitting...' : 'Confirm Booking' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Success Message -->
          <div v-if="currentStep === 4" class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">Booking Successful!</h3>
              <p class="mt-1 text-sm text-gray-500">
                Your booking has been successfully submitted. You can track your order status in the order history.
              </p>
              <div class="mt-6">
                <router-link 
                  :to="`/user/order-tracking/${createdBookingId}`"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Track Order
                </router-link>
                <button 
                  @click="resetForm"
                  class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
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
    totalAmount: 0
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
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
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
    // Simplified distance fee calculation
    // In a real app, this would use actual distance calculation
    return 15; // Placeholder value
  });
  
  const totalFee = computed(() => {
    return baseRate.value + weatherFee.value + distanceFee.value;
  });
  
  const selectService = (service) => {
    selectedService.value = service;
    bookingData.service = service.name;
  };
  
  const nextStep = () => {
    if (currentStep.value === 1 && !selectedService.value) {
      window.$notification?.error('Error', 'Please select a service');
      return;
    }
  
    if (currentStep.value === 2) {
      // Calculate fees
      bookingData.amount = baseRate.value;
      bookingData.additionalFees = weatherFee.value + distanceFee.value;
      bookingData.totalAmount = totalFee.value;
    }
  
    currentStep.value += 1;
  };
  
  const submitBooking = async () => {
    submitting.value = true;
  
    try {
      if (!authStore.user) {
        throw new Error("Please login to create a booking");
      }
  
      // Validate required fields
      if (!bookingData.pickupLocation || !bookingData.dropLocation || !bookingData.details) {
        throw new Error("Please fill in all required fields");
      }
  
      // Create booking in Firestore
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
  
  const resetForm = () => {
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
    currentStep.value = 1;
  };
  </script>
  
  