// Marker icon
var redFlag = L.icon({
  iconUrl: "images/marker1.png",
  shadowUrl: "images/marker1shadow.png",
  iconSize: [28, 42],
  shadowSize: [30, 34],
  shadowAnchor: [3, 34],
  iconAnchor: [14, 42],
});

let myLayer;

// --- Create map markers and sidebar ---
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

        // popup rendering logic
        element.innerHTML = `
          <div class='pic'>
            <img src="images/${feature.properties.image}" class="puImage"/>
          </div>
          <div class="popUpContent" style="background-color:#fffdee">
            <div class="puName">${feature.properties.name}</div>
            ${feature.properties.title ? `<div class="puTitle">"${feature.properties.title}"</div>` : ""}
            ${feature.properties.extra ? `<div class="extra3">${feature.properties.extra}</div>` : ""}
             ${feature.properties.address ? `<div class="address">Address: ${feature.properties.address}</div>` : ""}
            ${feature.properties.link ? `<div class="puLink"><a href=${feature.properties.link} target="_blank" rel="noopener" style="text-decoration:none">Website: ${feature.properties.link}</a></div>`: ""}
            
            <div class="close">
              <img src="images/close.png" class="closeIcon"/>
              <div class="closeText">close</div>
            </div>
          </div>
        `;
      });
    },
  }).addTo(mymap);

  // Build sidebar with filtered features
  buildItemList(features);
}
