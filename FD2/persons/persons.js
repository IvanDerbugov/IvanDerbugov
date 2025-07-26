function Dog(name, color) {
    this.name = name;
    this.color = color;
}

const dog1 = new Dog('Rex', 'чёрный');
const dog2 = new Dog('Barsik', 'белый');
const dog3 = new Dog('Sharik', 'коричневый');
const dog4 = new Dog('Tuzik', 'серый');
const dog5 = new Dog('Bobik', 'красный');

let dogs = [dog1, dog2, dog3, dog4, dog5];

let quantityDogs = dogs.length;

// Функция для получения цвета градиента по названию цвета
function getDogGradient(color) {
    const gradients = {
        'чёрный': {
            start: '#2F2F2F',
            end: '#000000',
            stroke: '#1a1a1a'
        },
        'белый': {
            start: '#FFFFFF',
            end: '#F5F5F5',
            stroke: '#ccc'
        },
        'коричневый': {
            start: '#8B4513',
            end: '#A0522D',
            stroke: '#654321'
        },
        'серый': {
            start: '#808080',
            end: '#696969',
            stroke: '#555'
        },
        'красный': {
            start: '#DC143C',
            end: '#B22222',
            stroke: '#8B0000'
        },
        'синий': {
            start: '#0000FF',
            end: '#00008B',
            stroke: '#00008B'
        }
    };
    return gradients[color];
}

// Функция для создания SVG собаки
function createDogSVG(color) {
    const gradient = getDogGradient(color);
    return `
        <svg class="dog-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="100" height="80">
            <defs>
                <linearGradient id="dogGradient-${color}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${gradient.start};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${gradient.end};stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Тело -->
            <ellipse cx="50" cy="45" rx="25" ry="18" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            
            <!-- Голова -->
            <circle cx="70" cy="35" r="15" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            
            <!-- Уши -->
            <ellipse cx="75" cy="20" rx="5" ry="8" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            <ellipse cx="65" cy="20" rx="5" ry="8" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            
            <!-- Нос -->
            <ellipse cx="80" cy="35" rx="3" ry="2" fill="#333"/>
            
            <!-- Глаза -->
            <circle cx="75" cy="30" r="2" fill="#fff"/>
            <circle cx="65" cy="30" r="2" fill="#fff"/>
            <circle cx="75.5" cy="30" r="0.8" fill="#000"/>
            <circle cx="65.5" cy="30" r="0.8" fill="#000"/>
            
            <!-- Лапы -->
            <ellipse cx="30" cy="60" rx="4" ry="8" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            <ellipse cx="45" cy="60" rx="4" ry="8" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            <ellipse cx="60" cy="60" rx="4" ry="8" fill="url(#dogGradient-${color})" stroke="${gradient.stroke}" stroke-width="2"/>
            
            <!-- Хвост -->
            <path d="M 25 40 Q 15 30 10 20 Q 8 15 12 12" stroke="url(#dogGradient-${color})" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>
    `;
}

// Функция для отображения всех собак
function displayAllDogs() {
    const container = document.querySelector('.residensFerm');
    
    // Очищаем существующие собаки (кроме заголовка)
    const existingDogs = container.querySelectorAll('.dog');
    existingDogs.forEach(dog => dog.remove());
    
    // Создаем контейнер для собак
    const dogsContainer = document.createElement('div');
    dogsContainer.className = 'dogs-container';
    
    // Создаем HTML для каждой собаки
    dogs.forEach((dog, index) => {
        const dogDiv = document.createElement('div');
        dogDiv.className = `dog dog${index + 1}`;
        
        const nameP = document.createElement('p');
        nameP.className = 'dogName';
        nameP.textContent = dog.name;
        
        dogDiv.innerHTML = nameP.outerHTML + createDogSVG(dog.color);
        dogsContainer.appendChild(dogDiv);
    });
    
    container.appendChild(dogsContainer);
    
    // Добавляем стили для новых собак
    addAnimationStyles();
}

// Функция для добавления стилей анимации для новых собак
function addAnimationStyles() {
    const styleId = 'dog-animation-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }
    
    let css = '';
    dogs.forEach((dog, index) => {
        css += `.dog${index + 1} { animation-delay: ${index}s; }\n`;
        css += `.dog${index + 1} .dog-svg { animation-delay: ${index}s; }\n`;
    });
    
    styleElement.textContent = css;
}

// Обновляем количество собак
const whayManyDogs = document.getElementById('whayManyDogs');
whayManyDogs.textContent = quantityDogs;

// Функция для воспроизведения звука гавканья
function playBarkSound() {
    // Создаем аудио контекст для генерации звука
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Создаем осциллятор для генерации звука
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Подключаем узлы
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Настраиваем звук гавканья
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Высокий тон
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1); // Снижение тона
    
    // Настраиваем громкость
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Негромкий звук
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2); // Затухание
    
    // Воспроизводим звук
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Добавляем обработчик для кнопки добавления собаки
const addDog = document.getElementById('addDog');
addDog.addEventListener('click', function() {
    const newDog = new Dog(prompt('Введите имя собаки'), prompt('Введите цвет собаки (чёрный, белый, коричневый, серый, красный или синий)'));
    if (newDog.color != 'чёрный' && newDog.color != 'белый' && newDog.color != 'коричневый' && newDog.color != 'серый' && newDog.color != 'красный' && newDog.color != 'синий') {
        alert('Такого цвета нет, собака будет черного цвета');
        newDog.color = 'чёрный';
    }
    dogs.unshift(newDog);
    quantityDogs = dogs.length;
    whayManyDogs.textContent = quantityDogs;
    
    // Воспроизводим звук гавканья
    playBarkSound();
    
    // Перерисовываем всех собак
    displayAllDogs();
    
    // Проверяем условие победы (только когда количество достигает 10)
    console.log(quantityDogs);
    if (quantityDogs === 10) {
        setTimeout(() => {
            const win = document.querySelector('.win');
            if (win) {
                win.style.display = 'flex';
            }
        }, 1500);
    }
});

// Добавляем обработчик для кнопки следующего уровня
const nextLevel = document.getElementById('nextLevel');
if (nextLevel) {
    nextLevel.addEventListener('click', function() {
        const win = document.querySelector('.win');
        if (win) {
            win.style.display = 'none';
        }
        alert('Следующий уровень будет позже');
    });
}

// Отображаем всех собак при загрузке страницы
document.addEventListener('DOMContentLoaded', displayAllDogs);