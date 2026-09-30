const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const revealItems = document.querySelectorAll(".reveal");

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", false);
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function countUp(element) {
  const target = Number(element.dataset.count);
  let current = 0;

  const timer = setInterval(() => {
    current++;
    element.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 80);
}

function highlightLink(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    links.forEach((link) => {
      const matches = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", matches);
    });
  });
}

function revealOnScroll(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("visible");
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    observer.unobserve(entry.target);
  });
}

const sectionObserver = new IntersectionObserver(highlightLink, {
  rootMargin: "-50% 0px -50% 0px",
});

const revealObserver = new IntersectionObserver(revealOnScroll, {
  threshold: 0.15,
});

sections.forEach((section) => sectionObserver.observe(section));
revealItems.forEach((item) => revealObserver.observe(item));

menuToggle.addEventListener("click", toggleMenu);
links.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader);

document.getElementById("year").textContent = new Date().getFullYear();
