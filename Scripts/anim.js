

window.scrollTo({ top: 0, behavior: 'smooth' });

// ==========================
// Global FX & Reveal (Enhanced)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".card, .expense-item, .latest-expenses-item, .task-item, #eventsList li, .list-item, .dashboard-box, .about-card"
  );

  // Add reveal class + stagger delay
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${i * 40}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  // Tabs: fade in panel
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      panels.forEach(p => p.classList.remove("active"));
      document.getElementById(tab.dataset.tab)?.classList.add("active");
    });
  });

  // Text FX: add class to headings
  document.querySelectorAll("h2, h3, .brand").forEach(el => {
    el.classList.add("text-fx");
  });

  // Scroll Progress Bar
  const progress = document.createElement("div");
  progress.id = "scrollProgress";
  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docH) * 100;
    progress.style.width = scrolled + "%";
  });

  // Parallax effect on hero backgrounds
  window.addEventListener("scroll", () => {
    const y = window.scrollY * 0.08;
    document.body.style.setProperty("--parallax", `${y}px`);
  });

});


// ==========================
// Subtle 3D Tilt (Selective)
// ==========================
const tiltTargets = document.querySelectorAll(".profile-card, .dashboard-box");

tiltTargets.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = ((y - cy) / cy) * -4;
    const ry = ((x - cx) / cx) * 4;

    card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

