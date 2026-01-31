
const mymap = L.map('mapid', {
     zoomControl: true
	}).setView([52.374534, 4.845805], 13);
mymap.zoomControl.setPosition('bottomright');		
		
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1Ijoibm91ZCIsImEiOiJjanYyY291OHgxMGh3NGVvazlneWV0MnhsIn0.qQ8Thc6rxi03CybmIomvmQ'
        
}).addTo(mymap);


// Tiles styles:
//'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' (Esri)
//'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}' (default)



// mymap.on("click", () => {
//   wrapper.classList.remove("active");
// });