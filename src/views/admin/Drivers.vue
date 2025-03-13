<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Driver Management</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Driver List -->
          <div class="px-4 py-8 sm:px-0">
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Drivers</h2>
                <div class="flex space-x-3">
                  <div class="relative">
                    <input
                      type="text"
                      v-model="searchQuery"
                      placeholder="Search drivers..."
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <select
                    v-model="statusFilter"
                    class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <ul class="divide-y divide-gray-200">
                <li v-for="driver in filteredDrivers" :key="driver.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <img
                              class="h-10 w-10 rounded-full"
                              :src="driver.photoURL || 'https://via.placeholder.com/40'"
                              alt=""
                            />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-indigo-600">{{ driver.fullName }}</div>
                            <div class="text-sm text-gray-500">{{ driver.email }}</div>
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <span
                            :class="{
                              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                              'bg-yellow-100 text-yellow-800': driver.status === 'pending',
                              'bg-green-100 text-green-800': driver.status === 'approved',
                              'bg-red-100 text-red-800': driver.status === 'rejected'
                            }"
                          >
                            {{ driver.status.charAt(0).toUpperCase() + driver.status.slice(1) }}
                          </span>
                          <button
                            @click="viewDriverDetails(driver)"
                            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-if="filteredDrivers.length === 0" class="py-4 px-6 text-center text-gray-500">
                  No drivers found matching your criteria.
                </li>
              </ul>
              <!-- Pagination -->
              <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">{{ paginationStart }}</span>
                      to
                      <span class="font-medium">{{ paginationEnd }}</span>
                      of
                      <span class="font-medium">{{ totalDrivers }}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          class="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="goToPage(page)"
                        :class="{
                          'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': page === currentPage,
                          'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                        }"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        {{ page }}
                      </button>
                      <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          class="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Driver Details Modal -->
    <div v-if="selectedDriver" class="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Driver Details</h3>
                  <div class="flex space-x-2">
                    <button
                      v-if="selectedDriver.status === 'pending'"
                      @click="updateDriverStatus('approved')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Approve
                    </button>
                    <button
                      v-if="selectedDriver.status === 'pending'"
                      @click="updateDriverStatus('rejected')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject
                    </button>
                    <button
                      v-if="selectedDriver.status === 'rejected'"
                      @click="updateDriverStatus('approved')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Approve
                    </button>
                    <button
                      v-if="selectedDriver.status === 'approved'"
                      @click="updateDriverStatus('rejected')"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Full name</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.fullName }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Email address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.email }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Phone number</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.phone }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.address }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle type</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.vehicleType }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle model</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.vehicleModel }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">License plate</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.licensePlate }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Driver's license</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedDriver.licenseNumber }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Status</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span
                          :class="{
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                            'bg-yellow-100 text-yellow-800': selectedDriver.status === 'pending',
                            'bg-green-100 text-green-800': selectedDriver.status === 'approved',
                            'bg-red-100 text-red-800': selectedDriver.status === 'rejected'
                          }"
                        >
                          {{ selectedDriver.status.charAt(0).toUpperCase() + selectedDriver.status.slice(1) }}
                        </span>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Driver Photo</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="selectedDriver.photoURL || 'https://via.placeholder.com/300'"
                            alt="Driver"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">License Photo</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="selectedDriver.licenseUrl"
                            alt="License"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Vehicle Photo</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="selectedDriver.vehicleUrl"
                            alt="Vehicle"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default {
  name: 'AdminDrivers',
  setup() {
    const drivers = ref([])
    const selectedDriver = ref(null)
    const searchQuery = ref('')
    const statusFilter = ref('all')
    const currentPage = ref(1)
    const itemsPerPage = 10

    // Fetch drivers from Firestore
    const fetchDrivers = async () => {
      try {
        const driversCollection = collection(db, 'drivers')
        const driversSnapshot = await getDocs(driversCollection)
        const driversList = []
        
        driversSnapshot.forEach((doc) => {
          driversList.push({
            id: doc.id,
            ...doc.data()
          })
        })
        
        drivers.value = driversList
      } catch (error) {
        console.error('Error fetching drivers:', error)
      }
    }

    // Filter drivers based on search query and status
    const filteredDrivers = computed(() => {
      let filtered = drivers.value

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(driver => 
          driver.fullName.toLowerCase().includes(query) || 
          driver.email.toLowerCase().includes(query) ||
          driver.phone.includes(query) ||
          driver.licensePlate.toLowerCase().includes(query)
        )
      }

      if (statusFilter.value !== 'all') {
        filtered = filtered.filter(driver => driver.status === statusFilter.value)
      }

      // Apply pagination
      const startIndex = (currentPage.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return filtered.slice(startIndex, endIndex)
    })

    // Total number of drivers after filtering
    const totalDrivers = computed(() => {
      let filtered = drivers.value

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(driver => 
          driver.fullName.toLowerCase().includes(query) || 
          driver.email.toLowerCase().includes(query) ||
          driver.phone.includes(query) ||
          driver.licensePlate.toLowerCase().includes(query)
        )
      }

      if (statusFilter.value !== 'all') {
        filtered = filtered.filter(driver => driver.status === statusFilter.value)
      }

      return filtered.length
    })

    // Calculate total pages for pagination
    const totalPages = computed(() => {
      return Math.ceil(totalDrivers.value / itemsPerPage)
    })

    // Calculate pagination start and end
    const paginationStart = computed(() => {
      return totalDrivers.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1
    })

    const paginationEnd = computed(() => {
      return Math.min(currentPage.value * itemsPerPage, totalDrivers.value)
    })

    // Pagination methods
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    // View driver details
    const viewDriverDetails = (driver) => {
      selectedDriver.value = driver
    }

    // Close modal
    const closeModal = () => {
      selectedDriver.value = null
    }

    // Update driver status
    const updateDriverStatus = async (status) => {
      try {
        await updateDoc(doc(db, 'drivers', selectedDriver.value.id), {
          status: status
        })
        
        // Update local state
        selectedDriver.value.status = status
        
        // Update in the drivers array
        const index = drivers.value.findIndex(d => d.id === selectedDriver.value.id)
        if (index !== -1) {
          drivers.value[index].status = status
        }
        
        alert(`Driver status updated to ${status}`)
      } catch (error) {
        console.error('Error updating driver status:', error)
        alert('Failed to update driver status')
      }
    }

    onMounted(fetchDrivers)

    return {
      drivers,
      selectedDriver,
      searchQuery,
      statusFilter,
      filteredDrivers,
      totalDrivers,
      currentPage,
      totalPages,
      paginationStart,
      paginationEnd,
      nextPage,
      prevPage,
      goToPage,
      viewDriverDetails,
      closeModal,
      updateDriverStatus
    }
  }
}
</script>

