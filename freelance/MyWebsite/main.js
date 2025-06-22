document.addEventListener('DOMContentLoaded', () => {

    // Находим все ссылки в навигации
    const navLinks = document.querySelectorAll('.LinkItem');
    const pages = document.querySelectorAll('.page-content');

    // Функция-обработчик клика
    function handleNavClick(event) {
        const targetPageId = event.currentTarget.dataset.target;
        
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

    // --- ЛОГИКА ДЛЯ ХОВЕР-ЭФФЕКТА НАВЫКОВ БОЛЬШЕ НЕ НУЖНА ---
    // Весь эффект теперь реализован на чистом CSS
}); 