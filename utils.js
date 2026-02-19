//HTML Elements
const wrapper = document.querySelector(".wrapper");
const hideSidebar = document.querySelector(".hideSidebar");
const sidebar = document.querySelector(".sidebar");
const info = document.querySelector(".informatie");
const infowindow = document.querySelector(".infowindow");
const hamburger = document.querySelector(".hamburger");
const menuTop = document.querySelector(".menuTop");
const menubar = document.querySelector(".menubar");
const listLength = document.querySelector(".listLength");

// Initial load
createArtLayer(art.features);

//Button resets map to initial state
document.querySelectorAll(".reset").forEach((btn) => {
  btn.addEventListener("click", () => createArtLayer(art.features));
});

function openInfo() {
  infowindow.classList.add("active");
  hamburger.disabled = true;
}

function closeInfo() {
  infowindow.classList.remove("active");
  hamburger.disabled = false;
}

// Filter list-items by category
function filterByCategory(cat) {
  const filtered = art.features.filter((f) => f.cat === cat); // create filtered array
  createArtLayer(filtered); // rebuild map and sidebar
}

function handleMenuClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.classList.contains("museums")) {
    filterByCategory("museum");
  } else if (btn.classList.contains("galleries")) {
    filterByCategory("gallery");
  } else if (btn.classList.contains("publicArt")) {
    filterByCategory("public");
  } else if (btn.classList.contains("artcentre")) {
    filterByCategory("artcentre");
  } else if (btn.classList.contains("informatie")) {
    openInfo();

    hamburger.classList.remove("active");
    menubar.classList.remove("active");
  }
}

// Attach handler once to both menus
document.querySelector(".menuTop").addEventListener("click", handleMenuClick);
document.querySelector(".menubar").addEventListener("click", handleMenuClick);

//Add attribute to sidebar tag on initial load
hideSidebar.setAttribute("title", "Hide Sidebar");

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

// Hide sidebar on mobile
if (window.innerWidth <= 550) {
  sidebar.classList.add("hidden");
}

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
info.addEventListener("click", function () {
  infowindow.classList.toggle("active");
});

//Close info when clicking map
mymap.on("click", () => {
  infowindow.classList.remove("active");
});

hamburger.addEventListener("click", () => {
  const isOpen = menubar.classList.toggle("active");
  hamburger.classList.toggle("active", isOpen);

  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

//Close menu and change x to hamburger when clicking map
document.addEventListener("click", (e) => {
  const clickedInsideMenu = menubar.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);

  if (!clickedInsideMenu && !clickedHamburger) {
    menubar.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.disabled = false;
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// Update list length in the info box
const length = art.features.length;
listLength.textContent = length;
