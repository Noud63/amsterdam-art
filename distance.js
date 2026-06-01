/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Estimate walking time based on distance
 * Assumes average walking speed of 5 km/h
 */
function estimateWalkingTime(distanceKm) {
  const speed = 5; // km/h
  const hours = distanceKm / speed;
  const minutes = Math.round(hours * 60);
  
  if (minutes < 60) {
    return `${minutes} min walk`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m walk`;
  }
}

/**
 * Format distance for display
 */
function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Get distance from user location to a venue
 * Returns null if user location not available
 */
function getDistanceToVenue(venueLat, venueLng) {
  if (!userLocationMarker) {
    return null;
  }
  
  const userLat = userLocationMarker.getLatLng().lat;
  const userLng = userLocationMarker.getLatLng().lng;
  
  return calculateDistance(userLat, userLng, venueLat, venueLng);
}