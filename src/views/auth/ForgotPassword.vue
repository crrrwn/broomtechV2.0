<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
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
      
      <div v-if="success" class="bg-green-50 border-l-4 border-green-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{{ success }}</p>
          </div>
        </div>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input 
            id="email-address" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required 
            v-model="email"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" 
            placeholder="Email address" 
          />
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {{ loading ? 'Sending reset link...' : 'Send password reset link' }}
          </button>
        </div>
      </form>
      
      <div class="text-center">
        <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
          Back to sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const email = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

const handleResetPassword = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';
  
  try {
    await authStore.resetPassword(email.value);
    success.value = 'Password reset link sent! Please check your email.';
    email.value = '';
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>