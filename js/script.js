document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Анимация при скролле (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, { threshold: 0.1 });

    // Наблюдаем за всеми элементами с классом fade-up, которые еще не анимированы
    document.querySelectorAll('.fade-up:not(.animated)').forEach(el => {
        observer.observe(el);
    });

    // Ховер-эффекты для карточек (чисто для производительности)
    const cards = document.querySelectorAll('.service-card, .why-item, .contacts-info');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
});
