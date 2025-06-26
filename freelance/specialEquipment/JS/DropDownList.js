(function() {
    const toggle = document.getElementById('dropdownToggle');
    const menu = document.getElementById('dropdownMenu');
    const dropdown = document.getElementById('catalogDropdown');
    let hoverTimeout;

    if (!toggle || !menu || !dropdown) return;

    // Открытие/закрытие по клику
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
    });

    // Открытие по наведению
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        menu.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            menu.classList.remove('show');
        }, 100); // небольшая задержка для UX
    });

    // Клик вне меню — закрыть
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            menu.classList.remove('show');
        }
    });

    // Для клавиатуры (доступность)
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.classList.toggle('show');
        }
    });
})();