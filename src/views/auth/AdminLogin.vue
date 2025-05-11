<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 z-0">
      <!-- Animated Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <!-- Floating Circles -->
        <div class="absolute top-[10%] left-[5%] w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-[20%] right-[10%] w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-[15%] left-[35%] w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"></path>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 flex flex-col min-h-screen items-center justify-center px-4 py-16 sm:px-6">
      <div class="w-full max-w-6xl">
        <!-- Header with Logo -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-xl mb-5 transform hover:scale-105 transition-all duration-300">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg shadow-green-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-slate-800 mb-2">BroomTech Admin</h1>
          <p class="text-slate-600 max-w-md mx-auto">Secure access to your administrative dashboard</p>
        </div>
        
        <!-- Main Card with Glass Effect -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all duration-300 hover:shadow-green-100/50">
          <div class="md:flex">
            <!-- Left Side - Form -->
            <div class="md:w-1/2 p-8 sm:p-10 md:p-12 lg:p-16">
              <div>
                <h2 class="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                <p class="text-slate-600 text-base">
                  Sign in to access your admin dashboard
                </p>
              </div>
              
              <!-- Error Alert -->
              <div v-if="error" class="mt-6 bg-red-50 border border-red-100 rounded-xl p-4 animate-pulse">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-700 font-medium">{{ error }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Login Form -->
              <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
                <div class="space-y-5">
                  <div class="relative group">
                    <label for="email-address" class="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        v-model="email"
                        class="block w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200 shadow-sm"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <div class="relative group">
                    <div class="flex items-center justify-between mb-1">
                      <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
                      <button 
                        type="button" 
                        class="text-xs text-green-600 hover:text-green-500 font-medium focus:outline-none focus:underline"
                        @click="togglePasswordVisibility"
                      >
                        {{ showPassword ? 'Hide' : 'Show' }}
                      </button>
                    </div>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="current-password"
                        required
                        v-model="password"
                        class="block w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200 shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      v-model="rememberMe"
                      class="h-5 w-5 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-slate-700">
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <a href="#" class="font-medium text-green-600 hover:text-green-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ loading ? 'Signing in...' : 'Sign in to Dashboard' }}
                  </button>
                </div>
              </form>
              
              <div class="mt-8 text-center">
                <router-link to="/login" class="text-sm font-medium text-green-600 hover:text-green-500 inline-flex items-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Return to regular login
                </router-link>
              </div>
            </div>
            
            <!-- Right Side - Info Cards -->
            <div class="md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-50 p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
              
              <div class="relative z-10">
                <div class="flex items-center mb-8">
                  <div class="h-10 w-1 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
                  <h3 class="text-2xl font-bold text-slate-800">Admin Portal Features</h3>
                </div>
                
                <!-- Feature Cards -->
                <div class="space-y-6">
                  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-white/50">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div class="ml-5">
                        <h4 class="text-lg font-semibold text-slate-800 mb-1">Order Management</h4>
                        <p class="text-slate-600">Track and manage all customer orders in real-time with advanced filtering options</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-white/50">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div class="ml-5">
                        <h4 class="text-lg font-semibold text-slate-800 mb-1">Staff Management</h4>
                        <p class="text-slate-600">Assign tasks, manage schedules, and monitor performance metrics for your entire team</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-white/50">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl p-4 shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div class="ml-5">
                        <h4 class="text-lg font-semibold text-slate-800 mb-1">Analytics Dashboard</h4>
                        <p class="text-slate-600">View comprehensive reports, business insights, and key performance indicators at a glance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Stats -->
                <div class="mt-10 grid grid-cols-2 gap-4">
                  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
                    <p class="text-sm text-slate-500 mb-1">Active Orders</p>
                    <p class="text-2xl font-bold text-slate-800">24</p>
                    <div class="flex items-center mt-1 text-xs text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>12% increase</span>
                    </div>
                  </div>
                  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
                    <p class="text-sm text-slate-500 mb-1">New Users</p>
                    <p class="text-2xl font-bold text-slate-800">7</p>
                    <div class="flex items-center mt-1 text-xs text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>5% increase</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-10 pt-6 border-t border-slate-200">
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-slate-500">
                      &copy; {{ new Date().getFullYear() }} BroomTech
                    </p>
                    <div class="flex space-x-4">
                      <a href="#" class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </a>
                      <a href="#" class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../../stores/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const db = getFirestore();

    // Default admin credentials
    const defaultEmail = 'broomtechv2@gmail.com';
    const defaultPassword = 'broomtech123';

    const email = ref(defaultEmail);
    const password = ref(defaultPassword);
    const rememberMe = ref(false);
    const loading = ref(false);
    const error = ref('');
    const showPassword = ref(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    // Function to ensure admin document exists
    const ensureAdminExists = async (uid) => {
      try {
        const adminRef = doc(db, "admins", uid);
        const adminDoc = await getDoc(adminRef);

        if (!adminDoc.exists()) {
          // Create admin document if it doesn't exist
          await setDoc(adminRef, {
            email: defaultEmail,
            role: 'admin',
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          console.log("Admin document created successfully");
        } else {
          console.log("Admin document already exists");
        }
        return true;
      } catch (err) {
        console.error("Error ensuring admin exists:", err);
        return false;
      }
    };

    const handleLogin = async () => {
      error.value = '';
      loading.value = true;

      try {
        const auth = getAuth();

        // First, attempt to sign in
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        console.log("User authenticated:", user.uid);

        // Ensure admin document exists
        const adminCreated = await ensureAdminExists(user.uid);

        if (!adminCreated) {
          throw new Error('Failed to create admin document');
        }

        // Check admin status
        const adminDoc = await getDoc(doc(db, "admins", user.uid));

        if (!adminDoc.exists()) {
          // If not an admin, sign out
          await auth.signOut();
          throw new Error('Access denied. This account does not have admin privileges.');
        }

        console.log("Admin document found:", adminDoc.data());

        // Directly set the userRole in the store
        authStore.userRole = 'admin';

        // Store admin data
        await authStore.setUser({
          ...user,
          role: 'admin',
          isAdmin: true,
          ...adminDoc.data()
        });

        console.log("User role set to:", authStore.userRole);

        // Redirect to admin dashboard with a slight delay to ensure store updates
        setTimeout(() => {
          router.push('/admin');
          console.log("Redirecting to admin dashboard");
        }, 500);

      } catch (err) {
        console.error('Admin login error:', err);

        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          error.value = 'Invalid email or password. Please try again.';
        } else if (err.message.includes('admin privileges')) {
          error.value = err.message;
        } else {
          error.value = 'An error occurred during login. Please try again.';
        }
      } finally {
        loading.value = false;
      }
    };

    // Auto-fill credentials on mount
    onMounted(() => {
      email.value = defaultEmail;
      password.value = defaultPassword;
    });

    return {
      email,
      password,
      rememberMe,
      loading,
      error,
      showPassword,
      togglePasswordVisibility,
      handleLogin
    };
  }
});
</script>

<style scoped>
/* Animations for background blobs */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -20px) scale(1.05);
  }
  50% {
    transform: translate(0, 20px) scale(0.95);
  }
  75% {
    transform: translate(-20px, -15px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 15s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Blur filter for decorative elements */
.blur-xl {
  filter: blur(24px);
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Error message animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .min-h-screen {
    min-height: 100vh;
  }
}
</style>
