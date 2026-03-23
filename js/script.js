document.addEventListener('DOMContentLoaded', () => {
    // ========== APPLE-STYLE АНИМАЦИЯ СЛОВ ==========
    const words = ['Профессиональная', 'Надёжная', 'Честная', 'Опытная', 'Сильная'];
    const wordElement = document.getElementById('changing-word');
    let index = 0;
    let intervalId;
    
    if (wordElement) {
        wordElement.style.transition = 'opacity 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        
        function changeWord() {
            index = (index + 1) % words.length;
            
            // Плавное исчезновение
            wordElement.style.opacity = '0';
            wordElement.style.transform = 'translateY(-6px)';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
                // Плавное появление
                wordElement.style.opacity = '1';
                wordElement.style.transform = 'translateY(6px)';
                
                setTimeout(() => {
                    wordElement.style.transform = 'translateY(0)';
                }, 60);
            }, 250);
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
    
    // ========== ФУНКЦИЯ ПЛАВНОЙ ПРОКРУТКИ С УЧЁТОМ АКТУАЛЬНОЙ ШАПКИ ==========
    function smoothScrollToElement(targetElement, offset = 0) {
        if (!targetElement) return;
        
        // Получаем актуальную высоту шапки в момент прокрутки
        const header = document.querySelector('.header');
        const headerHeight = header?.offsetHeight || 100;
        
        // Получаем позицию элемента и вычитаем высоту шапки
        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const targetPosition = absoluteElementTop - headerHeight - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // ========== ОБРАБОТЧИК НАВИГАЦИИ С ДВУМЯ ЭТАПАМИ ==========
    function setupNavigation() {
        // Получаем все навигационные элементы
        const navItems = document.querySelectorAll('.nav-icon-item');
        const allLinks = document.querySelectorAll('a[href^="#"]');
        const bookingBtn = document.querySelector('.hero .btn');
        
        // Функция для обработки клика
        function handleNavigationClick(targetElement, e) {
            if (e) e.preventDefault();
            if (!targetElement) return;
            
            // Получаем актуальную высоту шапки ПЕРЕД прокруткой
            const header = document.querySelector('.header');
            let headerHeight = header?.offsetHeight || 100;
            
            // Делаем два прохода для точности
            const elementRect = targetElement.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.scrollY;
            let targetPosition = absoluteElementTop - headerHeight;
            
            // Первая прокрутка
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Через 100ms пересчитываем (на случай если шапка изменилась во время прокрутки)
            setTimeout(() => {
                const newHeaderHeight = document.querySelector('.header')?.offsetHeight || 100;
                const newElementRect = targetElement.getBoundingClientRect();
                const newAbsoluteTop = newElementRect.top + window.scrollY;
                const correctedPosition = newAbsoluteTop - newHeaderHeight;
                
                // Если позиция отличается больше чем на 5px - корректируем
                if (Math.abs(window.scrollY - correctedPosition) > 5) {
                    window.scrollTo({
                        top: correctedPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
        
        // Обработка навигационных иконок
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target') || item.getAttribute('href');
                
                if (targetId && targetId !== '#') {
                    let targetElement = document.querySelector(targetId);
                    
                    if (!targetElement && targetId.startsWith('#')) {
                        targetElement = document.getElementById(targetId.slice(1));
                    }
                    
                    if (targetElement) {
                        handleNavigationClick(targetElement);
                    }
                }
            });
        });
        
        // Обработка всех якорей
        allLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#' || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    handleNavigationClick(targetElement);
                }
            });
        });
        
        // Кнопка "Записаться"
        if (bookingBtn) {
            bookingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactsSection = document.querySelector('.contacts');
                if (contactsSection) {
                    handleNavigationClick(contactsSection);
                }
            });
        }
    }
    
    // ========== ПРЕМИАЛЬНЫЙ АККОРДЕОН ==========
    const toggleButtons = document.querySelectorAll('.service-toggle');
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.transition = 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
    });
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const description = button.nextElementSibling;
            const arrow = button.querySelector('.arrow');
            const currentCard = button.closest('.service-card');
            
            const isActive = button.classList.contains('active');
            
            // Закрываем все карточки
            toggleButtons.forEach((btn) => {
                const btnCard = btn.closest('.service-card');
                const btnDesc = btn.nextElementSibling;
                const btnArrow = btn.querySelector('.arrow');
                
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    btnDesc.classList.remove('active');
                    btnArrow.innerHTML = '↓';
                    btnCard.style.borderColor = 'rgba(158, 147, 126, 0.1)';
                }
            });
            
            // Если текущая карточка была закрыта — открываем её
            if (!isActive) {
                button.classList.add('active');
                description.classList.add('active');
                arrow.innerHTML = '↑';
                currentCard.style.borderColor = '#9E937E';
                
                setTimeout(() => {
                    const rect = currentCard.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isVisible) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 100;
                        const targetPosition = currentCard.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
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
                const description = activeButton.nextElementSibling;
                activeButton.classList.remove('active');
                if (description) {
                    description.classList.remove('active');
                }
                activeButton.querySelector('.arrow').innerHTML = '↓';
                activeCard.style.borderColor = 'rgba(158, 147, 126, 0.1)';
            }
        }
    });

    // ========== ПОШАГОВАЯ АДАПТАЦИЯ ШАПКИ ==========
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo-wrapper');
    let ticking = false;
    
    function updateHeaderClasses() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
        
        if (scrollTop < 80) {
            // полная шапка
        } else if (scrollTop < 200) {
            header.classList.add('scroll-50');
        } else if (scrollTop < 350) {
            header.classList.add('scroll-100');
        } else if (scrollTop < 500) {
            header.classList.add('scroll-150');
        } else {
            header.classList.add('scroll-200');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderClasses();
            });
            ticking = true;
        }
    });
    
    updateHeaderClasses();
    
    // ========== ВОЗВРАТ НАВЕРХ ПРИ КЛИКЕ НА ЛОГО ==========
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
            }, 100);
        });
    }

    // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ==========
    const cardObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        cardObserver.observe(card);
    });

    // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРЕИМУЩЕСТВ ==========
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featuresObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
    
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        featuresObserver.observe(item);
    });

    // ========== ПЕРЕКЛЮЧЕНИЕ КАРТЫ И АДРЕСА ==========
    const cityRadios = document.querySelectorAll('input[name="city"]');
    const mapArtem = document.getElementById('map-artem');
    const mapUssuriysk = document.getElementById('map-ussuriysk');
    const artemAddress = document.getElementById('artem-address');
    const ussuriyskAddress = document.getElementById('ussuriysk-address');

    if (cityRadios.length) {
        cityRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    const city = radio.id === 'city-artem' ? 'artem' : 'ussuriysk';
                    
                    if (city === 'artem') {
                        if (mapArtem) mapArtem.style.display = 'block';
                        if (mapUssuriysk) mapUssuriysk.style.display = 'none';
                        if (artemAddress) artemAddress.style.display = 'block';
                        if (ussuriyskAddress) ussuriyskAddress.style.display = 'none';
                    } else {
                        if (mapArtem) mapArtem.style.display = 'none';
                        if (mapUssuriysk) mapUssuriysk.style.display = 'block';
                        if (artemAddress) artemAddress.style.display = 'none';
                        if (ussuriyskAddress) ussuriyskAddress.style.display = 'block';
                    }
                }
            });
        });
    }
    
    // ========== ИНИЦИАЛИЗАЦИЯ НАВИГАЦИИ ПОСЛЕ ПОЛНОЙ ЗАГРУЗКИ ==========
    // Ждём полной загрузки всех ресурсов
    if (document.readyState === 'complete') {
        setupNavigation();
    } else {
        window.addEventListener('load', setupNavigation);
    }
});
