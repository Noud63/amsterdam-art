// User location marker icon
const userLocationIcon = L.icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233498db' width='32' height='32'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Ccircle cx='12' cy='12' r='3' fill='white'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

let userLocationMarker = null;
let accuracyCircle = null;

/**
 * Get user's current location using Geolocation API
 */
function getUserLocation() {
  const locateBtn = document.querySelectorAll(".locateMe");

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  // Show loading state
  locateBtn.forEach((btn) => {
    btn.textContent = "Locating...";
    btn.disabled = true;
  });

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      // Remove existing marker and circle if they exist
      if (userLocationMarker) {
        mymap.removeLayer(userLocationMarker);
      }
      if (accuracyCircle) {
        mymap.removeLayer(accuracyCircle);
      }

      // Add accuracy circle
      accuracyCircle = L.circle([lat, lng], {
        color: "#3498db",
        fill: true,
        fillColor: "#3498db",
        fillOpacity: 0.1,
        weight: 2,
        radius: accuracy,
      }).addTo(mymap);

      // Add user location marker
      userLocationMarker = L.marker([lat, lng], { icon: userLocationIcon })
        .bindPopup(
          `<div class="locationPopUp" style="text-align: center;">
          <div class="locationPopUp_title"><strong>Your Location</strong></div><br>
          Latitude: ${lat.toFixed(4)}<br>
          Longitude: ${lng.toFixed(4)}<br>
          Accuracy: ~${Math.round(accuracy)} meters
        </div>`,
        )
        .addTo(mymap);

      // Close sidebar and infowindow if they're open
      const infowindow = document.querySelector(".infowindow");
      const sidebar = document.querySelector(".sidebar");
      const menubar = document.querySelector(".menubar");
      const hamburger = document.querySelector(".hamburger");
      if (window.matchMedia("(max-width: 430px)").matches) {
        if (infowindow) infowindow.classList.remove("active");
        if (sidebar) sidebar.classList.add("hidden");
        if (menubar) menubar.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
      }
      // Open the popup
      userLocationMarker.openPopup();

      // Center map on user location and zoom in
      mymap.setView([lat, lng], 14);

      // Reset button state
      locateBtn.forEach((btn) => {
        btn.textContent = "Locate Me";
        btn.disabled = false;
      });
    },
    function (error) {
      let errorMessage = "Unable to get your location.";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            "Location permission denied. Please enable location services in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out.";
          break;
      }

      alert(errorMessage);

      locateBtn.forEach((btn) => {
        btn.textContent = "Locate Me";
        btn.disabled = false;
      });
    },
  );
}

/**
 * Clear user location from map
 */
function clearUserLocation() {
  if (userLocationMarker) {
    mymap.removeLayer(userLocationMarker);
    userLocationMarker = null;
  }
  if (accuracyCircle) {
    mymap.removeLayer(accuracyCircle);
    accuracyCircle = null;
  }
}

// Add event listener to locate button when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Auto-request location on page load (silently, without popup)
  getUserLocation(false);

  // Setup "Locate Me" button to show popup when clicked
  const locateBtn = document.querySelectorAll(".locateMe");
  if (locateBtn) {
    locateBtn.forEach((btn) => {
      btn.addEventListener("click", () => getUserLocation(true));
    });
  }
});
