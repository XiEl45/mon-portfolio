document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
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

    // Email Modal Logic
    const modal = document.getElementById('email-modal');
    const triggers = document.querySelectorAll('.email-trigger');
    const closeBtn = document.querySelector('.modal-close');
    const copyBtn = document.querySelector('.copy-btn');
    const emailInput = document.querySelector('.email-input');
    const feedback = document.querySelector('.copy-feedback');

    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        // Reset copy feedback
        setTimeout(() => {
            feedback.classList.remove('visible');
            copyBtn.innerText = "Copier";
        }, 300);
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            emailInput.select();
            emailInput.setSelectionRange(0, 99999); // For mobile
            navigator.clipboard.writeText(emailInput.value).then(() => {
                feedback.classList.add('visible');
                copyBtn.innerText = "Copié !";
            });
        });
    }
});
