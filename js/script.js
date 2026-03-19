document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const cards = Array.from(document.querySelectorAll('.service-card'));
    const dotsContainer = document.querySelector('.carousel-dots');
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');
    
    let currentIndex = 2;
    let isDesktop = window.innerWidth >= 1024;
    
    // Создаем точки-индикаторы
    function createDots() {
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                scrollToIndex(i);
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Скролл к индексу (для мобилок)
    function scrollToIndex(index) {
        if (window.innerWidth < 1024) {
            const card = cards[index];
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }
    
    // Обновление 3D позиций (для компа)
    function updateCarouselDesktop() {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next', 'far');
            
            const distance = i - currentIndex;
            
            if (distance === 0) {
                card.classList.add('active');
            } else if (distance === -1) {
                card.classList.add('prev');
            } else if (distance === 1) {
                card.classList.add('next');
            } else if (distance === -2) {
                card.classList.add('far');
            } else if (distance === 2) {
                card.classList.add('far', 'next');
            }
        });
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Обновление для мобилок
    function updateCarouselMobile() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function updateCarousel() {
        if (window.innerWidth >= 1024) {
            updateCarouselDesktop();
        } else {
            updateCarouselMobile();
        }
    }
    
    // Обработчики стрелок
    if (btnLeft) {
        btnLeft.addEventListener('click', () => {
            if (window.innerWidth >= 1024) {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarouselDesktop();
            } else {
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToIndex(currentIndex);
                    updateCarouselMobile();
                }
            }
        });
    }
    
    if (btnRight) {
        btnRight.addEventListener('click', () => {
            if (window.innerWidth >= 1024) {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarouselDesktop();
            } else {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    scrollToIndex(currentIndex);
                    updateCarouselMobile();
                }
            }
        });
    }
    
    // Отслеживаем скролл на мобилках
    if (carousel) {
        carousel.addEventListener('scroll', () => {
            if (window.innerWidth < 1024) {
                const scrollPosition = carousel.scrollLeft;
                const cardWidth = cards[0].offsetWidth + 15;
                const newIndex = Math.round(scrollPosition / cardWidth);
                
                if (newIndex >= 0 && newIndex < cards.length && newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateCarouselMobile();
                }
            }
        });
    }
    
    window.addEventListener('resize', () => {
        isDesktop = window.innerWidth >= 1024;
        updateCarousel();
        
        if (!isDesktop) {
            scrollToIndex(currentIndex);
        }
    });
    
    createDots();
    updateCarousel();
    
    if (window.innerWidth < 1024) {
        setTimeout(() => scrollToIndex(currentIndex), 100);
    }
});
