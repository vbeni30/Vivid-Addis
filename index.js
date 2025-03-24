import Lenis from "@studio-freight/lenis"

// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Page transition animation
const pageTransition = document.getElementById("page-transition")

function animatePageTransition(direction) {
  const animation = direction === "in" ? "pageTransitionIn" : "pageTransitionOut"
  pageTransition.style.animation = `${animation} 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards`
}

// Handle page navigation
document
  .querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target])')
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      e.preventDefault()

      // Animate page out
      animatePageTransition("in")

      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = href
      }, 800)
    })
  })

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

  // Animate menu items
  mobileMenuLinks.forEach((link, index) => {
    link.style.opacity = "0"
    link.style.transform = "translateY(20px)"
    setTimeout(
      () => {
        link.style.transition = "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
        link.style.opacity = "1"
        link.style.transform = "translateY(0)"
      },
      100 + index * 100,
    )
  })
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

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

// Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Apply different animations based on element type
      if (entry.target.classList.contains("hero-content")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.transition = "opacity 1s ease, transform 1s ease"
      } else if (entry.target.classList.contains("feature-card")) {
        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target)
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
      } else if (entry.target.classList.contains("about-content")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
        entry.target.style.transition = "opacity 1s ease, transform 1s ease"
      } else if (entry.target.classList.contains("about-image")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
        entry.target.style.transition = "opacity 1s ease 0.3s, transform 1s ease 0.3s"
      } else if (entry.target.classList.contains("section-title")) {
        entry.target.style.opacity = "1"
        entry.target.style.transition = "opacity 0.8s ease"
        entry.target.classList.add("animate")
      } else if (entry.target.classList.contains("gallery-item")) {
        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target)
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
      } else if (entry.target.classList.contains("testimonial-card")) {
        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target)
        entry.target.style.opacity = "1"
        entry.target.style.transform = "scale(1)"
        entry.target.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
      } else if (entry.target.classList.contains("cta-content")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.transition = "opacity 1s ease, transform 1s ease"
      } else if (
        entry.target.classList.contains("exhibition-card") ||
        entry.target.classList.contains("artist-card") ||
        entry.target.classList.contains("workshop-card")
      ) {
        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target)
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`
      }

      // Unobserve after animation
      fadeObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add loaded class to body after a short delay
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 300)

  // Check if page was navigated to (not refreshed)
  if (performance.navigation.type !== 1) {
    // Animate page transition out
    setTimeout(() => {
      animatePageTransition("out")
    }, 500)
  }

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

  // Observe elements for animations
  if (document.querySelector(".hero-content")) {
    fadeObserver.observe(document.querySelector(".hero-content"))
  }

  document.querySelectorAll(".feature-card").forEach((card) => {
    fadeObserver.observe(card)
  })

  if (document.querySelector(".about-content")) {
    fadeObserver.observe(document.querySelector(".about-content"))
  }

  if (document.querySelector(".about-image")) {
    fadeObserver.observe(document.querySelector(".about-image"))
  }

  document.querySelectorAll(".section-title").forEach((title) => {
    fadeObserver.observe(title)
  })

  document.querySelectorAll(".gallery-item").forEach((item) => {
    fadeObserver.observe(item)
  })

  document.querySelectorAll(".testimonial-card").forEach((card) => {
    fadeObserver.observe(card)
  })

  if (document.querySelector(".cta-content")) {
    fadeObserver.observe(document.querySelector(".cta-content"))
  }

  document.querySelectorAll(".exhibition-card, .artist-card, .workshop-card").forEach((card) => {
    fadeObserver.observe(card)
  })
})

// Run on window resize
window.addEventListener("resize", adjustHeroPadding)

// Run when navbar changes (e.g., when it gets the 'scrolled' class)
if (navbar) {
  const navbarObserver = new MutationObserver(adjustHeroPadding)
  navbarObserver.observe(navbar, { attributes: true, attributeFilter: ["class"] })
}

// Parallax effect for hero section
const heroSection = document.querySelector(".hero")
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const translateY = scrollPosition * 0.4
    heroSection.style.backgroundPosition = `center ${translateY}px`
  })
}

// Cursor follower effect
const cursor = document.createElement("div")
cursor.classList.add("cursor-follower")
cursor.style.position = "fixed"
cursor.style.width = "20px"
cursor.style.height = "20px"
cursor.style.borderRadius = "50%"
cursor.style.backgroundColor = "rgba(169, 119, 3, 0.5)"
cursor.style.pointerEvents = "none"
cursor.style.zIndex = "9999"
cursor.style.transform = "translate(-50%, -50%)"
cursor.style.transition = "transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease"
document.body.appendChild(cursor)

// Cursor trail effect
const trail = []
const trailLength = 5
for (let i = 0; i < trailLength; i++) {
  const dot = document.createElement("div")
  dot.classList.add("cursor-trail")
  dot.style.position = "fixed"
  dot.style.width = `${10 - i * 1.5}px`
  dot.style.height = `${10 - i * 1.5}px`
  dot.style.borderRadius = "50%"
  dot.style.backgroundColor = "rgba(169, 119, 3, 0.3)"
  dot.style.pointerEvents = "none"
  dot.style.zIndex = "9998"
  dot.style.transform = "translate(-50%, -50%)"
  dot.style.opacity = 1 - i / trailLength
  document.body.appendChild(dot)
  trail.push(dot)
}

// Update cursor and trail position
document.addEventListener("mousemove", (e) => {
  // Main cursor
  cursor.style.left = `${e.clientX}px`
  cursor.style.top = `${e.clientY}px`

  // Trail with delay
  setTimeout(() => {
    trail.forEach((dot, index) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    })
  }, 50)
})

// Cursor hover effects
document
  .querySelectorAll("a, button, .gallery-item, .feature-card, .exhibition-card, .artist-card, .workshop-card")
  .forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.style.width = "40px"
      cursor.style.height = "40px"
      cursor.style.backgroundColor = "rgba(169, 119, 3, 0.2)"
    })

    item.addEventListener("mouseleave", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
      cursor.style.backgroundColor = "rgba(169, 119, 3, 0.5)"
    })
  })

// Hide cursor when leaving window
document.addEventListener("mouseout", (e) => {
  if (e.relatedTarget === null) {
    cursor.style.opacity = "0"
    trail.forEach((dot) => {
      dot.style.opacity = "0"
    })
  }
})

document.addEventListener("mouseover", () => {
  cursor.style.opacity = "1"
  trail.forEach((dot, index) => {
    dot.style.opacity = 1 - index / trailLength
  })
})

// Hide default cursor
document.body.style.cursor = "none"
document.querySelectorAll("a, button, input, textarea, select").forEach((item) => {
  item.style.cursor = "none"
})

// Magnetic effect for buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / 5
    const moveY = (y - centerY) / 5

    btn.style.transform = `translate(${moveX}px, ${moveY}px)`
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)"
  })
})

