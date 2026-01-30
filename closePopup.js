const wrapper = document.querySelector(".wrapper");

// close popup on ANY click
wrapper.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
