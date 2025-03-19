<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Clean minimal background -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 bg-white">
      <!-- Simple border at the top -->
      <div class="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
    </div>

    <!-- Register card -->
    <div class="max-w-4xl w-full space-y-6 relative z-10">
      <!-- Logo and header -->
      <div class="text-center">
        <div class="flex justify-center mb-3 transform hover:scale-105 transition-transform duration-300">
          <div class="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-300 underline-animation">
            Sign in
          </router-link>
        </p>
      </div>

      <!-- Register form -->
      <div class="bg-white py-8 px-6 sm:px-8 shadow-md border border-gray-200 rounded-xl transition-all duration-500">
        <!-- Error message -->
        <div v-if="error" class="error-message mb-6">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Two column layout for larger screens -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Left column - Form fields -->
          <div class="lg:col-span-3 space-y-5">
            <form @submit.prevent="register">
              <!-- Full Name field -->
              <div class="form-group">
                <label for="full-name" class="form-label">Full Name</label>
                <div class="relative">
                  <div class="form-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    autocomplete="name"
                    required
                    v-model="fullName"
                    class="form-input"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
              </div>

              <!-- Email and Phone in a row on larger screens -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <!-- Email field -->
                <div class="form-group">
                  <label for="email-address" class="form-label">Email address</label>
                  <div class="relative">
                    <div class="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
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

                <!-- Phone Number field -->
                <div class="form-group">
                  <label for="phone-number" class="form-label">Phone Number</label>
                  <div class="relative">
                    <div class="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      id="phone-number"
                      name="phoneNumber"
                      type="tel"
                      autocomplete="tel"
                      required
                      v-model="phoneNumber"
                      class="form-input"
                      placeholder="+63) 1234 567 8910"
                    />
                  </div>
                </div>
              </div>

              <!-- Password fields in a row on larger screens -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <!-- Password field -->
                <div class="form-group">
                  <label for="password" class="form-label">Password</label>
                  <div class="relative">
                    <div class="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      v-model="password"
                      class="form-input"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      @click="togglePassword" 
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    </button>
                  </div>
                  <div class="mt-1">
                    <div class="password-strength-meter">
                      <div 
                        class="password-strength-bar" 
                        :style="{ width: passwordStrength.score + '%' }"
                        :class="passwordStrengthClass"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">{{ passwordStrength.message }}</p>
                  </div>
                </div>

                <!-- Confirm Password field -->
                <div class="form-group">
                  <label for="confirm-password" class="form-label">Confirm Password</label>
                  <div class="relative">
                    <div class="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      v-model="confirmPassword"
                      class="form-input"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      @click="toggleConfirmPassword" 
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1">Passwords do not match</p>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="form-group mt-5">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      v-model="agreeToTerms"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="text-gray-700">
                      I agree to the 
                      <a href="#" class="text-green-600 hover:text-green-500 underline-animation">Terms of Service</a> 
                      and 
                      <a href="#" class="text-green-600 hover:text-green-500 underline-animation">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Right column - Role selection and sign-up options -->
          <div class="lg:col-span-2 flex flex-col justify-between space-y-6">
            <!-- User Role Selection -->
            <div class="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 mb-3">I want to register as:</h3>
              <div class="space-y-3">
                <div 
                  class="role-option-card" 
                  :class="{ 'role-selected': userRole === 'user' }"
                  @click="userRole = 'user'"
                >
                  <div class="flex items-center">
                    <div class="role-icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <span class="font-medium">Customer</span>
                      <p class="text-xs text-gray-500">Order deliveries and track your packages</p>
                    </div>
                  </div>
                </div>
                <div 
                  class="role-option-card" 
                  :class="{ 'role-selected': userRole === 'driver' }"
                  @click="userRole = 'driver'"
                >
                  <div class="flex items-center">
                    <div class="role-icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <span class="font-medium">Driver</span>
                      <p class="text-xs text-gray-500">Deliver packages and earn money</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sign-up options -->
            <div class="space-y-4">
              <!-- Register button -->
              <button
                type="submit"
                @click="register"
                :disabled="isLoading || !isFormValid"
                class="register-button group"
                :class="{ 'opacity-70 cursor-not-allowed': !isFormValid }"
              >
                <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Loading spinner -->
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- User icon -->
                  <svg class="h-5 w-5 text-green-500 group-hover:text-green-400 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </span>
                <span class="button-text">{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
              </button>

              <!-- Divider -->
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <!-- Google Sign-Up Button -->
              <button 
                type="button" 
                @click="signUpWithGoogle" 
                class="google-signup-button"
                :disabled="isLoading"
              >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Help text -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Need help? <a href="#" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-300 underline-animation">Contact support</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form fields
const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const confirmPassword = ref('')
const userRole = ref('user')
const agreeToTerms = ref(false)

// UI state
const error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password validation
const passwordStrength = computed(() => {
  if (!password.value) {
    return { score: 0, message: 'Password is required' }
  }
  
  let score = 0
  let message = ''
  
  // Length check
  if (password.value.length >= 8) score += 20
  
  // Complexity checks
  if (/[A-Z]/.test(password.value)) score += 20
  if (/[a-z]/.test(password.value)) score += 20
  if (/[0-9]/.test(password.value)) score += 20
  if (/[^A-Za-z0-9]/.test(password.value)) score += 20
  
  // Set message based on score
  if (score < 40) {
    message = 'Weak password'
  } else if (score < 80) {
    message = 'Medium strength password'
  } else {
    message = 'Strong password'
  }
  
  return { score, message }
})

const passwordStrengthClass = computed(() => {
  const score = passwordStrength.value.score
  if (score < 40) return 'bg-red-500'
  if (score < 80) return 'bg-yellow-500'
  return 'bg-green-500'
})

const passwordMismatch = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value
})

