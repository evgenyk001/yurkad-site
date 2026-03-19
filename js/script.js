document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll('.service-card'));
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');
    
    // Центральная карточка
    let index = Math.floor(cards.length / 2);
    
    // Функция обновления позиций
    function updateCarousel() {
        const cardWidth = 320; // ширина карточки + gap
        const centerX = window.innerWidth / 2;
        
        cards.forEach((card, i) => {
            card.classList.remove('active');
            
            // Убираем инлайн-стили, которые могли остаться
            card.style.transform = '';
            card.style.opacity = '';
            card.style.filter = '';
            card.style.zIndex = '';
            
            const offset = i - index;
            
            if (offset === 0) {
                // Центральная карточка
                card.classList.add('active');
                card.style.transform = `translate(-50%, -50%) scale(1.2)`;
                card.style.opacity = '1';
                card.style.filter = 'blur(0px)';
                card.style.zIndex = '10';
            } else {
                // Боковые карточки
                const direction = offset > 0 ? 1 : -1;
                const distance = Math.abs(offset);
                
                // Рассчитываем позицию
                const shift = direction * (cardWidth * distance);
                const scale = 1 - (distance * 0.15);
                const rotate = direction * 25; // уменьшил поворот
                const opacity = 1 - (distance * 0.25);
                const blur = distance * 1.5; // уменьшил размытие
                
                card.style.transform = `translate(calc(-50% + ${shift}px), -50%) scale(${scale}) rotateY(${rotate}deg)`;
                card.style.opacity = opacity > 0.3 ? opacity : 0.3;
                card.style.filter = `blur(${blur}px)`;
                card.style.zIndex = 10 - distance;
            }
        });
    }
    
    // Обновляем при загрузке
    updateCarousel();
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    // Стрелка вправо
    if (btnRight) {
        btnRight.addEventListener('click', () => {
            index++;
            if (index >= cards.length) index = 0;
            updateCarousel();
        });
    }
    
    // Стрелка влево
    if (btnLeft) {
        btnLeft.addEventListener('click', () => {
            index--;
            if (index < 0) index = cards.length - 1;
            updateCarousel();
        });
    }
});
