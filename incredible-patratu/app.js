// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 70;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Handle scroll effects
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Handle mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Handle nav link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }
    
    handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
            
            // Close mobile menu if open
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }
}

// Scroll reveal animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.windowHeight = window.innerHeight;
        
        this.init();
    }
    
    init() {
        this.revealElements();
        window.addEventListener('scroll', () => this.revealElements());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
    }
    
    revealElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < this.windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.heroImage = document.querySelector('.hero-image');
        this.heroSection = document.querySelector('.hero');
        
        this.init();
    }
    
    init() {
        if (this.heroImage && this.heroSection) {
            window.addEventListener('scroll', () => this.updateParallax());
        }
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = this.heroSection.offsetHeight;
        
        // Only apply parallax when hero section is visible
        if (scrolled < heroHeight) {
            const parallaxSpeed = scrolled * 0.5;
            this.heroImage.style.transform = `scale(1.1) translateY(${parallaxSpeed}px)`;
        }
    }
}

// Interactive cards hover effects
class CardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.fact-card, .attraction-card, .experience-card, .gallery-item');
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
        });
    }
    
    handleCardHover(card) {
        // Add subtle scale effect on hover
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    handleCardLeave(card) {
        // Reset transform on leave
        card.style.transform = 'translateY(0) scale(1)';
    }
}

// Gallery functionality
class Gallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        this.init();
    }
    
    init() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => this.handleImageClick(item));
        });
    }
    
    handleImageClick(item) {
        const image = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (image && overlay) {
            // Create modal-like effect (simplified version)
            item.classList.add('gallery-active');
            
            // Remove active class after animation
            setTimeout(() => {
                item.classList.remove('gallery-active');
            }, 300);
        }
    }
}

// Experience cards gradient animation
class ExperienceCardAnimations {
    constructor() {
        this.experienceCards = document.querySelectorAll('.experience-card');
        
        this.init();
    }
    
    init() {
        this.experienceCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateGradient(card));
            card.addEventListener('mouseleave', () => this.resetGradient(card));
        });
    }
    
    animateGradient(card) {
        // Add a subtle rotation to the gradient on hover
        card.style.backgroundSize = '200% 200%';
        card.style.backgroundPosition = '100% 0';
        card.style.transition = 'all 0.5s ease';
    }
    
    resetGradient(card) {
        card.style.backgroundPosition = '0% 0';
    }
}

// Intersection Observer for better performance
class IntersectionObserverManager {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        }
    }
    
    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Unobserve after revealing to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all reveal elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Smooth scroll behavior for anchor links
class SmoothScrollManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });
    }
}

// Performance optimization: Throttle scroll events
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
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive components
    new Navigation();
    new ScrollReveal();
    new ParallaxEffect();
    new CardInteractions();
    new Gallery();
    new ExperienceCardAnimations();
    new IntersectionObserverManager();
    new SmoothScrollManager();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Performance: Add passive event listeners where possible
    window.addEventListener('scroll', throttle(() => {
        // Additional scroll-based animations can be added here
    }, 16), { passive: true }); // 60fps throttling
    
    console.log('The Incredible Patratu website loaded successfully!');
});

// Add error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('An error occurred:', e.message);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Handle any resize-specific adjustments
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth < mobileBreakpoint;
    
    if (isMobile) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}, 250));

// Export functions for global access if needed
window.PatratuWebsite = {
    scrollToSection,
    Navigation,
    ScrollReveal,
    ParallaxEffect,
    CardInteractions,
    Gallery,
    ExperienceCardAnimations
};