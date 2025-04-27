<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold text-gray-900">Payment Management</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8 mt-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 class="text-xl font-semibold">Payment Verification</h2>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <select 
            v-model="filterStatus" 
            class="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by ID or name" 
            class="border rounded-md px-3 py-2 text-sm"
          >
        </div>
      </div>
      
      <div v-if="isLoading" class="py-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p class="mt-2 text-gray-500">Loading payments...</p>
      </div>
      
      <div v-else-if="filteredPayments.length === 0" class="py-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <p class="mt-2 text-gray-600">No payments found</p>
        <p class="text-sm text-gray-500">Try changing your filters or search query</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left">Payment ID</th>
              <th class="py-3 px-6 text-left">User</th>
              <th class="py-3 px-6 text-left">Amount</th>
              <th class="py-3 px-6 text-left">Service</th>
              <th class="py-3 px-6 text-left">Date</th>
              <th class="py-3 px-6 text-left">Status</th>
              <th class="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm">
            <tr v-for="payment in filteredPayments" :key="payment.id" class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-3 px-6 text-left">#{{ payment.id.substring(0, 8) }}</td>
              <td class="py-3 px-6 text-left">{{ payment.userName || 'Unknown User' }}</td>
              <td class="py-3 px-6 text-left">₱{{ payment.totalAmount ? payment.totalAmount.toLocaleString() : '0.00' }}</td>
              <td class="py-3 px-6 text-left">{{ payment.service || 'Service' }}</td>
              <td class="py-3 px-6 text-left">{{ formatDate(payment.createdAt) }}</td>
              <td class="py-3 px-6 text-left">
                <span :class="getStatusClass(payment.paymentStatus || (payment.isPaid ? 'verified' : 'pending'))">
                  {{ getStatusText(payment) }}
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <button 
                  @click="viewPaymentDetails(payment)" 
                  class="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 text-xs mr-2"
                >
                  View
                </button>
                <button 
                  v-if="!payment.isPaid && payment.proofOfPayment"
                  @click="verifyPayment(payment)" 
                  class="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1 text-xs mr-2"
                >
                  Verify
                </button>
                <button 
                  v-if="payment.isPaid && !payment.isRefunded"
                  @click="processRefund(payment)" 
                  class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1 text-xs"
                >
                  Refund
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Payment Details Modal -->
    <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Payment Details</h3>
            <button @click="selectedPayment = null" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-500">Payment ID</p>
              <p class="font-medium">#{{ selectedPayment.id.substring(0, 8) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">User</p>
              <p class="font-medium">{{ selectedPayment.userName || 'Unknown User' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Amount</p>
              <p class="font-medium">₱{{ selectedPayment.totalAmount ? selectedPayment.totalAmount.toLocaleString() : '0.00' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Service</p>
              <p class="font-medium">{{ selectedPayment.service || 'Service' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Date</p>
              <p class="font-medium">{{ formatDate(selectedPayment.createdAt) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-medium" :class="getStatusClass(selectedPayment.paymentStatus || (selectedPayment.isPaid ? 'verified' : 'pending'))">
                {{ getStatusText(selectedPayment) }}
              </p>
            </div>
            <div v-if="selectedPayment.paymentMethod">
              <p class="text-sm text-gray-500">Payment Method</p>
              <p class="font-medium">{{ selectedPayment.paymentMethod }}</p>
            </div>
            <div v-if="selectedPayment.paymentVerifiedAt">
              <p class="text-sm text-gray-500">Verified At</p>
              <p class="font-medium">{{ formatDate(selectedPayment.paymentVerifiedAt) }}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500 mb-2">Payment Proof</p>
            <div v-if="selectedPayment.proofOfPayment" class="border rounded-md p-2 bg-gray-50">
              <img 
                :src="selectedPayment.proofOfPayment" 
                alt="Payment Proof" 
                class="w-full max-h-64 object-contain"
              >
            </div>
            <div v-else class="border rounded-md p-4 text-center text-gray-500 bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-2">No payment proof available</p>
            </div>
          </div>
          
          <div v-if="selectedPayment.paymentVerificationNotes" class="mb-4">
            <p class="text-sm text-gray-500 mb-1">Verification Notes</p>
            <p class="border rounded-md p-3 bg-gray-50">{{ selectedPayment.paymentVerificationNotes }}</p>
          </div>
          
          <div v-if="!selectedPayment.isPaid && selectedPayment.proofOfPayment">
            <div class="mb-4">
              <label class="block text-sm text-gray-500 mb-1">Verification Notes</label>
              <textarea 
                v-model="verificationNotes" 
                rows="3" 
                class="w-full border rounded-md px-3 py-2"
                placeholder="Enter verification notes (optional)"
              ></textarea>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                @click="rejectPayment(selectedPayment)" 
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Reject
              </button>
              <button 
                @click="verifyPayment(selectedPayment)" 
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Verify
              </button>
            </div>
          </div>
          
          <div v-if="selectedPayment.isPaid && !selectedPayment.isRefunded" class="flex justify-end">
            <button 
              @click="processRefund(selectedPayment)" 
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
            >
              Process Refund
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Refund Modal -->
    <div v-if="refundPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Process Refund</h3>
            <button @click="refundPayment = null" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Payment ID</p>
            <p class="font-medium">#{{ refundPayment.id.substring(0, 8) }}</p>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Amount to Refund</p>
            <p class="font-medium">₱{{ refundPayment.totalAmount ? refundPayment.totalAmount.toLocaleString() : '0.00' }}</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm text-gray-500 mb-1">Refund Reason</label>
            <textarea 
              v-model="refundReason" 
              rows="3" 
              class="w-full border rounded-md px-3 py-2"
              placeholder="Enter reason for refund"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm text-gray-500 mb-1">Upload Refund Confirmation</label>
            <input 
              type="file" 
              @change="handleRefundProofUpload" 
              accept="image/*"
              class="w-full border rounded-md px-3 py-2"
            >
          </div>
          
          <div class="flex justify-end">
            <button 
              @click="confirmRefund" 
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              :disabled="!refundProofFile || !refundReason"
              :class="{ 'opacity-50 cursor-not-allowed': !refundProofFile || !refundReason }"
            >
              Confirm Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, query, getDocs, doc, updateDoc, serverTimestamp, addDoc, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAdminStore } from '../../stores/admin';
import { useNotification } from '../../composables/useNotification';

const adminStore = useAdminStore();
const { showNotification } = useNotification();

// State
const payments = ref([]);
const isLoading = ref(true);
const filterStatus = ref('all');
const searchQuery = ref('');
const selectedPayment = ref(null);
const refundPayment = ref(null);
const refundReason = ref('');
const refundProofFile = ref(null);
const verificationNotes = ref('');

// Fetch payments from Firebase
const fetchPayments = async () => {
  try {
    isLoading.value = true;
    
    // Query all bookings that have payment information
    const paymentsQuery = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    
    const paymentsSnapshot = await getDocs(paymentsQuery);
    const fetchedPayments = [];
    
    paymentsSnapshot.forEach(doc => {
      const payment = doc.data();
      // Only include bookings with payment information
      if (payment.totalAmount) {
        fetchedPayments.push({
          id: doc.id,
          ...payment
        });
      }
    });
    
    payments.value = fetchedPayments;
    console.log('Payments fetched:', fetchedPayments.length);
  } catch (error) {
    console.error('Error fetching payments:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to load payments'
    });
  } finally {
    isLoading.value = false;
  }
};

// Computed properties
const filteredPayments = computed(() => {
  let result = payments.value;
  
  if (filterStatus.value !== 'all') {
    if (filterStatus.value === 'pending') {
      result = result.filter(payment => 
        !payment.isPaid && payment.proofOfPayment && payment.paymentStatus !== 'rejected'
      );
    } else if (filterStatus.value === 'verified') {
      result = result.filter(payment => payment.isPaid);
    } else if (filterStatus.value === 'rejected') {
      result = result.filter(payment => payment.paymentStatus === 'rejected');
    }
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(payment => 
      (payment.id && payment.id.toLowerCase().includes(query)) || 
      (payment.userName && payment.userName.toLowerCase().includes(query))
    );
  }
  
  return result;
});

// Helper functions
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-600';
    case 'verified':
      return 'text-green-600';
    case 'rejected':
      return 'text-red-600';
    case 'refunded':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getStatusText = (payment) => {
  if (payment.isRefunded) return 'Refunded';
  if (payment.paymentStatus === 'rejected') return 'Rejected';
  if (payment.isPaid) return 'Verified';
  if (payment.proofOfPayment) return 'Pending Verification';
  return 'Pending Payment';
};

// Action handlers
const viewPaymentDetails = (payment) => {
  selectedPayment.value = payment;
  verificationNotes.value = '';
};

const verifyPayment = async (payment) => {
  try {
    // Use the admin store's verifyPayment method
    await adminStore.verifyPayment(payment.id, verificationNotes.value);
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Verification',
      details: `Payment for order #${payment.id.substring(0, 8)} was approved`,
      bookingId: payment.id,
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    showNotification({
      type: 'success',
      title: 'Payment Approved',
      message: `Payment for order #${payment.id.substring(0, 8)} has been approved`
    });
    
    // Update local state
    const index = payments.value.findIndex(p => p.id === payment.id);
    if (index !== -1) {
      payments.value[index].isPaid = true;
      payments.value[index].paymentVerifiedAt = new Date();
    }
    
    // Close modal if open
    if (selectedPayment.value && selectedPayment.value.id === payment.id) {
      selectedPayment.value.isPaid = true;
      selectedPayment.value.paymentVerifiedAt = new Date();
    }
    
    // Refresh data
    await fetchPayments();
  } catch (error) {
    console.error('Error approving payment:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to approve payment'
    });
  }
};

const rejectPayment = async (payment) => {
  try {
    const bookingRef = doc(db, 'bookings', payment.id);
    
    // Update booking with verification status
    await updateDoc(bookingRef, {
      isPaid: false,
      paymentVerifiedAt: serverTimestamp(),
      paymentVerificationNotes: verificationNotes.value,
      paymentStatus: 'rejected',
      proofOfPayment: null
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Verification',
      details: `Payment for order #${payment.id.substring(0, 8)} was rejected`,
      bookingId: payment.id,
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      status: 'Rejected',
      timestamp: serverTimestamp()
    });
    
    showNotification({
      type: 'success',
      title: 'Payment Rejected',
      message: `Payment for order #${payment.id.substring(0, 8)} has been rejected`
    });
    
    // Update local state
    const index = payments.value.findIndex(p => p.id === payment.id);
    if (index !== -1) {
      payments.value[index].isPaid = false;
      payments.value[index].paymentStatus = 'rejected';
      payments.value[index].paymentVerifiedAt = new Date();
      payments.value[index].paymentVerificationNotes = verificationNotes.value;
      payments.value[index].proofOfPayment = null;
    }
    
    // Close modal
    selectedPayment.value = null;
    
    // Refresh data
    await fetchPayments();
  } catch (error) {
    console.error('Error rejecting payment:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to reject payment'
    });
  }
};

const processRefund = (payment) => {
  refundPayment.value = payment;
  refundReason.value = '';
  refundProofFile.value = null;
  selectedPayment.value = null;
};

const handleRefundProofUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    refundProofFile.value = file;
  }
};

const confirmRefund = async () => {
  try {
    // In a real app, you would upload the proof file to Firebase Storage first
    // For now, we'll just update the booking record
    const bookingRef = doc(db, 'bookings', refundPayment.value.id);
    
    await updateDoc(bookingRef, {
      isRefunded: true,
      refundedAt: serverTimestamp(),
      refundReason: refundReason.value,
      refundedBy: adminStore.currentUser?.uid || 'admin',
      // In a real app, you would store the uploaded proof URL here
      // refundProofUrl: uploadedProofUrl
    });
    
    // Add activity log
    await addDoc(collection(db, 'activities'), {
      type: 'Payment Refund',
      details: `Refund for order #${refundPayment.value.id.substring(0, 8)} was processed`,
      bookingId: refundPayment.value.id,
      userId: refundPayment.value.userId,
      userName: refundPayment.value.userName,
      userEmail: refundPayment.value.userEmail,
      status: 'Completed',
      timestamp: serverTimestamp()
    });
    
    showNotification({
      type: 'success',
      title: 'Refund Processed',
      message: `Refund for payment #${refundPayment.value.id.substring(0, 8)} has been processed successfully`
    });
    
    // Update local state
    const index = payments.value.findIndex(p => p.id === refundPayment.value.id);
    if (index !== -1) {
      payments.value[index].isRefunded = true;
      payments.value[index].refundedAt = new Date();
    }
    
    // Close modal
    refundPayment.value = null;
    
    // Refresh data
    await fetchPayments();
  } catch (error) {
    console.error('Error processing refund:', error);
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to process refund'
    });
  }
};

// Initialize
onMounted(() => {
  fetchPayments();
});
</script>