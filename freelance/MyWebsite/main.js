document.addEventListener('DOMContentLoaded', () => {

    // Находим все ссылки в навигации
    const navLinks = document.querySelectorAll('.LinkItem');
    const pages = document.querySelectorAll('.page-content');

    // Функция-обработчик клика
    function handleNavClick(event) {
        const targetPageId = event.currentTarget.dataset.target;
        if (!targetPageId) return;
        
        // Переключение активной ссылки
        navLinks.forEach(link => {
            link.classList.remove('activeLink');
        });
        event.currentTarget.classList.add('activeLink');

        // Переключение видимой страницы
        pages.forEach(page => {
            if (page.id === targetPageId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    // Добавляем слушатель клика на каждую ссылку
    navLinks.forEach(link => {
        // Проверяем, есть ли у кнопки цель, прежде чем вешать обработчик
        if (link.dataset.target) {
            link.addEventListener('click', handleNavClick);
        }
    });

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    if (themeToggle) {
        // Устанавливаем начальное состояние переключателя в соответствии с темой
        // Если light-theme нет, значит тема темная, и он должен быть checked.
        themeToggle.checked = !htmlEl.classList.contains('light-theme');

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                // ПЕРЕКЛЮЧАЕМ НА ТЕМНУЮ ТЕМУ
                htmlEl.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                // ПЕРЕКЛЮЧАЕМ НА СВЕТЛУЮ ТЕМУ
                htmlEl.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- ЛОГИКА ДЛЯ ХОВЕР-ЭФФЕКТА НАВЫКОВ БОЛЬШЕ НЕ НУЖНА ---
    // Весь эффект теперь реализован на чистом CSS
}); 