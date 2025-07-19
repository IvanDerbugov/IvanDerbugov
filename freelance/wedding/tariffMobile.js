document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 740;
    
    if (!isMobile) return; // Если не мобилка, не инициализируем слайдер

    // Элементы слайдера тарифов
    const tariffsFlex = document.querySelector('.tariffs-flex');
    const tariffsSlides = document.querySelectorAll('.tariffs-flex .tariff');
    const tariffsDotsContainer = document.querySelector('.tariffs-dots');
    const tariffsArrowPrev = document.querySelector('.tariffs-arrow-prev');
    const tariffsArrowNext = document.querySelector('.tariffs-arrow-next');

    if (!tariffsFlex || tariffsSlides.length === 0) return;

    let currentTariffSlide = 0;
    const totalTariffSlides = tariffsSlides.length;
    let isTariffTransitioning = false;

    // Создаем точки навигации
    function renderTariffDots() {
        tariffsDotsContainer.innerHTML = '';
        for (let i = 0; i < totalTariffSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'tariffs-dot';
            dot.addEventListener('click', function() {
                if (!isTariffTransitioning) {
                    goToTariffSlide(i);
                }
            });
            tariffsDotsContainer.appendChild(dot);
        }
    }

    // Обновляем активную точку
    function updateTariffDots() {
        const dots = tariffsDotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentTariffSlide);
        }
    }

    // Переход к слайду
    function goToTariffSlide(index) {
        if (isTariffTransitioning) return;
        
        isTariffTransitioning = true;
        currentTariffSlide = index;
        
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8; // gap между слайдами
        const totalOffset = index * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20; // Учитываем padding контейнера
        
        tariffsFlex.style.transform = `translateX(${visualOffset}px)`;
        
        updateTariffDots();
        
        // Снимаем флаг после завершения анимации
        setTimeout(() => {
            isTariffTransitioning = false;
        }, 500);
    }

    // Обработчики стрелок
    if (tariffsArrowPrev) {
        tariffsArrowPrev.addEventListener('click', () => {
            if (!isTariffTransitioning) {
                const prevIndex = currentTariffSlide > 0 ? currentTariffSlide - 1 : totalTariffSlides - 1;
                goToTariffSlide(prevIndex);
            }
        });
    }

    if (tariffsArrowNext) {
        tariffsArrowNext.addEventListener('click', () => {
            if (!isTariffTransitioning) {
                const nextIndex = currentTariffSlide < totalTariffSlides - 1 ? currentTariffSlide + 1 : 0;
                goToTariffSlide(nextIndex);
            }
        });
    }

    // Свайп функциональность
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;

    function onTariffDragStart(e) {
        if (isTariffTransitioning) return;
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        tariffsFlex.style.transition = 'none';
    }

    function onTariffDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8;
        const totalOffset = currentTariffSlide * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20; // Учитываем padding контейнера
        
        tariffsFlex.style.transform = `translateX(${visualOffset + deltaX}px)`;
    }

    function onTariffDragEnd() {
        if (!isDragging) return;
        tariffsFlex.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                const nextIndex = currentTariffSlide < totalTariffSlides - 1 ? currentTariffSlide + 1 : 0;
                goToTariffSlide(nextIndex);
            } else {
                // Свайп вправо - предыдущий слайд
                const prevIndex = currentTariffSlide > 0 ? currentTariffSlide - 1 : totalTariffSlides - 1;
                goToTariffSlide(prevIndex);
            }
        } else {
            // Возвращаемся к текущему слайду
            goToTariffSlide(currentTariffSlide);
        }
        
        isDragging = false;
        deltaX = 0;
    }

    // Добавляем обработчики событий для свайпов
    tariffsFlex.addEventListener('mousedown', onTariffDragStart);
    tariffsFlex.addEventListener('mousemove', onTariffDragMove);
    tariffsFlex.addEventListener('mouseup', onTariffDragEnd);
    tariffsFlex.addEventListener('mouseleave', onTariffDragEnd);
    tariffsFlex.addEventListener('touchstart', onTariffDragStart);
    tariffsFlex.addEventListener('touchmove', onTariffDragMove);
    tariffsFlex.addEventListener('touchend', onTariffDragEnd);

    // Инициализация
    renderTariffDots();
    updateTariffDots();
    
    // Начинаем со второго тарифа (Standard) и центрируем его
    setTimeout(() => {
        goToTariffSlide(1);
    }, 50);
});
