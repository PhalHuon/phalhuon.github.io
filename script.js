// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// scroll progress bar
const progress = document.getElementById("progress");
const nav = document.getElementById("nav");

const topBtn = document.getElementById("topBtn");

function onScroll() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
  nav.classList.toggle("scrolled", scrolled > 8);
  topBtn.classList.toggle("visible", scrolled > 400);
}

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// reveal sections as they enter the viewport
const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        revealer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

// highlight the nav link for the section in view
const navLinks = Array.from(document.querySelectorAll(".links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) =>
          link.classList.toggle("active", link.getAttribute("href") === "#" + id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => spy.observe(section));

// let project cards open a link with keyboard or click (set data-href on each)
document.querySelectorAll(".project").forEach((card) => {
  const open = () => {
    const href = card.getAttribute("data-href");
    if (href) window.open(href, "_blank", "noopener");
  };
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
});
