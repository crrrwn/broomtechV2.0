<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </router-link>
        </p>
      </div>
      
      <div v-if="error" class="bg-red-50 border-l-4 border-red-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="first-name" class="sr-only">First Name</label>
              <input 
                id="first-name" 
                name="firstName" 
                type="text" 
                required 
                v-model="userData.firstName"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
                placeholder="First Name" 
              />
            </div>
            <div>
              <label for="last-name" class="sr-only">Last Name</label>
              <input 
                id="last-name" 
                name="lastName" 
                type="text" 
                required 
                v-model="userData.lastName"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
                placeholder="Last Name" 
              />
            </div>
          </div>
          <div>
            <label for="middle-name" class="sr-only">Middle Name</label>
            <input 
              id="middle-name" 
              name="middleName" 
              type="text" 
              v-model="userData.middleName"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Middle Name (Optional)" 
            />
          </div>
          <div>
            <label for="address" class="sr-only">Address</label>
            <input 
              id="address" 
              name="address" 
              type="text" 
              required 
              v-model="userData.address"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Address" 
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input 
              id="email-address" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="userData.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Email address" 
            />
          </div>
          <div>
            <label for="phone" class="sr-only">Phone Number</label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              required 
              v-model="userData.phone"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Phone Number" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="userData.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Password" 
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input 
              id="confirm-password" 
              name="confirmPassword" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="userData.confirmPassword"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
              placeholder="Confirm Password" 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
      
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6">
          <button 
            type="button" 
            @click="handleGoogleSignup"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useNotificationStore } from '../../stores/notification';

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const userData = reactive({
  firstName: '',
  lastName: '',
  middleName: '',
  address: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');

const validateForm = () => {
  if (!userData.firstName || !userData.lastName || !userData.address || 
      !userData.email || !userData.phone || !userData.password || !userData.confirmPassword) {
    error.value = 'Please fill in all required fields';
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    error.value = 'Please enter a valid email address';
    return false;
  }
  
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(userData.phone.replace(/[^0-9]/g, ''))) {
    error.value = 'Please enter a valid phone number';
    return false;
  }
  
  if (userData.password !== userData.confirmPassword) {
    error.value = 'Passwords do not match';
    return false;
  }
  
  if (userData.password.length < 6) {
    error.value = 'Password must be at least 6 characters long';
    return false;
  }
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s.',-]+$/;
  if (!nameRegex.test(userData.firstName) || !nameRegex.test(userData.lastName)) {
    error.value = 'Please enter valid name information';
    return false;
  }
  
  return true;
};

const handleRegister = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    // Register the user
    await authStore.register(userData.email, userData.password, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      middleName: userData.middleName,
      address: userData.address,
      phone: userData.phone,
      role: 'user'
    });
    
    // Show success notification
    notificationStore.showNotification({
      type: 'success',
      message: 'Registration successful! Please verify your email.'
    });
    
    // Redirect to email verification page
    router.push('/verify-email');
  } catch (err) {
    console.error('Registration error:', err);
    error.value = getErrorMessage(err.code);
  } finally {
    loading.value = false;
  }
};

const handleGoogleSignup = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    await authStore.loginWithGoogle();
    
    notificationStore.showNotification({
      type: 'success',
      message: 'Successfully signed up with Google!'
    });
    
    // Redirect based on user role
    if (authStore.isAdmin) {
      router.push('/admin');
    } else if (authStore.isDriver) {
      router.push('/driver');
    } else {
      router.push('/user');
    }
  } catch (err) {
    console.error('Google sign-up error:', err);
    error.value = 'Failed to sign up with Google. Please try again.';
  } finally {
    loading.value = false;
  }
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    default:
      return 'An error occurred during registration. Please try again.';
  }
};
</script>