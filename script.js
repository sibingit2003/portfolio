// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initTypewriter();
    initThemeToggle();
    initMobileNavigation();
    initScrollAnimations();
    initSkillBars();
    initCertificateModals();
    initBackToTop();
    initSmoothScrolling();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// Typewriter Effect
function initTypewriter() {
    const roles = [
        'Full Stack Developer',
        'Frontend Specialist',
        'Backend Enthusiast',
        'UI/UX Explorer',
        'Tech Innovator'
    ];
    
    const typewriterText = document.getElementById('typewriter-text');
    let typeIndex = 0;
    let displayedText = '';
    let isDeleting = false;
    
    function typeWriter() {
        const currentRole = roles[typeIndex % roles.length];
        
        if (!isDeleting && displayedText.length < currentRole.length) {
            displayedText = currentRole.slice(0, displayedText.length + 1);
            typewriterText.textContent = displayedText;
            setTimeout(typeWriter, 80);
        } else if (isDeleting && displayedText.length > 0) {
            displayedText = currentRole.slice(0, displayedText.length - 1);
            typewriterText.textContent = displayedText;
            setTimeout(typeWriter, 40);
        } else if (!isDeleting && displayedText.length === currentRole.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 1200);
        } else if (isDeleting && displayedText.length === 0) {
            isDeleting = false;
            typeIndex++;
            setTimeout(typeWriter, 500);
        }
    }
    
    typeWriter();
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.className = `theme-${savedTheme}`;
    updateThemeIcon(savedTheme);
    
    function toggleTheme() {
        const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.className = `theme-${newTheme}`;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }
    
    function updateThemeIcon(theme) {
        const icon = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        const text = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        
        themeToggle.innerHTML = `<i class="${icon}"></i>`;
        themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = `<i class="${icon}"></i> ${text}`;
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function openMobileNav() {
        hamburgerMenu.classList.add('active');
        mobileNav.classList.add('active');
        mobileNavBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileNav() {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburgerMenu.addEventListener('click', openMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section-fade-in');
    
    function checkScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                section.classList.add('fade-in-visible');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on load
    checkScroll();
}

// Skill Bars Animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                const skillBar = item.querySelector('.skill-bar-inner');
                const level = item.dataset.level;
                
                if (skillBar && !skillBar.classList.contains('visible')) {
                    skillBar.style.setProperty('--skill-level', level);
                    skillBar.classList.add('visible');
                }
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Check on load
    animateSkillBars();
}

// Certificate Modals
function initCertificateModals() {
    const certificateImages = document.querySelectorAll('.certificate-pdf');
    const modals = document.querySelectorAll('.certificate-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    function openModal(certType) {
        const modal = document.getElementById(`certificate-modal-${certType}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(certType) {
        const modal = document.getElementById(`certificate-modal-${certType}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
    
    // Open modal on certificate click
    certificateImages.forEach(img => {
        img.addEventListener('click', () => {
            const certType = img.dataset.cert;
            openModal(certType);
        });
    });
    
    // Close modal on close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const certType = button.dataset.cert;
            closeModal(certType);
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const certType = modal.id.replace('certificate-modal-', '');
                closeModal(certType);
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Header Hide/Show on Scroll
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.pageYOffset;
    let isHeaderHidden = false;
    
    function handleScroll() {
        const currentScrollY = window.pageYOffset;
        const delta = currentScrollY - lastScrollY;
        
        // Always show near the top
        if (currentScrollY < 40) {
            if (isHeaderHidden) {
                header.classList.remove('hide-on-scroll');
                isHeaderHidden = false;
            }
            lastScrollY = currentScrollY;
            return;
        }
        
        if (delta > 6) {
            // Scrolling down
            if (!isHeaderHidden) {
                header.classList.add('hide-on-scroll');
                isHeaderHidden = true;
            }
        } else if (delta < -6) {
            // Scrolling up
            if (isHeaderHidden) {
                header.classList.remove('hide-on-scroll');
                isHeaderHidden = false;
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Initialize header scroll behavior
initHeaderScroll();

// Enhanced hover effects for skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-7px) scale(1.04)';
            this.style.boxShadow = '0 0 25px rgba(37, 99, 235, 0.3)';
            this.style.borderColor = 'var(--primary)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
});

// Enhanced hover effects for education cards
document.addEventListener('DOMContentLoaded', function() {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-7px) scale(1.03)';
            this.style.boxShadow = '0 0 25px rgba(37, 99, 235, 0.3)';
            this.style.borderColor = 'var(--primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
});

// Enhanced hover effects for certificate images
document.addEventListener('DOMContentLoaded', function() {
    const certificateImages = document.querySelectorAll('.certificate-pdf');
    
    certificateImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(0,188,212,0.3)';
            this.style.border = '2px solid var(--primary)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.border = '';
        });
    });
});

// Enhanced hover effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

// Enhanced hover effects for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
});

