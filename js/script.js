/* -------------------- АНИМАЦИИ ПОЯВЛЕНИЯ -------------------- */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* -------------------- ПОВЕДЕНИЕ ХЕДЕРА ПРИ СКРОЛЛЕ -------------------- */

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 80) {
        header.style.opacity = "0";
        header.style.transform = "translateY(-20px)";
    } else {
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});


/* -------------------- ПАРАЛЛАКС ФЕМИДЫ -------------------- */

const femida = document.querySelector('.hero-image img');

window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    femida.style.transform = `translate(${x}px, ${y}px)`;
});


/* -------------------- ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ -------------------- */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const blockID = this.getAttribute('href').substring(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* -------------------- КАРУСЕЛЬ УСЛУГ -------------------- */

const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.service-card');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let index = 0;

function updateActiveCard() {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) card.classList.add('active');
    });

    const cardWidth = cards[0].offsetWidth + 40;

    carousel.scrollTo({
        left: index * cardWidth - (carousel.offsetWidth / 2 - cardWidth / 2),
        behavior: "smooth"
    });
}

btnRight.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateActiveCard();
});

btnLeft.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateActiveCard();
});

updateActiveCard();