const isFormValid = computed(() => {
  return (
    fullName.value &&
    email.value &&
    phoneNumber.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    passwordStrength.value.score >= 40 &&
    agreeToTerms.value
  )
})

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Register with email and password
const register = async () => {
  if (!isFormValid.value) return
  
  error.value = ''
  isLoading.value = true
  
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: fullName.value
    })
    
    // Store additional user data in your database
    // This would typically be done via a separate API call or Firestore
    // For example: await setDoc(doc(db, "users", user.uid), { ... })
    
    // Update auth store with user role
    await authStore.setUser(user, userRole.value)
    
    // Redirect based on user role
    redirectBasedOnRole()
  } catch (err) {
    console.error('Registration error:', err)
    error.value = getErrorMessage(err.code)
  } finally {
    isLoading.value = false
  }
}

// Sign up with Google
const signUpWithGoogle = async () => {
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
    
    // Update auth store with default user role
    // You might want to show a role selection screen after Google sign-in
    await authStore.setUser(user, userRole.value)
    
    // Redirect based on user role
    redirectBasedOnRole()
  } catch (err) {
    console.error('Google Sign-Up error:', err)
    error.value = getErrorMessage(err.code)
  } finally {
    isLoading.value = false
  }
}

// Redirect based on user role
const redirectBasedOnRole = () => {
  if (userRole.value === 'driver') {
    router.push('/driver')
  } else {
    router.push('/user')
  }
}

// Error message handler
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another email or sign in.'
    case 'auth/invalid-email':
      return 'Invalid email address format.'
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.'
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.'
    case 'auth/popup-closed-by-user':
      return 'Sign-up popup was closed before completing the sign up.'
    case 'auth/cancelled-popup-request':
      return 'The sign-up popup was cancelled.'
    case 'auth/popup-blocked':
      return 'The sign-up popup was blocked by the browser.'
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials.'
    default:
      return 'An error occurred during registration. Please try again.'
  }
}
</script>

<style scoped>
/* Card shadow effects */
.shadow-card {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
}

.shadow-card-hover {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

/* Form styling */
.form-group {
  @apply space-y-1;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-input {
  @apply appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-gray-900;
}

.form-icon {
  @apply absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none;
}

/* Button styling */
.register-button {
  @apply relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed;
}

/* Google Sign-Up Button */
.google-signup-button {
  @apply w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed;
}

.button-text {
  @apply transition-all duration-300;
}

/* Error message styling */
.error-message {
  @apply bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md animate-fadeIn;
}

/* Password strength meter */
.password-strength-meter {
  @apply w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1;
}

.password-strength-bar {
  @apply h-full transition-all duration-300 ease-out;
}

/* Role selection styling */
.role-option-card {
  @apply p-4 border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:border-green-500 hover:shadow-sm;
}

.role-selected {
  @apply border-green-500 bg-gray-100 shadow-sm;
}

.role-icon-wrapper {
  @apply flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600;
}

/* Underline animation for links */
.underline-animation {
  @apply relative;
}

.underline-animation::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300;
}

.underline-animation:hover::after {
  @apply w-full;
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

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-input {
    @apply py-2.5;
  }
  
  .register-button, .google-signup-button {
    @apply py-2.5;
  }
}
</style>