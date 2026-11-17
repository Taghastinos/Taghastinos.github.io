
// ==================================
// FUTURISTIC PORTFOLIO INTERACTIONS
// ==================================

// 1. Typing animation

const typingElement = document.getElementById("typing");

const roles = [
  "Creative Developer",
  "Digital Creator",
  "Technology Enthusiast",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typingElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


// 2. Dark / Light theme

const themeButton = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

function updateThemeIcon() {
  themeButton.textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
}

updateThemeIcon();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const theme = document.body.classList.contains("light")
    ? "light"
    : "dark";

  localStorage.setItem("portfolio-theme", theme);
  updateThemeIcon();
});


// 3. Mobile navigation

const menuButton = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  menuButton.textContent =
    navMenu.classList.contains("open") ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.textContent = "☰";
  });
});


// 4. Scroll reveal animations

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// 5. Automatic copyright year

document.getElementById("year").textContent =
  new Date().getFullYear();


// 6. Highlight navigation links

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});
