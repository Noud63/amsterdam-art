// Marker icon
var redFlag = L.icon({
  iconUrl: "images/marker1.png",
  shadowUrl: "images/marker1shadow.png",
  iconSize: [28, 42],
  shadowSize: [30, 34],
  shadowAnchor: [3, 34],
  iconAnchor: [14, 42],
});

let myLayer = L.layerGroup();

// --- Create map markers and pop-up ---
function createArtLayer(features) {
  if (myLayer) {
    mymap.removeLayer(myLayer);
  }

  // Create new markers layer
  myLayer = L.geoJSON(features, {
    pointToLayer: function (feature, latlng) {
      const marker = L.marker(latlng, { icon: redFlag })
        .setBouncingOptions({
          bounceHeight: 30,
          bounceSpeed: 54,
          shadowAngle: -Math.PI / 4,
          exclusive: true,
        })
        .on("click", function () {
          this.bounce(1);
        });

      feature.marker = marker; // attach marker for sidebar
      return marker;
    },
    onEachFeature: function (feature, layer) {
      layer.on("click", function (e) {
        e.originalEvent.stopPropagation(); //Important, stop bubbling up. Prevent popup from closing immediately!

        const element = document.querySelector(".wrapper");
        if (sidebar.classList.contains("hidden")) {
          element.classList.add("left");
        } else {
          element.classList.remove("left");
        }
        element.classList.add("active");

        if (window.innerWidth <= 540) {
          if (
            !sidebar.classList.contains("hidden") &&
            wrapper.classList.contains("active")
          ) {
            sidebar.classList.add("hidden");
          }
        }

        // Calculate distance if user location exists
        const distance = getDistanceToVenue(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        );

        // Array of openings hours
        const openingHours = feature.properties.open
          ? feature.properties.open.map((day) => `<div>${day}</div>`).join("")
          : "";

        const distanceHtml = distance
          ? `<div class="distance">
       <div>📍${formatDistance(distance)}</div> 
       <div><img src="/images/walk.png" alt="walk" class="walkIcon"/>${estimateWalkingTime(distance)} (5 km/h)</div>
     </div>`
          : `<div class="distance">📍 Location unavailable</div>`;

          const venueName = feature.properties.name.replace(/'/g, "\\'");

          // NEW: Get directions button (only show if user location exists)
    const directionsButton = userLocationMarker
      ? `<button class="routeLink" onclick="showRoute(
          ${userLocationMarker.getLatLng().lat},
          ${userLocationMarker.getLatLng().lng},
          ${feature.geometry.coordinates[1]},
          ${feature.geometry.coordinates[0]},
           '${venueName}'
        )"><img src="/images/route.png" alt="Route" class="linkIcon"/>Route</button>`
      : '';

        // popup rendering logic
        element.innerHTML = `
          <div class='pic'>
            <img src="images/${feature.properties.image}" class="puImage"/>
          </div>
        
          <div class="popUpContent" >
            ${distanceHtml}
            <div class="puName">${feature.properties.name}</div>
            ${feature.properties.title ? `<div class="puTitle">"${feature.properties.title}"</div>` : ""}
            ${feature.properties.extra ? `<div class="extra3">${feature.properties.extra}</div>` : ""}
            ${feature.properties.address ? `<div class="address"><span class="popupSectionTitle">Address:</span> ${feature.properties.address}</div>` : ""}
            ${feature.cat !== "public" && feature.properties.name !== "Van Gogh Museum" ? `<div class="openOrClosed"><span class="category">${feature.cat.charAt(0).toUpperCase() + feature.cat.slice(1)} is:</span> ${closedOpen(feature) ? `<span class="closedOpen">Open</span>` : `<span class="closedOpen">Closed</span>`}</div>` : ""}
            
            ${feature.properties.open ? `<div class="openingHours"><span class="popupSectionTitle">Opening hours:</span>${openingHours}</div>` : ""}
            <div class="links">
              ${feature.properties.link ? `<button class="websiteLink"><a href=${feature.properties.link} target="_blank" rel="noopener" style="text-decoration:none"><img src="/images/globe.png" alt="Website" class="linkIcon"/><span>Website</span></a></button>` : ""}
              ${directionsButton}
            </div>
           
            <div class="close">
              <img src="images/close.png" class="closeIcon"/>
             </div>
           
          </div>
        `;
      });
    },
  }).addTo(mymap);

  // Build sidebar with filtered features
  buildItemList(features);
}
