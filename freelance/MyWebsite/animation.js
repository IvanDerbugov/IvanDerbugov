const canvas = document.getElementById('code-animation');
const ctx = canvas.getContext('2d');

// Устанавливаем размер canvas равным его атрибутам width/height
canvas.width = 400;
canvas.height = 300;

const codeSymbols = ['</>', '{}', '=>', '()', '[]', '&&', '||', 'px'];
const colorPalette = [
    'rgba(7, 158, 123, 0.8)', // Акцентный зеленый
    'rgba(255, 255, 255, 0.8)', // Белый
    'rgba(130, 210, 255, 0.8)', // Светло-голубой
    'rgba(0, 230, 230, 0.8)',   // Бирюзовый/Циан
    'rgba(190, 140, 255, 0.8)'  // Светло-фиолетовый
];
let particles = [];
let targetCoordinates = [];
let animationState = 'chaos'; // Возможные состояния: 'chaos', 'assembling', 'pulsing', 'dispersing'
let pulseFactor = 1;
let pulseDirection = 1;

// --- НОВАЯ ЧАСТЬ: УПРАВЛЕНИЕ ЦИКЛОМ АНИМАЦИИ ---
function animationLoop() {
    switch (animationState) {
        case 'chaos':
            // Через 4 секунды хаоса начинаем сборку
            setTimeout(() => {
                animationState = 'assembling';
            }, 4000);
            break;
        case 'pulsing':
            // Через 3 секунды пульсации начинаем разлет
            setTimeout(() => {
                particles.forEach(p => {
                    // Даем каждой частице новую случайную цель для разлета
                    p.disperseTargetX = Math.random() * canvas.width;
                    p.disperseTargetY = Math.random() * canvas.height;
                });
                animationState = 'dispersing';
            }, 3000);
            break;
        case 'dispersing':
             // Через 3 секунды после начала разлета начинаем новый цикл хаоса
            setTimeout(() => {
                animationState = 'chaos';
                // Запускаем главный цикл снова
                animationLoop();
            }, 3000);
            break;
    }
}

// --- НОВАЯ ЧАСТЬ: ПОЛУЧЕНИЕ КООРДИНАТ ИЗ ТЕКСТА ---
function getTextCoordinates() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Стилизуем наш текст
    tempCtx.fillStyle = '#fff';
    tempCtx.font = 'bold 135px "Trebuchet MS", sans-serif'; // Увеличенный шрифт
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText('И.Д.', canvas.width / 2, canvas.height / 2);

    // Сканируем изображение
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;
    const coordinates = [];

    // Проходим по каждому пикселю. Увеличиваем 'i' на 4, т.к. каждый пиксель это 4 значения (R,G,B,A)
    for (let i = 0; i < data.length; i += 4) {
        // Если пиксель не полностью прозрачный (т.е. является частью текста)
        if (data[i + 3] > 0) {
            const x = (i / 4) % tempCanvas.width;
            const y = Math.floor((i / 4) / tempCanvas.width);
            // Добавляем координаты, только если они находятся в "шахматном порядке" (для разрежения)
            if (x % 4 === 0 && y % 4 === 0) {
                coordinates.push({ x: x, y: y });
            }
        }
    }
    return coordinates;
}

// Перемешиваем массив, чтобы частицы летели в случайные точки фигуры
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

targetCoordinates = shuffle(getTextCoordinates());

// Класс для создания частиц
class Particle {
    constructor(target) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 12;
        this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.targetX = target.x;
        this.targetY = target.y;
        this.disperseTargetX = 0; // Новые цели для разлета
        this.disperseTargetY = 0;
    }

    update() {
        switch (animationState) {
            case 'assembling':
                this.vx += (this.targetX - this.x) * 0.01;
                this.vy += (this.targetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                // Когда частица почти достигла цели, переходим к пульсации
                if (Math.abs(this.x - this.targetX) < 0.5 && Math.abs(this.y - this.targetY) < 0.5) {
                    if (particles.every(p => Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1)) {
                         animationState = 'pulsing';
                    }
                }
                break;
            case 'pulsing':
                // Остаемся на месте цели
                this.x = this.targetX;
                this.y = this.targetY;
                break;
            case 'dispersing':
                 // Движение к точке разлета
                this.vx += (this.disperseTargetX - this.x) * 0.01;
                this.vy += (this.disperseTargetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                break;
            case 'chaos':
            default:
                // Отскок от стен
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                break;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        let x = this.x;
        let y = this.y;

        if (animationState === 'pulsing') {
            // Применяем пульсацию к координатам относительно центра
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            x = centerX + (this.x - centerX) * pulseFactor;
            y = centerY + (this.y - centerY) * pulseFactor;
        }

        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.text, x, y);
    }
}

// Создаем частицы
function init() {
    // Создаем столько частиц, сколько у нас есть целевых точек
    for (let i = 0; i < targetCoordinates.length; i++) {
        particles.push(new Particle(targetCoordinates[i]));
    }
}

// Цикл анимации
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(animationState === 'pulsing') {
        pulseFactor += 0.001 * pulseDirection;
        if (pulseFactor > 1.05 || pulseFactor < 0.95) {
            pulseDirection *= -1;
        }
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();
animationLoop(); // Запускаем первый цикл 