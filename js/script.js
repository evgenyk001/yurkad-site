document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector('.carousel');
    const cards = Array.from(document.querySelectorAll('.service-card'));
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');

    let index = 0;

    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.remove('active');

            const offset = i - index;

            if (offset === 0) {
                // центральная карточка
                card.classList.add('active');
                card.style.transform = "scale(1.2) rotateY(0deg)";
                card.style.opacity = "1";
                card.style.filter = "blur(0px)";
            } else {
                // боковые карточки
                const scale = 1 - Math.abs(offset) * 0.15;
                const rotate = offset > 0 ? -35 : 35;
                const opacity = 1 - Math.abs(offset) * 0.3;
                const blur = Math.abs(offset) * 2.5;

                card.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
                card.style.opacity = opacity;
                card.style.filter = `blur(${blur}px)`;
            }
        });

        // центрируем
        const cardWidth = cards[0].offsetWidth + 40;

        carousel.scrollTo({
            left: index * cardWidth - (carousel.offsetWidth / 2) + (cardWidth / 2),
            behavior: "smooth"
        });
    }

    updateCarousel();

    /* ---------- СТРЕЛКИ ---------- */

    btnRight.addEventListener("click", () => {
        index++;
        if (index >= cards.length) index = 0;
        updateCarousel();
    });

    btnLeft.addEventListener("click", () => {
        index--;
        if (index < 0) index = cards.length - 1;
        updateCarousel();
    });

    /* ---------- СВАЙП ---------- */

    let startX = 0;

    carousel.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;

        if (endX < startX - 50) index++;
        if (endX > startX + 50) index--;

        if (index >= cards.length) index = 0;
        if (index < 0) index = cards.length - 1;

        updateCarousel();
    });

    /* ---------- resize ---------- */

    window.addEventListener("resize", () => {
        setTimeout(updateCarousel, 150);
    });

});
