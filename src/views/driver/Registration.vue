<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Driver Registration</h1>
        <p class="mt-2 text-lg text-gray-600">Join our team of delivery partners and start earning today</p>
      </div>
      
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Driver Application Form</h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Please fill out all required information to apply as a driver.</p>
        </div>
        
        <div v-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 mx-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="success" class="bg-green-50 border-l-4 border-green-400 p-4 mx-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-700">{{ success }}</p>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200">
          <form @submit.prevent="submitApplication" class="divide-y divide-gray-200">
            <!-- Personal Information -->
            <div class="px-4 py-5 sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                  <p class="mt-1 text-sm text-gray-500">Provide your personal details for identification.</p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="full-name" 
                        v-model="driverData.fullName"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="date-of-birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input 
                        type="date" 
                        id="date-of-birth" 
                        v-model="driverData.dateOfBirth"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone-number" 
                        v-model="driverData.phoneNumber"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="driverData.email"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6">
                      <label for="address" class="block text-sm font-medium text-gray-700">Complete Address</label>
                      <textarea 
                        id="address" 
                        v-model="driverData.address"
                        required
                        rows="3" 
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- License Information -->
            <div class="px-4 py-5 sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">License Information</h3>
                  <p class="mt-1 text-sm text-gray-500">Provide your driver's license details.</p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="license-number" class="block text-sm font-medium text-gray-700">License Number</label>
                      <input 
                        type="text" 
                        id="license-number" 
                        v-model="driverData.licenseNumber"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="license-expiry" class="block text-sm font-medium text-gray-700">License Expiry Date</label>
                      <input 
                        type="date" 
                        id="license-expiry" 
                        v-model="driverData.licenseExpiry"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6">
                      <label class="block text-sm font-medium text-gray-700">License Photo (Front and Back)</label>
                      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label for="license-file" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload a file</span>
                              <input 
                                id="license-file" 
                                name="license-file" 
                                type="file" 
                                class="sr-only"
                                @change="handleLicenseFileUpload"
                                accept="image/*,.pdf"
                                required
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      <div v-if="licenseFile" class="mt-2 text-sm text-gray-500">
                        Selected file: {{ licenseFile.name }}
                      </div>
                      <div v-if="licensePreview" class="mt-2">
                        <img :src="licensePreview" alt="License preview" class="h-32 object-cover rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Vehicle Information -->
            <div class="px-4 py-5 sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Vehicle Information</h3>
                  <p class="mt-1 text-sm text-gray-500">Provide details about your motorcycle.</p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="vehicle-type" class="block text-sm font-medium text-gray-700">Vehicle Type</label>
                      <select 
                        id="vehicle-type" 
                        v-model="driverData.vehicleType"
                        required
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      >
                        <option value="">Select vehicle type</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="scooter">Scooter</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="car">Car</option>
                      </select>
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="vehicle-plate" class="block text-sm font-medium text-gray-700">Vehicle Plate Number</label>
                      <input 
                        type="text" 
                        id="vehicle-plate" 
                        v-model="driverData.vehiclePlate"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="vehicle-model" class="block text-sm font-medium text-gray-700">Vehicle Model</label>
                      <input 
                        type="text" 
                        id="vehicle-model" 
                        v-model="driverData.vehicleModel"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="vehicle-year" class="block text-sm font-medium text-gray-700">Vehicle Year</label>
                      <input 
                        type="number" 
                        id="vehicle-year" 
                        v-model="driverData.vehicleYear"
                        required
                        min="1990"
                        :max="new Date().getFullYear()"
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6">
                      <label class="block text-sm font-medium text-gray-700">Vehicle Photo</label>
                      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label for="vehicle-file" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload a file</span>
                              <input 
                                id="vehicle-file" 
                                name="vehicle-file" 
                                type="file" 
                                class="sr-only"
                                @change="handleVehicleFileUpload"
                                accept="image/*"
                                required
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                      <div v-if="vehicleFile" class="mt-2 text-sm text-gray-500">
                        Selected file: {{ vehicleFile.name }}
                      </div>
                      <div v-if="vehiclePreview" class="mt-2">
                        <img :src="vehiclePreview" alt="Vehicle preview" class="h-32 object-cover rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Availability -->
            <div class="px-4 py-5 sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Availability</h3>
                  <p class="mt-1 text-sm text-gray-500">Let us know when you're available to work.</p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6">
                      <label for="availability" class="block text-sm font-medium text-gray-700">Availability</label>
                      <select 
                        id="availability" 
                        v-model="driverData.availability"
                        required
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      >
                        <option value="">Select availability</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="weekends">Weekends only</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="evenings">Evenings only</option>
                      </select>
                    </div>
                    
                    <div class="col-span-6">
                      <fieldset>
                        <legend class="text-sm font-medium text-gray-700">Available Days</legend>
                        <div class="mt-2 space-y-2">
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="monday" 
                                name="monday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.monday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="monday" class="font-medium text-gray-700">Monday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="tuesday" 
                                name="tuesday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.tuesday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="tuesday" class="font-medium text-gray-700">Tuesday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="wednesday" 
                                name="wednesday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.wednesday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="wednesday" class="font-medium text-gray-700">Wednesday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="thursday" 
                                name="thursday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.thursday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="thursday" class="font-medium text-gray-700">Thursday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="friday" 
                                name="friday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.friday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="friday" class="font-medium text-gray-700">Friday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="saturday" 
                                name="saturday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.saturday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="saturday" class="font-medium text-gray-700">Saturday</label>
                            </div>
                          </div>
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input 
                                id="sunday" 
                                name="sunday" 
                                type="checkbox" 
                                v-model="driverData.availableDays.sunday"
                                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="sunday" class="font-medium text-gray-700">Sunday</label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="start-time" class="block text-sm font-medium text-gray-700">Preferred Start Time</label>
                      <input 
                        type="time" 
                        id="start-time" 
                        v-model="driverData.startTime"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <label for="end-time" class="block text-sm font-medium text-gray-700">Preferred End Time</label>
                      <input 
                        type="time" 
                        id="end-time" 
                        v-model="driverData.endTime"
                        required
                        class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Terms and Conditions -->
            <div class="px-4 py-5 sm:p-6">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Terms and Conditions</h3>
                  <p class="mt-1 text-sm text-gray-500">Please read and agree to our terms.</p>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="space-y-6">
                    <div class="bg-gray-50 p-4 rounded-md">
                      <div class="text-sm text-gray-700 h-40 overflow-y-auto">
                        <h4 class="font-medium mb-2">BroomTech Driver Terms and Conditions</h4>
                        <p class="mb-2">By applying to be a driver with BroomTech, you agree to the following terms and conditions:</p>
                        <ol class="list-decimal pl-5 space-y-1">
                          <li>You must be at least 18 years old and have a valid driver's license.</li>
                          <li>Your vehicle must be in good working condition and meet all safety requirements.</li>
                          <li>You must maintain proper insurance coverage for your vehicle.</li>
                          <li>You agree to undergo a background check and vehicle inspection.</li>
                          <li>You will be responsible for maintaining your vehicle and covering all related expenses.</li>
                          <li>You will be responsible for your own taxes and will be classified as an independent contractor.</li>
                          <li>You agree to follow all traffic laws and regulations while performing deliveries.</li>
                          <li>You will maintain a professional appearance and demeanor when interacting with customers.</li>
                          <li>You will handle all items with care and ensure they are delivered in good condition.</li>
                          <li>BroomTech reserves the right to terminate your driver status at any time for any reason.</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input 
                          id="terms" 
                          name="terms" 
                          type="checkbox" 
                          v-model="driverData.termsAccepted"
                          required
                          class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" 
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-medium text-gray-700">I agree to the terms and conditions</label>
                        <p class="text-gray-500">By checking this box, you agree to our terms of service and privacy policy.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="px-4 py-5 sm:p-6 flex justify-end">
              <button 
                type="submit"
                :disabled="submitting"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {{ submitting ? 'Submitting...' : 'Submit Application' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDriverStore } from '../../stores/driver';
import { useNotificationStore } from '../../stores/notification';
import { getAuth } from 'firebase/auth';

const router = useRouter();
const driverStore = useDriverStore();
const notificationStore = useNotificationStore();
const auth = getAuth();

const licenseFile = ref(null);
const vehicleFile = ref(null);
const licensePreview = ref(null);
const vehiclePreview = ref(null);
const submitting = ref(false);
const error = ref('');
const success = ref('');

// Initialize licensePreview and vehiclePreview with null
const initialPreview = null;
licensePreview.value = initialPreview;
vehiclePreview.value = initialPreview;

const driverData = reactive({
  fullName: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  address: '',
  licenseNumber: '',
  licenseExpiry: '',
  vehicleType: '',
  vehiclePlate: '',
  vehicleModel: '',
  vehicleYear: '',
  availability: '',
  availableDays: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  },
  startTime: '',
  endTime: '',
  termsAccepted: false,
  status: 'pending', // Default status for new applications
  licensePhotoBase64: null, // Store base64 encoded license photo
  vehiclePhotoBase64: null // Store base64 encoded vehicle photo
});

