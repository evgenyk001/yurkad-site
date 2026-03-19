document.addEventListener('DOMContentLoaded', () => {
    // Анимация смены слов
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Компетентная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    
    if (wordElement) {
        setInterval(() => {
            index = (index + 1) % words.length;
            wordElement.style.opacity = '0';
            wordElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.style.opacity = '1';
                wordElement.style.transform = 'translateY(0)';
            }, 200);
        }, 2500);
    }
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
