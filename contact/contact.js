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

  // Mobile menu toggle
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
  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => {
      item.classList.toggle("active")
    })
  })

  // Form submission
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    alert("Thank you for your message. We will get back to you soon!")
    contactForm.reset()
  })

  // Newsletter form submission
  const newsletterForms = document.querySelectorAll(".newsletter-form")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      // Here you would typically send the email to your server
      alert(`Thank you for subscribing with: ${email}`)
      this.reset()
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
})

