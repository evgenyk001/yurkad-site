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
            
            wordElement.style.opacity = '0';
            wordElement.style.transform = 'translateY(-6px)';
            
            setTimeout(() => {
                wordElement.textContent = words[index];
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
    
    // ========== АВТОМАТИЧЕСКАЯ ПРОКРУТКА С ПОДБОРОМ ОТСТУПА ==========
    function smartScrollTo(targetElement) {
        if (!targetElement) return;
        
        // Получаем высоту шапки
        const header = document.querySelector('.header');
        const headerHeight = header?.offsetHeight || 100;
        
        // Получаем ID или класс секции для определения типа
        const targetId = targetElement.id || targetElement.className;
        
        // Автоматический подбор отступа в зависимости от секции
        let extraOffset = 0;
        
        // Если это секция услуг, преимуществ или контактов - добавляем немного воздуха
        if (targetElement.classList.contains('cards') || 
            targetElement.classList.contains('features') || 
            targetElement.classList.contains('contacts') ||
            targetElement.id === 'cards' ||
            targetElement.id === 'features' ||
            targetElement.id === 'contacts') {
            extraOffset = 25; // 25px дополнительного воздуха
        }
        
        // Если это карточка услуги - больше отступ
        if (targetElement.classList.contains('service-card')) {
            extraOffset = 40;
        }
        
        // Рассчитываем позицию
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const finalPosition = elementPosition - headerHeight - extraOffset;
        
        // Прокручиваем
        window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
        });
        
        // ФИНАЛЬНАЯ ДОВОДКА: через 300ms проверяем и корректируем
        setTimeout(() => {
            const currentScroll = window.scrollY;
            const newElementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const newHeaderHeight = document.querySelector('.header')?.offsetHeight || 100;
            const correctPosition = newElementPosition - newHeaderHeight - extraOffset;
            
            // Если разница больше 10px - корректируем
            if (Math.abs(currentScroll - correctPosition) > 10) {
                window.scrollTo({
                    top: correctPosition,
                    behavior: 'smooth'
                });
            }
        }, 350);
    }
    
    // ========== НАСТРОЙКА ВСЕХ КЛИКОВ ==========
    function setupNavigation() {
        // 1. Навигационные иконки
        const navItems = document.querySelectorAll('.nav-icon-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                const dataTarget = item.getAttribute('data-target');
                const targetId = dataTarget || href;
                
                if (targetId && targetId !== '#') {
                    let targetElement = document.querySelector(targetId);
                    if (!targetElement && targetId.startsWith('#')) {
                        targetElement = document.getElementById(targetId.slice(1));
                    }
                    
                    if (targetElement) {
                        setTimeout(() => smartScrollTo(targetElement), 30);
                    }
                }
            });
        });
        
        // 2. Все якоря
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || !href) return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    setTimeout(() => smartScrollTo(targetElement), 30);
                }
            });
        });
        
        // 3. Кнопка "Записаться"
        const bookingBtn = document.querySelector('.hero .btn');
        if (bookingBtn) {
            bookingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactsSection = document.querySelector('.contacts');
                if (contactsSection) {
                    setTimeout(() => smartScrollTo(contactsSection), 30);
                }
            });
        }
        
        // 4. Логотип (наверх)
        const logo = document.querySelector('.logo-wrapper');
        if (logo) {
            logo.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    document.querySelector('.header')?.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
                }, 100);
            });
        }
    }
    
    // ========== АККОРДЕОН ==========
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
            
            if (!isActive) {
                button.classList.add('active');
                description.classList.add('active');
                arrow.innerHTML = '↑';
                currentCard.style.borderColor = '#9E937E';
                
                setTimeout(() => {
                    const rect = currentCard.getBoundingClientRect();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 100;
                    const isVisible = rect.top >= headerHeight && rect.bottom <= window.innerHeight;
                    
                    if (!isVisible) {
                        setTimeout(() => smartScrollTo(currentCard), 50);
                    }
                }, 100);
            }
        });
    });

    // ========== ЗАКРЫТИЕ КАРТОЧКИ ПРИ КЛИКЕ ВНЕ ==========
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

    // ========== ШАПКА ==========
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeaderClasses() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        header.classList.remove('scroll-50', 'scroll-100', 'scroll-150', 'scroll-200');
        
        if (scrollTop < 80) {
            // полная
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
            window.requestAnimationFrame(updateHeaderClasses);
            ticking = true;
        }
    });
    
    updateHeaderClasses();

    // ========== АНИМАЦИИ ПОЯВЛЕНИЯ ==========
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        cardObserver.observe(card);
    });

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

    // ========== ПЕРЕКЛЮЧЕНИЕ ГОРОДОВ ==========
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
    
    // ========== ЗАПУСК ==========
    if (document.readyState === 'complete') {
        setupNavigation();
    } else {
        window.addEventListener('load', setupNavigation);
    }
});
