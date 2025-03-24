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

  // Event filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const eventCards = document.querySelectorAll(".event-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      filterBtns.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      eventCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Event modal functionality
  const modal = document.querySelector(".event-modal")
  const modalClose = document.querySelector(".modal-close")
  const modalTitle = document.getElementById("modal-title")
  const modalDate = document.getElementById("modal-date")
  const modalDescription = document.getElementById("modal-description")
  const modalLocation = document.getElementById("modal-location")
  const modalRSVP = document.getElementById("modal-rsvp")

  eventCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".event-title").textContent
      const date = this.querySelector(".event-date").textContent
      const description = this.querySelector(".event-description").textContent
      const location = this.querySelector(".event-location").textContent
      const rsvpLink = this.querySelector(".event-rsvp").getAttribute("href")

      modalTitle.textContent = title
      modalDate.textContent = date
      modalDescription.textContent = description
      modalLocation.textContent = location
      modalRSVP.setAttribute("href", rsvpLink)

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

  // Countdown timer for featured event
  const countdownDate = new Date("November 15, 2025 00:00:00").getTime()
  const countdownDays = document.getElementById("countdown-days")
  const countdownHours = document.getElementById("countdown-hours")
  const countdownMinutes = document.getElementById("countdown-minutes")
  const countdownSeconds = document.getElementById("countdown-seconds")

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = countdownDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    countdownDays.textContent = days.toString().padStart(2, "0")
    countdownHours.textContent = hours.toString().padStart(2, "0")
    countdownMinutes.textContent = minutes.toString().padStart(2, "0")
    countdownSeconds.textContent = seconds.toString().padStart(2, "0")

    if (distance < 0) {
      clearInterval(countdownInterval)
      countdownDays.textContent = "00"
      countdownHours.textContent = "00"
      countdownMinutes.textContent = "00"
      countdownSeconds.textContent = "00"
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000)
  updateCountdown()

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

