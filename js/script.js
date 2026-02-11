/* -------------------- APPLE-СТИЛЬ КАРУСЕЛЬ (БЕСКОНЕЧНАЯ) -------------------- */

const carousel = document.querySelector('.carousel');
let cards = Array.from(document.querySelectorAll('.service-card'));

// 🔥 Клонируем карточки для бесконечного loop
const clonesBefore = cards.map(card => card.cloneNode(true));
const clonesAfter = cards.map(card => card.cloneNode(true));

clonesBefore.forEach(clone => carousel.prepend(clone));
clonesAfter.forEach(clone => carousel.append(clone));

// Обновляем массив карточек
cards = Array.from(document.querySelectorAll('.service-card'));

let index = Math.floor(cards.length / 2); // центр
let isDragging = false; // 🔥 чтобы свайп не сбивался автоцентрированием

function updateCarousel() {

    // 🔥 Если пользователь свайпает — НЕ автоцентрируем
    if (isDragging) return;

    cards.forEach((card, i) => {
        card.classList.remove('active');

        const offset = i - index;

        if (offset === 0) {
            // Активная
            card.classList.add('active');
            card.style.transform = "scale(1.2) rotateY(0deg)";
            card.style.opacity = "1";
            card.style.filter = "blur(0px)";
        } else {
            // Боковые
            const scale = 1 - Math.abs(offset) * 0.15;
            const rotate = offset > 0 ? -35 : 35;
            const opacity = 1 - Math.abs(offset) * 0.3;
            const blur = Math.abs(offset) * 2.5;

            card.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
            card.style.opacity = opacity;
            card.style.filter = `blur(${blur}px)`;
        }
    });

    const cardWidth = cards[0].offsetWidth + 40;

    carousel.scrollTo({
        left: index * cardWidth - (carousel.offsetWidth / 2) + (cardWidth / 2),
        behavior: "smooth"
    });

    // 🔥 Автопрыжок в центр массива (loop)
    if (index < cards.length * 0.25) {
        index += cards.length / 3;
    }
    if (index > cards.length * 0.75) {
        index -= cards.length / 3;
    }
}

function normalizeIndex(i) {
    return i;
}

updateCarousel();

/* -------------------- СВАЙП -------------------- */

let startX = 0;

carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true; // 🔥 блокируем автоцентрирование
});

carousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX - 50) {
        index++;
    }

    if (endX > startX + 50) {
        index--;
    }

    isDragging = false; // 🔥 возвращаем автоцентрирование
    updateCarousel();
});
