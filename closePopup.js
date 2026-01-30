const wrapper = document.querySelector(".wrapper");

// close popup on ANY click
wrapper.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// Hide sidbar on click
const hideSidebar = document.querySelector(".hideSidebar");
const sidebar = document.querySelector(".sidebar");
hideSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});


