function filterByCategory(cat) {
  const filtered = {
    ...art,
    features: art.features.filter(f => f.cat === cat),
  };

  createArtLayer(filtered);
}


document.querySelector(".museums")
  .addEventListener("click", () => filterByCategory("museum"));

document.querySelector(".galleries")
  .addEventListener("click", () => filterByCategory("gallery"));

document.querySelector(".publicArt")
  .addEventListener("click", () => filterByCategory("public"));