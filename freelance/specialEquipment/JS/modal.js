// modal.js

document.addEventListener('DOMContentLoaded', function () {
    // Создаём контейнер для кнопки и таймера
    const modalBtnWrap = document.createElement('div');
    modalBtnWrap.className = 'fixed-modal-btn-wrap';

    // Таймер
    const timer = document.createElement('div');
    timer.className = 'modal-timer';
    timer.textContent = '05:00';
    modalBtnWrap.appendChild(timer);

    // Кнопка
    const btn = document.createElement('button');
    btn.className = 'fixed-modal-btn';
    btn.type = 'button';
    btn.textContent = 'Зафиксировать скидку 15%';
    modalBtnWrap.appendChild(btn);

    document.body.appendChild(modalBtnWrap);

    // Таймер логика
    let timeLeft = 5 * 60; // 5 минут в секундах
    function updateTimer() {
        const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const sec = String(timeLeft % 60).padStart(2, '0');
        timer.textContent = `${min}:${sec}`;
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timer.style.display = 'none';
            btn.textContent = 'Зафиксировать скидку в 10%';
        }
    }
    updateTimer();
    const interval = setInterval(() => {
        updateTimer();
        if (timeLeft < 0) clearInterval(interval);
    }, 1000);

    // --- Модальное окно ---
    // Создаём затемнение
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none';

    // Модальное окно
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal-window';
    modalWindow.innerHTML = `
        <button class="modal-close" title="Закрыть">&times;</button>
        <h2>Оставьте свои контакты и зафиксируйте свою скидку</h2>
        <form class="modal-form">
            <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
            <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
            <button type="submit" class="modal-submit">Зафиксировать скидку</button>
        </form>
        <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Скидка зафиксирована!</div>
    `;
    modalOverlay.appendChild(modalWindow);
    document.body.appendChild(modalOverlay);

    // Открытие модального окна
    btn.addEventListener('click', function () {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    // Закрытие по крестику
    modalWindow.querySelector('.modal-close').addEventListener('click', function () {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });
    // Закрытие по клику вне окна
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    // Обработка формы
    const form = modalWindow.querySelector('.modal-form');
    const success = modalWindow.querySelector('.modal-success');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.style.display = 'none';
        success.style.display = 'block';
        // Скрыть модалку и кнопку через 2 секунды
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
            modalBtnWrap.style.display = 'none';
        }, 2000);
    });

    // Открытие модального окна по всем кнопкам с классом .open-modal-btn
    document.querySelectorAll('.open-modal-btn').forEach(function(el) {
        el.addEventListener('click', function(e) {
            // Для <a> отменяем переход по ссылке
            if (el.tagName === 'A') e.preventDefault();
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
}); 