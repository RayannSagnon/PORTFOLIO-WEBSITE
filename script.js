// Changement de langue  
function switchLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-fr]');
    const languageButton = document.querySelector('.language-btn');
    elements.forEach(el => {
        const currentLang = el.getAttribute('data-current-lang');
        if (currentLang === 'en') {
            el.textContent = el.getAttribute('data-fr');
            el.setAttribute('data-current-lang', 'fr');
        } else {
            el.textContent = el.getAttribute('data-en');
            el.setAttribute('data-current-lang', 'en');
        }
    });
    languageButton.textContent = languageButton.textContent === 'EN' ? 'FR' : 'EN';
}

// Défilement fluide et mise à jour de la navigation active
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Récupère la section cible
        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop - document.querySelector('.navbar').offsetHeight;

        // Défilement fluide
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        // Ajoute un délai pour déclencher l'animation après le défilement
        setTimeout(() => {
            target.classList.add('show');
        }, 600); // Le délai doit correspondre à la durée de l'animation de défilement
    });
});

// Mise à jour de la navigation active lors du défilement
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight - 50;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Effet d'apparition pour les sections lors de l'entrée dans la vue
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner toutes les sections à observer
    const sections = document.querySelectorAll('section');

    // Ajouter la classe 'appear' à toutes les sections
    sections.forEach(section => {
        section.classList.add('appear');
    });

    // Créer un observer pour détecter quand une section entre dans la vue
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Ajoute la classe pour l'animation
            } else {
                entry.target.classList.remove('show'); // Retire la classe pour rejouer l'animation lorsqu'elle revient dans la vue
            }
        });
    }, { threshold: 0.1 });

    // Observer toutes les sections
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Carrousel pour les projets
document.querySelectorAll('.project-item').forEach((project) => {
    let currentSlideIndex = 0;
    const slides = project.querySelectorAll('.carousel img');
    const dots = project.querySelectorAll('.carousel-indicators .dot');
    const prevButton = project.querySelector('.carousel-control.prev');
    const nextButton = project.querySelector('.carousel-control.next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function prevSlideFunc() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    function currentSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlideFunc);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

    // Initialiser le carrousel
    showSlide(currentSlideIndex);
});


// Menu Hamburger
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('open');
}
