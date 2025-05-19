<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Profile Settings</h1>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Update your personal details and preferences.</p>
          </div>
          
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <!-- Profile Form -->
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profile Information</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <form @submit.prevent="updateProfile">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                        <input 
                          type="text" 
                          id="first-name" 
                          v-model="profileData.firstName"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6 sm:col-span-2">
                        <label for="middle-name" class="block text-sm font-medium text-gray-700">Middle name</label>
                        <input 
                          type="text" 
                          id="middle-name" 
                          v-model="profileData.middleName"
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6 sm:col-span-2">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                        <input 
                          type="text" 
                          id="last-name" 
                          v-model="profileData.lastName"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <input 
                          type="email" 
                          id="email" 
                          v-model="profileData.email"
                          disabled
                          class="mt-1 bg-gray-50 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-not-allowed" 
                        />
                        <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <div class="col-span-6 sm:col-span-3">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          v-model="profileData.phone"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6">
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <textarea 
                          id="address" 
                          v-model="profileData.address"
                          rows="3" 
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div class="mt-4 flex justify-end">
                      <button 
                        type="submit"
                        :disabled="updatingProfile"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                      >
                        {{ updatingProfile ? 'Saving...' : 'Save' }}
                      </button>
                    </div>
                  </form>
                </dd>
              </div>
              
              <!-- Change Password Form -->
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Change Password</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <form @submit.prevent="changePassword">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-4">
                        <label for="current-password" class="block text-sm font-medium text-gray-700">Current password</label>
                        <input 
                          type="password" 
                          id="current-password" 
                          v-model="passwordData.currentPassword"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6 sm:col-span-4">
                        <label for="new-password" class="block text-sm font-medium text-gray-700">New password</label>
                        <input 
                          type="password" 
                          id="new-password" 
                          v-model="passwordData.newPassword"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      
                      <div class="col-span-6 sm:col-span-4">
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm new password</label>
                        <input 
                          type="password" 
                          id="confirm-password" 
                          v-model="passwordData.confirmPassword"
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                    </div>
                    
                    <div class="mt-4 flex justify-end">
                      <button 
                        type="submit"
                        :disabled="changingPassword"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                      >
                        {{ changingPassword ? 'Updating...' : 'Update Password' }}
                      </button>
                    </div>
                  </form>
                </dd>
              </div>
              
              <!-- Account Actions -->
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Account Actions</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="space-y-4">
                    <button 
                      @click="showDeleteAccountModal = true"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccountModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteAccountModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Delete Account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                  </p>
                  <div class="mt-4">
                    <label for="delete-confirmation" class="block text-sm font-medium text-gray-700">Please type "DELETE" to confirm</label>
                    <input 
                      type="text" 
                      id="delete-confirmation" 
                      v-model="deleteConfirmation"
                      class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="deleteAccount"
              :disabled="deleteConfirmation !== 'DELETE' || deletingAccount"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ deletingAccount ? 'Deleting...' : 'Delete Account' }}
            </button>
            <button 
              type="button" 
              @click="showDeleteAccountModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser, updatePassword } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const updatingProfile = ref(false);
const changingPassword = ref(false);
const showDeleteAccountModal = ref(false);
const deletingAccount = ref(false);
const deleteConfirmation = ref('');
const profileUpdated = ref(false);

const profileData = reactive({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
});

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Watch for changes in the auth store's userProfile
watch(() => authStore.userProfile, (newProfile) => {
  if (newProfile) {
    loadUserProfile();
  }
}, { deep: true });

const loadUserProfile = () => {
  if (authStore.userProfile) {
    profileData.firstName = authStore.userProfile.firstName || '';
    profileData.middleName = authStore.userProfile.middleName || '';
    profileData.lastName = authStore.userProfile.lastName || '';
    profileData.email = authStore.user?.email || '';
    profileData.phone = authStore.userProfile.phone || '';
    profileData.address = authStore.userProfile.address || '';
    
    loading.value = false;
  } else {
    // If user profile is not loaded yet, wait for it
    setTimeout(() => {
      if (authStore.userProfile) {
        loadUserProfile();
      } else if (authStore.user) {
        // If we have a user but no profile, create an empty profile
        loading.value = false;
      } else {
        // Redirect to login if no user is found after waiting
        router.push('/login');
      }
    }, 1000);
  }
};

const updateProfile = async () => {
  updatingProfile.value = true;
  
  try {
    // Make sure we have the user ID
    if (!authStore.user?.id) {
      throw new Error('User not authenticated');
    }
    
    // Prepare the updated profile data
    const updatedProfile = {
      firstName: profileData.firstName,
      middleName: profileData.middleName,
      lastName: profileData.lastName,
      phone: profileData.phone,
      address: profileData.address,
      // Preserve other fields that might exist in the profile
      ...(authStore.userProfile || {}),
      // Make sure these fields are always set
      id: authStore.user.id,
      email: authStore.user.email,
      updatedAt: new Date().toISOString()
    };
    
    // Update the profile in Firestore directly to ensure it's saved
    await setDoc(doc(db, 'users', authStore.user.id), updatedProfile, { merge: true });
    
    // Update the local store
    authStore.setUser({
      ...authStore.user,
      ...updatedProfile
    });
    
    // Set flag to show success message
    profileUpdated.value = true;
    
    // Show success notification
    window.$notification?.success('Success', 'Profile updated successfully');
    
    // Reload the profile data to ensure we have the latest
    loadUserProfile();
  } catch (error) {
    console.error('Error updating profile:', error);
    window.$notification?.error('Error', 'Failed to update profile: ' + error.message);
  } finally {
    updatingProfile.value = false;
  }
};

const changePassword = async () => {
  // Validate passwords
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    window.$notification?.error('Error', 'New passwords do not match');
    return;
  }
  
  if (passwordData.newPassword.length < 6) {
    window.$notification?.error('Error', 'Password must be at least 6 characters long');
    return;
  }
  
  changingPassword.value = true;
  
  try {
    // Get current user
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, passwordData.newPassword);
    
    // Clear password fields
    passwordData.currentPassword = '';
    passwordData.newPassword = '';
    passwordData.confirmPassword = '';
    
    window.$notification?.success('Success', 'Password updated successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    
    if (error.code === 'auth/wrong-password') {
      window.$notification?.error('Error', 'Current password is incorrect');
    } else {
      window.$notification?.error('Error', 'Failed to update password: ' + error.message);
    }
  } finally {
    changingPassword.value = false;
  }
};

const deleteAccount = async () => {
  if (deleteConfirmation.value !== 'DELETE') {
    return;
  }
  
  deletingAccount.value = true;
  
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Delete user account
    await deleteUser(user);
    
    // Clear local user data
    authStore.clearUser();
    
    // Redirect to home page
    router.push('/');
    
    window.$notification?.success('Account Deleted', 'Your account has been successfully deleted');
  } catch (error) {
    console.error('Error deleting account:', error);
    window.$notification?.error('Error', 'Failed to delete account. You may need to sign in again before deleting.');
    
    // If error is due to requiring recent authentication, sign out and redirect to login
    if (error.code === 'auth/requires-recent-login') {
      await authStore.logout();
      router.push('/login');
    }
  } finally {
    deletingAccount.value = false;
    showDeleteAccountModal.value = false;
  }
};

onMounted(() => {
  // Check if user is authenticated
  if (!authStore.user) {
    // Try to initialize auth if not already done
    authStore.initAuth().then(() => {
      if (!authStore.user) {
        // Redirect to login if still not authenticated
        router.push('/login');
        return;
      }
      loadUserProfile();
    });
  } else {
    loadUserProfile();
  }
});
</script>
