let currentRoute = null;

function showRoute(userLat, userLng, venueLat, venueLng, venueName) {
  // Clear existing route
  if (currentRoute) {
    mymap.removeLayer(currentRoute);
  }

  // Call YOUR backend instead of GraphHopper directly
  fetch('/api/routing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userLat,
      userLng,
      venueLat,
      venueLng,
      venueName
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.paths && data.paths.length > 0) {
        const path = data.paths[0];
        
        if (!path.points || !path.points.coordinates) {
          alert('No route coordinates found');
          return;
        }

        // Convert to Leaflet format [lng, lat] -> latLng
        const latLngs = path.points.coordinates.map(coord => 
          L.latLng(coord[1], coord[0])
        );

        // Draw route on map
        currentRoute = L.polyline(latLngs, {
          color: '#3498db',
          weight: 5,
          opacity: 0.8
        }).addTo(mymap);

        // Fit map to route
        mymap.fitBounds(currentRoute.getBounds(), { padding: [50, 50] });

        // Show distance and time
        const distance = (path.distance / 1000).toFixed(1);
        const duration = Math.round(path.time / 60000);
      } else {
        alert('Route not found');
      }
    })
    .catch(error => {
      console.error('Routing error:', error);
      alert('Error calculating route: ' + error.message);
    });
}

function clearRoute() {
  if (currentRoute) {
    mymap.removeLayer(currentRoute);
    currentRoute = null;
  }
}