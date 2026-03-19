document.addEventListener('DOMContentLoaded', () => {
    // Анимация смены слов на первом экране
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Опытная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    
    if (wordElement) {
        setInterval(() => {
            index = (index + 1) % words.length;
            wordElement.style.opacity = '0';
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.style.opacity = '1';
            }, 300);
        }, 3000);
    }
    
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
});
