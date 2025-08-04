// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu
      const navLinks = document.querySelector(".nav-links");
      const menuToggle = document.getElementById("menu-toggle");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
      }
    }
  });
});

// Active link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  this.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document
  .querySelectorAll(".service-card, .product-card, .team-card, .contact-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// Image gallery functionality
function initImageGallery() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const mainImage = card.querySelector(".product-main-image");
    const placeholderDiv = card.querySelector(".placeholder-image");
    const thumbnails = card.querySelectorAll(".thumbnail");

    // Set up thumbnail clicks
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        if (this.style.display !== "none") {
          // Remove active class from all thumbnails
          thumbnails.forEach((t) => t.classList.remove("active"));
          // Add active class to clicked thumbnail
          this.classList.add("active");

          // Update main image
          mainImage.src = this.src;
          mainImage.alt = this.alt;

          // Show main image and hide placeholder if needed
          mainImage.style.display = "block";
          if (placeholderDiv) {
            placeholderDiv.style.display = "none";
          }
        }
      });
    });

    // Handle main image load error
    if (mainImage) {
      mainImage.addEventListener("error", function () {
        this.style.display = "none";
        if (placeholderDiv) {
          placeholderDiv.style.display = "flex";
        }
      });
    }
  });
}

// Initialize image gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", initImageGallery);

// Parallax effect for floating elements
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});
