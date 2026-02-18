document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle (solo si los elementos existen)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }






































    // Carruseles individuales automáticos (una imagen cada 4 segundos)
    const allCarousels = document.querySelectorAll('.project-carousel');

    allCarousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;

        const images = track.querySelectorAll('img');
        if (images.length === 0) return;

        let index = 0;
        setInterval(() => {
            index = (index + 1) % images.length;
            track.style.transform = `translateX(-${index * 100}%)`;
        }, 4000);
    });


    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // FILTRADO DE PROYECTOS (HTML manual, no dinámico)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCarousels = document.querySelectorAll('.project-carousel');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Cambia el estado activo del botón
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Muestra u oculta los carruseles según filtro
            projectCarousels.forEach(carousel => {
                carousel.classList.remove('enlarged');
                if (filter === 'all' || carousel.classList.contains(filter)) {
                    carousel.style.display = 'block';
                    if (filter !== 'all' && carousel.classList.contains(filter)) {
                        carousel.classList.add('enlarged');
                    }
                } else {
                    carousel.style.display = 'none';
                }
            });
        });
    });

    // Vincula botones de servicios con carruseles
    const serviceLinks = document.querySelectorAll('.service-link');

    serviceLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetFilter = this.getAttribute('data-service');

            // Simula clic en el botón de filtro
            const filterButton = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
            if (filterButton) filterButton.click();

            // Scroll a la sección de proyectos
            const projectSection = document.getElementById('proyectos');
            if (projectSection) {
                window.scrollTo({
                    top: projectSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }

            // Resalta el carrusel seleccionado
            document.querySelectorAll('.project-carousel').forEach(c => c.classList.remove('enlarged'));
            const activeCarousel = document.querySelector(`.project-carousel.${targetFilter}`);
            if (activeCarousel) {
                activeCarousel.classList.add('enlarged');
            }
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    const aboutSection = document.querySelector('.about');
    const observerOptions = { threshold: 0.5 };

    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(aboutSection);
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            alert(`Gracias ${name}, hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.`);
            contactForm.reset();
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
