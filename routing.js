let currentRoute = null;

function showRoute(userLat, userLng, venueLat, venueLng, venueName) {
  const apiKey = '4c2dc949-e1d1-4723-8a87-976243986dad';
  
  if (!apiKey) {
    alert('Routing API key not configured');
    return;
  }

  // Clear existing route
  if (currentRoute) {
    mymap.removeLayer(currentRoute);
  }

  // GraphHopper API endpoint with points_encoded=false
  const url = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${venueLat},${venueLng}&vehicle=foot&locale=en&points_encoded=false&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('GraphHopper Response:', data);
      
      if (data.paths && data.paths.length > 0) {
        const path = data.paths[0];
        console.log('Path data:', path);
        
        // Get coordinates from points.coordinates
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
        // alert(`Route to ${venueName}\nDistance: ${distance} km\nWalking time: ${duration} minutes`);
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