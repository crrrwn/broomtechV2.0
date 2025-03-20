<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Earnings</h1>
      
      <div class="mt-6">
        <div v-if="loading" class="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <div v-else>
          <!-- Earnings Summary -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Earnings Summary</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Overview of your earnings as a driver.</p>
            </div>
            
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Total Earnings</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ totalEarnings.toFixed(2) }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Completed Deliveries</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ completedTasks.length }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Average Earnings per Delivery</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ₱{{ completedTasks.length > 0 ? (totalEarnings / completedTasks.length).toFixed(2) : '0.00' }}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">This Week's Earnings</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ weeklyEarnings.toFixed(2) }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">This Month's Earnings</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₱{{ monthlyEarnings.toFixed(2) }}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <!-- Earnings History -->
          <div class="mt-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Earnings History</h3>
            
            <div class="mt-4 flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="task in completedTasks" :key="task.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ formatDate(task.completedAt || task.createdAt) }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ task.service }}</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ task.userName }}</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₱{{ task.driverPayout ? task.driverPayout.toFixed(2) : (task.totalAmount * 0.8).toFixed(2) }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <router-link :to="`/driver/tasks/${task.id}`" class="text-primary-600 hover:text-primary-900">
                              View
                            </router-link>
                          </td>
                        </tr>
                        
                        <tr v-if="completedTasks.length === 0">
                          <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            No completed deliveries found
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDriverStore } from '../../stores/driver';

const driverStore = useDriverStore();
const loading = ref(true);
const tasks = ref([]);

const completedTasks = computed(() => {
  return tasks.value.filter(task => task.status === 'completed')
    .sort((a, b) => {
      const dateA = a.completedAt?.toDate ? a.completedAt.toDate() : new Date(a.completedAt || a.createdAt);
      const dateB = b.completedAt?.toDate ? b.completedAt.toDate() : new Date(b.completedAt || b.createdAt);
      return dateB - dateA;
    });
});

const totalEarnings = computed(() => {
  return completedTasks.value.reduce((total, task) => {
    const amount = task.driverPayout || (task.totalAmount * 0.8);
    return total + amount;
  }, 0);
});

const weeklyEarnings = computed(() => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return completedTasks.value.reduce((total, task) => {
    const completionDate = task.completedAt?.toDate ? task.completedAt.toDate() : new Date(task.completedAt || task.createdAt);
    if (completionDate >= oneWeekAgo) {
      const amount = task.driverPayout || (task.totalAmount * 0.8);
      return total + amount;
    }
    return total;
  }, 0);
});

const monthlyEarnings = computed(() => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return completedTasks.value.reduce((total, task) => {
    const completionDate = task.completedAt?.toDate ? task.completedAt.toDate() : new Date(task.completedAt || task.createdAt);
    if (completionDate >= oneMonthAgo) {
      const amount = task.driverPayout || (task.totalAmount * 0.8);
      return total + amount;
    }
    return total;
  }, 0);
});

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

const fetchData = async () => {
  loading.value = true;
  
  try {
    await driverStore.getDriverTasks();
    tasks.value = driverStore.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    window.$notification?.error('Error', 'Failed to load earnings data');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add any custom styles here */
</style>

