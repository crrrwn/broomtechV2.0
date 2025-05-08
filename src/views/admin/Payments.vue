<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <!-- Header with Grab Green Background -->
    <div class="relative mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-2xl bg-grab-green p-4 sm:p-6 shadow-lg">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">Payment Management</h1>
          <p class="mt-2 max-w-xl text-green-50">Verify and manage all payment transactions</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 items-center sm:mt-0">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span class="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {{ payments.length }} Payments
          </span>
        </div>
      </div>
    </div>
    
    <!-- Search and Filter -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="relative flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by ID or name..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div>
          <select 
            v-model="filterStatus" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Payments Table -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 class="text-lg leading-6 font-medium text-gray-900">Payment Verification</h2>
        <span class="inline-flex items-center rounded-full bg-grab-green-light px-2.5 py-0.5 text-xs font-medium text-grab-green">
          {{ filteredPayments.length }} Total
        </span>
      </div>
      
      <div class="border-t border-gray-200">
        <!-- Loading State -->
        <div v-if="isLoading" class="px-4 py-12 text-center">
          <svg class="animate-spin h-8 w-8 mx-auto text-grab-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-2 text-sm text-gray-500">Loading payments...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="filteredPayments.length === 0" class="px-4 py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <p class="mt-2 text-base font-medium text-gray-900">No payments found</p>
          <p class="mt-1 text-sm text-gray-500">Try changing your filters or search query</p>
        </div>
        
        <!-- Payments List -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-grab-green-light">
              <tr>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Payment ID
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-grab-green uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-4 sm:px-6 py-3 text-center text-xs font-medium text-grab-green uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-grab-green-light/30 transition-colors duration-150">
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ payment.id.substring(0, 8) }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ payment.userName || 'Unknown User' }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">₱{{ payment.totalAmount ? payment.totalAmount.toLocaleString() : '0.00' }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ payment.service || 'Service' }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(payment.createdAt) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(payment.paymentStatus || (payment.isPaid ? 'verified' : 'pending'))">
                    {{ getStatusText(payment) }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="viewPaymentDetails(payment)" 
                    class="text-grab-green hover:text-grab-green-dark transition-colors duration-150"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Payment Details Modal -->
    <div v-if="selectedPayment" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Payment Details</h3>
                  <div class="flex space-x-2">
                    <button
                      v-if="!selectedPayment.isPaid && selectedPayment.proofOfPayment"
                      @click="verifyPayment(selectedPayment)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                    >
                      Approve
                    </button>
                    <button
                      v-if="!selectedPayment.isPaid && selectedPayment.proofOfPayment"
                      @click="rejectPayment(selectedPayment)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-150"
                    >
                      Reject
                    </button>
                    <button
                      v-if="selectedPayment.isPaid && !selectedPayment.isRefunded"
                      @click="processRefund(selectedPayment)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-150"
                    >
                      Process Refund
                    </button>
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Payment ID</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">#{{ selectedPayment.id.substring(0, 8) }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">User</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedPayment.userName || 'Unknown User' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Amount</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ selectedPayment.totalAmount ? selectedPayment.totalAmount.toLocaleString() : '0.00' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Service</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedPayment.service || 'Service' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Date</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(selectedPayment.createdAt) }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Status</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span :class="getStatusBadgeClass(selectedPayment.paymentStatus || (selectedPayment.isPaid ? 'verified' : 'pending'))">
                          {{ getStatusText(selectedPayment) }}
                        </span>
                      </dd>
                    </div>
                    <div v-if="selectedPayment.paymentMethod" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedPayment.paymentMethod }}</dd>
                    </div>
                    <div v-if="selectedPayment.paymentVerifiedAt" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Verified At</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(selectedPayment.paymentVerifiedAt) }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Payment Proof</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div v-if="selectedPayment.proofOfPayment" class="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            :src="selectedPayment.proofOfPayment"
                            alt="Payment Proof"
                            class="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                        <div v-else class="border border-gray-200 rounded-md p-4 text-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p class="mt-2">No payment proof available</p>
                        </div>
                      </dd>
                    </div>
                    <div v-if="selectedPayment.paymentVerificationNotes" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Verification Notes</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ selectedPayment.paymentVerificationNotes }}</dd>
                    </div>
                    <div v-if="!selectedPayment.isPaid && selectedPayment.proofOfPayment" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Verification Notes</dt>
                      <dd class="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea 
                          v-model="verificationNotes" 
                          rows="3" 
                          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
                          placeholder="Enter verification notes (optional)"
                        ></textarea>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Refund Modal -->
    <div v-if="refundPayment" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeRefundModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Process Refund</h3>
                <div class="mt-4 border-t border-gray-200">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Payment ID</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">#{{ refundPayment.id.substring(0, 8) }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Amount to Refund</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ refundPayment.totalAmount ? refundPayment.totalAmount.toLocaleString() : '0.00' }}</dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Refund Reason</dt>
                      <dd class="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea 
                          v-model="refundReason" 
                          rows="3" 
                          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grab-green focus:border-transparent"
                          placeholder="Enter reason for refund"
                        ></textarea>
                      </dd>
                    </div>
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Refund Confirmation</dt>
                      <dd class="mt-1 sm:mt-0 sm:col-span-2">
                        <input 
                          type="file" 
                          @change="handleRefundProofUpload" 
                          accept="image/*"
                          class="w-full border rounded-md px-3 py-2"
                        >
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="confirmRefund" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-grab-green text-base font-medium text-white hover:bg-grab-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
              :disabled="!refundProofFile || !refundReason"
              :class="{ 'opacity-50 cursor-not-allowed': !refundProofFile || !refundReason }"
            >
              Confirm Refund
            </button>
            <button 
              @click="closeRefundModal" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grab-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
    case 'verified':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
    case 'rejected':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
    case 'refunded':
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800';
    default:
      return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
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

const closeModal = () => {
  selectedPayment.value = null;
};

const closeRefundModal = () => {
  refundPayment.value = null;
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
    
    // Close modal
    selectedPayment.value = null;
    
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