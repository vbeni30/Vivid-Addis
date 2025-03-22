        // Initialize AOS animation library
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });

            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Scroll to top button
            const scrollTopBtn = document.querySelector('.scroll-top');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Testimonial slider
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const sliderDots = document.querySelectorAll('.slider-dot');
            
            sliderDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = this.getAttribute('data-slide');
                    
                    // Hide all slides
                    testimonialSlides.forEach(slide => {
                        slide.classList.remove('active');
                    });
                    
                    // Remove active class from all dots
                    sliderDots.forEach(dot => {
                        dot.classList.remove('active');
                    });
                    
                    // Show selected slide and activate dot
                    testimonialSlides[slideIndex].classList.add('active');
                    this.classList.add('active');
                });
            });

            // Auto-rotate testimonials
            let currentSlide = 0;
            const totalSlides = testimonialSlides.length;
            
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                
                // Hide all slides
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Remove active class from all dots
                sliderDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show current slide and activate dot
                testimonialSlides[currentSlide].classList.add('active');
                sliderDots[currentSlide].classList.add('active');
            }, 5000);

            // Animate stats counter
            const statNumbers = document.querySelectorAll('.stat-number');
            
            function animateCounter(el) {
                const target = parseInt(el.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current > target) {
                        el.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            }
            
            // Intersection Observer for stats
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statElements = entry.target.querySelectorAll('.stat-number');
                        statElements.forEach(el => {
                            animateCounter(el);
                        });
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const statsContainer = document.querySelector('.stats-container');
            if (statsContainer) {
                statsObserver.observe(statsContainer);
            }

            // Parallax effect for hero background
            const heroSection = document.querySelector('.hero');
            const heroBg = document.querySelector('.hero-bg');
            
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                if (scrollPosition < heroSection.offsetHeight) {
                    heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.4}px)`;
                }
            });

            // Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});
        });