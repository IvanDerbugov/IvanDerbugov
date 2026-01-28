"use strict";

// Функция для генерации случайных параметров движения частицы
function generateParticleMovement() {
    // Случайные смещения для разных точек анимации (в пикселях)
    const moveY1 = (Math.random() - 0.5) * 30; // от -15 до +15px
    const moveX1 = (Math.random() - 0.5) * 20; // от -10 до +10px
    const moveY2 = (Math.random() - 0.5) * 25; // от -12.5 до +12.5px
    const moveX2 = (Math.random() - 0.5) * 18; // от -9 до +9px
    const moveY3 = (Math.random() - 0.5) * 35; // от -17.5 до +17.5px
    const moveX3 = (Math.random() - 0.5) * 22; // от -11 до +11px
    
    // Случайные значения прозрачности
    const opacity1 = 0.4 + Math.random() * 0.3; // от 0.4 до 0.7
    const opacity2 = 0.6 + Math.random() * 0.3; // от 0.6 до 0.9
    const opacity3 = 0.5 + Math.random() * 0.3; // от 0.5 до 0.8
    const opacity4 = 0.55 + Math.random() * 0.3; // от 0.55 до 0.85
    
    // Случайная длительность анимации (от 2 до 4 секунд)
    const duration = 2 + Math.random() * 2;
    
    // Случайная задержка (от 0 до 2 секунд)
    const delay = Math.random() * 2;
    
    return {
        moveY1: moveY1.toFixed(2),
        moveX1: moveX1.toFixed(2),
        moveY2: moveY2.toFixed(2),
        moveX2: moveX2.toFixed(2),
        moveY3: moveY3.toFixed(2),
        moveX3: moveX3.toFixed(2),
        opacity1: opacity1.toFixed(2),
        opacity2: opacity2.toFixed(2),
        opacity3: opacity3.toFixed(2),
        opacity4: opacity4.toFixed(2),
        duration: duration.toFixed(2),
        delay: delay.toFixed(2)
    };
}
