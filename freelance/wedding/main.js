document.addEventListener('DOMContentLoaded', function() {
    const tariffs = document.querySelectorAll('.tariff');
    tariffs.forEach(tariff => {
        tariff.addEventListener('click', function() {
            tariffs.forEach(t => t.classList.remove('tariff-active'));
            this.classList.add('tariff-active');
        });
    });

    // --- Слайдер отзывов для десктопа ---
    const reviewsFlex = document.querySelector('.reviews-flex');
    const reviewsCards = document.querySelectorAll('.reviews-card');
    const reviewsDotsContainer = document.querySelector('.reviews-dots');
    const reviewsArrowPrev = document.querySelector('.reviews-arrow-prev');
    const reviewsArrowNext = document.querySelector('.reviews-arrow-next');

    // --- Бесшовный loop-слайдер для отзывов ---
    // Удаляем старую реализацию (всё, что было до этого для reviewsFlex, reviewsCards, reviewsDotsContainer, currentPage, totalSlides, totalDots, renderDots, goToPage, swipe logic)
    // Оставляем только новую реализацию ниже:
    if (reviewsCards.length > 1) {
        const firstClone = reviewsCards[0].cloneNode(true);
        const lastClone = reviewsCards[reviewsCards.length - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        reviewsFlex.appendChild(firstClone);
        reviewsFlex.insertBefore(lastClone, reviewsCards[0]);
    }
    let allReviewsCards = document.querySelectorAll('.reviews-card');
    let currentPage = 1;
    const totalSlides = allReviewsCards.length - 2;
    const totalDots = totalSlides;
    function renderDots() {
        reviewsDotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'reviews-dot';
            // Добавляем обработчик клика по dot для отзывов
            dot.addEventListener('click', function() {
                goToPage(i + 1); // +1, т.к. первый реальный слайд — индекс 1
            });
            reviewsDotsContainer.appendChild(dot);
        }
    }
    function updateReviewsDots() {
        const dots = reviewsDotsContainer.children;
        let activeIdx = currentPage - 1;
        if (currentPage === 0) activeIdx = totalDots - 1;
        if (currentPage === allReviewsCards.length - 1) activeIdx = 0;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === activeIdx);
        }
    }
    function setReviewsTransition(val) {
        reviewsFlex.style.transition = val;
    }
    function goToPage(page) {
        setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        currentPage = page;
        reviewsFlex.style.transform = `translateX(-${page * (allReviewsCards[0].offsetWidth + 24)}px)`;
        updateReviewsDots();
    }
    reviewsFlex.addEventListener('transitionend', () => {
        if (currentPage === 0) {
            setReviewsTransition('none');
            currentPage = totalDots;
            reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
            updateReviewsDots();
        }
        if (currentPage === allReviewsCards.length - 1) {
            setReviewsTransition('none');
            currentPage = 1;
            reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
            updateReviewsDots();
        }
    });
    if (reviewsArrowPrev) reviewsArrowPrev.addEventListener('click', () => {
        goToPage(currentPage - 1);
    });
    if (reviewsArrowNext) reviewsArrowNext.addEventListener('click', () => {
        goToPage(currentPage + 1);
    });
    // Swipe logic (по одной карточке)
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;
    function onDragStart(e) {
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        setReviewsTransition('none');
    }
    function onDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        reviewsFlex.style.transform = `translateX(${-currentPage * (allReviewsCards[0].offsetWidth + 24) + deltaX}px)`;
    }
    function onDragEnd() {
        setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        if (!isDragging) return;
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) goToPage(currentPage + 1);
            else if (deltaX > 0) goToPage(currentPage - 1);
            else goToPage(currentPage);
        } else {
            goToPage(currentPage);
        }
        isDragging = false;
        deltaX = 0;
    }
    reviewsFlex.addEventListener('mousedown', onDragStart);
    reviewsFlex.addEventListener('mousemove', onDragMove);
    reviewsFlex.addEventListener('mouseup', onDragEnd);
    reviewsFlex.addEventListener('mouseleave', onDragEnd);
    reviewsFlex.addEventListener('touchstart', onDragStart);
    reviewsFlex.addEventListener('touchmove', onDragMove);
    reviewsFlex.addEventListener('touchend', onDragEnd);
    // Инициализация
    renderDots();
    setReviewsTransition('none');
    reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
    updateReviewsDots();

    // --- Модальное окно заявки ---
    const modal = document.getElementById('modalRequest');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const openModalBtn = document.querySelector('header .bottom-header button');
    const modalForm = modal.querySelector('.modal-form');
    const modalSpinner = modal.querySelector('.modal-spinner');
    const modalSuccess = modal.querySelector('.modal-success');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Сброс состояния
        modalForm.style.display = '';
        modalSpinner.style.display = 'none';
        modalSuccess.style.display = 'none';
        modalForm.reset();
    }
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // --- AJAX отправка формы в модалке ---
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        modalForm.style.display = 'none';
        modalSpinner.style.display = 'flex';
        modalSuccess.style.display = 'none';

        const formData = new FormData(modalForm);
        fetch(modalForm.action, {
            method: 'POST',
            body: formData
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(() => {
            modalSpinner.style.display = 'none';
            modalSuccess.style.display = 'flex';
        })
        .catch(() => {
            modalSpinner.style.display = 'none';
            modalSuccess.style.display = 'flex';
            modalSuccess.textContent = 'Произошла ошибка. Попробуйте ещё раз.';
        });
    });

    // Автозапуск первого видео в .works
    const worksFirstVideo = document.getElementById('mainWorkVideo');
    if (worksFirstVideo) {
        worksFirstVideo.muted = true;
        worksFirstVideo.play().catch(() => {});
    }

    // --- Кнопка включения звука на первом видео ---
    const unmuteBtn = document.getElementById('unmuteBtn');
    if (worksFirstVideo && unmuteBtn) {
        unmuteBtn.addEventListener('click', function() {
            worksFirstVideo.muted = false;
            worksFirstVideo.volume = 1;
            worksFirstVideo.play();
            unmuteBtn.classList.add('hidden');
        });
        // Если пользователь сам включил звук через controls
        worksFirstVideo.addEventListener('volumechange', function() {
            if (!worksFirstVideo.muted && worksFirstVideo.volume > 0) {
                unmuteBtn.classList.add('hidden');
            }
        });
    }

    // --- Фиксированная кнопка с таймером (wedding) ---
    (function() {
        const btnWrap = document.querySelector('.fixed-modal-btn-wrap-wedding');
        const timerEl = document.querySelector('.modal-timer-wedding');
        const btn = document.querySelector('.fixed-modal-btn-wedding');
        if (!btnWrap || !timerEl || !btn) return;
        let timeLeft = 10 * 60; // 10 минут в секундах
        function updateTimer() {
            const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const sec = String(timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `${min}:${sec}`;
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                timerEl.style.display = 'none';
                btn.textContent = 'Зафиксировать скидку 10%';
            }
        }
        updateTimer();
        const interval = setInterval(() => {
            updateTimer();
            if (timeLeft < 0) clearInterval(interval);
        }, 1000);
        // Открытие модального окна по клику
        btn.addEventListener('click', function() {
            const modal = document.getElementById('modalRequest');
            if (modal) {
                const modalForm = modal.querySelector('.modal-form');
                if (modalForm) {
                    const submitBtn = modalForm.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.textContent = 'Зафиксировать скидку';
                }
            }
            if (typeof openModal === 'function') {
                openModal();
            } else {
                // fallback: клик по основной кнопке в header
                const openBtn = document.querySelector('header .bottom-header button');
                if (openBtn) openBtn.click();
            }
        });
        // Скрытие кнопки после успешной отправки формы
        const modal = document.getElementById('modalRequest');
        if (modal) {
            const modalForm = modal.querySelector('.modal-form');
            const modalSuccess = modal.querySelector('.modal-success');
            if (modalForm && modalSuccess) {
                const observer = new MutationObserver(() => {
                    if (modalSuccess.style.display !== 'none') {
                        btnWrap.style.display = 'none';
                    }
                });
                observer.observe(modalSuccess, { attributes: true, attributeFilter: ['style'] });
            }
        }
    })();

    // При обычном открытии модалки — возвращаем текст кнопки
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            const modal = document.getElementById('modalRequest');
            if (modal) {
                const modalForm = modal.querySelector('.modal-form');
                if (modalForm) {
                    const submitBtn = modalForm.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.textContent = 'Оставить заявку';
                }
            }
        });
    }

    // --- Модальное окно для скрина отзыва ---
    const reviewModal = document.getElementById('reviewModal');
    const reviewModalImg = document.getElementById('reviewModalImg');
    const reviewModalClose = document.querySelector('.review-modal-close');
    const reviewModalBackdrop = document.querySelector('.review-modal-backdrop');
    // Карта соответствия: номер отзыва -> путь к картинке
    const reviewScreens = {
        1: 'img/reviewScreen1.jpg',
        2: 'img/reviewScreen2.jpg',
        3: 'img/reviewScreen3.jpg',
        4: 'img/reviewScreen4.jpg',
        5: 'img/reviewScreen5.jpg',
    };
    // Присваиваем data-review-index всем .reviews-card (реальным и клонам)
    document.querySelectorAll('.reviews-flex .reviews-card').forEach((card, idx) => {
        // idx по порядку, но для клонов нужно вычислить реальный индекс
        // Считаем, что всего 5 отзывов (можно сделать динамически)
        const realCount = document.querySelectorAll('.reviews-flex .reviews-card:not(.clone)').length;
        let reviewIdx = idx;
        if (card.classList.contains('clone')) {
            // Клон в начале: idx < realCount ? последний : первый
            if (idx < realCount) reviewIdx = realCount;
            else reviewIdx = 1;
        } else {
            reviewIdx = idx + 1;
        }
        card.setAttribute('data-review-index', reviewIdx);
    });
    // Навесим обработчики на все .seeReview (и клоны тоже)
    document.querySelectorAll('.reviews-card .seeReview').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = btn.closest('.reviews-card');
            const num = Number(card.getAttribute('data-review-index'));
            if (reviewModal && reviewModalImg && reviewScreens[num]) {
                reviewModalImg.src = reviewScreens[num];
                reviewModal.classList.add('active');
                reviewModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    function closeReviewModal() {
        if (reviewModal) {
            reviewModal.classList.remove('active');
            reviewModal.style.display = 'none';
            document.body.style.overflow = '';
            if (reviewModalImg) reviewModalImg.src = '';
        }
    }
    if (reviewModalClose) reviewModalClose.addEventListener('click', closeReviewModal);
    if (reviewModalBackdrop) reviewModalBackdrop.addEventListener('click', closeReviewModal);
    // Закрытие по клику вне окна
    if (reviewModal) {
        reviewModal.addEventListener('mousedown', function(e) {
            if (e.target === reviewModal) closeReviewModal();
        });
    }

    // --- Карусель "Примеры работ" ---
    const worksFlex = document.querySelector('.works-flex');
    const worksSlides = document.querySelectorAll('.works-slide');
    const worksDotsContainer = document.querySelector('.works-dots');
    const worksArrowPrev = document.querySelector('.works-arrow-prev');
    const worksArrowNext = document.querySelector('.works-arrow-next');
    // --- Бесшовный loop-слайдер для "Примеры работ" с 3 видимыми слайдами и кусками по краям ---
    // Клонируем первые и последние 2 слайда для seamless loop
    const VISIBLE_WORKS = 3;
    const CLONE_COUNT = VISIBLE_WORKS - 1; // по 2 куска слева и справа
    if (worksSlides.length > 1) {
        // Создаем клоны в правильном порядке для seamless loop
        // Слева должны быть клоны последних 2 слайдов (3, 1)
        // Справа должны быть клоны первых 2 слайдов (2, 3)
        
        // Клоны слева (последние 2 слайда)
        for (let i = 0; i < CLONE_COUNT; i++) {
            const cloneIndex = worksSlides.length - CLONE_COUNT + i; // последние 2 слайда
            const leftClone = worksSlides[cloneIndex].cloneNode(true);
            leftClone.classList.add('clone');
            worksFlex.insertBefore(leftClone, worksSlides[0]);
        }
        
        // Клоны справа (первые 2 слайда)
        for (let i = 0; i < CLONE_COUNT; i++) {
            const rightClone = worksSlides[i].cloneNode(true);
            rightClone.classList.add('clone');
            worksFlex.appendChild(rightClone);
        }
    }
    // Обновляем коллекцию слайдов
    let allWorksSlides = document.querySelectorAll('.works-slide');
    let worksCurrent = CLONE_COUNT + 1; // начинаем со второго реального слайда
    const worksTotal = allWorksSlides.length - 2 * CLONE_COUNT; // без клонов

    function renderWorksDots() {
        worksDotsContainer.innerHTML = '';
        for (let i = 0; i < worksTotal; i++) {
            const dot = document.createElement('span');
            dot.className = 'works-dot';
            dot.addEventListener('click', function() {
                goToWorks(i + CLONE_COUNT); // +CLONE_COUNT, т.к. первый реальный слайд — индекс CLONE_COUNT
            });
            worksDotsContainer.appendChild(dot);
        }
    }
    function updateWorksDots() {
        const dots = worksDotsContainer.children;
        let activeIdx = worksCurrent - CLONE_COUNT;
        if (worksCurrent < CLONE_COUNT) activeIdx = worksTotal - 1;
        if (worksCurrent >= allWorksSlides.length - CLONE_COUNT) activeIdx = 0;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === activeIdx);
        }
    }
    function setWorksTransition(val) {
        worksFlex.style.transition = val;
    }
    function goToWorks(idx) {
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        worksCurrent = idx;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(-${(idx - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
        updateWorksDots();
    }
    // После анимации: если на клоне — мгновенно переключить на реальный
    worksFlex.addEventListener('transitionend', () => {
        if (worksCurrent < CLONE_COUNT) {
            setWorksTransition('none');
            worksCurrent = worksTotal + CLONE_COUNT - 1;
            const slideWidth = allWorksSlides[0].offsetWidth + 24;
            worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
            updateWorksDots();
        }
        if (worksCurrent >= allWorksSlides.length - CLONE_COUNT) {
            setWorksTransition('none');
            worksCurrent = CLONE_COUNT;
            const slideWidth = allWorksSlides[0].offsetWidth + 24;
            worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
            updateWorksDots();
        }
    });
    if (worksArrowPrev) worksArrowPrev.addEventListener('click', () => {
        goToWorks(worksCurrent - 1);
    });
    if (worksArrowNext) worksArrowNext.addEventListener('click', () => {
        goToWorks(worksCurrent + 1);
    });
    // Swipe logic
    let worksStartX = 0;
    let worksDragging = false;
    let worksDeltaX = 0;
    worksFlex.addEventListener('mousedown', e => {
        worksDragging = true;
        worksStartX = e.clientX;
        setWorksTransition('none');
    });
    worksFlex.addEventListener('mousemove', e => {
        if (!worksDragging) return;
        worksDeltaX = e.clientX - worksStartX;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(${-((worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth) + worksDeltaX}px)`;
    });
    worksFlex.addEventListener('mouseup', () => {
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        if (Math.abs(worksDeltaX) > 50) {
            if (worksDeltaX < 0) goToWorks(worksCurrent + 1);
            else if (worksDeltaX > 0) goToWorks(worksCurrent - 1);
            else goToWorks(worksCurrent);
        } else goToWorks(worksCurrent);
        worksDragging = false;
        worksDeltaX = 0;
    });
    worksFlex.addEventListener('mouseleave', () => {
        if (worksDragging) {
            setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
            goToWorks(worksCurrent);
            worksDragging = false;
            worksDeltaX = 0;
        }
    });
    // Touch
    worksFlex.addEventListener('touchstart', e => {
        worksDragging = true;
        worksStartX = e.touches[0].clientX;
        setWorksTransition('none');
    });
    worksFlex.addEventListener('touchmove', e => {
        if (!worksDragging) return;
        worksDeltaX = e.touches[0].clientX - worksStartX;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(${-((worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth) + worksDeltaX}px)`;
    });
    worksFlex.addEventListener('touchend', () => {
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        if (Math.abs(worksDeltaX) > 50) {
            if (worksDeltaX < 0) goToWorks(worksCurrent + 1);
            else if (worksDeltaX > 0) goToWorks(worksCurrent - 1);
            else goToWorks(worksCurrent);
        } else goToWorks(worksCurrent);
        worksDragging = false;
        worksDeltaX = 0;
    });
    // Инициализация
    renderWorksDots();
    setWorksTransition('none');
    const slideWidth = allWorksSlides[0].offsetWidth + 24;
    worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
    updateWorksDots();

    // --- Функциональность кнопок play для видео в works ---
    function setupPlayButtons() {
        const allVideos = document.querySelectorAll('.works-slide video');
        const allPlayBtns = document.querySelectorAll('.works-slide .play-btn');
        
        // Создаем карту соответствия: клон -> оригинал
        const cloneToOriginalMap = new Map();
        const originalToClonesMap = new Map();
        
        // Находим соответствия между клонами и оригиналами
        document.querySelectorAll('.works-slide').forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (slide.classList.contains('clone') && video) {
                // Определяем оригинал по содержимому видео (src)
                const videoSrc = video.src;
                let originalVideo = null;
                
                // Ищем оригинал с тем же src среди не-клонов
                document.querySelectorAll('.works-slide:not(.clone)').forEach(originalSlide => {
                    const origVideo = originalSlide.querySelector('video');
                    if (origVideo && origVideo.src === videoSrc) {
                        originalVideo = origVideo;
                    }
                });
                
                if (originalVideo) {
                    cloneToOriginalMap.set(video, originalVideo);
                    if (!originalToClonesMap.has(originalVideo)) {
                        originalToClonesMap.set(originalVideo, []);
                    }
                    originalToClonesMap.get(originalVideo).push(video);
                }
            }
        });
        
        document.querySelectorAll('.works-slide').forEach(slide => {
            const playBtn = slide.querySelector('.play-btn');
            const video = slide.querySelector('video');
            
            if (playBtn && video) {
                // Показываем кнопку изначально
                playBtn.style.display = 'block';
                playBtn.style.pointerEvents = 'auto';
                
                // Обработчик клика по кнопке play
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Ставим на паузу все остальные видео
                    allVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                            // Также останавливаем связанные клоны/оригиналы
                            const relatedVideos = getRelatedVideos(otherVideo, cloneToOriginalMap, originalToClonesMap);
                            relatedVideos.forEach(relatedVideo => {
                                if (relatedVideo !== otherVideo) {
                                    relatedVideo.pause();
                                }
                            });
                        }
                    });
                    
                    // Показываем кнопки play для всех остальных видео
                    allPlayBtns.forEach(otherBtn => {
                        if (otherBtn !== playBtn) {
                            otherBtn.style.display = 'block';
                        }
                    });
                    
                    // Скрываем текущую кнопку и запускаем видео
                    playBtn.style.display = 'none';
                    
                    // Если это клон, синхронизируем с оригиналом
                    if (slide.classList.contains('clone')) {
                        const originalVideo = cloneToOriginalMap.get(video);
                        if (originalVideo) {
                            // Запускаем оригинал без звука
                            originalVideo.muted = true;
                            originalVideo.currentTime = video.currentTime;
                            originalVideo.play();
                            // Запускаем клон со звуком
                            video.play();
                        } else {
                            video.play();
                        }
                    } else {
                        // Если это оригинал, просто запускаем его (без синхронизации с клонами)
                        video.play();
                    }
                });
                
                // Синхронизация при воспроизведении (только для клонов)
                video.addEventListener('play', function() {
                    playBtn.style.display = 'none';
                    
                    // Синхронизируем связанные видео только если это клон
                    if (slide.classList.contains('clone')) {
                        const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                        relatedVideos.forEach(relatedVideo => {
                            if (relatedVideo !== video && relatedVideo.paused) {
                                relatedVideo.currentTime = video.currentTime;
                                relatedVideo.muted = true;
                                relatedVideo.play();
                            }
                        });
                    }
                });
                
                // Синхронизация при паузе
                video.addEventListener('pause', function() {
                    if (video.currentTime < video.duration) {
                        playBtn.style.display = 'block';
                    }
                    
                    // Останавливаем связанные видео
                    const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                    relatedVideos.forEach(relatedVideo => {
                        if (relatedVideo !== video) {
                            relatedVideo.pause();
                        }
                    });
                });
                
                // Синхронизация при изменении времени (только для клонов)
                video.addEventListener('timeupdate', function() {
                    if (slide.classList.contains('clone')) {
                        const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                        relatedVideos.forEach(relatedVideo => {
                            if (relatedVideo !== video && Math.abs(relatedVideo.currentTime - video.currentTime) > 0.1) {
                                relatedVideo.currentTime = video.currentTime;
                            }
                        });
                    }
                });
                
                // Показываем кнопку при окончании видео
                video.addEventListener('ended', function() {
                    playBtn.style.display = 'block';
                    
                    // Останавливаем связанные видео
                    const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                    relatedVideos.forEach(relatedVideo => {
                        if (relatedVideo !== video) {
                            relatedVideo.pause();
                            relatedVideo.currentTime = 0;
                        }
                    });
                });
            }
        });
        
        // Функция для получения связанных видео (клоны/оригиналы)
        function getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap) {
            const related = [];
            
            // Если это клон, добавляем оригинал
            if (cloneToOriginalMap.has(video)) {
                related.push(cloneToOriginalMap.get(video));
            }
            
            // Если это оригинал, добавляем клоны
            if (originalToClonesMap.has(video)) {
                related.push(...originalToClonesMap.get(video));
            }
            
            return related;
        }
    }
    
    // Инициализируем кнопки play
    setupPlayButtons();
});
