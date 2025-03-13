<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Bookings -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Bookings
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    {{ stats.totalBookings }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Completed Deliveries -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Completed Deliveries
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    {{ stats.completedDeliveries }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Total Revenue -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Revenue
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    ₱{{ stats.totalRevenue.toLocaleString() }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Active Users -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Active Users
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    {{ stats.activeUsers }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="mt-8">
      <h2 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
      <div class="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="(activity, index) in recentActivities" :key="index">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-green-600 truncate">
                  {{ activity.description }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p :class="getStatusClass(activity.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ activity.status }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    {{ activity.user }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" clip-rule="evenodd" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {{ activity.email }}
                  </p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span>
                    {{ activity.date }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Pending Driver Approvals</h3>
          <div class="mt-2 text-3xl font-semibold text-green-600">{{ stats.pendingDrivers }}</div>
          <div class="mt-4">
            <router-link to="/admin/drivers" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Review Applications
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Unassigned Bookings</h3>
          <div class="mt-2 text-3xl font-semibold text-yellow-600">{{ stats.unassignedBookings }}</div>
          <div class="mt-4">
            <router-link to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Assign Drivers
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Pending Refunds</h3>
          <div class="mt-2 text-3xl font-semibold text-red-600">{{ stats.pendingRefunds }}</div>
          <div class="mt-4">
            <router-link to="/admin/payments" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Process Refunds
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAdminStore } from '../../stores/admin';

export default {
  setup() {
    const adminStore = useAdminStore();
    const stats = ref({
      totalBookings: 0,
      completedDeliveries: 0,
      totalRevenue: 0,
      activeUsers: 0,
      pendingDrivers: 0,
      unassignedBookings: 0,
      pendingRefunds: 0
    });

    const recentActivities = ref([]);

    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'in progress':
          return 'bg-blue-100 text-blue-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    onMounted(async () => {
      try {
        // Fetch dashboard stats from admin store
        await adminStore.fetchDashboardStats();
        stats.value = adminStore.getDashboardStats;
        
        // Get recent activities
        try {
          const activitiesQuery = query(
            collection(db, 'activities'),
            orderBy('timestamp', 'desc'),
            limit(5)
          );
          
          const activitiesSnapshot = await getDocs(activitiesQuery);
          if (!activitiesSnapshot.empty) {
            const activities = [];
            activitiesSnapshot.forEach(doc => {
              const activity = doc.data();
              activities.push({
                description: activity.type,
                details: activity.details,
                user: activity.userName || 'Unknown User',
                email: activity.userEmail || 'N/A',
                status: activity.status || 'Pending',
                date: new Date(activity.timestamp.toDate()).toLocaleString()
              });
            });
            recentActivities.value = activities;
          } else {
            // Sample data if no activities found
            recentActivities.value = [
              {
                description: 'New Booking',
                details: 'Booking #12345',
                user: 'John Doe',
                email: 'john@example.com',
                status: 'Pending',
                date: '2023-06-15 14:30'
              },
              {
                description: 'Payment Received',
                details: 'Booking #12342',
                user: 'Maria Garcia',
                email: 'maria@example.com',
                status: 'Completed',
                date: '2023-06-15 13:45'
              },
              {
                description: 'Driver Assigned',
                details: 'Booking #12340',
                user: 'Alex Johnson',
                email: 'alex@example.com',
                status: 'In Progress',
                date: '2023-06-15 12:20'
              }
            ];
          }
        } catch (error) {
          console.error('Error loading activities:', error);
          // Keep the sample data if there's an error
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    });

    return {
      stats,
      recentActivities,
      getStatusClass
    };
  }
};
</script>

