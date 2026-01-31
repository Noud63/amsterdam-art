//Elements
const wrapper = document.querySelector(".wrapper");
const hideSidebar = document.querySelector(".hideSidebar");
const sidebar = document.querySelector(".sidebar");

//Close popup when clicking on map
mymap.on("click", () => {
  wrapper.classList.remove("active");
});

// close popup on ANY click
wrapper.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// Hide sidbar on click
hideSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});


//Filter by category add new layer of markers
function filterByCategory(cat) {
  const filtered = {
    ...art,
    features: art.features.filter(f => f.cat === cat)
  };
    createArtLayer(filtered);
}

document.querySelector(".museums")
  .addEventListener("click", () => filterByCategory("museum"));

document.querySelector(".galleries")
  .addEventListener("click", () => filterByCategory("gallery"));

document.querySelector(".publicArt")
  .addEventListener("click", () => filterByCategory("public"));


// Highlight list item on hover
const res = Array.from(document.querySelectorAll('.item'));

function highLightItem () {

for(const el of res){
    
      el.onmouseover = function (){
          mouseOver();
       }
     function mouseOver(){
      el.style.background = '#cf9451';
      el.marker.bounce(3);
       }  
      }
      
for(const el of res){
      el.onmouseout = function (){
         mouseOut();
      }
     function mouseOut(){
      el.style.background = '#b47630';
      el.marker.stopBouncing();
       }  
   }    
}

highLightItem();













