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
                          required
                          class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
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
              
              <!-- Notification Settings -->
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Notification Settings</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input 
                          id="email-notifications" 
                          type="checkbox" 
                          v-model="notificationSettings.email"
                          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" 
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="email-notifications" class="font-medium text-gray-700">Email notifications</label>
                        <p class="text-gray-500">Receive email notifications for booking updates and promotions.</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input 
                          id="sms-notifications" 
                          type="checkbox" 
                          v-model="notificationSettings.sms"
                          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" 
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="sms-notifications" class="font-medium text-gray-700">SMS notifications</label>
                        <p class="text-gray-500">Receive SMS notifications for booking updates and promotions.</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input 
                          id="push-notifications" 
                          type="checkbox" 
                          v-model="notificationSettings.push"
                          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" 
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="push-notifications" class="font-medium text-gray-700">Push notifications</label>
                        <p class="text-gray-500">Receive push notifications for booking updates and promotions.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-4 flex justify-end">
                    <button 
                      @click="saveNotificationSettings"
                      :disabled="savingNotifications"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {{ savingNotifications ? 'Saving...' : 'Save Preferences' }}
                    </button>
                  </div>
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { auth } from '../../firebase/config';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const updatingProfile = ref(false);
const changingPassword = ref(false);
const savingNotifications = ref(false);
const showDeleteAccountModal = ref(false);
const deletingAccount = ref(false);
const deleteConfirmation = ref('');

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

const notificationSettings = reactive({
  email: true,
  sms: true,
  push: false
});

const loadUserProfile = () => {
  if (authStore.userProfile) {
    profileData.firstName = authStore.userProfile.firstName || '';
    profileData.middleName = authStore.userProfile.middleName || '';
    profileData.lastName = authStore.userProfile.lastName || '';
    profileData.email = authStore.user?.email || '';
    profileData.phone = authStore.userProfile.phone || '';
    profileData.address = authStore.userProfile.address || '';
    
    // Load notification settings if available
    if (authStore.userProfile.notificationSettings) {
      notificationSettings.email = authStore.userProfile.notificationSettings.email ?? true;
      notificationSettings.sms = authStore.userProfile.notificationSettings.sms ?? true;
      notificationSettings.push = authStore.userProfile.notificationSettings.push ?? false;
    }
    
    loading.value = false;
  } else {
    // If user profile is not loaded yet, wait for it
    setTimeout(() => {
      if (authStore.userProfile) {
        loadUserProfile();
      } else {
        loading.value = false;
      }
    }, 1000);
  }
};

const updateProfile = async () => {
  updatingProfile.value = true;
  
  try {
    await authStore.updateUserProfile({
      firstName: profileData.firstName,
      middleName: profileData.middleName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    });
    
    window.$notification?.success('Success', 'Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    window.$notification?.error('Error', 'Failed to update profile');
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
    // Re-authenticate user before changing password
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
    
    await reauthenticateWithCredential(user, credential);
    await authStore.changePassword(passwordData.newPassword);
    
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
      window.$notification?.error('Error', 'Failed to update password');
    }
  } finally {
    changingPassword.value = false;
  }
};

const saveNotificationSettings = async () => {
  savingNotifications.value = true;
  
  try {
    await authStore.updateUserProfile({
      notificationSettings: {
        email: notificationSettings.email,
        sms: notificationSettings.sms,
        push: notificationSettings.push
      }
    });
    
    window.$notification?.success('Success', 'Notification preferences saved');
  } catch (error) {
    console.error('Error saving notification settings:', error);
    window.$notification?.error('Error', 'Failed to save notification preferences');
  } finally {
    savingNotifications.value = false;
  }
};

const deleteAccount = async () => {
  if (deleteConfirmation.value !== 'DELETE') {
    return;
  }
  
  deletingAccount.value = true;
  
  try {
    const user = auth.currentUser;
    
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
  loadUserProfile();
});
</script>

