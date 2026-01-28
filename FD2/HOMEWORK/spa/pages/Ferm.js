const renderFerm = () => {
    // Функция для генерации случайных параметров движения частицы
    const generateParticleMovement = () => {
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
    };

    return `
    <section class="ferm-location container">
        <div class="magical-meadow">
            <div class="meadow-background">
                <div class="magical-particles">
                    ${Array.from({ length: 100 }, (_, i) => {
                        // Случайное распределение от top: 4%, left: 4% до top: 24%, left: 97%
                        const top = 4 + Math.random() * 20; // от 4% до 24%
                        const left = 4 + Math.random() * 93; // от 4% до 97%
                        
                        // Генерируем уникальные параметры движения для каждой частицы
                        const movement = generateParticleMovement();
                        
                        return `<div class="particle" style="
                            --index: ${i}; 
                            --top: ${top}%; 
                            --left: ${left}%;
                            --move-y1: ${movement.moveY1}px;
                            --move-x1: ${movement.moveX1}px;
                            --move-y2: ${movement.moveY2}px;
                            --move-x2: ${movement.moveX2}px;
                            --move-y3: ${movement.moveY3}px;
                            --move-x3: ${movement.moveX3}px;
                            --opacity1: ${movement.opacity1};
                            --opacity2: ${movement.opacity2};
                            --opacity3: ${movement.opacity3};
                            --opacity4: ${movement.opacity4};
                            --duration: ${movement.duration}s;
                            --delay: ${movement.delay}s;
                        "></div>`;
                    }).join('')}
                </div>
            </div>
            <div class="mutants-area" id="mutantsArea">
                <!-- Здесь будут ходить мутанты -->
            </div>
        </div>
    </section>
    `
}