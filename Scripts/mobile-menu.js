

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.onclick = () => {
    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("active");
};

sidebar.classList.remove("open");
menuToggle.classList.remove("active");

