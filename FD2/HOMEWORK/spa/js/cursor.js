// ============================================
// КАСТОМНЫЙ КУРСОР - JavaScript реализация
// ============================================
// Функция отслеживает движение мыши и позиционирует кастомный курсор
//
// Алгоритм работы:
// 1. Проверяем, что это не мобильное устройство (<=768px)
// 2. Находим элемент .custom-cursor в DOM
// 3. Отслеживаем событие mousemove на документе
// 4. Получаем координаты мыши (clientX, clientY)
// 5. Позиционируем курсор с учетом смещения (offset) для точного позиционирования
// 6. Скрываем курсор, когда мышь выходит за пределы окна
// 7. Обрабатываем события blur/focus окна для скрытия при переключении вкладок
//
// Параметры для настройки:
// - mouseX - 28: смещение по X (настройте под ваш дизайн курсора)
// - mouseY - 11: смещение по Y (настройте под ваш дизайн курсора)
// - window.innerWidth <= 768: порог для мобильных устройств
// ============================================

function initCustomCursor() {
    // Проверяем, что это не мобильное устройство
    if (window.innerWidth <= 768) {
        return;
    }

    const cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) {
        return;
    }

    // Смещение для точного позиционирования курсора
    // Настройте под ваш дизайн (стрелка указывает на точку клика)
    const mouseX = 25; // смещение по X
    const mouseY = 13; // смещение по Y

    // Отслеживаем движение мыши
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - mouseX}px`;
        cursor.style.top = `${e.clientY - mouseY}px`;
        cursor.style.opacity = '1';
    });

    // Скрываем курсор, когда мышь выходит за пределы окна
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Показываем курсор, когда мышь возвращается в окно
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Скрываем курсор при переключении вкладок
    window.addEventListener('blur', () => {
        cursor.style.opacity = '0';
    });

    // Показываем курсор при возврате на вкладку
    window.addEventListener('focus', () => {
        cursor.style.opacity = '1';
    });
}

// Инициализируем курсор после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}
