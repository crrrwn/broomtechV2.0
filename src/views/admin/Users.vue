<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">User Management</h1>
          <p class="mt-2 max-w-xl text-green-50">Manage and monitor user accounts and permissions</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {{ filteredUsers.length }} Users
          </span>
        </div>
      </div>
    </div>
    
    <!-- Search and Filter -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="relative flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name, email or phone..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <select 
            v-model="roleFilter" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="driver">Drivers</option>
            <option value="admin">Admins</option>
          </select>
          
          <select 
            v-model="statusFilter" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Users Table -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 class="text-lg leading-6 font-medium text-gray-900">User Accounts</h2>
        <span class="inline-flex items-center rounded-full bg-grab-green-light px-2.5 py-0.5 text-xs font-medium text-grab-green">
          {{ totalUsers }} Total
        </span>
      </div>
      
      <div class="border-t border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-grab-green-light">
              <tr>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-center text-xs font-medium text-grab-green uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-grab-green-light/30 transition-colors duration-150">
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full object-cover" :src="user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName) + '&background=random'" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.displayName }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleBadgeClass(user.role)">
                    {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(user.status)">
                    {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex justify-center space-x-2">
                    <button @click="viewUser(user)" class="text-grab-green hover:text-grab-green-dark transition-colors duration-150">
                      View
                    </button>
                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-700 transition-colors duration-150">
                      Edit
                    </button>
                    <button 
                      v-if="user.status !== 'suspended'" 
                      @click="suspendUser(user)" 
                      class="text-rose-600 hover:text-rose-700 transition-colors duration-150"
                    >
                      Suspend
                    </button>
                    <button 
                      v-else 
                      @click="activateUser(user)" 
                      class="text-grab-green hover:text-grab-green-dark transition-colors duration-150"
                    >
                      Activate
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty state -->
              <tr v-if="paginatedUsers.length === 0">
                <td colspan="5" class="px-4 sm:px-6 py-10 text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p class="mt-2 text-base font-medium text-gray-900">No users found</p>
                  <p class="mt-1 text-sm text-gray-500">Try changing your filters or search query</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1" 
              :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green"
            >
              Previous
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages" 
              :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
              class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalUsers) }}</span>
                of
                <span class="font-medium">{{ totalUsers }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  v-if="typeof page === 'number'"
                  @click="goToPage(page)"
                  :class="[
                    page === currentPage ? 'z-10 bg-grab-green-light border-grab-green text-grab-green' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Detail Modal -->
    <div v-if="selectedUser" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeUserDetail"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">User Details</h3>
                  <div class="flex space-x-2">
                    <button
                      v-if="selectedUser.status !== 'suspended'"
                      @click="suspendUser(selectedUser)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-150"
                    >
                      Suspend User
                    </button>
                    <button
                      v-else
                      @click="activateUser(selectedUser)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-grab-green hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green transition-colors duration-150"
                    >
                      Activate User
                    </button>
                  </div>
                </div>
                
                <div class="mt-4 flex items-center mb-6">
                  <img class="h-16 w-16 rounded-full object-cover" :src="selectedUser.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedUser.displayName) + '&background=random'" alt="" />
                  <div class="ml-4">
                    <h4 class="text-xl font-bold">{{ selectedUser.displayName }}</h4>
                    <p class="text-gray-600">{{ selectedUser.email }}</p>
                  </div>
                </div>
                
                <div class="border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Role</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span :class="getRoleBadgeClass(selectedUser.role)">
                          {{ selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1) }}
                        </span>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Status</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span :class="getStatusBadgeClass(selectedUser.status)">
                          {{ selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1) }}
                        </span>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Phone</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedUser.phone || 'Not provided' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Joined</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(selectedUser.createdAt) }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedUser.address || 'Not provided' }}</dd>
                    </div>
                    
                    <div v-if="selectedUser.role === 'driver'" class="border-t border-gray-200 pt-4">
                      <div class="pb-3">
                        <h4 class="font-semibold text-gray-800">Driver Statistics</h4>
                      </div>
                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 py-2">
                        <dt class="text-sm font-medium text-gray-500">Completed Deliveries</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedUser.stats?.completedDeliveries || 0 }}</dd>
                      </div>
                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 py-2">
                        <dt class="text-sm font-medium text-gray-500">Rating</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                          {{ selectedUser.stats?.rating || 'N/A' }}/5
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </dd>
                      </div>
                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 py-2">
                        <dt class="text-sm font-medium text-gray-500">Total Earnings</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ selectedUser.stats?.totalEarnings?.toLocaleString() || 0 }}</dd>
                      </div>
                      <div class="sm:grid sm:grid-cols-3 sm:gap-4 py-2">
                        <dt class="text-sm font-medium text-gray-500">Working Hours</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedUser.stats?.workingHours || 0 }} hrs</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
              @click="closeUserDetail"
            >
              Close
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="editUser(selectedUser)"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { db } from '../../firebase/config';
  import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
  import { useNotification } from '../../composables/useNotification';
  
  // Notification system
  const { showNotification } = useNotification();
  
  // User data
  const users = ref([]);
  const selectedUser = ref(null);
  
  // Filters
  const searchQuery = ref('');
  const roleFilter = ref('all');
  const statusFilter = ref('all');
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  // Load users
  onMounted(async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const userData = [];
      
      usersSnapshot.forEach(doc => {
        userData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          // Set defaults for any missing properties
          status: doc.data().status || 'active',
          role: doc.data().role || 'user'
        });
      });
      
      users.value = userData;
    } catch (error) {
      console.error('Error loading users:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load users'
      });
    }
  });
  
  // Filtered users
  const filteredUsers = computed(() => {
    let result = users.value;
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(user => 
        (user.displayName?.toLowerCase().includes(query)) ||
        (user.email?.toLowerCase().includes(query)) ||
        (user.phone?.toLowerCase().includes(query))
      );
    }
    
    // Apply role filter
    if (roleFilter.value !== 'all') {
      result = result.filter(user => user.role === roleFilter.value);
    }
    
    // Apply status filter
    if (statusFilter.value !== 'all') {
      result = result.filter(user => user.status === statusFilter.value);
    }
    
    return result;
  });
  
  // Pagination computed properties
  const totalUsers = computed(() => filteredUsers.value.length);
  const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage));
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.value.slice(start, end);
  });
  
  // Calculate displayed pages for pagination
  const displayedPages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];
    
    if (total <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Show dots if current page is more than 3
      if (current > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Show dots if current page is less than total - 2
      if (current < total - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }
    
    return pages;
  });
  
  // Pagination methods
  const goToPage = (page) => {
    if (typeof page === 'number') {
      currentPage.value = page;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  // User actions
  const viewUser = (user) => {
    selectedUser.value = user;
  };
  
  const closeUserDetail = () => {
    selectedUser.value = null;
  };
  
  const editUser = (user) => {
    // Implement edit user functionality
    console.log('Edit user:', user.id);
    showNotification({
      type: 'info',
      title: 'Edit User',
      message: `Edit functionality for ${user.displayName} would be implemented here`
    });
  };
  
  const suspendUser = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.id), {
        status: 'suspended'
      });
      
      // Update local state
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index].status = 'suspended';
      }
      
      // Update selected user if in modal
      if (selectedUser.value && selectedUser.value.id === user.id) {
        selectedUser.value.status = 'suspended';
      }
      
      showNotification({
        type: 'success',
        title: 'User Suspended',
        message: `${user.displayName} has been suspended`
      });
    } catch (error) {
      console.error('Error suspending user:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to suspend user. Please try again.'
      });
    }
  };
  
  const activateUser = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.id), {
        status: 'active'
      });
      
      // Update local state
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index].status = 'active';
      }
      
      // Update selected user if in modal
      if (selectedUser.value && selectedUser.value.id === user.id) {
        selectedUser.value.status = 'active';
      }
      
      showNotification({
        type: 'success',
        title: 'User Activated',
        message: `${user.displayName} has been activated`
      });
    } catch (error) {
      console.error('Error activating user:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to activate user. Please try again.'
      });
    }
  };
  
  // Helper functions
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800';
      case 'driver':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800';
      case 'user':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grab-green-light text-grab-green';
      default:
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
      case 'inactive':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
      default:
        return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
    }
  };
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
  
  .border-grab-green {
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
  
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
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
    a[role="button"] {
      min-height: 2.5rem;
    }
  
    .flex-wrap {
      flex-wrap: wrap;
    }
  }
  </style>