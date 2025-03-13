<template>
  <div class="users-container">
    <div class="container py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
    
      <!-- Search and Filter -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="relative flex-1">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search users..."
              class="form-input w-full pl-10"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <select v-model="roleFilter" class="form-select">
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="driver">Drivers</option>
              <option value="admin">Admins</option>
            </select>
            
            <select v-model="statusFilter" class="form-select">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" :src="user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName) + '&background=random'" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.displayName }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleBadgeClass(user.role)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(user.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewUser(user)" class="text-green-600 hover:text-green-900">
                      View
                    </button>
                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button v-if="user.status !== 'suspended'" @click="suspendUser(user)" class="text-red-600 hover:text-red-900">
                      Suspend
                    </button>
                    <button v-else @click="activateUser(user)" class="text-green-600 hover:text-green-900">
                      Activate
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty state -->
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                  <p>No users found matching your criteria.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">
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
                  @click="goToPage(page)"
                  :class="[
                    page === currentPage ? 'z-10 bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
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
      
      <!-- User Detail Modal -->
      <div v-if="selectedUser" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    User Details
                  </h3>
                  
                  <div class="flex items-center mb-6">
                    <img class="h-16 w-16 rounded-full mr-4" :src="selectedUser.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedUser.displayName) + '&background=random'" alt="" />
                    <div>
                      <h4 class="text-xl font-bold">{{ selectedUser.displayName }}</h4>
                      <p class="text-gray-600">{{ selectedUser.email }}</p>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p class="text-sm text-gray-500">Role</p>
                      <p class="font-medium">{{ selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Status</p>
                      <p class="font-medium">{{ selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Phone</p>
                      <p class="font-medium">{{ selectedUser.phone || 'Not provided' }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Joined</p>
                      <p class="font-medium">{{ formatDate(selectedUser.createdAt) }}</p>
                    </div>
                  </div>
                  
                  <div class="mb-6">
                    <p class="text-sm text-gray-500 mb-1">Address</p>
                    <p class="font-medium">{{ selectedUser.address || 'Not provided' }}</p>
                  </div>
                  
                  <div v-if="selectedUser.role === 'driver'">
                    <h4 class="font-semibold text-gray-800 mb-2">Driver Statistics</h4>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Completed Deliveries</p>
                        <p class="font-medium">{{ selectedUser.stats?.completedDeliveries || 0 }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Rating</p>
                        <p class="font-medium">{{ selectedUser.stats?.rating || 'N/A' }}/5</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Total Earnings</p>
                        <p class="font-medium">₱{{ selectedUser.stats?.totalEarnings?.toLocaleString() || 0 }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Working Hours</p>
                        <p class="font-medium">{{ selectedUser.stats?.workingHours || 0 }} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="closeUserDetail" type="button" class="btn btn-primary">
                Close
              </button>
            </div>
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
        createdAt: doc.data().createdAt?.toDate() || new Date()
      });
    });
    
    users.value = userData;
  } catch (error) {
    console.error('Error loading users:', error);
  }
});

// Filtered users
const filteredUsers = computed(() => {
  let result = users.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.displayName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
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
    pages.push(total);
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
    
    alert(`User ${user.displayName} has been suspended.`);
  } catch (error) {
    console.error('Error suspending user:', error);
    alert('Failed to suspend user. Please try again.');
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
    
    alert(`User ${user.displayName} has been activated.`);
  } catch (error) {
    console.error('Error activating user:', error);
    alert('Failed to activate user. Please try again.');
  }
};

// Helper functions
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'driver':
      return 'bg-blue-100 text-blue-800';
    case 'user':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

