document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile Menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Antigravity Effect (Random Float for Project Cards)
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        // Random duration between 3s and 6s
        const duration = 3 + Math.random() * 3;
        // Random delay between 0s and 3s
        const delay = Math.random() * 3;

        card.style.animation = `antigravity ${duration}s ease-in-out infinite`;
        card.style.animationDelay = `${delay}s`;
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Arise Button Shockwave Effect (Optional enhancement)
    const ariseBtns = document.querySelectorAll('.cta-button');
    ariseBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Visual feedback handled by CSS active state
            console.log("SYSTEM: ARISE command initiated.");
        });
    });

    // System Boot Message
    console.log("SYSTEM: Shadow Monarch Interface Loaded.");
    console.log("SYSTEM: Rank Evaluation Completed.");
});
