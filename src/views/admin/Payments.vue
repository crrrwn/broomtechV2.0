<template>
  <AdminLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Payment Management</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Payment Verification</h2>
          <div class="flex space-x-2">
            <select v-model="filterStatus" class="border rounded-md px-3 py-2 text-sm">
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
        
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">Payment ID</th>
                <th class="py-3 px-6 text-left">User</th>
                <th class="py-3 px-6 text-left">Amount</th>
                <th class="py-3 px-6 text-left">Method</th>
                <th class="py-3 px-6 text-left">Date</th>
                <th class="py-3 px-6 text-left">Status</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm">
              <tr v-for="payment in filteredPayments" :key="payment.id" class="border-b border-gray-200 hover:bg-gray-50">
                <td class="py-3 px-6 text-left">{{ payment.id }}</td>
                <td class="py-3 px-6 text-left">{{ payment.userName }}</td>
                <td class="py-3 px-6 text-left">₱{{ payment.amount.toFixed(2) }}</td>
                <td class="py-3 px-6 text-left">{{ payment.method }}</td>
                <td class="py-3 px-6 text-left">{{ formatDate(payment.date) }}</td>
                <td class="py-3 px-6 text-left">
                  <span :class="getStatusClass(payment.status)">
                    {{ payment.status }}
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
                    v-if="payment.status === 'pending'"
                    @click="verifyPayment(payment)" 
                    class="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1 text-xs mr-2"
                  >
                    Verify
                  </button>
                  <button 
                    v-if="payment.status === 'verified'"
                    @click="processRefund(payment)" 
                    class="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1 text-xs"
                  >
                    Refund
                  </button>
                </td>
              </tr>
              <tr v-if="filteredPayments.length === 0">
                <td colspan="7" class="py-4 text-center text-gray-500">No payments found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Payment Details Modal -->
      <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                <p class="font-medium">{{ selectedPayment.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">User</p>
                <p class="font-medium">{{ selectedPayment.userName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Amount</p>
                <p class="font-medium">₱{{ selectedPayment.amount.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Method</p>
                <p class="font-medium">{{ selectedPayment.method }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Date</p>
                <p class="font-medium">{{ formatDate(selectedPayment.date) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Status</p>
                <p class="font-medium" :class="getStatusClass(selectedPayment.status)">
                  {{ selectedPayment.status }}
                </p>
              </div>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-2">Payment Proof</p>
              <img 
                :src="selectedPayment.proofImage" 
                alt="Payment Proof" 
                class="w-full max-h-64 object-contain border rounded-md"
              >
            </div>
            
            <div v-if="selectedPayment.status === 'pending'" class="flex justify-end space-x-3">
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
            
            <div v-if="selectedPayment.status === 'verified'" class="flex justify-end">
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
      <div v-if="refundPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
              <p class="font-medium">{{ refundPayment.id }}</p>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500">Amount to Refund</p>
              <p class="font-medium">₱{{ refundPayment.amount.toFixed(2) }}</p>
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
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/admin'
import { useNotificationStore } from '../../stores/notification'
import AdminLayout from '../../components/layout/AdminLayout.vue';

export default {
  name: 'AdminPayments',
  components: {
    AdminLayout
  },
  setup() {
    const adminStore = useAdminStore()
    const notificationStore = useNotificationStore()
    
    const payments = ref([
      {
        id: 'PAY-001',
        userName: 'John Doe',
        amount: 250.00,
        method: 'GCash',
        date: new Date('2023-11-10T08:30:00'),
        status: 'pending',
        proofImage: '/placeholder.svg?height=300&width=400'
      },
      {
        id: 'PAY-002',
        userName: 'Jane Smith',
        amount: 350.00,
        method: 'GotYme Bank',
        date: new Date('2023-11-09T14:45:00'),
        status: 'verified',
        proofImage: '/placeholder.svg?height=300&width=400'
      },
      {
        id: 'PAY-003',
        userName: 'Mike Johnson',
        amount: 180.00,
        method: 'PayMaya',
        date: new Date('2023-11-08T11:20:00'),
        status: 'rejected',
        proofImage: '/placeholder.svg?height=300&width=400'
      },
      {
        id: 'PAY-004',
        userName: 'Sarah Williams',
        amount: 420.00,
        method: 'GCash',
        date: new Date('2023-11-07T16:10:00'),
        status: 'verified',
        proofImage: '/placeholder.svg?height=300&width=400'
      },
      {
        id: 'PAY-005',
        userName: 'David Brown',
        amount: 300.00,
        method: 'Cash',
        date: new Date('2023-11-06T09:55:00'),
        status: 'pending',
        proofImage: '/placeholder.svg?height=300&width=400'
      }
    ])
    
    const filterStatus = ref('all')
    const searchQuery = ref('')
    const selectedPayment = ref(null)
    const refundPayment = ref(null)
    const refundReason = ref('')
    const refundProofFile = ref(null)
    
    const filteredPayments = computed(() => {
      let result = payments.value
      
      if (filterStatus.value !== 'all') {
        result = result.filter(payment => payment.status === filterStatus.value)
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(payment => 
          payment.id.toLowerCase().includes(query) || 
          payment.userName.toLowerCase().includes(query)
        )
      }
      
      return result
    })
    
    const formatDate = (date) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const getStatusClass = (status) => {
      switch (status) {
        case 'pending':
          return 'text-yellow-600'
        case 'verified':
          return 'text-green-600'
        case 'rejected':
          return 'text-red-600'
        case 'refunded':
          return 'text-blue-600'
        default:
          return ''
      }
    }
    
    const viewPaymentDetails = (payment) => {
      selectedPayment.value = payment
    }
    
    const verifyPayment = (payment) => {
      // In a real app, you would call an API to update the payment status
      const index = payments.value.findIndex(p => p.id === payment.id)
      if (index !== -1) {
        payments.value[index].status = 'verified'
        
        // Update the selected payment if it's open
        if (selectedPayment.value && selectedPayment.value.id === payment.id) {
          selectedPayment.value.status = 'verified'
        }
        
        notificationStore.addNotification({
          type: 'success',
          message: `Payment ${payment.id} has been verified successfully`
        })
      }
    }
    
    const rejectPayment = (payment) => {
      // In a real app, you would call an API to update the payment status
      const index = payments.value.findIndex(p => p.id === payment.id)
      if (index !== -1) {
        payments.value[index].status = 'rejected'
        
        // Update the selected payment if it's open
        if (selectedPayment.value && selectedPayment.value.id === payment.id) {
          selectedPayment.value.status = 'rejected'
        }
        
        notificationStore.addNotification({
          type: 'error',
          message: `Payment ${payment.id} has been rejected`
        })
        
        selectedPayment.value = null
      }
    }
    
    const processRefund = (payment) => {
      refundPayment.value = payment
      refundReason.value = ''
      refundProofFile.value = null
      selectedPayment.value = null
    }
    
    const handleRefundProofUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        refundProofFile.value = file
      }
    }
    
    const confirmRefund = () => {
      // In a real app, you would upload the proof file and call an API to process the refund
      const index = payments.value.findIndex(p => p.id === refundPayment.value.id)
      if (index !== -1) {
        payments.value[index].status = 'refunded'
        
        notificationStore.addNotification({
          type: 'success',
          message: `Refund for payment ${refundPayment.value.id} has been processed successfully`
        })
        
        // In a real app, you would also send the refund confirmation to the AI chat support
        // adminStore.sendRefundConfirmationToAIChat(refundPayment.value.id, refundProofFile.value)
        
        refundPayment.value = null
      }
    }
    
    return {
      payments,
      filterStatus,
      searchQuery,
      selectedPayment,
      refundPayment,
      refundReason,
      refundProofFile,
      filteredPayments,
      formatDate,
      getStatusClass,
      viewPaymentDetails,
      verifyPayment,
      rejectPayment,
      processRefund,
      handleRefundProofUpload,
      confirmRefund
    }
  }
}
</script>

