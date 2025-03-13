<template>
  <div class="settings-container">
    <div class="container py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
      
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <form v-else @submit.prevent="updateProfile" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" v-model="profile.firstName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" v-model="profile.lastName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="profile.email" disabled class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm" />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" v-model="profile.phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Change Password</h2>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="newPassword" v-model="passwordForm.newPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '../../firebase/config';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default {
  name: 'Settings',
  setup() {
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
        alert('Failed to load profile information. Please try again.');
      } finally {
        loading.value = false;
      }
    };
    
    const updateProfile = async () => {
      try {
        const user = auth.currentUser;
        
        if (user) {
          await updateDoc(doc(db, 'users', user.uid), {
            firstName: profile.value.firstName,
            lastName: profile.value.lastName,
            phone: profile.value.phone
          });
          
          alert('Profile updated successfully!');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    };
    
    const changePassword = async () => {
      try {
        const { currentPassword, newPassword, confirmPassword } = passwordForm.value;
        
        if (newPassword !== confirmPassword) {
          alert('New passwords do not match.');
          return;
        }
        
        if (newPassword.length < 6) {
          alert('New password must be at least 6 characters long.');
          return;
        }
        
        const user = auth.currentUser;
        
        if (user && user.email) {
          // Re-authenticate user before changing password
          const credential = EmailAuthProvider.credential(user.email, currentPassword);
          await reauthenticateWithCredential(user, credential);
          
          // Update password
          await updatePassword(user, newPassword);
          
          alert('Password updated successfully!');
          passwordForm.value = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
        }
      } catch (error) {
        console.error('Error changing password:', error);
        
        if (error.code === 'auth/wrong-password') {
          alert('Current password is incorrect.');
        } else {
          alert('Failed to update password. Please try again.');
        }
      }
    };
    
    onMounted(fetchUserProfile);
    
    return {
      loading,
      profile,
      passwordForm,
      updateProfile,
      changePassword
    };
  }
};
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>

