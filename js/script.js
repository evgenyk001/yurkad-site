document.addEventListener('DOMContentLoaded', () => {
    // ========== ПРЕМИАЛЬНАЯ АНИМАЦИЯ СЛОВ ==========
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Опытная', 'Сильная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    let intervalId;
    
    if (wordElement) {
        wordElement.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        function changeWord() {
            index = (index + 1) % words.length;
            
            wordElement.style.transform = 'translateY(-5px)';
            wordElement.style.opacity = '0';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.style.transform = 'translateY(5px)';
                wordElement.style.opacity = '1';
                
                setTimeout(() => {
                    wordElement.style.transform = 'translateY(0)';
                }, 50);
            }, 300);
        }
        
        intervalId = setInterval(changeWord, 2800);
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(intervalId);
            } else {
                intervalId = setInterval(changeWord, 2800);
            }
        });
    }
    
    // ========== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ==========
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

    // ========== ПРЕМИАЛЬНЫЙ АККОРДЕОН ==========
    const toggleButtons = document.querySelectorAll('.service-toggle');
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const description = button.nextElementSibling;
            const arrow = button.querySelector('.arrow');
            const currentCard = button.closest('.service-card');
            
            const isActive = button.classList.contains('active');
            
            toggleButtons.forEach((btn) => {
                const btnCard = btn.closest('.service-card');
                const btnDesc = btn.nextElementSibling;
                const btnArrow = btn.querySelector('.arrow');
                
                btn.classList.remove('active');
                btnDesc.classList.remove('active');
                btnArrow.innerHTML = '↓';
                btnCard.style.borderColor = 'rgba(158, 147, 126, 0.1)';
            });
            
            if (!isActive) {
                button.classList.add('active');
                description.classList.add('active');
                arrow.innerHTML = '↑';
                currentCard.style.borderColor = '#9E937E';
                
                setTimeout(() => {
                    const rect = currentCard.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isVisible) {
                        currentCard.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center'
                        });
                    }
                }, 100);
            }
        });
    });

    // ========== ЗАКРЫТИЕ АКТИВНОЙ КАРТОЧКИ ПРИ КЛИКЕ ВНЕ ЕЁ ==========
    document.addEventListener('click', (e) => {
        const activeButton = document.querySelector('.service-toggle.active');
        
        if (activeButton) {
            const activeCard = activeButton.closest('.service-card');
            
            if (!activeCard.contains(e.target)) {
                activeButton.classList.remove('active');
                activeButton.nextElementSibling.classList.remove('active');
                activeButton.querySelector('.arrow').innerHTML = '↓';
                activeCard.style.borderColor = 'rgba(158, 147, 126, 0.1)';
            }
        }
    });

    // ========== ПОШАГОВАЯ АДАПТАЦИЯ ШАПКИ ==========
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo-wrapper');
    let lastScrollTop = 0;
    let ticking = false;
    
    // Функция обновления классов шапки
    function updateHeaderClasses() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Удаляем все классы скролла
        header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
        
        if (scrollTop < 50) {
            // В самом верху - ничего не добавляем
            header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
        } else if (scrollTop < 150) {
            header.classList.add('scroll-50');
        } else if (scrollTop < 300) {
            header.classList.add('scroll-100');
        } else if (scrollTop < 500) {
            header.classList.add('scroll-150');
        } else {
            header.classList.add('scroll-200');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    // Оптимизированный обработчик скролла (requestAnimationFrame)
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderClasses();
            });
            ticking = true;
        }
    });
    
    // Обновляем при загрузке страницы
    updateHeaderClasses();
    
    // ========== ВОЗВРАТ НАВЕРХ ПРИ КЛИКЕ НА ЛОГО ==========
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Возвращаем шапку к полному размеру
            setTimeout(() => {
                header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
            }, 100);
        });
    }

    // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРЕИМУЩЕСТВ ==========
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        featuresObserver.observe(item);
    });
});
