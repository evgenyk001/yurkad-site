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

    // ========== ПРЕМИАЛЬНЫЙ АККОРДЕОН С МАКСИМАЛЬНО ПЛАВНЫМ ЗАКРЫТИЕМ ==========
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

    // ========== ПРЕМИАЛЬНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ==========
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

    // ========== ПРЕМИАЛЬНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ ПРЕИМУЩЕСТВ ==========
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
    const cityBtns = document.querySelectorAll('.city-btn');
    const mapFrame = document.getElementById('map-frame');
    const artemAddress = document.getElementById('artem-address');
    const ussuriyskAddress = document.getElementById('ussuriysk-address');

    const maps = {
        artem: 'https://maps.2gis.com/embed/ru?m=132.18083%2C43.354723%2F16&r=43.354723%2C132.18083',
        ussuriysk: 'https://maps.2gis.com/embed/ru?m=131.953719%2C43.802527%2F16&r=43.802527%2C131.953719'
    };

    if (cityBtns.length && mapFrame) {
        cityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cityBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const city = btn.dataset.city;
                if (maps[city]) {
                    mapFrame.src = maps[city];
                }
                
                if (city === 'artem') {
                    if (artemAddress) artemAddress.style.display = 'block';
                    if (ussuriyskAddress) ussuriyskAddress.style.display = 'none';
                } else {
                    if (artemAddress) artemAddress.style.display = 'none';
                    if (ussuriyskAddress) ussuriyskAddress.style.display = 'block';
                }
            });
        });
    }
});
