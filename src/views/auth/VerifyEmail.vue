<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          We've sent a verification email to <span class="font-medium">{{ userEmail }}</span>
        </p>
      </div>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              <strong>You must verify your email before logging in.</strong> Please check your email and click the verification link to activate your account. If you don't see the email, check your spam folder.
            </p>
          </div>
        </div>
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
      
      <div v-if="success" class="bg-green-50 border-l-4 border-green-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{{ success }}</p>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col space-y-4">
        <button 
          @click="resendVerificationEmail" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Sending...' : 'Resend verification email' }}
        </button>
        
        <button 
          @click="checkVerificationStatus" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Checking...' : 'I\'ve verified my email' }}
        </button>
        
        <div class="text-center">
          <router-link to="/login" class="text-sm font-medium text-blue-600 hover:text-blue-500">
            Return to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/config';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const error = ref('');
const success = ref('');

// Get the email from the URL query parameter or from the auth store
const userEmail = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get('email');
  return emailParam || authStore.user?.email || sessionStorage.getItem('pendingVerificationEmail') || 'your email';
});

// Store the email in session storage for persistence
onMounted(() => {
  if (userEmail.value && userEmail.value !== 'your email') {
    sessionStorage.setItem('pendingVerificationEmail', userEmail.value);
  }
});

const resendVerificationEmail = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';
  
  try {
    console.log('Attempting to resend verification email to:', userEmail.value);
    
    // Check if user is authenticated
    if (!auth.currentUser) {
      throw new Error('You need to be logged in to resend the verification email');
    }
    
    // Send verification email directly using Firebase
    await sendEmailVerification(auth.currentUser);
    
    success.value = 'Verification email sent! Please check your inbox.';
  } catch (err) {
    console.error('Error sending verification email:', err);
    error.value = err.message || 'Failed to send verification email. Please try again.';
  } finally {
    loading.value = false;
  }
};

const checkVerificationStatus = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';
  
  try {
    console.log('Checking email verification status');
    
    // Check if user is authenticated
    if (!auth.currentUser) {
      // Redirect to login with a message
      error.value = 'Please login to check your verification status.';
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }
    
    // Reload the user to get the latest verification status
    await auth.currentUser.reload();
    
    if (auth.currentUser.emailVerified) {
      success.value = 'Email verified successfully! You can now log in.';
      
      // Clear the stored email
      sessionStorage.removeItem('pendingVerificationEmail');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      error.value = 'Your email is not verified yet. Please check your inbox and click the verification link.';
    }
  } catch (err) {
    console.error('Error checking verification status:', err);
    error.value = err.message || 'Failed to check verification status. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>