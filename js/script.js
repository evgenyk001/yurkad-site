document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');
    const sliderContainer = document.querySelector('.slider-container');
    
    let currentIndex = 2;
    let startX = 0;
    let isDragging = false;
    
    // Создаем точки
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function updateCards() {
        cards.forEach((card, i) => {
            card.style.opacity = Math.abs(i - currentIndex) > 2 ? '0.3' : '1';
        });
    }
    
    function goToSlide(index) {
        if (window.innerWidth >= 900) {
            currentIndex = index;
            const offset = (index - 2) * (320 + 20); // ширина + gap
            track.style.transform = `translateX(-${offset}px)`;
        } else {
            // На мобилках скроллим контейнер
            const card = cards[index];
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            currentIndex = index;
        }
        updateDots();
        updateCards();
    }
    
    // Стрелки
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });
    }
    
    // Отслеживаем скролл на мобилках
    if (sliderContainer) {
        sliderContainer.addEventListener('scroll', () => {
            if (window.innerWidth < 900) {
                const scrollLeft = sliderContainer.scrollLeft;
                const cardWidth = cards[0].offsetWidth + 10;
                const newIndex = Math.round(scrollLeft / cardWidth);
                
                if (newIndex >= 0 && newIndex < cards.length && newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateDots();
                    updateCards();
                }
            }
        });
    }
    
    // Инициализация
    goToSlide(2);
    
    // Обновление при ресайзе
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 900) {
            goToSlide(currentIndex);
        }
    });
});
