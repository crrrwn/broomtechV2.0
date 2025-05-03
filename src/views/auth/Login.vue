<template>
  <div class="min-h-screen flex flex-col md:flex-row overflow-hidden">
    <!-- Left section - Brand/Welcome side with enhanced green background -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-b from-green-500 to-green-400 flex-col items-center justify-center p-10 relative overflow-hidden">
      <!-- Wave decoration at bottom -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="text-green-400 opacity-30">
          <path fill="currentColor" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-20 left-20 w-16 h-16 border-2 border-green-300 rounded-full opacity-40 animate-pulse-slow"></div>
      <div class="absolute bottom-32 right-40 w-24 h-24 border border-green-300 rounded-full opacity-30 animate-pulse-medium"></div>
      <div class="absolute top-1/2 left-1/4 w-8 h-8 border border-green-300 rounded-full opacity-40 animate-pulse-fast"></div>
      
      <!-- Glass card features -->
      <div class="z-10 text-center max-w-md">
        <div class="flex justify-center mb-8">
          <div class="logo-container">
            <div class="logo-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <div class="logo-ring"></div>
          </div>
        </div>
        <h1 class="text-4xl font-bold text-white mb-6">BroomTech</h1>
        <p class="text-xl text-white mb-10 leading-relaxed">Welcome back! Log in to access your account.</p>
        
        <!-- Feature cards similar to the image -->
        <div class="space-y-6">
          <div class="feature-card group">
            <div class="feature-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium text-lg">Secure & Protected</h3>
              <p class="text-green-100">End-to-end encryption for all your data</p>
            </div>
          </div>
          
          <div class="feature-card group">
            <div class="feature-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium text-lg">Real-time Tracking</h3>
              <p class="text-green-100">Monitor your deliveries in real-time</p>
            </div>
          </div>
          
          <div class="feature-card group">
            <div class="feature-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium text-lg">24/7 Support</h3>
              <p class="text-green-100">Our team is always ready to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right section - Form side -->
    <div class="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-12 relative">
      <!-- Mobile background (only visible on mobile) -->
      <div class="absolute inset-0 bg-gradient-to-b from-green-500 to-green-400 md:hidden"></div>
      
      <div class="max-w-md w-full space-y-8 relative z-10">
        <!-- Mobile logo (only visible on mobile) -->
        <div class="md:hidden text-center">
          <div class="flex justify-center mb-6">
            <div class="logo-container" style="height: 80px; width: 80px;">
              <div class="logo-inner" style="height: 64px; width: 64px;">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <div class="logo-ring"></div>
            </div>
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">BroomTech</h1>
        </div>
        
        <!-- Login header -->
        <div class="text-center">
          <h2 class="text-center text-3xl font-extrabold text-gray-900 md:text-gray-900 tracking-tight">
            Log in to your account
          </h2>
          <p class="mt-2 text-center text-sm text-white md:text-gray-600">
            Don't have an account?
            <router-link to="/register" class="text-link">
              Sign up
            </router-link>
          </p>
        </div>

        <!-- Enhanced login form with glass effect -->
        <div class="glass-card">
          <!-- Error message with improved styling -->
          <div v-if="error" class="error-message mb-6">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <!-- Email field with enhanced styling -->
            <div class="form-group">
              <label for="email-address" class="form-label">Email address</label>
              <div class="relative">
                <div class="form-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
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
                  class="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <!-- Password field with enhanced styling -->
            <div class="form-group">
              <div class="flex items-center justify-between">
                <label for="password" class="form-label">Password</label>
                <a href="#" class="text-link text-sm">
                  Forgot password?
                </a>
              </div>
              <div class="relative">
                <div class="form-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
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
                  class="form-input"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  @click="togglePassword" 
                  class="password-toggle"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember me checkbox - FIXED VERSION -->
            <div class="form-group">
              <div class="flex items-center">
                <label for="remember-me" class="flex items-center cursor-pointer">
                  <div class="checkbox-wrapper mr-3">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      v-model="rememberMe"
                      class="sr-only"
                    />
                    <div class="checkbox-ui flex items-center justify-center">
                      <svg v-if="rememberMe" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span class="text-sm text-gray-700">Remember me</span>
                </label>
              </div>
            </div>

            <!-- Enhanced Login button -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="premium-button"
              :class="{ 'opacity-70 cursor-not-allowed': !isFormValid }"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Enhanced loading animation -->
                <div class="wave-loader">
                  <div class="wave-dot"></div>
                  <div class="wave-dot"></div>
                  <div class="wave-dot"></div>
                </div>
              </span>
              <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Lock icon with animation -->
                <svg class="h-5 w-5 text-green-100 group-hover:text-green-200 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="button-text">{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
            </button>

            <!-- Enhanced divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <!-- Enhanced Google Sign-In Button -->
            <button 
              type="button" 
              @click="signInWithGoogle" 
              class="social-button"
              :disabled="isLoading"
            >
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        <!-- Footer with copyright -->
        <div class="text-center mt-8">
          <p class="text-sm text-white md:text-gray-600">
            Need help? <a href="#" class="text-link">Contact support</a>
          </p>
          <p class="text-xs text-white md:text-gray-500 mt-4">
            © 2025 BroomTech
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useAuthStore } from '../../stores/auth'

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    // Form fields
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)

    // Check for saved credentials on component mount
    onMounted(() => {
      // Check if credentials are saved
      const savedEmail = localStorage.getItem('rememberedEmail')
      const savedPassword = localStorage.getItem('rememberedPassword')
      
      if (savedEmail && savedPassword) {
        email.value = savedEmail
        password.value = atob(savedPassword) // decode from base64
        rememberMe.value = true
      }
    })

    // UI state
    const error = ref('')
    const isLoading = ref(false)
    const showPassword = ref(false)

    const isFormValid = computed(() => {
      return email.value && password.value
    })

    // Toggle password visibility
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    // Login with email and password
    const login = async () => {
      if (!isFormValid.value) return

      error.value = ''
      isLoading.value = true

      try {
        // Handle remember me functionality
        if (rememberMe.value) {
          localStorage.setItem('rememberedEmail', email.value)
          localStorage.setItem('rememberedPassword', btoa(password.value)) // encode to base64
        } else {
          localStorage.removeItem('rememberedEmail')
          localStorage.removeItem('rememberedPassword')
        }
        
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        
        // Get user role from your database
        // This would typically be done via a separate API call or Firestore
        // For example: const userDoc = await getDoc(doc(db, "users", user.uid))
        // const userRole = userDoc.data().role || 'user'
        
        // For now, we'll assume a default role
        const userRole = 'user'
        
        // Update auth store with user and role
        await authStore.setUser(user, userRole)
        
        // Redirect based on user role
        redirectBasedOnRole(userRole)
      } catch (err) {
        console.error('Login error:', err)
        error.value = getErrorMessage(err.code)
      } finally {
        isLoading.value = false
      }
    }

    // Sign in with Google
    const signInWithGoogle = async () => {
      error.value = ''
      isLoading.value = true

      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        
        // The signed-in user info
        const user = result.user
        
        // Get user role from your database or set a default
        // For now, we'll assume a default role
        const userRole = 'user'
        
        // Update auth store with user and role
        await authStore.setUser(user, userRole)
        
        // Redirect based on user role
        redirectBasedOnRole(userRole)
      } catch (err) {
        console.error('Google Sign-In error:', err)
        error.value = getErrorMessage(err.code)
      } finally {
        isLoading.value = false
      }
    }

    // Redirect based on user role
    const redirectBasedOnRole = (role) => {
      if (role === 'driver') {
        router.push('/driver')
      } else {
        router.push('/user')
      }
    }

    // Error message handler
    const getErrorMessage = (errorCode) => {
      switch (errorCode) {
        case 'auth/invalid-email':
          return 'Invalid email address format.'
        case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.'
        case 'auth/user-not-found':
          return 'No account found with this email. Please sign up.'
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.'
        case 'auth/too-many-requests':
          return 'Too many unsuccessful login attempts. Please try again later.'
        case 'auth/popup-closed-by-user':
          return 'Sign-in popup was closed before completing the sign in.'
        case 'auth/cancelled-popup-request':
          return 'The sign-in popup was cancelled.'
        case 'auth/popup-blocked':
          return 'The sign-in popup was blocked by the browser.'
        default:
          return 'An error occurred during sign in. Please try again.'
      }
    }

    return {
      email,
      password,
      rememberMe,
      error,
      isLoading,
      showPassword,
      isFormValid,
      togglePassword,
      login,
      signInWithGoogle
    }
  }
}
</script>

