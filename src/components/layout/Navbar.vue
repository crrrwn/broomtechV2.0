<template>
  <nav class="bg-primary-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold">BroomTech</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- User Navigation -->
            <template v-if="authStore.userRole === 'user'">
              <router-link 
                to="/user" 
                class="nav-link" 
                :class="{ 'active': isActive('/user') }"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/user/book-service" 
                class="nav-link" 
                :class="{ 'active': isActive('/user/book-service') }"
              >
                Book Service
              </router-link>
              <router-link 
                to="/user/order-history" 
                class="nav-link" 
                :class="{ 'active': isActive('/user/order-history') }"
              >
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
                Dashboard
              </router-link>
              <router-link 
                to="/driver/tasks" 
                class="nav-link" 
                :class="{ 'active': isActive('/driver/tasks') }"
              >
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
                Dashboard
              </router-link>
              <router-link 
                to="/admin/bookings" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/bookings') }"
              >
                Bookings
              </router-link>
              <router-link 
                to="/admin/drivers" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/drivers') }"
              >
                Drivers
              </router-link>
              <router-link 
                to="/admin/users" 
                class="nav-link" 
                :class="{ 'active': isActive('/admin/users') }"
              >
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
                class="flex items-center text-sm font-medium text-white hover:text-gray-200 focus:outline-none"
              >
                <span class="mr-2">{{ authStore.user.displayName || 'User' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div 
                v-if="isDropdownOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <router-link 
                  :to="profileRoute" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </router-link>
                <button 
                  @click="logout" 
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
            <div v-else>
              <router-link to="/login" class="text-white hover:text-gray-200">
                Sign in
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="-mr-2 flex items-center sm:hidden">
          <button 
            @click="toggleMobileMenu" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-primary-700 focus:outline-none"
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
    <div :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- User Navigation -->
        <template v-if="authStore.userRole === 'user'">
          <router-link 
            to="/user" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/user') }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/user/book-service" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/user/book-service') }"
          >
            Book Service
          </router-link>
          <router-link 
            to="/user/order-history" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/user/order-history') }"
          >
            Order History
          </router-link>
        </template>
        
        <!-- Driver Navigation -->
        <template v-if="authStore.userRole === 'driver'">
          <router-link 
            to="/driver" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/driver') }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/driver/tasks" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/driver/tasks') }"
          >
            My Tasks
          </router-link>
        </template>
        
        <!-- Admin Navigation -->
        <template v-if="authStore.userRole === 'admin'">
          <router-link 
            to="/admin" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/admin') }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/admin/bookings" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/admin/bookings') }"
          >
            Bookings
          </router-link>
          <router-link 
            to="/admin/drivers" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/admin/drivers') }"
          >
            Drivers
          </router-link>
          <router-link 
            to="/admin/users" 
            class="mobile-nav-link" 
            :class="{ 'bg-primary-700': isActive('/admin/users') }"
          >
            Users
          </router-link>
        </template>
      </div>
      
      <div class="pt-4 pb-3 border-t border-primary-700">
        <div v-if="authStore.user" class="flex items-center px-4">
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ authStore.user.displayName || 'User' }}</div>
            <div class="text-sm font-medium text-primary-200">{{ authStore.user.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <router-link 
            v-if="authStore.user"
            :to="profileRoute" 
            class="mobile-nav-link"
          >
            Profile
          </router-link>
          <button 
            v-if="authStore.user"
            @click="logout" 
            class="mobile-nav-link w-full text-left"
          >
            Sign out
          </button>
          <router-link 
            v-else
            to="/login" 
            class="mobile-nav-link"
          >
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white hover:text-gray-200;
}

.nav-link.active {
  @apply border-white;
}

.mobile-nav-link {
  @apply block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-primary-700 hover:border-white;
}
</style>

