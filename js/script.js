document.addEventListener("DOMContentLoaded", () => {

    const cards = Array.from(document.querySelectorAll('.service-card'));
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');

    // ⭐ Ставим среднюю карточку по умолчанию
    let index = Math.floor(cards.length / 2);

    function updateCarousel() {

        cards.forEach((card, i) => {
            card.classList.remove('active');

            const offset = i - index;

            if (offset === 0) {
                // ⭐ Центральная карточка — всегда по центру
                card.classList.add('active');
                card.style.transform = "translateX(0) scale(1.2) rotateY(0deg)";
                card.style.opacity = "1";
                card.style.zIndex = "10";
            } else {
                // ⭐ Боковые карточки смещаются
                const shift = offset * 260; // расстояние между карточками
                const scale = 1 - Math.abs(offset) * 0.15;
                const rotate = offset > 0 ? -35 : 35;
                const opacity = 1 - Math.abs(offset) * 0.3;

                card.style.transform =
                    `translateX(${shift}px) scale(${scale}) rotateY(${rotate}deg)`;
                card.style.opacity = opacity;
                card.style.zIndex = 10 - Math.abs(offset);
            }
        });
    }

    updateCarousel();

    // ---------- СТРЕЛКИ ----------
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

});