<style scoped>
/* Background pattern */
.bg-dot-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Pulse animations */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

@keyframes pulse-medium {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.08);
  }
}

@keyframes pulse-fast {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s infinite;
}

.animate-pulse-medium {
  animation: pulse-medium 6s infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 4s infinite;
}

/* Enhanced logo */
.logo-container {
  @apply relative flex items-center justify-center h-20 w-20;
}

.logo-inner {
  @apply bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center h-16 w-16 shadow-lg z-10;
  animation: logo-pulse 3s infinite;
}

.logo-ring {
  @apply absolute inset-0 rounded-full border-2 border-green-300;
  animation: logo-ring 3s infinite;
}

@keyframes logo-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes logo-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* Feature cards */
.feature-card {
  @apply flex items-center p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-sm transition-all duration-300 hover:bg-white/30 hover:shadow-md;
}

.feature-icon-container {
  @apply mr-4 bg-white p-2.5 rounded-full group-hover:bg-green-50 transition-colors duration-300;
}

/* Glass card effect */
.glass-card {
  @apply bg-white/90 backdrop-blur-sm py-8 px-6 sm:px-8 shadow-xl border border-gray-100 rounded-2xl transition-all duration-500;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.05);
}

.glass-card:hover {
  @apply bg-white/95;
  box-shadow: 0 20px 60px -15px rgba(4, 92, 29, 0.806), 0 8px 24px -6px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

/* Form styling */
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-input {
  @apply appearance-none block w-full pl-10 pr-10 py-3.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900;
}

.form-input:focus {
  @apply border-green-500 ring-green-200;
}

.form-icon {
  @apply absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none;
}

.password-toggle {
  @apply absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-600 focus:outline-none transition-colors duration-300;
}

/* Fixed Checkbox styling */
.checkbox-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.checkbox-ui {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid #22c55e;
  background-color: white;
  transition: all 0.2s ease;
}

input:checked ~ .checkbox-ui {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-color: transparent;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}

input:focus ~ .checkbox-ui {
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
}

/* Button styling */
.premium-button {
  @apply relative flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed w-full;
  background: linear-gradient(135deg, #014f1d, #16a34a);
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.25), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.premium-button:hover {
  background: linear-gradient(135deg, #00772c, #15803d);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.premium-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
}

.button-text {
  position: relative;
  z-index: 10;
}

/* Social button styling */
.social-button {
  @apply flex items-center justify-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed w-full;
}

/* Wave loader */
.wave-loader {
  @apply flex space-x-1 items-center;
}

.wave-dot {
  @apply w-2 h-2 bg-white rounded-full;
  animation: wave 1.5s infinite ease-in-out;
}

.wave-dot:nth-child(1) {
  animation-delay: -0.4s;
}

.wave-dot:nth-child(2) {
  animation-delay: -0.2s;
}

.wave-dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes wave {
  0%, 60%, 100% { 
    transform: translateY(0);
  } 
  30% { 
    transform: translateY(-6px);
  }
}

/* Text link */
.text-link {
  @apply font-medium text-green-600 hover:text-green-700 transition-colors duration-300 relative;
}

.text-link::after {
  content: '';
  @apply absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 opacity-0 transition-all duration-300;
}

.text-link:hover::after {
  @apply w-full opacity-70;
}

/* Error message styling */
.error-message {
  @apply bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-sm;
  animation: fadeIn 0.3s ease-out forwards;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-input {
    @apply py-3;
  }

  .premium-button, .social-button {
    @apply py-3;
  }
}

@media (max-width: 375px) {
  .form-input {
    @apply py-2.5;
  }

  .premium-button, .social-button {
    @apply py-2.5 text-xs;
  }
}
</style>