document.addEventListener('DOMContentLoaded', () => {
    // Initialize About page specific functionality
    
    // Animate statistics counters
    function animateCounters() {
        const counters = document.querySelectorAll('.info-block p');
        const speed = 200; // Animation speed
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const count = parseInt(counter.getAttribute('data-count') || '0');
                const increment = target / speed;
                
                if (count < target) {
                    const newCount = Math.ceil(count + increment);
                    counter.setAttribute('data-count', newCount);
                    
                    // Preserve the '+' sign for numbers like "50+"
                    const originalText = counter.textContent;
                    if (originalText.includes('+')) {
                        counter.textContent = newCount + '+';
                    } else {
                        counter.textContent = newCount;
                    }
                    
                    setTimeout(updateCount, 1);
                } else {
                    // Reset to original text to maintain formatting
                    counter.textContent = counter.getAttribute('data-original') || target;
                }
            };
            
            // Store original text
            counter.setAttribute('data-original', counter.textContent);
            counter.setAttribute('data-count', '0');
        });
        
        // Start animation
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-original').replace(/\D/g, ''));
                const count = parseInt(counter.getAttribute('data-count') || '0');
                const increment = target / speed;
                
                if (count < target) {
                    const newCount = Math.ceil(count + increment);
                    counter.setAttribute('data-count', newCount);
                    
                    const originalText = counter.getAttribute('data-original');
                    if (originalText.includes('+')) {
                        counter.textContent = newCount + '+';
                    } else {
                        counter.textContent = newCount;
                    }
                    
                    setTimeout(updateCount, 10);
                } else {
                    counter.textContent = counter.getAttribute('data-original');
                }
            };
            
            updateCount();
        });
    }

    // Intersection Observer for journey section
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger counter animation when journey section is visible
                if (entry.target.classList.contains('our-journey')) {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe sections
    document.querySelectorAll('.our-journey, .extra-curriculum').forEach(section => {
        journeyObserver.observe(section);
    });

    // Activity card interactions
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect for better interactivity
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Read more functionality
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.activity-card');
            const description = card.querySelector('.activity-description');
            const title = card.querySelector('.activity-title').textContent;
            
            // Create and show modal with more information
            showActivityModal(title, description.textContent);
        });
    });

    // Activity modal functionality
    function showActivityModal(title, description) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('activityModal');
        if (!modal) {
            modal = createActivityModal();
        }
        
        // Update modal content
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-body').innerHTML = `
            <p>${description}</p>
            <p>This activity is designed to enhance students' skills and provide hands-on learning experience. 
            Our experienced instructors guide students through practical exercises and theoretical concepts.</p>
            <h5>Benefits:</h5>
            <ul>
                <li>Develops critical thinking skills</li>
                <li>Enhances creativity and problem-solving abilities</li>
                <li>Builds confidence and teamwork</li>
                <li>Provides practical experience</li>
            </ul>
        `;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    function createActivityModal() {
        const modalHTML = `
            <div id="activityModal" class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-close">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById('activityModal');
        
        // Add close functionality
        modal.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
        
        return modal;
    }

    // Smooth scroll to sections
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to events page or scroll to activities
            window.location.href = 'events.html';
        });
    }

    // Enhanced accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key closes modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('activityModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        }
    });

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Performance optimization: Debounce resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize for responsive behavior
    const handleResize = debounce(() => {
        // Recalculate layouts if needed
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            if (window.innerWidth <= 768) {
                card.style.transform = 'none';
            }
        });
    }, 250);

    window.addEventListener('resize', handleResize);

    // Analytics tracking for user interactions
    function trackInteraction(action, element) {
        // Add analytics tracking here if needed
        console.log(`User interaction: ${action} on ${element}`);
    }

    // Track read more clicks
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', () => {
            trackInteraction('click', 'read-more-activity');
        });
    });

    // Error handling for missing elements
    function safelyExecute(func, errorMessage) {
        try {
            func();
        } catch (error) {
            console.warn(errorMessage, error);
        }
    }

    // Initialize all functions safely
    safelyExecute(() => {
        // Additional initialization code if needed
    }, 'Error initializing about page functionality');

    // Console message for debugging
    console.log('About page JavaScript loaded successfully');
});
