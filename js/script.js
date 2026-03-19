document.addEventListener('DOMContentLoaded', () => {
    // Смена слов с плавным переходом
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Опытная', 'Сильная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    
    if (wordElement) {
        setInterval(() => {
            index = (index + 1) % words.length;
            
            // Плавное исчезновение
            wordElement.style.opacity = '0';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.style.opacity = '1';
            }, 300);
            
        }, 2500);
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
