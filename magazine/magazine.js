document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a")

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

  mobileMenuBtn.addEventListener("click", openMobileMenu)
  mobileMenuClose.addEventListener("click", closeMobileMenu)
  mobileMenuOverlay.addEventListener("click", closeMobileMenu)

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Article modal functionality
  const modal = document.querySelector(".article-modal")
  const modalClose = document.querySelector(".modal-close")
  const modalTitle = document.getElementById("modal-title")
  const modalCategory = document.getElementById("modal-category")
  const modalAuthor = document.getElementById("modal-author")
  const modalContent = document.getElementById("modal-content")

  const magazineCards = document.querySelectorAll(".magazine-card")
  magazineCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".magazine-title").textContent
      const category = this.querySelector(".magazine-category").textContent
      const author = this.querySelector(".magazine-author span").textContent
      const excerpt = this.querySelector(".magazine-excerpt").textContent

      modalTitle.textContent = title
      modalCategory.textContent = category
      modalAuthor.textContent = `By ${author}`
      modalContent.innerHTML = `<p>${excerpt}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`

      modal.classList.add("active")
    })
  })

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    magazineCards.forEach((card) => {
      const title = card.querySelector(".magazine-title").textContent.toLowerCase()
      const category = card.querySelector(".magazine-category").textContent.toLowerCase()
      const excerpt = card.querySelector(".magazine-excerpt").textContent.toLowerCase()

      if (title.includes(searchTerm) || category.includes(searchTerm) || excerpt.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value
    // Here you would typically send the email to your server
    alert(`Thank you for subscribing with: ${email}`)
    this.reset()
  })
})

