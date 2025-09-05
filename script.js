// Navigation responsive
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Slider de projets
class ProjectSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        // Événements pour les boutons
        this.prevBtn.addEventListener('click', () => this.showSlide(this.currentSlide - 1));
        this.nextBtn.addEventListener('click', () => this.showSlide(this.currentSlide + 1));

        // Événements pour les dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Défilement automatique
        this.startAutoPlay();

        // Pause au survol
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(n) {
        // Masquer toutes les slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Retirer la classe active de tous les dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Gérer les limites
        if (n >= this.slides.length) {
            this.currentSlide = 0;
        } else if (n < 0) {
            this.currentSlide = this.slides.length - 1;
        } else {
            this.currentSlide = n;
        }

        // Afficher la slide courante
        this.slides[this.currentSlide].style.display = 'block';
        this.dots[this.currentSlide].classList.add('active');
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.showSlide(this.currentSlide + 1);
        }, 5000); // Change de slide toutes les 5 secondes
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Formulaire de contact
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
        this.formStatus = document.getElementById('formStatus');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validation en temps réel
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.subjectInput.addEventListener('blur', () => this.validateSubject());
        this.messageInput.addEventListener('blur', () => this.validateMessage());
    }

    handleSubmit(e) {
        e.preventDefault();

        // Valider tous les champs
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            this.showSuccess('Message envoyé avec succès !');
            this.form.reset();

            // En situation réelle, on enverrait les données à un serveur
            setTimeout(() => {
                this.formStatus.style.display = 'none';
            }, 3000);
        }
    }

    validateName() {
        const name = this.nameInput.value.trim();
        const nameError = document.getElementById('nameError');

        if (name.length < 2) {
            nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
            return false;
        }

        nameError.textContent = '';
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = 'Veuillez entrer une adresse email valide';
            return false;
        }

        emailError.textContent = '';
        return true;
    }

    validateSubject() {
        const subject = this.subjectInput.value.trim();
        const subjectError = document.getElementById('subjectError');

        if (subject.length < 5) {
            subjectError.textContent = 'Le sujet doit contenir au moins 5 caractères';
            return false;
        }

        subjectError.textContent = '';
        return true;
    }

    validateMessage() {
        const message = this.messageInput.value.trim();
        const messageError = document.getElementById('messageError');

        if (message.length < 10) {
            messageError.textContent = 'Le message doit contenir au moins 10 caractères';
            return false;
        }

        messageError.textContent = '';
        return true;
    }

    showSuccess(message) {
        this.formStatus.textContent = message;
        this.formStatus.className = 'form-status success';
    }

    showError(message) {
        this.formStatus.textContent = message;
        this.formStatus.className = 'form-status error';
    }
}

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation au défilement
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(el => {
    observer.observe(el);
});

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le slider
    new ProjectSlider();

    // Initialiser le formulaire
    new ContactForm();

    // Afficher la première slide
    document.querySelectorAll('.slide').forEach((slide, index) => {
        if (index === 0) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
});