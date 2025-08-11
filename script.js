// Professional Psychology Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // WhatsApp message functionality
    function generateWhatsAppLink(service, phone = '573126865031') {
        const baseMessage = `Hola, estoy interesado/a en el servicio de ${service}. Me gustaría agendar una consulta por $150.000 COP. ¿Podrían darme más información?`;
        const encodedMessage = encodeURIComponent(baseMessage);
        return `https://wa.me/${phone}?text=${encodedMessage}`;
    }
    
    // Add WhatsApp functionality to buttons
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service') || 'servicios psicológicos';
            const whatsappUrl = generateWhatsAppLink(service);
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Floating WhatsApp button
    const floatingWhatsApp = document.querySelector('.whatsapp-float');
    if (floatingWhatsApp) {
        floatingWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            const service = 'consulta psicológica general';
            const whatsappUrl = generateWhatsAppLink(service);
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Lazy loading for hero background images
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const imageUrl = heroSection.style.backgroundImage;
        if (imageUrl) {
            const img = new Image();
            img.onload = function() {
                heroSection.style.backgroundImage = imageUrl;
                heroSection.style.opacity = '1';
            };
            img.src = imageUrl.slice(5, -2); // Remove 'url("' and '")'
        }
    }
    
    // Form validation (if forms are added later)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Scroll to top functionality
    function addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 999;
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
            } else {
                scrollBtn.style.opacity = '0';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize scroll to top
    addScrollToTop();
    
    // Analytics helper (for future implementation)
    function trackEvent(action, category, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }
    
    // Track WhatsApp button clicks
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service') || 'unknown';
            trackEvent('whatsapp_click', 'contact', service);
        });
    });
});

// Export functions for potential future use
window.PsychologyWebsite = {
    generateWhatsAppLink: function(service, phone = '573126865031') {
        const baseMessage = `Hola, estoy interesado/a en el servicio de ${service}. Me gustaría agendar una consulta por $150.000 COP. ¿Podrían darme más información?`;
        const encodedMessage = encodeURIComponent(baseMessage);
        return `https://wa.me/${phone}?text=${encodedMessage}`;
    },
    
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    validatePhone: function(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
};
