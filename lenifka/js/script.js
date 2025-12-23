// Массив названий месяцев
const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

// Функция для извлечения даты и времени из имени файла и форматирования
function extractDateFromFilename(filename) {
    // Ищем паттерн даты и времени YYYY-MM-DD_HH-MM-SS в имени файла
    const fullMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})/);
    const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
    
    if (!dateMatch) return null;
    
    const year = parseInt(dateMatch[1]);
    const month = parseInt(dateMatch[2]) - 1; // месяцы в JS начинаются с 0
    const day = parseInt(dateMatch[3]);
    
    let date, formatted;
    
    // Если есть полная информация о времени
    if (fullMatch) {
        const hour = parseInt(fullMatch[4]);
        const minute = parseInt(fullMatch[5]);
        const second = parseInt(fullMatch[6]);
        date = new Date(year, month, day, hour, minute, second);
        formatted = `${day} ${months[month]} ${year}`;
    } else {
        // Только дата
        date = new Date(year, month, day);
        formatted = `${day} ${months[month]} ${year}`;
    }
    
    return {
        date: date,
        formatted: formatted
    };
}

// Массив всех фотографий
const allPhotos = [
    'img/photo_1_2025-12-23_23-06-08.jpg',
    'img/photo_2_2025-12-23_23-06-08.jpg',
    'img/photo_3_2025-12-23_23-06-08.jpg',
    'img/photo_4_2025-12-23_23-06-08.jpg',
    'img/photo_5_2025-12-23_23-06-08.jpg',
    'img/photo_6_2025-12-23_23-06-08.jpg',
    'img/photo_7_2025-12-23_23-06-08.jpg',
    'img/photo_8_2025-12-23_23-06-08.jpg',
    'img/photo_9_2025-12-23_23-06-08.jpg',
    'img/photo_10_2025-12-23_23-06-08.jpg',
    'img/photo_11_2025-12-23_23-06-08.jpg',
    'img/photo_12_2025-12-23_23-06-08.jpg',
    'img/photo_13_2025-12-23_23-06-08.jpg',
    'img/photo_2025-12-23_22-38-53.jpg',
    'img/photo_2025-12-23_22-38-57.jpg',
    'img/photo_2025-12-23_22-38-59.jpg',
    'img/photo_2025-12-23_22-39-01.jpg',
    'img/photo_2025-12-23_22-39-02.jpg'
];

// Массив подписей (можно настроить индивидуально)
const captions = [
    'Наши прекрасные моменты ✨',
    'Каждое воспоминание дорого 💕',
    'Вместе мы создаём историю 🌟',
    'Любовь в каждом кадре ❤️',
    'Счастье в простых моментах 🎄',
    'Время остановилось ⏰',
    'Улыбки, которые согревают ☀️',
    'Дни, которые мы помним 🌈',
    'Мгновения счастья 🎈',
    'Наша история продолжается 📖',
    'Кадр за кадром 📸',
    'Эмоции, которые остаются 💫',
    'Вместе навсегда 💍',
    'Лучшие моменты жизни 🌟',
    'Новогоднее чудо 🎁',
    'Сердца бьются в унисон 💓',
    'Каждый день - подарок 🎀',
    'Счастье рядом с тобой 🌺'
];

// Создаём массив фотографий с датами
let photos = allPhotos.map((src, index) => {
    const dateInfo = extractDateFromFilename(src);
    const caption = captions[index % captions.length];
    
    let dateString = '';
    if (dateInfo) {
        const date = dateInfo.date;
        // Форматируем дату
        dateString = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        
        // Если есть информация о времени, добавляем её
        const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0;
        if (hasTime) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            dateString += `, ${hours}:${minutes}`;
        }
    }
    
    return {
        src: src,
        caption: caption,
        date: dateInfo ? dateInfo.date : new Date(),
        dateString: dateString,
        fullCaption: dateString ? `${caption}\n${dateString}` : caption
    };
});

// Сортируем по дате и времени: новые сверху (по убыванию)
photos.sort((a, b) => {
    // Сравниваем по полной дате и времени (новые сверху)
    const dateDiff = b.date.getTime() - a.date.getTime();
    if (dateDiff !== 0) return dateDiff;
    
    // Если дата и время одинаковые, сортируем по имени файла (для порядка)
    return b.src.localeCompare(a.src);
});

// Текущий индекс для lightbox
let currentPhotoIndex = 0;

// Функция для генерации случайного поворота
function getRandomRotation() {
    return (Math.random() - 0.5) * 16; // От -8 до +8 градусов
}

// Создание галереи
function createGallery() {
    const gallery = document.getElementById('gallery');
    
    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.animationDelay = `${index * 0.1}s`;
        
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        const rotation = getRandomRotation();
        polaroid.style.transform = `rotate(${rotation}deg)`;
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.className = 'photo-image';
        img.loading = 'lazy';
        
        const caption = document.createElement('p');
        caption.className = 'photo-caption';
        // Добавляем дату в подпись
        if (photo.dateString) {
            caption.innerHTML = `${photo.caption}<br><span style="font-size: 0.85em; opacity: 0.8;">${photo.dateString}</span>`;
        } else {
            caption.textContent = photo.caption;
        }
        
        polaroid.appendChild(img);
        polaroid.appendChild(caption);
        photoItem.appendChild(polaroid);
        
        // Обработчик клика для открытия lightbox
        photoItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        gallery.appendChild(photoItem);
        
        // Анимация появления при загрузке
        setTimeout(() => {
            photoItem.classList.add('visible');
        }, index * 100);
    });
}

