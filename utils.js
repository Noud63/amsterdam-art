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
const closeInfoBtn = document.querySelector(".closeIcon_info");

// Initial load
createArtLayer(art.features);

//Button resets map to initial state
document.querySelectorAll(".reset").forEach((btn) => {
  btn.addEventListener("click", () => createArtLayer(art.features));
});

// close infowindow on button click
document.querySelector(".closeIcon_info").addEventListener("click", () => {
  closeInfo();
});

function openInfo() {
  infowindow.classList.add("active");
  hamburger.classList.add("active");
  hamburger.disabled = false;
  menubar.classList.remove("active");

  if (window.matchMedia("(max-width: 430px)").matches) {
    sidebar.classList.add("hidden");
  }
}

function closeInfo() {
  infowindow.classList.remove("active");
  hamburger.classList.remove("active");
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
    if (
      infowindow.classList.contains("active") ||
      menuTop.classList.contains("active")
    ) {
      closeInfo();
    } else if (
      !infowindow.classList.contains("active") ||
      !menuTop.classList.contains("active")
    ) {
      openInfo();
    }
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

// Hide sidebar on click and toggle title attribute text
hideSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  const isHidden = sidebar.classList.contains("hidden");
  hideSidebar.title = isHidden ? "Show sidebar" : "Hide sidebar";

  if (window.matchMedia("(max-width: 430px)").matches) {
    infowindow.classList.remove("active");
  }
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

//Close info when clicking map
mymap.on("click", () => {
  infowindow.classList.remove("active");
});


//EventHandler for hamburger menu
hamburger.addEventListener("click", () => {
  if (infowindow.classList.contains("active")) {
    closeInfo();  // Close the infowindow and remove active class
  } else {
    const isOpen = menubar.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);

    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }
});

//Close menu and change x to hamburger when clicking map
document.addEventListener("click", (e) => {
  const clickedInsideMenu = menubar.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);
  const clickedInsideInfowindow = infowindow.contains(e.target);

  if (!clickedInsideMenu && !clickedHamburger && !clickedInsideInfowindow) {
    menubar.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// Update list length in the info box
const length = art.features.length;
listLength.textContent = length;

// Function to check if a venue is currently open or closed based on its opening hours
const closedOpen = (venue) => {
  const now = new Date();

  const today = now.toLocaleDateString("en-US", { weekday: "long" });

  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const schedule = venue.properties?.open; // Array of strings like "Tuesday:10:00 - 17:00"

  if (!schedule) return;

  const isOpen = schedule.some((entry) => {  // entry = "Tuesday:10:00 - 17:00"
    const colonIndex = entry.indexOf(":");  // index of first : = 7

    const day = entry.slice(0, colonIndex); 
    const times = entry.slice(colonIndex + 1);

    if (day !== today) return false;

    const [openTime, closeTime] = times.split(" - ");

    return currentTime >= openTime && currentTime <= closeTime;
  });
  return isOpen;
};
