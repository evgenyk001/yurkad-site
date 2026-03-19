document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');
    
    if (btnLeft && btnRight && carousel) {
        const cardWidth = 320; // ширина карточки + gap
        
        btnLeft.addEventListener('click', () => {
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        
        btnRight.addEventListener('click', () => {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }
});
