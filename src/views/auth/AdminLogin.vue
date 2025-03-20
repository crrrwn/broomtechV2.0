<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Secure access for BroomTech administrators
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
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input 
              id="email-address" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Admin Email" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Password" 
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              v-model="rememberMe"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" 
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ loading ? 'Signing in...' : 'Sign in as Admin' }}
          </button>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/login" class="font-medium text-sm text-gray-600 hover:text-gray-900">
            Return to regular login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const db = getFirestore();

// Default admin credentials
const defaultEmail = 'broomtechv2@gmail.com';
const defaultPassword = 'broomtech123';

const email = ref(defaultEmail);
const password = ref(defaultPassword);
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

// Function to ensure admin document exists
const ensureAdminExists = async (uid) => {
  try {
    const adminRef = doc(db, "admins", uid);
    const adminDoc = await getDoc(adminRef);
    
    if (!adminDoc.exists()) {
      // Create admin document if it doesn't exist
      await setDoc(adminRef, {
        email: defaultEmail,
        role: 'admin',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("Admin document created successfully");
    } else {
      console.log("Admin document already exists");
    }
    return true;
  } catch (err) {
    console.error("Error ensuring admin exists:", err);
    return false;
  }
};

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const auth = getAuth();
    
    // First, attempt to sign in
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    console.log("User authenticated:", user.uid);
    
    // Ensure admin document exists
    const adminCreated = await ensureAdminExists(user.uid);
    
    if (!adminCreated) {
      throw new Error('Failed to create admin document');
    }
    
    // Check admin status
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    
    if (!adminDoc.exists()) {
      // If not an admin, sign out
      await auth.signOut();
      throw new Error('Access denied. This account does not have admin privileges.');
    }
    
    console.log("Admin document found:", adminDoc.data());
    
    // Directly set the userRole in the store
    authStore.userRole = 'admin';
    
    // Store admin data
    await authStore.setUser({
      ...user,
      role: 'admin',
      isAdmin: true,
      ...adminDoc.data()
    });
    
    console.log("User role set to:", authStore.userRole);
    
    // Redirect to admin dashboard with a slight delay to ensure store updates
    setTimeout(() => {
      router.push('/admin');
      console.log("Redirecting to admin dashboard");
    }, 500);
    
  } catch (err) {
    console.error('Admin login error:', err);
    
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      error.value = 'Invalid email or password. Please try again.';
    } else if (err.message.includes('admin privileges')) {
      error.value = err.message;
    } else {
      error.value = 'An error occurred during login. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

// Auto-fill credentials on mount
onMounted(() => {
  email.value = defaultEmail;
  password.value = defaultPassword;
});
</script>

