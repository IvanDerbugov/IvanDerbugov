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
    let currentPage = 0;
    const totalSlides = reviewsCards.length; // 5
    const totalDots = totalSlides - 1; // 4 точки

    function renderDots() {
        reviewsDotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'reviews-dot' + (i === currentPage ? ' active' : '');
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            reviewsDotsContainer.appendChild(dot);
        }
    }

    function goToPage(page) {
        currentPage = page;
        reviewsFlex.style.transform = `translateX(-${page * (796 + 24)}px)`; // 796px ширина + 24px gap
        Array.from(reviewsDotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === page);
        });
    }

    // Swipe logic (по одной карточке)
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;

    function onDragStart(e) {
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        reviewsFlex.style.transition = 'none';
    }

    function onDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        reviewsFlex.style.transform = `translateX(${-currentPage * (796 + 24) + deltaX}px)`;
    }

    function onDragEnd() {
        if (!isDragging) return;
        reviewsFlex.style.transition = '';
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0 && currentPage < totalDots - 1) {
                goToPage(currentPage + 1);
            } else if (deltaX > 0 && currentPage > 0) {
                goToPage(currentPage - 1);
            } else {
                goToPage(currentPage);
            }
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
    goToPage(0);

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
});
