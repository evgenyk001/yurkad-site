document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector('.carousel');
    const originalCards = Array.from(document.querySelectorAll('.service-card'));

    // ⭐ Дублируем карточки для бесконечного кольца
    const cards = [
        ...originalCards.map(c => c.cloneNode(true)),
        ...originalCards,
        ...originalCards.map(c => c.cloneNode(true))
    ];

    carousel.innerHTML = "";
    cards.forEach(c => carousel.appendChild(c));

    const total = cards.length;
    const originalCount = originalCards.length;

    // ⭐ Начинаем ровно с середины
    let index = originalCount;

    function updateCarousel(animate = true) {

        cards.forEach((card, i) => {
            card.classList.remove('active');

            const offset = i - index;

            if (offset === 0) {
                card.classList.add('active');
                card.style.transform = "scale(1.2) rotateY(0deg)";
                card.style.opacity = "1";
                card.style.filter = "blur(0px)";
            } else {
                const scale = 1 - Math.abs(offset) * 0.15;
                const rotate = offset > 0 ? -35 : 35;
                const opacity = 1 - Math.abs(offset) * 0.3;
                const blur = Math.abs(offset) * 2.5;

                card.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
                card.style.opacity = opacity;
                card.style.filter = `blur(${blur}px)`;
            }
        });

        const activeCard = cards[index];
        const carouselRect = carousel.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();

        const scrollLeft =
            activeCard.offsetLeft
            - (carouselRect.width / 2)
            + (cardRect.width / 2);

        carousel.scrollTo({
            left: scrollLeft,
            behavior: animate ? "smooth" : "auto"
        });

        // ⭐ Телепортируем, если дошли до края
        if (index <= originalCount / 2) {
            index += originalCount;
            setTimeout(() => updateCarousel(false), 50);
        }

        if (index >= total - originalCount / 2) {
            index -= originalCount;
            setTimeout(() => updateCarousel(false), 50);
        }
    }

    updateCarousel(false);

    // ---------- СТРЕЛКИ ----------
    document.querySelector('.carousel-btn.right').addEventListener("click", () => {
        index++;
        updateCarousel();
    });

    document.querySelector('.carousel-btn.left').addEventListener("click", () => {
        index--;
        updateCarousel();
    });

    // ---------- СВАЙП ----------
    let startX = 0;

    carousel.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;

        if (endX < startX - 50) index++;
        if (endX > startX + 50) index--;

        updateCarousel();
    });

    window.addEventListener("resize", () => {
        setTimeout(() => updateCarousel(false), 150);
    });

});
