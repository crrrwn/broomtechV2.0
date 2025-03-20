<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Driver Management</h1>
        <p class="mt-2 text-lg text-gray-600">Create and manage driver accounts</p>
      </div>
      
      <!-- Create Driver Account Form -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Create Driver Account</h2>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Generate credentials for a new driver</p>
          </div>
          <button 
            @click="showCreateForm = !showCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ showCreateForm ? 'Hide Form' : 'Create New Driver' }}
          </button>
        </div>
        
        <div v-if="showCreateForm" class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div v-if="createError" class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ createError }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="createSuccess" class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-700">{{ createSuccess }}</p>
              </div>
            </div>
          </div>
          
          <form @submit.prevent="createDriverAccount" class="space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="full-name" 
                  v-model="newDriver.fullName"
                  required
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                />
              </div>
              
              <div class="col-span-6 sm:col-span-3">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="newDriver.email"
                  required
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                />
              </div>
              
              <div class="col-span-6 sm:col-span-3">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="newDriver.phone"
                  required
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                />
              </div>
              
              <div class="col-span-6 sm:col-span-3">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="newDriver.password"
                    required
                    minlength="6"
                    class="focus:ring-green-500 focus:border-green-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md" 
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                      type="button" 
                      @click="showPassword = !showPassword"
                      class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <svg v-if="showPassword" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">Password must be at least 6 characters</p>
              </div>
              
              <div class="col-span-6">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <textarea 
                  id="address" 
                  v-model="newDriver.address"
                  rows="3" 
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div class="col-span-6 sm:col-span-3">
                <label for="vehicle-type" class="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <select 
                  id="vehicle-type" 
                  v-model="newDriver.vehicleType"
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
                  v-model="newDriver.vehiclePlate"
                  required
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                />
              </div>
            </div>
            
            <div class="flex justify-end">
              <button 
                type="button"
                @click="showCreateForm = false"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="creating"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {{ creating ? 'Creating...' : 'Create Driver Account' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Driver Accounts List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Driver Accounts</h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">List of all driver accounts</p>
        </div>
        
        <div class="border-t border-gray-200">
          <div v-if="loading" class="px-4 py-12 text-center">
            <svg class="animate-spin h-8 w-8 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-500">Loading driver accounts...</p>
          </div>
          
          <div v-else-if="drivers.length === 0" class="px-4 py-12 text-center">
            <svg class="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-500">No driver accounts found</p>
            <p class="mt-1 text-sm text-gray-500">Create a new driver account to get started</p>
          </div>
          
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
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
                <tr v-for="driver in drivers" :key="driver.id">
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
                      class="text-green-600 hover:text-green-900 mr-4"
                    >
                      Send Credentials
                    </button>
                    <button 
                      @click="confirmDeleteDriver(driver)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Driver Account
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
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
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ deleting ? 'Deleting...' : 'Delete' }}
              </button>
              <button 
                type="button" 
                @click="showDeleteModal = false"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
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
  creating.value = true;
  
  try {
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
      createdBy: auth.currentUser.uid
    });
    
    // 3. Create notification for the admin
    await notificationStore.createNotification({
      title: 'New Driver Account Created',
      message: `You have created a new driver account for ${newDriver.fullName}`,
      type: 'info',
      userId: auth.currentUser.uid
    });
    
    // 4. Reset form
    Object.keys(newDriver).forEach(key => {
      newDriver[key] = '';
    });
    
    createSuccess.value = 'Driver account created successfully! You can now send the credentials to the driver.';
    showCreateForm.value = false;
    
    // 5. Refresh driver list
    await fetchDrivers();
  } catch (error) {
    console.error('Error creating driver account:', error);
    createError.value = error.message || 'Failed to create driver account';
  } finally {
    creating.value = false;
  }
};

// Send credentials to driver via email
const sendCredentials = async (driver) => {
  try {
    // In a real application, you would integrate with an email service
    // For now, we'll just show a notification
    await notificationStore.createNotification({
      title: 'Credentials Sent',
      message: `Login credentials have been sent to ${driver.fullName} at ${driver.email}`,
      type: 'success',
      userId: auth.currentUser.uid
    });
    
    alert(`In a real application, an email would be sent to ${driver.email} with their login credentials.`);
  } catch (error) {
    console.error('Error sending credentials:', error);
    alert('Failed to send credentials. Please try again.');
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
    await notificationStore.createNotification({
      title: 'Driver Account Deleted',
      message: `Driver account for ${driverToDelete.value.fullName} has been deleted`,
      type: 'warning',
      userId: auth.currentUser.uid
    });
    
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

<style scoped>
/* Add any custom styles here */
</style>

