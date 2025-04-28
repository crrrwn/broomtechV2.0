<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-4 overflow-auto">
      <div class="container py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>
        
        <!-- Date Range Selector -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Date Range</h2>
              <div class="flex items-center space-x-4">
                <div>
                  <label for="start-date" class="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    v-model="startDate"
                    class="form-input border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label for="end-date" class="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    v-model="endDate"
                    class="form-input border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <button @click="applyDateFilter" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Apply Filter
              </button>
              <button @click="resetDateFilter" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2">
                Reset
              </button>
            </div>
          </div>
        </div>
        
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Bookings -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ reportData.totalBookings }}</p>
              </div>
              <div class="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Delivery Success Rate -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Success Rate</p>
                <p class="text-2xl font-bold text-gray-900">{{ reportData.successRate }}%</p>
              </div>
              <div class="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Total Revenue -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">₱{{ reportData.totalRevenue.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-yellow-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Average Delivery Time -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Avg. Delivery Time</p>
                <p class="text-2xl font-bold text-gray-900">{{ reportData.avgDeliveryTime }} min</p>
              </div>
              <div class="p-3 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Delivery Success Rate Chart -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Delivery Success Rate</h2>
            <div class="h-64">
              <canvas ref="successRateChart"></canvas>
            </div>
          </div>
          
          <!-- Peak Booking Hours Chart -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Peak Booking Hours</h2>
            <div class="h-64">
              <canvas ref="peakHoursChart"></canvas>
            </div>
          </div>
        </div>
        
        <!-- Top Service Locations -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Top Service Locations</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Delivery Time
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(location, index) in reportData.topLocations" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ location.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ location.bookings }}</div>
                    <div class="text-xs text-gray-500">{{ location.percentage }}% of total</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">₱{{ location.revenue.toLocaleString() }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ location.avgTime }} min</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Driver Performance -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Driver Performance</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deliveries
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Time
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(driver, index) in reportData.driverPerformance" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="driver.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(driver.name) + '&background=random'" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ driver.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ driver.deliveries }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ driver.successRate }}%</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ driver.avgTime }} min</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="text-sm text-gray-900 mr-1">{{ driver.rating }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
import Chart from 'chart.js/auto';

// Chart references
const successRateChart = ref(null);
const peakHoursChart = ref(null);
let successRateChartInstance = null;
let peakHoursChartInstance = null;

// Date range filter
const startDate = ref(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
const endDate = ref(new Date().toISOString().split('T')[0]);

// Report data
const reportData = ref({
  totalBookings: 0,
  successRate: 0,
  totalRevenue: 0,
  avgDeliveryTime: 0,
  topLocations: [],
  driverPerformance: [],
  successRateData: {
    labels: [],
    completed: [],
    cancelled: []
  },
  peakHoursData: {
    labels: [],
    bookings: []
  }
});

// Initialize charts
const initCharts = () => {
  // Destroy existing chart instances if they exist
  if (successRateChartInstance) {
    successRateChartInstance.destroy();
  }
  if (peakHoursChartInstance) {
    peakHoursChartInstance.destroy();
  }

  // Success Rate Chart
  const successCtx = successRateChart.value.getContext('2d');
  successRateChartInstance = new Chart(successCtx, {
    type: 'line',
    data: {
      labels: reportData.value.successRateData.labels,
      datasets: [
        {
          label: 'Completed',
          data: reportData.value.successRateData.completed,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Cancelled',
          data: reportData.value.successRateData.cancelled,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Bookings'
          }
        }
      }
    }
  });

  // Peak Hours Chart
  const peakCtx = peakHoursChart.value.getContext('2d');
  peakHoursChartInstance = new Chart(peakCtx, {
    type: 'bar',
    data: {
      labels: reportData.value.peakHoursData.labels,
      datasets: [
        {
          label: 'Bookings',
          data: reportData.value.peakHoursData.bookings,
          backgroundColor: 'rgba(79, 70, 229, 0.6)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Bookings'
          }
        }
      }
    }
  });
};

// Load report data
onMounted(async () => {
  await loadReportData();
});

// Watch for changes in report data to update charts
watch(() => reportData.value, () => {
  // Wait for the next tick to ensure the DOM is updated
  setTimeout(() => {
    if (successRateChart.value && peakHoursChart.value) {
      initCharts();
    }
  }, 0);
}, { deep: true });

const applyDateFilter = async () => {
  await loadReportData();
};

const resetDateFilter = async () => {
  startDate.value = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
  endDate.value = new Date().toISOString().split('T')[0];
  await loadReportData();
};

const loadReportData = async () => {
  try {
    // Convert dates to Date objects for Firestore query
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    end.setHours(23, 59, 59, 999); // Set to end of day
    
    // Query bookings within date range
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('createdAt', '>=', start),
      where('createdAt', '<=', end),
      orderBy('createdAt', 'desc')
    );
    
    const bookingsSnapshot = await getDocs(bookingsQuery);
    const bookings = [];
    
    bookingsSnapshot.forEach(doc => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Calculate report metrics
    const totalBookings = bookings.length;
    
    // Success rate calculation
    const completedBookings = bookings.filter(booking => booking.status === 'completed').length;
    const successRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;
    
    // Total revenue calculation
    const totalRevenue = bookings.reduce((sum, booking) => {
      return sum + (booking.totalAmount || 0);
    }, 0);
    
    // Average delivery time calculation
    let totalDeliveryTime = 0;
    let deliveriesWithTime = 0;
    
    bookings.forEach(booking => {
      if (booking.completedAt && booking.assignedAt) {
        const deliveryTime = (booking.completedAt.toDate() - booking.assignedAt.toDate()) / (1000 * 60); // in minutes
        totalDeliveryTime += deliveryTime;
        deliveriesWithTime++;
      }
    });
    
    const avgDeliveryTime = deliveriesWithTime > 0 ? Math.round(totalDeliveryTime / deliveriesWithTime) : 0;
    
    // Top locations analysis
    const locationMap = {};
    
    bookings.forEach(booking => {
      const location = booking.deliveryAddress?.split(',').pop()?.trim() || 'Unknown';
      
      if (!locationMap[location]) {
        locationMap[location] = {
          name: location,
          bookings: 0,
          revenue: 0,
          totalTime: 0,
          deliveriesWithTime: 0
        };
      }
      
      locationMap[location].bookings++;
      locationMap[location].revenue += booking.totalAmount || 0;
      
      if (booking.completedAt && booking.assignedAt) {
        const deliveryTime = (booking.completedAt.toDate() - booking.assignedAt.toDate()) / (1000 * 60); // in minutes
        locationMap[location].totalTime += deliveryTime;
        locationMap[location].deliveriesWithTime++;
      }
    });
    
    const topLocations = Object.values(locationMap)
      .map(location => ({
        ...location,
        percentage: totalBookings > 0 ? Math.round((location.bookings / totalBookings) * 100) : 0,
        avgTime: location.deliveriesWithTime > 0 ? Math.round(location.totalTime / location.deliveriesWithTime) : 0
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
    
    // Driver performance analysis
    const driverMap = {};
    
    bookings.forEach(booking => {
      if (!booking.driverId) return;
      
      if (!driverMap[booking.driverId]) {
        driverMap[booking.driverId] = {
          id: booking.driverId,
          name: booking.driverName || 'Unknown Driver',
          photo: booking.driverPhoto,
          deliveries: 0,
          completed: 0,
          totalTime: 0,
          deliveriesWithTime: 0,
          totalRating: 0,
          ratingsCount: 0
        };
      }
      
      driverMap[booking.driverId].deliveries++;
      
      if (booking.status === 'completed') {
        driverMap[booking.driverId].completed++;
      }
      
      if (booking.completedAt && booking.assignedAt) {
        const deliveryTime = (booking.completedAt.toDate() - booking.assignedAt.toDate()) / (1000 * 60); // in minutes
        driverMap[booking.driverId].totalTime += deliveryTime;
        driverMap[booking.driverId].deliveriesWithTime++;
      }
      
      if (booking.rating) {
        driverMap[booking.driverId].totalRating += booking.rating;
        driverMap[booking.driverId].ratingsCount++;
      }
    });
    
    const driverPerformance = Object.values(driverMap)
      .map(driver => ({
        ...driver,
        successRate: driver.deliveries > 0 ? Math.round((driver.completed / driver.deliveries) * 100) : 0,
        avgTime: driver.deliveriesWithTime > 0 ? Math.round(driver.totalTime / driver.deliveriesWithTime) : 0,
        rating: driver.ratingsCount > 0 ? (driver.totalRating / driver.ratingsCount).toFixed(1) : 'N/A'
      }))
      .sort((a, b) => b.deliveries - a.deliveries);
    
    // Prepare data for Success Rate Chart
    // Group bookings by date
    const dateMap = {};
    const dayMs = 24 * 60 * 60 * 1000;
    
    // Create date range array
    const dateRange = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateRange.push(dateStr);
      dateMap[dateStr] = { completed: 0, cancelled: 0 };
      currentDate = new Date(currentDate.getTime() + dayMs);
    }
    
    // Count bookings by date and status
    bookings.forEach(booking => {
      if (!booking.createdAt) return;
      
      const bookingDate = booking.createdAt.toDate().toISOString().split('T')[0];
      if (dateMap[bookingDate]) {
        if (booking.status === 'completed') {
          dateMap[bookingDate].completed++;
        } else if (booking.status === 'cancelled') {
          dateMap[bookingDate].cancelled++;
        }
      }
    });
    
    // Prepare chart data
    const successRateData = {
      labels: dateRange,
      completed: dateRange.map(date => dateMap[date].completed),
      cancelled: dateRange.map(date => dateMap[date].cancelled)
    };
    
    // Prepare data for Peak Hours Chart
    const hourMap = {};
    for (let i = 0; i < 24; i++) {
      hourMap[i] = 0;
    }
    
    bookings.forEach(booking => {
      if (!booking.createdAt) return;
      
      const hour = booking.createdAt.toDate().getHours();
      hourMap[hour]++;
    });
    
    const peakHoursData = {
      labels: Object.keys(hourMap).map(hour => `${hour}:00`),
      bookings: Object.values(hourMap)
    };
    
    // Update report data
    reportData.value = {
      totalBookings,
      successRate,
      totalRevenue,
      avgDeliveryTime,
      topLocations,
      driverPerformance,
      successRateData,
      peakHoursData
    };
    
    // Initialize charts after data is loaded
    setTimeout(() => {
      if (successRateChart.value && peakHoursChart.value) {
        initCharts();
      }
    }, 0);
    
  } catch (error) {
    console.error('Error loading report data:', error);
  }
};
</script>

<style>
.btn {
  @apply px-4 py-2 rounded-md font-medium;
}

.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white;
}

.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-800;
}

.form-input {
  @apply border rounded-md px-3 py-2;
}
</style>