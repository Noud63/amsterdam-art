
// const mymap = L.map('mapid', {
//      zoomControl: true
// 	}).setView([52.371534, 4.862805], 14);
// mymap.zoomControl.setPosition('bottomright');		
		
// L.tileLayer('https://api.mapbox.com/styles/v1/noud/cjv7mpqox0hps1fs1tzwk9fgx/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm91ZCIsImEiOiJjanYyY291OHgxMGh3NGVvazlneWV0MnhsIn0.qQ8Thc6rxi03CybmIomvmQ', 
// 		{
//     tileSize: 512,
//     zoomOffset: -1,
//     maxZoom: 18,
//     attribution: '© Mapbox © OpenStreetMap'
//   }
        
// ).addTo(mymap);



// Tiles styles:
//'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' (Esri)
//'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}' (default)
//mapbox://styles/noud/cjv7mpqox0hps1fs1tzwk9fgx

const mymap = L.map('mapid', {
    zoomControl: true
}).setView([52.371534, 4.862805], 14);

mymap.zoomControl.setPosition('bottomright');

L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 18,
    attribution: 'Tiles © Esri'
  }
).addTo(mymap);

