document.addEventListener('DOMContentLoaded', () => {
    // Event filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                eventCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Media button interactions
    const mediaBtns = document.querySelectorAll('.media-btn');
    
    mediaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            const mediaType = this.querySelector('i').classList.contains('fa-images') ? 'photos' : 'videos';
            
            // Show media modal
            showMediaModal(eventTitle, mediaType);
        });
    });

    // Media modal functionality
    function showMediaModal(eventTitle, mediaType) {
        let modal = document.getElementById('mediaModal');
        if (!modal) {
            modal = createMediaModal();
        }
        
        modal.querySelector('.modal-title').textContent = `${eventTitle} - ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`;
        
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `<div class="media-gallery">${generateMediaContent(mediaType)}</div>`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    function generateMediaContent(mediaType) {
        if (mediaType === 'photos') {
            return `
                <div class="photo-grid">
                    <img src="assets/images/event-photo-1.jpg" alt="Event Photo 1" loading="lazy">
                    <img src="assets/images/event-photo-2.jpg" alt="Event Photo 2" loading="lazy">
                    <img src="assets/images/event-photo-3.jpg" alt="Event Photo 3" loading="lazy">
                    <img src="assets/images/event-photo-4.jpg" alt="Event Photo 4" loading="lazy">
                </div>
                <style>
                .photo-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    padding: 20px 0;
                }
                .photo-grid img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .photo-grid img:hover {
                    transform: scale(1.05);
                }
                </style>
            `;
        } else {
            return `
                <div class="video-grid">
                    <div class="video-item">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
                        <h4>Event Highlights - Part 1</h4>
                    </div>
                    <div class="video-item">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
                        <h4>Event Highlights - Part 2</h4>
                    </div>
                </div>
            `;
        }
    }

    function createMediaModal() {
        const modalHTML = `
            <div id="mediaModal" class="modal-overlay">
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
        const modal = document.getElementById('mediaModal');
        
        modal.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });
        });
        
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

    // Add intersection observer for animations
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

    document.querySelectorAll('.events-hero, .events-grid, .featured-video').forEach(section => {
        observer.observe(section);
    });
});
