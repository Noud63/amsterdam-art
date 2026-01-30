var redFlag = L.icon({
  iconUrl: "images/marker1.png",
  shadowUrl: "images/marker1shadow.png",
  iconSize: [28, 42],
  shadowSize: [30, 34],
  shadowAnchor: [3, 34],
  iconAnchor: [14, 42],
});

//Add markers and popups

const myLayer = L.geoJSON(art, {
  pointToLayer: function (feature, latlng) {
    var myMarker = L.marker(latlng, { icon: redFlag })

      .setBouncingOptions({
        bounceHeight: 30, // height of the bouncing
        bounceSpeed: 54, // bouncing speed coefficient
        shadowAngle: -Math.PI / 4,
        exclusive: true,
      }) // if this marker starts bouncing all others must stop

      .on("click", function () {
        this.bounce(1); // bounce 3 times
      });

    feature.marker = myMarker; // set marker as feature property

    return myMarker;
  },

  onEachFeature: function (feature, layer) {
    layer.on("click", function (e) {
       e.originalEvent.stopPropagation(); // IMPORTANT
      const element = document.querySelector(".wrapper");

      element.classList.add("active");

      element.innerHTML = `<div class='pic'><img src="images/${feature.properties.image}" class="puImage"/></div>

                        <div class="popUpContent" style="background-color:#fffdee">
                          <div class="puName">${feature.properties.name}</div>
                          <div class="puTitle">"${feature.properties.title}"</div> 
                          <div class="extra3">${feature.properties.extra}</div> 

                          <div class="close">
                             <img src="images/close.png" alt="close icon" class="closeIcon"/>
                             <div class="closeText">close</div>
                          </div>

                       </div>`;

      if (!feature.properties.title) {
        element.innerHTML = `
                     <div class='pic'>
                          <img src="images/${feature.properties.image}" class="puImage"/>
                     </div>
                     <div class="popUpContent" style="background-color:#fffdee">
                         <div class="puName">${feature.properties.name}</div>
                         <div class="extra3">${feature.properties.extra}</div>
                         <p>
                         <div><span class="check">Check for more info:</span></div>
                         <div class="link"><a href="${feature.properties.link}" target="blank"><span class="link1">${feature.properties.link}</a></div><p>
                       
                         <div class="close">
                          <div><img src="images/close.png" alt="close icon" class="closeIcon"/></div>
                          <div class="closeText">close</div>
                       </div>
                     </div>`;
      }

      if (!feature.properties.extra) {
        element.innerHTML = `
                               <div class='pic'>
                                    <img src="images/${feature.properties.image}" class="puImage"/>
                               </div> 
                <div class="popUpContent" style="background-color:#fffdee">
                         <div class="puName">${feature.properties.name}</div>
                         <div class="puTitle">"${feature.properties.title}"</div>
                          <div class="close">
                       <div><img src="images/close.png" alt="close icon" class="closeIcon"/></div>
                       <div class="closeText">close</div>
                       </div>
                    </div>`;
      }
});
  },
});

mymap.addLayer(myLayer);
