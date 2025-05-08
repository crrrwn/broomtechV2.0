<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">Account Settings</h1>
          <p class="mt-2 max-w-xl text-green-50">Manage your profile information and security settings</p>
        </div>
      </div>
    </div>
    
    <!-- Profile Information Card -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
      
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-grab-green"></div>
      </div>
      
      <form v-else @submit.prevent="updateProfile" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="profile.firstName" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="profile.lastName" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="profile.email" 
              disabled 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" 
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="profile.phone" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
            />
          </div>
        </div>
        <div>
          <button 
            type="submit" 
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-grab-green hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green transition-colors duration-150"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <!-- Change Password Card -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
      
      <form @submit.prevent="changePassword" class="space-y-4">
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input 
            type="password" 
            id="currentPassword" 
            v-model="passwordForm.currentPassword" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
          />
        </div>
        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input 
            type="password" 
            id="newPassword" 
            v-model="passwordForm.newPassword" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
          />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="passwordForm.confirmPassword" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent" 
          />
        </div>
        <div>
          <button 
            type="submit" 
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-grab-green hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green transition-colors duration-150"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { auth, db } from '../../firebase/config';
  import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
  import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
  import { useNotification } from '../../composables/useNotification';
  
  // Notification system
  const { showNotification } = useNotification();
  
  // State
  const loading = ref(true);
  const profile = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      loading.value = true;
      const user = auth.currentUser;
      
      if (user) {
        // Get user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          profile.value = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: user.email || '',
            phone: userData.phone || ''
          };
        } else {
          // Create a new user document if it doesn't exist
          profile.value.email = user.email || '';
          await setDoc(doc(db, 'users', user.uid), {
            firstName: '',
            lastName: '',
            phone: '',
            role: 'user',
            createdAt: new Date()
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load profile information. Please try again.'
      });
    } finally {
      loading.value = false;
    }
  };
  
  // Update profile
  const updateProfile = async () => {
    try {
      const user = auth.currentUser;
      
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          firstName: profile.value.firstName,
          lastName: profile.value.lastName,
          phone: profile.value.phone
        });
        
        showNotification({
          type: 'success',
          title: 'Profile Updated',
          message: 'Your profile information has been updated successfully.'
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };
  
  // Change password
  const changePassword = async () => {
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordForm.value;
      
      if (newPassword !== confirmPassword) {
        showNotification({
          type: 'error',
          title: 'Password Mismatch',
          message: 'New passwords do not match.'
        });
        return;
      }
      
      if (newPassword.length < 6) {
        showNotification({
          type: 'error',
          title: 'Password Too Short',
          message: 'New password must be at least 6 characters long.'
        });
        return;
      }
      
      const user = auth.currentUser;
      
      if (user && user.email) {
        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        
        // Update password
        await updatePassword(user, newPassword);
        
        showNotification({
          type: 'success',
          title: 'Password Updated',
          message: 'Your password has been updated successfully.'
        });
        
        // Reset form
        passwordForm.value = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
      }
    } catch (error) {
      console.error('Error changing password:', error);
      
      if (error.code === 'auth/wrong-password') {
        showNotification({
          type: 'error',
          title: 'Authentication Error',
          message: 'Current password is incorrect.'
        });
      } else {
        showNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to update password. Please try again.'
        });
      }
    }
  };
  
  // Initialize
  onMounted(fetchUserProfile);
  </script>
  
  <style>
  :root {
    --grab-green: #00B14F;
    --grab-green-dark: #009a44;
    --grab-green-light: #e6f7ee;
  }
  
  .bg-grab-green {
    background-color: var(--grab-green);
  }
  
  .bg-grab-green-dark {
    background-color: var(--grab-green-dark);
  }
  
  .bg-grab-green-light {
    background-color: var(--grab-green-light);
  }
  
  .text-grab-green {
    color: var(--grab-green);
  }
  
  .border-grab-green {
    border-color: var(--grab-green);
  }
  
  .focus\:ring-grab-green:focus {
    --tw-ring-color: var(--grab-green);
  }
  
  .hover\:bg-grab-green-dark:hover {
    background-color: var(--grab-green-dark);
  }
  
  /* Animation for skeleton loaders */
  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  /* Transitions */
  .transition-colors {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  
  /* Ensure text doesn't overflow on small screens */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* Improve touch targets on mobile */
  @media (max-width: 640px) {
    button, 
    a[role="button"] {
      min-height: 2.5rem;
    }
  
    .flex-wrap {
      flex-wrap: wrap;
    }
  }
  </style>