// Initialize previews to null to avoid conditional hook call
// onMounted(() => {
//   licensePreview.value = null;
//   vehiclePreview.value = null;
// });

const handleLicenseFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'License file size must be less than 10MB';
      event.target.value = ''; // Clear the file input
      return;
    }
    licenseFile.value = file;
    
    // Create preview and base64 data for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        licensePreview.value = e.target.result;
        driverData.licensePhotoBase64 = e.target.result; // Store base64 data
      };
      reader.readAsDataURL(file);
    } else {
      licensePreview.value = null;
      // For non-image files like PDF, just store the file object
      // We'll handle it differently during submission
    }
  }
};

const handleVehicleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'Vehicle photo size must be less than 10MB';
      event.target.value = ''; // Clear the file input
      return;
    }
    vehicleFile.value = file;
    
    // Create preview and base64 data for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        vehiclePreview.value = e.target.result;
        driverData.vehiclePhotoBase64 = e.target.result; // Store base64 data
      };
      reader.readAsDataURL(file);
    } else {
      vehiclePreview.value = null;
    }
  }
};

const validateForm = () => {
  // Check if at least one day is selected
  const anyDaySelected = Object.values(driverData.availableDays).some(day => day);
  if (!anyDaySelected) {
    error.value = 'Please select at least one available day';
    return false;
  }

  // Check if files are uploaded
  if (!licenseFile.value) {
    error.value = 'Please upload your license photo';
    return false;
  }

  if (!vehicleFile.value) {
    error.value = 'Please upload your vehicle photo';
    return false;
  }

  // Check if terms are accepted
  if (!driverData.termsAccepted) {
    error.value = 'You must accept the terms and conditions';
    return false;
  }

  return true;
};