// Открытие lightbox
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImage.src = photos[index].src;
    // В lightbox показываем полную подпись с датой
    if (photos[index].dateString) {
        lightboxCaption.innerHTML = `${photos[index].caption}<br><span style="font-size: 0.9em; opacity: 0.9; margin-top: 10px; display: block;">${photos[index].dateString}</span>`;
    } else {
        lightboxCaption.textContent = photos[index].caption;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Переключение фотографий в lightbox
function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxImage();
}

function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = photos[currentPhotoIndex].src;
        // В lightbox показываем полную подпись с датой
        if (photos[currentPhotoIndex].dateString) {
            lightboxCaption.innerHTML = `${photos[currentPhotoIndex].caption}<br><span style="font-size: 0.9em; opacity: 0.9; margin-top: 10px; display: block;">${photos[currentPhotoIndex].dateString}</span>`;
        } else {
            lightboxCaption.textContent = photos[currentPhotoIndex].caption;
        }
        lightboxImage.style.opacity = '1';
    }, 150);
}

// Анимация при скролле (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        observer.observe(item);
    });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    createGallery();
    initScrollAnimations();
    
    // Lightbox элементы
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightbox = document.getElementById('lightbox');
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextPhoto();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevPhoto();
    });
    
    // Закрытие по клику на фон
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Навигация клавиатурой
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        }
    });
    
    // Плавная прокрутка для лучшего UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Добавление эффекта параллакса для заголовка при скролле
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
    header.style.opacity = 1 - scrolled / 300;
});

// Скрипт для генерации сердечек, следующих за мышкой
(function() {
    'use strict';

    // Массив для хранения сердечек
    const hearts = [];
    let lastTime = 0;

    // Массив цветов для сердечек
    const heartColors = [
        '#ff1744', // красный
        '#e91e63', // розовый
        '#f06292', // светло-розовый
        '#ec407a', // розовый
        '#ff4081', // ярко-розовый
        '#c2185b', // темно-розовый
        '#ad1457', // малиновый
        '#f50057', // пурпурно-розовый
        '#ff6ec7', // светло-розовый
        '#ff1493'  // глубокий розовый
    ];

    // Создаём контейнер для сердечек
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);

    // Функция создания SVG сердечка
    function createHeartSVG(size, color) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.style.cssText = `
            position: absolute;
            pointer-events: none;
            filter: drop-shadow(0 0 4px ${color});
        `;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // SVG путь для сердечка
        path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
        path.setAttribute('fill', color);
        svg.appendChild(path);

        return svg;
    }

    // Функция создания сердечка
    function createHeart(x, y) {
        const now = Date.now();
        
        // Создаём сердечко каждые 50ms (чаще чем в оригинале для большего количества)
        if (now - lastTime < 50) return;
        
        lastTime = now;

        // Создаем несколько сердечек за раз
        const heartCount = Math.floor(Math.random() * 3) + 2; // от 2 до 4 сердечек
        
        for (let i = 0; i < heartCount; i++) {
            const heart = {
                id: now + i,
                x: x,
                y: y,
                size: Math.random() * 8 + 8, // Размер от 8 до 16 (мелкие)
                offsetX: (Math.random() - 0.5) * 50, // Смещение по X
                offsetY: (Math.random() - 0.5) * 50, // Смещение по Y
                rotation: (Math.random() - 0.5) * 60, // Поворот от -30 до 30 градусов
                opacity: 0.8,
                scale: 1,
                element: null
            };

            // Случайный цвет из массива
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];

            // Создаём DOM элемент
            const heartElement = document.createElement('div');
            heartElement.style.cssText = `
                position: absolute;
                left: ${x - heart.size / 2 + heart.offsetX}px;
                top: ${y - heart.size / 2 + heart.offsetY}px;
                transform: rotate(${heart.rotation}deg) scale(${heart.scale});
                opacity: ${heart.opacity};
                transition: all 1s ease-out;
            `;

            const svg = createHeartSVG(heart.size, color);
            heartElement.appendChild(svg);
            container.appendChild(heartElement);

            heart.element = heartElement;
            hearts.push(heart);

            // Анимация исчезновения
            requestAnimationFrame(() => {
                heartElement.style.cssText = `
                    position: absolute;
                    left: ${x - heart.size / 2 + heart.offsetX}px;
                    top: ${y - heart.size / 2 + heart.offsetY - 40}px;
                    transform: rotate(${heart.rotation + (Math.random() - 0.5) * 40}deg) scale(0.5);
                    opacity: 0;
                    transition: all 1s ease-out;
                `;
            });

            // Удаляем сердечко через 1 секунду
            setTimeout(() => {
                if (heartElement.parentNode) {
                    heartElement.parentNode.removeChild(heartElement);
                }
                const index = hearts.findIndex(h => h.id === heart.id);
                if (index > -1) {
                    hearts.splice(index, 1);
                }
            }, 1000);
        }
    }

    // Обработчик движения мыши
    function handleMouseMove(e) {
        createHeart(e.clientX, e.clientY);
    }

    // Обработчик для touch устройств
    function handleTouchMove(e) {
        if (e.touches.length > 0) {
            createHeart(e.touches[0].clientX, e.touches[0].clientY);
        }
    }

    // Добавляем обработчики событий
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
})();

