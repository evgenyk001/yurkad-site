document.addEventListener('DOMContentLoaded', () => {
    // Анимация смены слов
    const words = ['Надёжная', 'Профессиональная', 'Честная', 'Компетентная'];
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
            }, 400); // чуть плавнее
        }, 2800);
    }
    
    // Плавный скролл для всех якорей (работает с иконками)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
