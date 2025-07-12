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

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
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

    // Автозапуск первого видео в .works
    const worksFirstVideo = document.querySelector('.works video');
    if (worksFirstVideo) {
        worksFirstVideo.muted = true;
        worksFirstVideo.play().catch(() => {});
    }
});
