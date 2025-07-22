// Utility functions for the Test School website

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date utility
function formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    switch (format) {
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        default:
            return `${day}/${month}/${year}`;
    }
}

// Validate email utility
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number utility
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Smooth scroll to element utility
function smoothScrollTo(elementId, offset = 80) {
    const element = document.getElementById(elementId) || document.querySelector(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Local storage utilities
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Local storage not available:', e);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Error reading from local storage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('Error removing from local storage:', e);
            return false;
        }
    }
};

// Form validation utility
function validateForm(formElement) {
    const errors = [];
    const formData = new FormData(formElement);
    
    const requiredFields = formElement.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const value = formData.get(field.name) || field.value;
        if (!value || value.trim() === '') {
            errors.push({
                field: field.name,
                message: `${field.getAttribute('data-label') || field.name} is required`
            });
        }
    });
    
    const emailFields = formElement.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        const value = formData.get(field.name) || field.value;
        if (value && !isValidEmail(value)) {
            errors.push({
                field: field.name,
                message: 'Please enter a valid email address'
            });
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        data: Object.fromEntries(formData)
    };
}

// Device detection utility
const Device = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024,
    
    getViewportSize: () => ({
        width: window.innerWidth,
        height: window.innerHeight
    })
};

// Auto-initialize utilities
document.addEventListener('DOMContentLoaded', () => {
    console.log('Utilities initialized');
});
