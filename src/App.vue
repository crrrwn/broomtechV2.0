<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="showNavbar" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="showFooter" />
    <Notifications />
    <AIChatSupport v-if="showChatSupport" />
    <AdminNotifications v-if="isAdmin" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import Notifications from './components/common/Notifications.vue';
import AIChatSupport from './components/common/AIChatSupport.vue';
import AdminNotifications from './components/admin/AdminNotifications.vue';

export default {
  components: {
    Navbar,
    Footer,
    Notifications,
    AIChatSupport,
    AdminNotifications
  },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();

    // Hide navbar and footer on auth pages
    const showNavbar = computed(() => {
      return !['Login', 'Register', 'VerifyEmail', 'ForgotPassword', 'AdminLogin'].includes(route.name);
    });

    const showFooter = computed(() => {
      return !['Login', 'Register', 'VerifyEmail', 'ForgotPassword', 'AdminLogin'].includes(route.name);
    });

    // Show chat support only for authenticated users
    const showChatSupport = computed(() => {
      return !!authStore.user && !['Login', 'Register', 'VerifyEmail', 'ForgotPassword', 'AdminLogin'].includes(route.name);
    });

    const isAdmin = computed(() => {
      return authStore.userRole === 'admin';
    });

    return {
      route,
      authStore,
      showNavbar,
      showFooter,
      showChatSupport,
      isAdmin
    };
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global styles */
body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Form styles */
.form-input,
.form-select,
.form-textarea {
  @apply rounded-md border-gray-300 shadow-sm;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  @apply border-green-500 ring ring-green-200 ring-opacity-50;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
}

.btn-primary {
  @apply bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2;
}

.card {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}

.card-header {
  @apply px-6 py-4 bg-gray-50 border-b border-gray-200;
}

.card-body {
  @apply p-6;
}

.card-footer {
  @apply px-6 py-4 bg-gray-50 border-t border-gray-200;
}

/* Animation utilities */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive utilities */
.container {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
  max-width: 1280px;
}
</style>

