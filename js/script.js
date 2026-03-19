document.addEventListener('DOMContentLoaded', () => {
    // Анимация смены слов на первом экране
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Опытная', 'Сильная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    let intervalId;
    
    if (wordElement) {
        // Функция смены слова
        function changeWord() {
            index = (index + 1) % words.length;
            wordElement.style.opacity = '0';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.style.opacity = '1';
            }, 400); // Немного увеличил для плавности
        }
        
        // Запускаем интервал
        intervalId = setInterval(changeWord, 2800);
        
        // Останавливаем анимацию, если вкладка неактивна (экономия ресурсов)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(intervalId);
            } else {
                intervalId = setInterval(changeWord, 2800);
            }
        });
    }
    
    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
