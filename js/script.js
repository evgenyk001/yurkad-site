/* -------------------- АНИМАЦИЯ ПОЯВЛЕНИЯ -------------------- */

const fadeBlocks = document.querySelectorAll('.fade-in-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

fadeBlocks.forEach(block => observer.observe(block));


/* -------------------- APPLE-СТИЛЬ КАРУСЕЛЬ (БЕСКОНЕЧНАЯ) -------------------- */

const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.service-card');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let index = Math.floor(cards.length / 2); // центр по умолчанию

function normalizeIndex(i) {
    if (i < 0) return cards.length - 1;
    if (i >= cards.length) return 0;
    return i;
}

function updateCarousel() {
    cards.forEach((card, i) => {
        card.classList.remove('active');

        const offset = i - index;

        if (offset === 0) {
            card.classList.add('active');
            card.style.transform = "scale(1.15) rotateY(0deg)";
            card.style.opacity = "1";
        } else {
            const scale = 1 - Math.abs(offset) * 0.15;
            const rotate = offset > 0 ? -25 : 25;
            const opacity = 1 - Math.abs(offset) * 0.25;

            card.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
            card.style.opacity = opacity;
        }
    });

    const cardWidth = cards[0].offsetWidth + 40;

    carousel.scrollTo({
        left: index * cardWidth - (carousel.offsetWidth / 2) + (cardWidth / 2),
        behavior: "smooth"
    });
}

btnLeft.addEventListener('click', () => {
    index = normalizeIndex(index - 1);
    updateCarousel();
});

btnRight.addEventListener('click', () => {
    index = normalizeIndex(index + 1);
    updateCarousel();
});

updateCarousel();


/* -------------------- СВАЙП ДЛЯ МОБИЛЬНЫХ -------------------- */

let startX = 0;

carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX - 50) {
        index = normalizeIndex(index + 1);
        updateCarousel();
    }

    if (endX > startX + 50) {
        index = normalizeIndex(index - 1);
        updateCarousel();
    }
});


/* -------------------- ПАРАЛЛАКС ФЕМИДЫ -------------------- */

const femida = document.querySelector('.femida-wrapper');

document.addEventListener('mousemove', e => {
    if (!femida) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    femida.style.transform = `translate(${x}px, ${y}px)`;
});
