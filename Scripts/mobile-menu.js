

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuToggle.textContent =
        sidebar.classList.contains("open")
        ? "✕"
        : "☰";
});

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const sidebar = document.getElementById("sidebar");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));
        tab.classList.add("active");
        const target = document.getElementById(tab.dataset.tab);
        target.classList.add("active");
        sidebar.classList.remove("open");
    });
});