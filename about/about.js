// Import necessary libraries
import Lenis from "@studio-freight/lenis"
import AOS from "aos"
import gsap from "gsap"

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

// Initialize AOS animation library
document.addEventListener("DOMContentLoaded", () => {
  // Check if page was navigated to (not refreshed)
  if (performance.navigation.type !== 1) {
    // Animate page transition out
    setTimeout(() => {
      animatePageTransition("out")
    }, 500)
  }

  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true,
    disable: "mobile",
  })

  // Custom cursor
  const cursor = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursor && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })

      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
      })
    })

    // Hover effects for links and buttons
    const hoverElements = document.querySelectorAll("a, button, .team-member, .value-card, .partner-logo")

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover")
        cursorOutline.classList.add("cursor-hover")
      })

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover")
        cursorOutline.classList.remove("cursor-hover")
      })
    })
  }

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

  mobileMenuBtn.addEventListener("click", openMobileMenu)
  mobileMenuClose.addEventListener("click", closeMobileMenu)
  mobileMenuOverlay.addEventListener("click", closeMobileMenu)

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    lenis.scrollTo(0, { duration: 1.5 })
  })

  // Testimonial slider with animation
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const sliderDots = document.querySelectorAll(".slider-dot")
  let currentSlide = 0
  let slideInterval

  function showSlide(index) {
    // Hide all slides with animation
    testimonialSlides.forEach((slide) => {
      slide.style.opacity = "0"
      slide.style.transform = "translateX(50px)"
      setTimeout(() => {
        slide.classList.remove("active")
      }, 300)
    })

    // Remove active class from all dots
    sliderDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show selected slide with animation
    setTimeout(() => {
      testimonialSlides[index].classList.add("active")
      testimonialSlides[index].style.opacity = "1"
      testimonialSlides[index].style.transform = "translateX(0)"
      sliderDots[index].classList.add("active")
    }, 300)
  }

  sliderDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      clearInterval(slideInterval)
      const slideIndex = Number.parseInt(this.getAttribute("data-slide"))
      currentSlide = slideIndex
      showSlide(currentSlide)
      startSlideInterval()
    })
  })

  function startSlideInterval() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length
      showSlide(currentSlide)
    }, 5000)
  }

  startSlideInterval()

  // Animate stats counter with IntersectionObserver
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(el) {
    const target = Number.parseInt(el.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const startTime = performance.now()
    const startValue = 0

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        // Use easeOutQuart for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress)
        el.textContent = currentValue.toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        el.textContent = target.toLocaleString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Intersection Observer for stats
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statElements = entry.target.querySelectorAll(".stat-number")
          statElements.forEach((el) => {
            animateCounter(el)
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsContainer = document.querySelector(".stats-container")
  if (statsContainer) {
    statsObserver.observe(statsContainer)
  }

  // Parallax effect for hero background
  const heroSection = document.querySelector(".hero")
  const heroBg = document.querySelector(".hero-bg")

  if (heroSection && heroBg) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < heroSection.offsetHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.4}px)`
      }
    })
  }

  // Timeline animation with scroll
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")

          // Animate the timeline dot
          const dot = entry.target.querySelector(".timeline-content")
          if (dot) {
            dot.style.opacity = "1"
            dot.style.transform = "scale(1)"
          }

          timelineObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    timelineObserver.observe(item)
  })

  // Value cards hover effect with GSAP
  const valueCards = document.querySelectorAll(".value-card")

  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -15,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      })
    })
  })

  // Team member cards with 3D tilt effect
  const teamMembers = document.querySelectorAll(".team-member")

  teamMembers.forEach((member) => {
    member.addEventListener("mousemove", (e) => {
      const rect = member.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 20
      const moveY = (y - centerY) / 20

      gsap.to(member, {
        rotationY: moveX,
        rotationX: -moveY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power1.out",
      })
    })

    member.addEventListener("mouseleave", () => {
      gsap.to(member, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    })
  })

  // Magnetic effect for buttons
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 5
      const moveY = (y - centerY) / 5

      gsap.to(btn, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
    })
  })

  // Animate hero content on load
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    gsap.fromTo(heroContent, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" })
  }

  // Animate mission and vision cards
  const missionCard = document.querySelector(".mission-card")
  const visionCard = document.querySelector(".vision-card")

  const cardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("mission-card")) {
            gsap.fromTo(entry.target, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          } else if (entry.target.classList.contains("vision-card")) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
            )
          }
          cardsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  if (missionCard) cardsObserver.observe(missionCard)
  if (visionCard) cardsObserver.observe(visionCard)
})