const submitApplication = async () => {
  error.value = '';
  success.value = '';

  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    console.log('Preparing application data...');
    
    // Check if user is authenticated
    const isAuthenticated = auth.currentUser !== null;
    
    // Choose the appropriate method based on authentication status
    let applicationId;
    if (isAuthenticated) {
      // Use registerDriverWithAuth for authenticated users
      applicationId = await driverStore.registerDriverWithAuth(
        driverData,
        licenseFile.value,
        vehicleFile.value
      );
    } else {
      // Use registerDriverWithoutAuth for non-authenticated users
      // We'll pass the base64 encoded images in the driver data
      applicationId = await driverStore.registerDriverWithoutAuth(
        {
          ...driverData,
          licensePhotoBase64: driverData.licensePhotoBase64,
          vehiclePhotoBase64: driverData.vehiclePhotoBase64
        },
        licenseFile.value,
        vehicleFile.value
      );
    }
    
    console.log('Application submitted successfully with ID:', applicationId);
    
    // Create notification for admin
    try {
      await notificationStore.createDriverApplicationNotification(
        driverData.fullName,
        applicationId
      );
      console.log('Admin notification created');
    } catch (notificationError) {
      console.error('Notification creation error:', notificationError);
      // Continue even if notification fails
    }
    
    success.value = 'Your application has been submitted successfully! We will review it and contact you soon.';
    
    // Reset form after successful submission
    Object.keys(driverData).forEach(key => {
      if (key === 'availableDays') {
        Object.keys(driverData.availableDays).forEach(day => {
          driverData.availableDays[day] = false;
        });
      } else if (key === 'termsAccepted') {
        driverData[key] = false;
      } else if (key === 'status') {
        driverData[key] = 'pending';
      } else {
        driverData[key] = '';
      }
    });
    
    licenseFile.value = null;
    vehicleFile.value = null;
    licensePreview.value = null;
    vehiclePreview.value = null;
    
    // Reset file inputs
    const licenseInput = document.getElementById('license-file');
    const vehicleInput = document.getElementById('vehicle-file');
    if (licenseInput) licenseInput.value = '';
    if (vehicleInput) vehicleInput.value = '';
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } catch (err) {
    console.error('Error submitting driver application:', err);
    error.value = `Failed to submit application: ${err.message}`;
  } finally {
    submitting.value = false;
  }
};
</script>
  
<style scoped>
/* Add any custom styles here */
</style>