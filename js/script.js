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


/* -------------------- APPLE-СТИЛЬ КАРУСЕЛЬ -------------------- */

const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.service-card');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let index = Math.floor(cards.length / 2); // центр по умолчанию

function updateCarousel() {
    cards.forEach((card, i) => {
        card.classList.remove('active');

        const offset = i - index;

        if (offset === 0) {
            // центральная карточка
            card.classList.add('active');
            card.style.transform = "scale(1.15) rotateY(0deg)";
            card.style.opacity = "1";
        } else {
            // боковые карточки
            const scale = 1 - Math.abs(offset) * 0.15;
            const rotate = offset > 0 ? -25 : 25;
            const opacity = 1 - Math.abs(offset) * 0.25;

            card.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
            card.style.opacity = opacity;
        }
    });

    // центрирование через scrollTo
    const cardWidth = cards[0].offsetWidth + 40; // ширина + gap
    const targetScroll =
        index * cardWidth - (carousel.offsetWidth / 2) + (cardWidth / 2);

    carousel.scrollTo({
        left: targetScroll,
        behavior: "smooth"
    });
}

btnLeft.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    updateCarousel();
});

btnRight.addEventListener('click', () => {
    index = Math.min(cards.length - 1, index + 1);
    updateCarousel();
});

// первый запуск
updateCarousel();


/* -------------------- СВАЙП ДЛЯ МОБИЛЬНЫХ -------------------- */

let startX = 0;

carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX - 50) {
        index = Math.min(cards.length - 1, index + 1);
        updateCarousel();
    }

    if (endX > startX + 50) {
        index = Math.max(0, index - 1);
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