// Enhanced hover effects for social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.footer-socials a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
            this.style.transform = 'scale(1.2) rotate(-8deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
        });
    });
});

// Enhanced hover effects for contact info
document.addEventListener('DOMContentLoaded', function() {
    const contactInfo = document.querySelectorAll('.contact-info p');
    
    contactInfo.forEach(info => {
        info.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--primary)';
        });
        
        info.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });
});

// Enhanced hover effects for back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.5)';
        this.style.background = 'linear-gradient(135deg, #1d4ed8, var(--primary))';
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
        this.style.borderColor = '';
    });
});

// Enhanced hover effects for theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent)';
        this.style.transform = 'scale(1.1) rotate(180deg)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.color = '';
        this.style.transform = '';
    });
});

// Enhanced hover effects for close modal button
document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
            this.style.transform = 'scale(1.2) rotate(90deg)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
        });
    });
});

// Enhanced hover effects for mobile nav close button
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavClose = document.getElementById('mobile-nav-close');
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary)';
            this.style.background = 'rgba(37, 99, 235, 0.1)';
        });
        
        mobileNavClose.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.background = '';
        });
    }
});

// Enhanced hover effects for mobile nav links
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(37, 99, 235, 0.1)';
            this.style.color = 'var(--primary)';
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
            this.style.transform = '';
        });
    });
});

// Enhanced hover effects for mobile theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(37, 99, 235, 0.1)';
            this.style.color = 'var(--primary)';
        });
        
        mobileThemeToggle.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
        });
    }
});

// Enhanced hover effects for hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    hamburgerMenu.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(37, 99, 235, 0.1)';
    });
    
    hamburgerMenu.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
});

// Enhanced hover effects for brand
document.addEventListener('DOMContentLoaded', function() {
    const brand = document.querySelector('.brand');
    
    brand.addEventListener('mouseenter', function() {
        const h1 = this.querySelector('h1');
        if (h1) {
            h1.style.transform = 'scale(1.05)';
            h1.style.textShadow = '0 0 10px rgba(37, 99, 235, 0.5)';
        }
    });
    
    brand.addEventListener('mouseleave', function() {
        const h1 = this.querySelector('h1');
        if (h1) {
            h1.style.transform = '';
            h1.style.textShadow = '';
        }
    });
});

// Enhanced hover effects for nav photo
document.addEventListener('DOMContentLoaded', function() {
    const navPhoto = document.querySelector('.nav-photo');
    
    navPhoto.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.4)';
    });
    
    navPhoto.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Enhanced hover effects for hero image
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    
    heroImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
        this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.4)';
    });
    
    heroImage.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Enhanced hover effects for about photo
document.addEventListener('DOMContentLoaded', function() {
    const aboutPhoto = document.querySelector('.about-photo');
    
    aboutPhoto.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
        this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.4)';
    });
    
    aboutPhoto.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Enhanced hover effects for experience items
document.addEventListener('DOMContentLoaded', function() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

// Enhanced hover effects for skill tags
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 188, 212, 0.2)';
            this.style.borderColor = 'rgba(0, 188, 212, 0.5)';
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.borderColor = '';
            this.style.transform = '';
        });
    });
});

// Enhanced hover effects for certificate badges
document.addEventListener('DOMContentLoaded', function() {
    const certificateBadges = document.querySelectorAll('.certificate-badge');
    
    certificateBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.animation = 'glow 1s ease-in-out infinite';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.animation = '';
        });
    });
});

// Add glow animation for certificate badges
const style = document.createElement('style');
style.textContent = `
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.3); }
  50% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.6), 0 0 30px rgba(37, 99, 235, 0.4); }
}
`;
document.head.appendChild(style);
