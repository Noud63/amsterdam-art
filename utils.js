//Elements
const wrapper = document.querySelector(".wrapper");
const hideSidebar = document.querySelector(".hideSidebar");
const sidebar = document.querySelector(".sidebar");
const info = document.querySelector(".informatie")
const infowindow = document.querySelector(".infowindow")

//Reset map to initial state
const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  createArtLayer(art.features);
});


// Initial load
createArtLayer(art.features);


// Filter listitems by category
function filterByCategory(cat) {
  const filtered = art.features.filter((f) => f.cat === cat); // create filtered array
  createArtLayer(filtered); // rebuild map and sidebar
}


// Menu buttons
document
  .querySelector(".museums")
  .addEventListener("click", () => filterByCategory("museum"));

document
  .querySelector(".galleries")
  .addEventListener("click", () => filterByCategory("gallery"));

document
  .querySelector(".publicArt")
  .addEventListener("click", () => filterByCategory("public"));

document
  .querySelector(".artcentre")
  .addEventListener("click", () => filterByCategory("artcentre"));


//Add attribute to sidebar tag on initial load
hideSidebar.setAttribute("title", "Hide Sidebar");


//Close popup when clicking on map
mymap.on("click", () => {
  wrapper.classList.remove("active");
});


// close popup on ANY click
wrapper.addEventListener("click", () => {
  wrapper.classList.remove("active");
});


// Hide sidbar on click and toggle title attribute text
hideSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  const isHidden = sidebar.classList.contains("hidden");
  hideSidebar.title = isHidden ? "Show sidebar" : "Hide sidebar";
});


// Highlight list item on hover
function highLightItem(res) {
  for (const el of res) {
    el.onmouseover = function () {
      mouseOver();
    };
    function mouseOver() {
      el.style.background = "#cf9451";
      el.marker.bounce(3);
    }
  }

  for (const el of res) {
    el.onmouseout = function () {
      mouseOut();
    };
    function mouseOut() {
      el.style.background = "#b47630";
      el.marker.stopBouncing();
    }
  }
}

// Toggle info box
info.addEventListener("click", function(){
   infowindow.classList.toggle("active");
})

mymap.on("click", () => {
  infowindow.classList.remove("active");
});