<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          We've sent a verification email to {{ userEmail }}
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
              Please check your email and click the verification link to activate your account. If you don't see the email, check your spam folder.
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
      
      <div class="flex flex-col space-y-4">
        <button 
          @click="resendVerificationEmail" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {{ loading ? 'Sending...' : 'Resend verification email' }}
        </button>
        
        <button 
          @click="checkVerificationStatus" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {{ loading ? 'Checking...' : 'I\'ve verified my email' }}
        </button>
        
        <button 
          @click="logout" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { auth } from '../../firebase/config';
import { sendEmailVerification, reload } from 'firebase/auth';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const error = ref('');

const userEmail = computed(() => {
  return authStore.user?.email || 'your email';
});

const resendVerificationEmail = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    await sendEmailVerification(auth.currentUser);
    alert('Verification email sent! Please check your inbox.');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const checkVerificationStatus = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    await reload(auth.currentUser);
    
    if (auth.currentUser.emailVerified) {
      // Redirect based on user role
      if (authStore.userRole === 'user') {
        router.push('/user');
      } else if (authStore.userRole === 'driver') {
        router.push('/driver');
      } else if (authStore.userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      error.value = 'Your email is not verified yet. Please check your inbox and click the verification link.';
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const logout = async () => {
  loading.value = true;
  
  try {
    await authStore.logout();
    router.push('/login');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

