        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
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

            // Gallery filtering
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Lightbox functionality
            const lightbox = document.querySelector('.lightbox');
            const lightboxImage = document.querySelector('.lightbox-image');
            const lightboxClose = document.querySelector('.lightbox-close');

            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').getAttribute('src');
                    lightboxImage.setAttribute('src', imgSrc);
                    lightbox.classList.add('active');
                });
            });

            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });

            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                // Here you would typically send the email to your server
                alert(`Thank you for subscribing with: ${email}`);
                this.reset();
            });
        });