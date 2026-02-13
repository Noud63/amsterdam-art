// Build sidebar with list of items
// Add marker bounce onhover list item
// Highlight list item on hover

function buildItemList(features) {

    const data = features.sort((a, b) => {
    const x = a.properties.name.toLowerCase();
    const y = b.properties.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

    const listings = document.getElementById("listings");
    listings.innerHTML = ""; // clear previous items

    data.forEach((feature, index) => {
    const prop = feature.properties;
    const marker = feature.marker;

    const listing = document.createElement("div");
    listing.className = "item";
    listing.id = "item" + index;
    listing.marker = marker;

    // Bounce marker on hover
    listing.addEventListener("mouseenter", () => {
      if (marker) marker.bounce(1);
    });
    
    // Highlight list item on hover
    const res = Array.from(document.querySelectorAll(".item"));
    highLightItem(res);

    listing.innerHTML = `
      <div class="content">
        <div class="box">
          <img src="images/${prop.image}" id="pic">
          <div class="info">
            <div class="space">${prop.name}</div>
            <span class="extra">${feature.cat}</span>
          </div>
        </div>
      </div>
    `;

    listings.appendChild(listing);
  });
}
