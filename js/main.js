document.addEventListener('DOMContentLoaded', () => {
    // Background slider
    const backgrounds = [
        'assets/images/bg1.jpg',
        'assets/images/bg2.jpg',
        'assets/images/bg3.webp'
    ];
    
    let current = 0;
    let showingBg1 = true;
    const bg1 = document.querySelector('.hero-bg1');
    const bg2 = document.querySelector('.hero-bg2');

    function preloadImages(imgs) {
        imgs.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function changeBackground() {
        const nextImg = backgrounds[current];
        
        if (showingBg1) {
            bg2.style.backgroundImage = `url(${nextImg})`;
            bg2.style.opacity = 1;
            bg1.style.opacity = 0;
        } else {
            bg1.style.backgroundImage = `url(${nextImg})`;
            bg1.style.opacity = 1;
            bg2.style.opacity = 0;
        }
        
        showingBg1 = !showingBg1;
        current = (current + 1) % backgrounds.length;
    }

    // Initialize background slider only if hero exists
    if (bg1 && bg2) {
        preloadImages(backgrounds);
        // Set initial background immediately
        bg1.style.backgroundImage = `url(${backgrounds[current]})`;
        bg1.style.opacity = 1;
        current = (current + 1) % backgrounds.length;
        
        // Start background rotation
        setInterval(changeBackground, 7000);
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".navbar");
    
    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle("active");
            toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    toggle.textContent = "☰";
                    document.body.style.overflow = "auto";
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !toggle.contains(e.target)) {
                nav.classList.remove('active');
                toggle.textContent = "☰";
                document.body.style.overflow = "auto";
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                toggle.textContent = "☰";
                document.body.style.overflow = "auto";
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.manthan-section, .vasavi-style-section, .school-footer').forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggle.textContent = "☰";
                    document.body.style.overflow = "auto";
                }
            }
        });
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Contact form handling (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Contact form submitted');
        });
    }

    // Error handling for missing images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" text-anchor="middle" dy=".3em" fill="%23999"%3EImage%3C/text%3E%3C/svg%3E';
        });
    });

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.textContent = "☰";
            document.body.style.overflow = "auto";
        }
    });

    // Console welcome message
    console.log('%cWelcome to Test School Website! 🎓', 'color: #2c318e; font-size: 16px; font-weight: bold;');
    console.log('%cFor technical support, contact: tech@testschool.edu.in', 'color: #f3a94d; font-size: 12px;');
});
