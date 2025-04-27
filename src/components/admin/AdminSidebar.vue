<template>
    <div class="admin-sidebar-container">
      <!-- Sidebar for larger screens -->
      <aside class="admin-sidebar" :class="{ 'open': isSidebarOpen }">
        <!-- Logo and Brand -->
        <div class="sidebar-header">
          <router-link to="/admin" class="sidebar-logo">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <span class="logo-text">BroomTech</span>
          </router-link>
          
          <!-- Mobile menu toggle -->
          <button @click="toggleSidebar" class="sidebar-toggle md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <!-- Navigation Links -->
        <nav class="sidebar-nav">
          <router-link to="/admin" class="nav-item" :class="{ 'active': isActive('/admin') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span class="nav-text">Dashboard</span>
          </router-link>
          
          <router-link to="/admin/bookings" class="nav-item" :class="{ 'active': isActive('/admin/bookings') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="nav-text">Bookings</span>
          </router-link>
          
          <router-link to="/admin/driver-management" class="nav-item" :class="{ 'active': isActive('/admin/driver-management') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              <path d="M15 13h2v2h2"></path>
            </svg>
            <span class="nav-text">Driver Management</span>
          </router-link>
          
          <router-link to="/admin/drivers" class="nav-item" :class="{ 'active': isActive('/admin/drivers') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
            <span class="nav-text">Drivers</span>
          </router-link>
          
          <router-link to="/admin/payments" class="nav-item" :class="{ 'active': isActive('/admin/payments') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span class="nav-text">Payments</span>
          </router-link>
          
          <router-link to="/admin/reports" class="nav-item" :class="{ 'active': isActive('/admin/reports') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="nav-text">Reports</span>
          </router-link>
          
          <router-link to="/admin/users" class="nav-item" :class="{ 'active': isActive('/admin/users') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span class="nav-text">Users</span>
          </router-link>
          
          <router-link to="/admin/settings" class="nav-item" :class="{ 'active': isActive('/admin/settings') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span class="nav-text">Settings</span>
          </router-link>
          
          <!-- Logout Button -->
          <button @click="logout" class="nav-item logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span class="nav-text">Logout</span>
          </button>
        </nav>
      </aside>
      
      <!-- Mobile sidebar overlay -->
      <div 
        v-if="isSidebarOpen" 
        class="sidebar-overlay md:hidden"
        @click="closeSidebar"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  
  const isSidebarOpen = ref(false);
  
  const updateSidebarState = () => {
    isSidebarOpen.value = window.innerWidth >= 768;
  };
  
  onMounted(() => {
    updateSidebarState();
    window.addEventListener('resize', updateSidebarState);
  });
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      isSidebarOpen.value = false;
    }
  };
  
  const isActive = (path) => {
    return route.path.startsWith(path);
  };
  
  const logout = async () => {
    try {
      await authStore.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Close sidebar on route change for mobile
  watch(() => route.path, () => {
    closeSidebar();
  });
  </script>
  
  <style scoped>
  .admin-sidebar-container {
    position: relative;
    height: 100%;
  }
  
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background: linear-gradient(to bottom, #1e8e3e, #34a853);
    color: white;
    display: flex;
    flex-direction: column;
    z-index: 40;
    transition: transform 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 767px) {
    .admin-sidebar {
      transform: translateX(-100%);
    }
    
    .admin-sidebar.open {
      transform: translateX(0);
    }
  }
  
  .sidebar-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .sidebar-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    color: #34a853;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  .sidebar-toggle {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 1.5rem 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
    margin-bottom: 0.5rem;
  }
  
  .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .nav-item.active {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    border-left-color: white;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
  }
  
  .nav-text {
    font-size: 0.95rem;
    font-weight: 500;
  }
  
  .logout-btn {
    margin-top: auto;
    cursor: pointer;
    background: none;
    border: none;
    text-align: left;
    font-family: inherit;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 30;
  }
  
  /* Fix for mobile view */
  @media (max-width: 767px) {
    .admin-sidebar {
      transform: translateX(-100%);
    }
    
    .admin-sidebar[data-open="true"] {
      transform: translateX(0);
    }
  }
  </style>