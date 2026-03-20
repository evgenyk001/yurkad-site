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

    // ========== АККОРДЕОН ДЛЯ КАРТОЧЕК УСЛУГ ==========
    const toggleButtons = document.querySelectorAll('.service-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Находим описание в этой же карточке
            const description = button.nextElementSibling;
            const arrow = button.querySelector('.arrow');
            
            // Проверяем, открыта ли текущая карточка
            const isActive = button.classList.contains('active');
            
            // Закрываем все карточки
            toggleButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
                btn.querySelector('.arrow').innerHTML = '↓';
            });
            
            // Если текущая карточка была закрыта — открываем её
            if (!isActive) {
                button.classList.add('active');
                description.classList.add('active');
                arrow.innerHTML = '↑';
            }
        });
    });
});
