// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuClose = document.querySelector(".mobile-menu-close")
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a")
const navbar = document.querySelector(".navbar")
const hero = document.querySelector(".hero")

function openMobileMenu() {
  mobileMenu.classList.add("active")
  mobileMenuOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active")
  mobileMenuOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

// Ensure all elements exist before adding event listeners
if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu)
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu)
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMobileMenu)

if (mobileMenuLinks) {
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })
}

// Dynamically adjust hero padding based on navbar height
function adjustHeroPadding() {
  if (!navbar || !hero) return

  const navbarHeight = navbar.offsetHeight
  if (window.innerWidth <= 768) {
    hero.style.paddingTop = `${navbarHeight}px`
  } else {
    hero.style.paddingTop = "var(--navbar-height)"
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  adjustHeroPadding()

  // Set active class for current page
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu-links a")

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href")
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html") ||
      (currentPage === "/" && linkHref === "index.html")
    ) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
})

// Run on window resize
window.addEventListener("resize", adjustHeroPadding)

// Run when navbar changes (e.g., when it gets the 'scrolled' class)
if (navbar) {
  const navbarObserver = new MutationObserver(adjustHeroPadding)
  navbarObserver.observe(navbar, { attributes: true, attributeFilter: ["class"] })
}

