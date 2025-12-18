// Enhanced JavaScript with professional animations and interactions

// Loading Screen
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
});


// Scroll Progress
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Header scroll effect with hide/show
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (window.scrollY > lastScrollY && window.scrollY > 500) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('scrolled', 'hidden');
    }
    lastScrollY = window.scrollY;
});

// Mobile menu toggle with enhanced animations
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

if (hamburger && mobileNav && overlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';

        // Add animation delays for menu items
        if (mobileNav.classList.contains('active')) {
            const menuItems = document.querySelectorAll('#mobileNav li');
            menuItems.forEach((item, index) => {
                item.style.setProperty('--i', index);
                item.style.animationDelay = (index * 0.1) + 's';
            });
        }
    });

    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close menu when clicking on a link
    document.querySelectorAll('#mobileNav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero section
const typedTextElement = document.getElementById('typedText');
const texts = ['Machine Learning', 'Data Science', 'Full Stack Development', 'AI Solutions'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation
setTimeout(typeWriter, 1000);

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.classList.contains('skills-container')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.transform = `scaleX(${width / 100})`;
                    }, index * 200);
                });
            }

            // Animate counters in hero section
            if (entry.target.id === 'hero') {
                setTimeout(animateCounters, 500);
            }

            // Add animation delays for staggered effects
            const animatedChildren = entry.target.querySelectorAll('.skill, .project-cards, .timeline-item, .about-cards li');
            animatedChildren.forEach((child, index) => {
                child.style.setProperty('--i', index);
            });
        }
    });
}, observerOptions);

// Observe all sections and elements
document.querySelectorAll('.section, .skill, .project-cards, .internship-card, .education-cards, .certificate-card').forEach(el => {
    observer.observe(el);
});

// Particle effect for hero section
function createParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Force download function for PDFs
function forceDownload(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(err => {
            console.error('Download failed:', err);
            // Fallback to opening in new tab
            window.open(url, '_blank');
        });
}

// View Resume functionality
const viewResumeBtn = document.getElementById('viewResume');
if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
        const resumeImage = document.querySelector('.resume-image');
        const imageUrl = resumeImage.src;

        // Create modal for resume view
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = imageUrl;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeModal);
            }
        });
    });
}

// Handle resume download buttons (both links and buttons)
document.querySelectorAll('a[href*="rutvik_varankar_resume.pdf"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.href;
        const filename = this.getAttribute('download') || 'Rutvik_Varankar_Resume.pdf';
        forceDownload(url, filename);
    });
});

// Handle download buttons with data attributes
document.querySelectorAll('button[data-url]').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        const filename = this.getAttribute('data-filename') || 'Rutvik_Varankar_Resume.pdf';
        forceDownload(url, filename);
    });
});

// Certificate view functionality
document.querySelectorAll('.view-btn, .view-certificate').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const overlay = this.closest('.certificate-overlay');
        const container = overlay.parentElement;
        const certificateImg = container.querySelector('img');
        const imageUrl = certificateImg.src;

        // Create modal for certificate view
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = imageUrl;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeModal);
            }
        });
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.skill, .project-cards, .internship-card, .certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize AOS (Animation On Scroll) for additional elements
function initializeAOS() {
    const elements = document.querySelectorAll('.feature, .tech-tag, .social-link, .contact-item');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    });
}

// Initialize additional animations
setTimeout(initializeAOS, 1000);

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle linear infinite;
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Tab key navigation focus styles
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation button:focus,
    .keyboard-navigation a:focus,
    .keyboard-navigation input:focus,
    .keyboard-navigation textarea:focus {
        outline: 2px solid var(--primary-blue);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyles);

console.log('Portfolio enhanced with professional animations and interactions!');

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        initializeAOS,
        animateCounters
    };
}