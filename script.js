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


    // Contact Form Mailto Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = `Message Portfolio de ${name}`;
            const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

            const mailtoLink = `mailto:alexiscarpentier62@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Open default mail client
            window.location.href = mailtoLink;
        });
    }


    // Hero Contact Options Copy Logic
    const copyEmailHero = document.getElementById('copy-email-hero');
    const copyPhoneHero = document.getElementById('copy-phone-hero');
    const emailValue = "alexiscarpentier62@gmail.com";
    const phoneValue = "07 67 12 17 35";

    if (copyEmailHero) {
        copyEmailHero.addEventListener('click', () => {
            navigator.clipboard.writeText(emailValue).then(() => {
                const icon = copyEmailHero.querySelector('i');
                const originalClass = icon.className;
                icon.className = "fa-solid fa-check";
                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            });
        });
    }

    if (copyPhoneHero) {
        copyPhoneHero.addEventListener('click', () => {
            navigator.clipboard.writeText(phoneValue).then(() => {
                const icon = copyPhoneHero.querySelector('i');
                const originalClass = icon.className;
                icon.className = "fa-solid fa-check";
                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            });
        });
    }
    // Phone Modal Logic (reusing email modal for consistency or creating a new flow if needed, but user asked for popup to copy)
    const phoneTriggers = document.querySelectorAll('.phone-trigger');

    // We can reuse the same modal structure but change content dynamically
    const modalTitle = document.querySelector('.modal-title');
    const modalInput = document.querySelector('.email-input'); // We reuse this input

    phoneTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.innerText = "Mon Téléphone";
            modalInput.value = "07 67 12 17 35";
            feedback.innerText = "Téléphone copié !"; // Update feedback text
            modal.classList.add('active');
        });
    });

    // Update Email Triggers to ensure correct text if we switched back and forth
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modalTitle.innerText = "Me contacter";
            modalInput.value = "alexiscarpentier62@gmail.com";
            feedback.innerText = "Email copié !";
            modal.classList.add('active');
        });
    });
});
