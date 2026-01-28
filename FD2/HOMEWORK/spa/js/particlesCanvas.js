"use strict";

// Canvas-версия светлячков для оптимизации производительности
function initParticlesCanvas() {
    const container = document.querySelector('.magical-particles');
    if (!container) return;

    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '3';
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let containerRect = null;

    // Класс частицы
    class Particle {
        constructor() {
            this.reset();
            // Случайная задержка для разнообразия
            this.delay = Math.random() * 2;
            this.time = -this.delay;
        }

        reset() {
            // Случайное позиционирование от top: 0%, left: 0% до top: 25%, left: 99%
            this.x = Math.random() * 100; // процент от ширины
            this.y = Math.random() * 25; // процент от высоты (верхняя часть)
            
            // Случайные параметры движения
            this.moveY1 = (Math.random() - 0.5) * 30;
            this.moveX1 = (Math.random() - 0.5) * 20;
            this.moveY2 = (Math.random() - 0.5) * 25;
            this.moveX2 = (Math.random() - 0.5) * 18;
            this.moveY3 = (Math.random() - 0.5) * 35;
            this.moveX3 = (Math.random() - 0.5) * 22;
            
            // Случайные значения прозрачности
            this.opacity1 = 0.4 + Math.random() * 0.3;
            this.opacity2 = 0.6 + Math.random() * 0.3;
            this.opacity3 = 0.5 + Math.random() * 0.3;
            this.opacity4 = 0.55 + Math.random() * 0.3;
            
            // Случайная длительность анимации (от 2 до 4 секунд)
            this.duration = 2 + Math.random() * 2;
            
            this.time = -this.delay;
        }

        update(deltaTime) {
            this.time += deltaTime;
            
            // Если анимация закончилась, перезапускаем
            if (this.time >= this.duration) {
                this.reset();
            }
        }

        draw(ctx, width, height) {
            if (this.time < 0) return; // Еще не началась анимация
            
            const progress = this.time / this.duration;
            let x = 0, y = 0, opacity = this.opacity1;

            // Вычисляем позицию и прозрачность в зависимости от прогресса анимации
            if (progress <= 0.25) {
                // 0% -> 25%
                const t = progress / 0.25;
                x = this.moveX1 * t;
                y = this.moveY1 * t;
                opacity = this.opacity1 + (this.opacity2 - this.opacity1) * t;
            } else if (progress <= 0.5) {
                // 25% -> 50%
                const t = (progress - 0.25) / 0.25;
                x = this.moveX1 + (this.moveX2 - this.moveX1) * t;
                y = this.moveY1 + (this.moveY2 - this.moveY1) * t;
                opacity = this.opacity2 + (this.opacity3 - this.opacity2) * t;
            } else if (progress <= 0.75) {
                // 50% -> 75%
                const t = (progress - 0.5) / 0.25;
                x = this.moveX2 + (this.moveX3 - this.moveX2) * t;
                y = this.moveY2 + (this.moveY3 - this.moveY2) * t;
                opacity = this.opacity3 + (this.opacity4 - this.opacity3) * t;
            } else {
                // 75% -> 100%
                const t = (progress - 0.75) / 0.25;
                x = this.moveX3 * (1 - t);
                y = this.moveY3 * (1 - t);
                opacity = this.opacity4 + (this.opacity1 - this.opacity4) * t;
            }

            // Конвертируем проценты в пиксели
            const pixelX = (this.x / 100) * width + x;
            const pixelY = (this.y / 100) * height + y;

            // Рисуем частицу с градиентом и тенью
            ctx.save();
            ctx.globalAlpha = opacity;
            
            // Создаем радиальный градиент (как в оригинальном CSS)
            const gradient = ctx.createRadialGradient(
                pixelX, pixelY, 0,           // центр градиента
                pixelX, pixelY, 3            // радиус градиента (3px = половина от 6px)
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');      // белый центр
            gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.6)');   // светло-голубой
            gradient.addColorStop(1, 'transparent');                   // прозрачный край
            
            // Настройки тени (box-shadow эффект)
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(173, 216, 230, 0.8)';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pixelX, pixelY, 3, 0, Math.PI * 2); // радиус 3px = диаметр 6px
            ctx.fill();
            ctx.restore();
        }
    }

    // Инициализация canvas и частиц
    function initCanvas() {
        containerRect = container.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
        
        // Создаем 1000 частиц
        particles = Array.from({ length: 1000 }, () => new Particle());
        
        container.appendChild(canvas);
    }

    // Анимация
    let lastTime = 0;
    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = (currentTime - lastTime) / 1000; // в секундах
        lastTime = currentTime;

        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Обновляем и рисуем все частицы
        particles.forEach(particle => {
            particle.update(deltaTime);
            particle.draw(ctx, canvas.width, canvas.height);
        });

        animationId = requestAnimationFrame(animate);
    }

    // Обработка изменения размера
    function handleResize() {
        containerRect = container.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
    }

    // Инициализация
    initCanvas();
    animationId = requestAnimationFrame(animate);

    // Обработка изменения размера окна
    window.addEventListener('resize', handleResize);

    // Остановка анимации при скрытии страницы
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            if (!animationId) {
                lastTime = 0;
                animationId = requestAnimationFrame(animate);
            }
        }
    });
    
    // Возвращаем функцию очистки для возможности остановки анимации
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        window.removeEventListener('resize', handleResize);
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    };
}
