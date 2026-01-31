// Sort JSON file by key name alphabetically

function sortJson() {
  let name = [];
  for (const el of art.features) {
    name.push(el);
  }
  return name;
}

const artName = sortJson();
// console.log(artName);

myArt = artName.sort((a, b) => {
  const x = a.properties.name.toLowerCase();
  const y = b.properties.name.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
});

// Add items and build list
let i = 1;
const buildItemList = (data) => {
  for (const el of data) {
    const prop = el.properties;
    const myMarker = el.marker;

    const listings = document.getElementById("listings");
    const listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    listing.id = "newItem" + i++;
    listing.marker = myMarker;

    const content = document.createElement("div");
    listing.appendChild(content);
    content.className = "content";
    content.innerHTML = `<div class="box">
                          <div class="info">
                          <div class="space">${prop.name}</div>
                          ${prop.title ? `<span class="title">${prop.title}</span><br>` : ""}
                          <span class="extra">${prop.extra}<br>Adress: ${prop.adress}</span>
                          </div>
                          <img src="images/thumbs/${prop.image}" id="pic">
                          </div>`;
  }
};

buildItemList(myArt);
