document.addEventListener('DOMContentLoaded', () => {

    // --- Wedding Announcement Overlay ---
    const weddingOverlay = document.getElementById('weddingOverlay');
    const weddingClose = document.getElementById('weddingClose');
    const weddingEnter = document.getElementById('weddingEnter');

    function dismissWedding() {
        weddingOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(() => {
            weddingOverlay.style.display = 'none';
        }, 500);
    }

    if (weddingOverlay) {
        document.body.style.overflow = 'hidden';
        weddingClose.addEventListener('click', dismissWedding);
        weddingEnter.addEventListener('click', dismissWedding);
        weddingOverlay.addEventListener('click', (e) => {
            if (e.target === weddingOverlay) dismissWedding();
        });
    }

    // --- Sticky Navigation ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Contact Form Mailto ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('cfName').value.trim();
            const company = document.getElementById('cfCompany').value.trim();
            const email = document.getElementById('cfEmail').value.trim();
            const service = document.getElementById('cfService').value;
            const message = document.getElementById('cfMessage').value.trim();

            const subject = encodeURIComponent('Inquiry from ' + name + ' - ' + service);
            const body = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Company: ' + company + '\n' +
                'Email: ' + email + '\n' +
                'Service Required: ' + service + '\n\n' +
                'Message:\n' + message
            );

            window.location.href = 'mailto:admin@camrunal.com?subject=' + subject + '&body=' + body;
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
});