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
            }, 400);
        }
        
        // Запускаем интервал
        intervalId = setInterval(changeWord, 2800);
        
        // Останавливаем анимацию, если вкладка неактивна
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

    // НОВОЕ: Открытие/закрытие описаний в карточках услуг
    document.querySelectorAll('.service-toggle').forEach(button => {
        button.addEventListener('click', () => {
            // Переключаем класс active на кнопке
            button.classList.toggle('active');
            
            // Находим описание в этой же карточке
            const description = button.nextElementSibling;
            
            // Переключаем класс active у описания
            description.classList.toggle('active');
            
            // Меняем стрелку
            const arrow = button.querySelector('.arrow');
            if (description.classList.contains('active')) {
                arrow.innerHTML = '↑';
            } else {
                arrow.innerHTML = '↓';
            }
        });
    });
});
