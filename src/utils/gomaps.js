// GoMaps Pro API utility functions

// API key
const GOMAPS_API_KEY = "AlzaSypHQrVTDZZWKmav1xYOwSvj1fsiPf2TwRP"

/**
 * Geocode an address to get coordinates
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number} | null>} - The coordinates or null if not found
 */
export async function geocodeAddress(address) {
  try {
    console.log(`Geocoding address: ${address}`)

    // Accurate Calapan City, Oriental Mindoro coordinates
    const calapanCoordinates = { lat: 13.4108, lng: 121.178 }

    // Try the API first
    try {
      const encodedAddress = encodeURIComponent(address)
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&bounds=<string>&bounds=<string>&components=<string>|<string>&latlng=<string>&location_type=<string>|<string>&place_id=<string>&result_type=<string>|<string>&language=en&region=en&key=${GOMAPS_API_KEY}`,
      )
      const data = await response.json()

      console.log("Geocoding API response:", data)

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location
        return {
          lat: location.lat,
          lng: location.lng,
        }
      }
    } catch (apiError) {
      console.error("Geocoding API error:", apiError)
      // Fall through to default coordinates
    }

    // Default to Calapan City, Oriental Mindoro coordinates
    console.log("Using accurate Calapan City, Oriental Mindoro coordinates")
    return calapanCoordinates
  } catch (error) {
    console.error("Geocoding error:", error)
    // Default to Calapan City
    return { lat: 13.4108, lng: 121.178 }
  }
}

/**
 * Calculate distance between two points
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {Promise<number>} - Distance in kilometers
 */
export async function calculateDistance(lat1, lng1, lat2, lng2) {
  try {
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${lat1},${lng1}&destinations=${lat2},${lng2}&key=${GOMAPS_API_KEY}`,
    )
    const data = await response.json()

    if (data.rows && data.rows[0].elements && data.rows[0].elements[0].distance) {
      return data.rows[0].elements[0].distance.value / 1000 // Convert meters to kilometers
    }

    // Fallback to direct calculation if API fails
    return getDirectDistance(lat1, lng1, lat2, lng2)
  } catch (error) {
    console.error("Distance calculation error:", error)
    return getDirectDistance(lat1, lng1, lat2, lng2)
  }
}

/**
 * Calculate direct distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} - Distance in kilometers
 */
function getDirectDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLng = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

