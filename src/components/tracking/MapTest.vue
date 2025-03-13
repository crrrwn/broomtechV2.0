<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Map Test</h1>
    
    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Test Address</label>
      <div class="flex">
        <input 
          type="text" 
          id="address" 
          v-model="testAddress" 
          class="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Enter an address to geocode"
        />
        <button 
          @click="geocodeTestAddress" 
          class="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          :disabled="geocoding"
        >
          {{ geocoding ? 'Geocoding...' : 'Geocode' }}
        </button>
      </div>
    </div>
    
    <div class="mb-4 flex space-x-2">
      <button 
        @click="initMap" 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Reload Map
      </button>
      <button 
        @click="addRandomMarker" 
        class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Add Random Marker
      </button>
    </div>
    
    <!-- Map Container -->
    <div class="h-96 w-full rounded-lg bg-gray-100 relative mb-4">
      <div id="test-map" class="h-full w-full rounded-lg"></div>
      
      <!-- Loading indicator -->
      <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
      
      <!-- Map error message -->
      <div v-if="mapError" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 rounded-lg p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-red-600 font-medium">Failed to load map</p>
        <p class="text-gray-600 text-sm text-center mt-1">{{ mapErrorMessage }}</p>
        <button 
          @click="initMap" 
          class="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    </div>
    
    <!-- Geocoding Results -->
    <div v-if="geocodeResults" class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 class="text-lg font-semibold mb-2">Geocoding Results</h2>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <span class="text-gray-600">Latitude:</span>
          <span class="font-medium">{{ geocodeResults.lat }}</span>
        </div>
        <div>
          <span class="text-gray-600">Longitude:</span>
          <span class="font-medium">{{ geocodeResults.lng }}</span>
        </div>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress } from '../../utils/gomaps';

// State variables
const map = ref(null);
const markers = ref([]);
const testAddress = ref('Calapan City, Oriental Mindoro, Philippines');
const geocodeResults = ref(null);
const geocoding = ref(false);
const error = ref(null);
const mapLoaded = ref(false);
const mapError = ref(false);
const mapErrorMessage = ref('');

// Fix Leaflet default icon path issue
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Initialize map
const initMap = () => {
  try {
    mapLoaded.value = false;
    mapError.value = false;
    error.value = null;
    
    // Default coordinates (Oriental Mindoro, Philippines)
    const centerLat = 13.0565;
    const centerLng = 121.4069;
    
    // Clear previous map instance if it exists
    if (map.value) {
      map.value.remove();
      map.value = null;
    }
    
    console.log("Initializing test map...");
    
    // Make sure the map container exists
    const mapContainer = document.getElementById('test-map');
    if (!mapContainer) {
      console.error("Test map container not found");
      mapError.value = true;
      mapErrorMessage.value = "Map container not found";
      return;
    }
    
    // Initialize map
    map.value = L.map('test-map').setView([centerLat, centerLng], 10);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
    
    console.log("Test map initialized");
    
    // Add a default marker for Oriental Mindoro
    addMarker(centerLat, centerLng, 'Oriental Mindoro, Philippines');
    
    // Force a map resize to ensure it renders properly
    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize();
        console.log("Map size invalidated");
      }
    }, 100);
    
    mapLoaded.value = true;
  } catch (err) {
    console.error("Error initializing test map:", err);
    error.value = `Error initializing map: ${err.message}`;
    mapError.value = true;
    mapErrorMessage.value = err.message || "Failed to initialize map";
  }
};

// Add a marker to the map
const addMarker = (lat, lng, popupText) => {
  if (!map.value) return;
  
  try {
    const newMarker = L.marker([lat, lng]).addTo(map.value);
    if (popupText) {
      newMarker.bindPopup(popupText).openPopup();
    }
    markers.value.push(newMarker);
    return newMarker;
  } catch (err) {
    console.error("Error adding marker:", err);
    error.value = `Error adding marker: ${err.message}`;
  }
};

// Add a random marker near the center of the map
const addRandomMarker = () => {
  if (!map.value) return;
  
  try {
    const center = map.value.getCenter();
    const lat = center.lat + (Math.random() - 0.5) * 0.1;
    const lng = center.lng + (Math.random() - 0.5) * 0.1;
    addMarker(lat, lng, `Random marker at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  } catch (err) {
    console.error("Error adding random marker:", err);
    error.value = `Error adding random marker: ${err.message}`;
  }
};

// Geocode the test address
const geocodeTestAddress = async () => {
  if (!testAddress.value) return;
  
  geocoding.value = true;
  error.value = null;
  
  try {
    const coords = await geocodeAddress(testAddress.value);
    if (coords) {
      geocodeResults.value = coords;
      
      // Clear existing markers
      markers.value.forEach(marker => {
        if (map.value) {
          map.value.removeLayer(marker);
        }
      });
      markers.value = [];
      
      // Add a new marker at the geocoded location
      addMarker(coords.lat, coords.lng, testAddress.value);
      
      // Center the map on the geocoded location
      if (map.value) {
        map.value.setView([coords.lat, coords.lng], 15);
      }
    } else {
      error.value = "Geocoding failed: No coordinates returned";
    }
  } catch (err) {
    console.error("Error geocoding address:", err);
    error.value = `Error geocoding address: ${err.message}`;
  } finally {
    geocoding.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});
</script>

<style>
/* Leaflet specific styles */
#test-map {
  border-radius: 0.5rem;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.leaflet-control-container .leaflet-control {
  z-index: 1;
}

/* Fix for Leaflet CSS */
.leaflet-container {
  height: 100%;
  width: 100%;
}

.leaflet-pane {
  z-index: 1;
}

.leaflet-top,
.leaflet-bottom {
  z-index: 1;
}
</style>

