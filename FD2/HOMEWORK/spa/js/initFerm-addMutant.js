"use strict";

import { renderMutant1 } from '../moduls/mutant1.js';
import { renderMutant2 } from '../moduls/mutant2.js';
import { renderBacteria } from '../moduls/bacteria.js';
import { Mutant } from '../moduls/Mutant.js';

// Функция создания одного элемента мутанта на ферме
// withAnimation - true только при покупке нового мутанта, false при загрузке страницы
function createMutantOnFerm(mutantId, withAnimation = false) {
    const mutantsArea = document.getElementById('mutantsArea');
    if (!mutantsArea) return; // Если страница еще не загружена
    
    // Создаем контейнер для мутанта
    const mutantElement = document.createElement('div');
    mutantElement.className = 'mutant-on-ferm';
    mutantElement.dataset.mutantId = mutantId;
    
    // Генерируем уникальный ID для мутанта
    const uniqueId = `mutant-${mutantId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    mutantElement.id = uniqueId;
    
    // Контейнеру устанавливаем нулевые размеры
    mutantElement.style.width = '0';
    mutantElement.style.height = '0';
    mutantElement.style.position = 'relative';
    
    // Случайное позиционирование через transform: translate с использованием vw/vh
    // Используем vw/vh для позиционирования относительно viewport, а не размера элемента
    // Распределяем по 80% ширины и высоты viewport с отступом 10% с каждой стороны
    const finalX = Math.random() * 80; // от 0vw до 80vw
    const finalY = Math.random() * 27; // от 0vh до 27vh
    
    // Создаем изображение в зависимости от типа мутанта через switch case
    let contentElement = null; // Элемент, к которому будет применяться transform
    let mutantInstance = null;

    switch (mutantId) {
        case 'Bacteria':
            mutantInstance = new Mutant({
                type: 'Bacteria',
                attributes: {
                    'viewBox': '0 0 512.001 512.001',
                    'width': '100px',
                    'height': '100px',
                    'data-mutant-type': 'Bacteria'
                },
                innerHTML: renderBacteria()
            });
            break;
            
        case 'Mutant1':
            mutantInstance = new Mutant({
                type: 'Mutant1',
                canWalk: false,
                attributes: {
                    'viewBox': '0 0 512 512',
                    'width': '100px',
                    'height': '100px',
                    'data-mutant-type': 'Mutant1'
                },
                innerHTML: renderMutant1()
            });
            break;
            
        case 'Mutant2':
            mutantInstance = new Mutant({
                type: 'Mutant2',
                attributes: {
                    'viewBox': '0 0 300 282',
                    'width': '200px',
                    'height': '188px',
                    'x': '0px',
                    'y': '0px',
                    'data-mutant-type': 'Mutant2'
                },
                innerHTML: renderMutant2()
            });
            break;
            
        case 'Mutant3':
            // Для будущего mutant3
            break;
            
        default:
            console.warn(`Unknown mutant type: ${mutantId}`);
            return;
    }

    if (mutantInstance) {
        contentElement = mutantInstance.render();
        mutantElement.appendChild(contentElement);
    }
    
    // Применяем transform к элементу контента (img или svg)
    if (contentElement) {
        // Отдельный слой для каждого мутанта (оптимизация производительности)
        contentElement.style.willChange = 'transform';
        
        // Сохраняем текущие координаты для траекторий
        contentElement.dataset.currentX = String(finalX);
        contentElement.dataset.currentY = String(finalY);

        // Если это новая покупка - добавляем анимацию падения
        if (withAnimation) {
            // Начальная позиция - выше экрана на 60vh от исходной позиции
            const startY = finalY - 60;
            contentElement.style.transform = `translate(${finalX}vw, ${startY}vh) translateZ(0)`;
            contentElement.style.transition = 'transform 1s ease-out';
            
            mutantsArea.appendChild(mutantElement);
            
            const startMovementAfterFall = () => {
                contentElement.removeEventListener('transitionend', startMovementAfterFall);
                contentElement.dataset.currentX = String(finalX);
                contentElement.dataset.currentY = String(finalY);
                startRandomMovement(contentElement);
            };
            contentElement.addEventListener('transitionend', startMovementAfterFall);
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    contentElement.style.transform = `translate(${finalX}vw, ${finalY}vh) translateZ(0)`;
                });
            });
        } else {
            // При загрузке страницы - сразу на место без анимации
            contentElement.style.transform = `translate(${finalX}vw, ${finalY}vh) translateZ(0)`;
            mutantsArea.appendChild(mutantElement);
        }
    }
    
    // Инициализируем движение зрачков для Mutant1, Mutant2 и Mutant3
    if (mutantId === 'Mutant1' || mutantId === 'Mutant2' || mutantId === 'Mutant3') {
        setTimeout(() => {
            initMutantEyeOnFerm(uniqueId, mutantId);
        }, 100);
    }

    // Инициализируем Drag and Drop для нового мутанта
    setTimeout(() => {
        initDragAndDrop();
    }, 150);
}

// Границы поля для движения мутантов (vw, vh) - соответствуют начальному позиционированию
const MOVEMENT_BOUNDS = { minX: 0, maxX: 80, minY: 0, maxY: 27 };

// Генерация случайной целевой точки в пределах поля
function getRandomTarget() {
    return {
        x: MOVEMENT_BOUNDS.minX + Math.random() * (MOVEMENT_BOUNDS.maxX - MOVEMENT_BOUNDS.minX),
        y: MOVEMENT_BOUNDS.minY + Math.random() * (MOVEMENT_BOUNDS.maxY - MOVEMENT_BOUNDS.minY)
    };
}

// Запуск движения по случайной траектории для одного мутанта
function startRandomMovement(contentElement) {
    if (!contentElement) return;

    // Проверяем, может ли мутант ходить
    if (contentElement.dataset.canWalk === 'false') return;

    const currentX = parseFloat(contentElement.dataset.currentX) || 50;
    const currentY = parseFloat(contentElement.dataset.currentY) || 50;

    const target = getRandomTarget();

    contentElement.dataset.currentX = target.x;
    contentElement.dataset.currentY = target.y;

    // Случайная длительность перехода (2–6 сек)
    const duration = 2 + Math.random() * 4;
    contentElement.style.transition = `transform ${duration}s linear`;
    contentElement.style.transform = `translate(${target.x}vw, ${target.y}vh) translateZ(0)`;

    const onTransitionEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        contentElement.removeEventListener('transitionend', onTransitionEnd);
        startRandomMovement(contentElement);
    };

    contentElement.addEventListener('transitionend', onTransitionEnd);
}

// Запуск случайного движения для всех мутантов на ферме
function startAllMutantsMovement() {
    const mutantsArea = document.getElementById('mutantsArea');
    if (!mutantsArea) return;

    const mutants = mutantsArea.querySelectorAll('.mutant-on-ferm');
    mutants.forEach(mutant => {
        const contentElement = mutant.querySelector('img, svg[data-mutant-type]');
        if (!contentElement) return;

        // Проверяем, может ли мутант ходить
        if (contentElement.dataset.canWalk === 'false') return;

        const transform = contentElement.style.transform;
        const match = transform && transform.match(/translate\(([\d.]+)vw,\s*([\d.]+)vh\)/);
        if (match) {
            contentElement.dataset.currentX = match[1];
            contentElement.dataset.currentY = match[2];
        }

        startRandomMovement(contentElement);
    });
}

// Глобальный массив для хранения данных о мутантах с движущимися зрачками
let mutantsWithEyes = [];

// Единый глобальный обработчик движения мыши для оптимизации производительности
let globalMouseHandler = null;

function initGlobalMouseHandler() {
    if (globalMouseHandler) return; // Уже инициализирован
    
    globalMouseHandler = (e) => {
        // Обрабатываем все мутанты в одном обработчике
        mutantsWithEyes.forEach(mutantData => {
            const { svgElement, pupil, eyeCenterX, eyeCenterY, maxOffset, initialOffsetX, initialOffsetY } = mutantData;
            
            if (!svgElement || !pupil) return;
            
            const svgRect = svgElement.getBoundingClientRect();
            if (!svgRect.width || !svgRect.height) return;
            
            const viewBox = svgElement.viewBox.baseVal;
            const svgWidth = viewBox.width || svgElement.clientWidth;
            const svgHeight = viewBox.height || svgElement.clientHeight;
            
            if (!svgWidth || !svgHeight) return;
            
            // Конвертируем координаты мыши в координаты SVG
            const mouseX = ((e.clientX - svgRect.left) / svgRect.width) * svgWidth;
            const mouseY = ((e.clientY - svgRect.top) / svgRect.height) * svgHeight;
            
            // Вычисляем направление от центра глаза к мыши
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (isNaN(distance) || !isFinite(distance)) return;
            
            // Ограничиваем расстояние максимальным смещением
            let offsetX = deltaX;
            let offsetY = deltaY;
            
            if (distance > maxOffset && distance > 0) {
                offsetX = (deltaX / distance) * maxOffset;
                offsetY = (deltaY / distance) * maxOffset;
            }
            
            if (isNaN(offsetX) || isNaN(offsetY) || !isFinite(offsetX) || !isFinite(offsetY)) return;
            
            // Вычисляем transform
            let transformX, transformY;
            if (initialOffsetX !== undefined && initialOffsetY !== undefined) {
                // Для Mutant1 - с учетом начального смещения
                transformX = offsetX - initialOffsetX;
                transformY = offsetY - initialOffsetY;
            } else {
                // Для Mutant2 - без начального смещения
                transformX = offsetX;
                transformY = offsetY;
            }
            
            if (isNaN(transformX) || isNaN(transformY) || !isFinite(transformX) || !isFinite(transformY)) return;
            
            // Применяем transform к зрачку
            pupil.setAttribute('transform', `translate(${transformX.toFixed(2)}, ${transformY.toFixed(2)})`);
        });
    };
    
    document.addEventListener('mousemove', globalMouseHandler);
}

// Функция инициализации движения зрачков для мутанта на ферме
function initMutantEyeOnFerm(elementId, mutantType) {
    const mutantElement = document.getElementById(elementId);
    if (!mutantElement) return;
    
    const svgElement = mutantElement.querySelector('svg[data-mutant-type="' + mutantType + '"]');
    if (!svgElement) return;
    
    let pupil, eyeCenterX, eyeCenterY, eyeRadius, pupilRadius, maxOffset, initialOffsetX, initialOffsetY;
    
    switch (mutantType) {
        case 'Mutant1':
            pupil = svgElement.querySelector('#mutant1-pupil');
            if (!pupil) return;
            
            eyeCenterX = 258;
            eyeCenterY = 270;
            eyeRadius = 55.652;
            pupilRadius = 16.696;
            maxOffset = eyeRadius - pupilRadius;
            
            const initialPupilX = 272.696;
            const initialPupilY = 256;
            initialOffsetX = initialPupilX - eyeCenterX; // 16.696
            initialOffsetY = initialPupilY - eyeCenterY; // 0
            break;
            
        case 'Mutant2':
            pupil = svgElement.querySelector('#mutant2-pupil');
            if (!pupil) return;
            
            eyeCenterX = 159.27023;
            eyeCenterY = 82.35041;
            eyeRadius = 18.8161825;
            pupilRadius = 6.89928;
            maxOffset = eyeRadius - pupilRadius;
            // Для Mutant2 начальное смещение = 0 (зрачок в центре)
            initialOffsetX = undefined;
            initialOffsetY = undefined;
            break;
            
        case 'Mutant3':
            // Для будущего mutant3 - параметры нужно будет добавить
            // pupil = svgElement.querySelector('#mutant3-pupil');
            // if (!pupil) return;
            // ... параметры для mutant3
            return;
            
        default:
            return;
    }
    
    // Добавляем данные мутанта в глобальный массив
    mutantsWithEyes.push({
        svgElement,
        pupil,
        eyeCenterX,
        eyeCenterY,
        maxOffset,
        initialOffsetX,
        initialOffsetY
    });
    
    // Инициализируем глобальный обработчик если еще не инициализирован
    initGlobalMouseHandler();
    
    // Сохраняем флаг
    mutantElement.dataset.eyeHandler = 'active';
}


// Функция инициализации Drag and Drop для мутантов
function initDragAndDrop() {
    const mutants = document.querySelectorAll('.mutant-on-ferm');
    
    mutants.forEach(mutant => {
        const contentElement = mutant.querySelector('img, svg[data-mutant-type]');
        if (!contentElement) return;

        contentElement.onmousedown = function (event) {
            // Предотвращаем стандартный drag браузера
            event.preventDefault();
            
            // 1. Получаем текущую матрицу трансформации в пикселях
            const style = window.getComputedStyle(contentElement);
            const matrix = style.transform;
            
            let currentXpx = 0;
            let currentYpx = 0;
            
            //парсер css матрицы типа matrix(1, 0, 0, 1, 150.45, 200.12)
            if (matrix !== 'none') {
                const values = matrix.split('(')[1].split(')')[0].split(',');
                if (matrix.includes('matrix3d')) {
                    currentXpx = parseFloat(values[12]);
                    currentYpx = parseFloat(values[13]);
                } else {
                    currentXpx = parseFloat(values[4]);
                    currentYpx = parseFloat(values[5]);
                }
            }
            
            // 2. Мгновенно фиксируем элемент в этих пикселях, убирая transition
            contentElement.style.transition = 'none';
            contentElement.style.transform = `translate(${currentXpx}px, ${currentYpx}px) translateZ(0)`;

            // Останавливаем случайное движение
            // const wasWalking = contentElement.dataset.canWalk !== 'false';
            // contentElement.dataset.canWalk = 'false';
            // contentElement.style.zIndex = '1000';

            // 3. Вычисляем смещение курсора относительно начала координат элемента
            const rect = contentElement.getBoundingClientRect();
            const shiftX = event.clientX - rect.left;
            const shiftY = event.clientY - rect.top;
            console.log( 'rect', rect);
            console.log( 'event.clientX', event.clientX, 'event.clientY', event.clientY);
            console.log( 'shiftX', shiftX, 'shiftY', shiftY);

            // Получаем координаты родителя (контейнера), так как transform идет от него
            const parentRect = mutant.getBoundingClientRect();

            // Переменные для хранения последних координат в пикселях
            let lastXpx = currentXpx;
            let lastYpx = currentYpx;

            function moveAt(clientX, clientY) {
                // Вычисляем новые координаты в пикселях относительно родителя
                lastXpx = clientX - parentRect.left - shiftX;
                lastYpx = clientY - parentRect.top - shiftY;

                // Ставим трансформ в пикселях инлайново
                contentElement.style.transform = `translate(${lastXpx}px, ${lastYpx}px) translateZ(0)`;
                
                // Обновляем текущие координаты в датасете (переводим в vw/vh для логики движения)
                let xVw = (lastXpx / window.innerWidth) * 100;
                let yVh = (lastYpx / window.innerHeight) * 100;
                
                contentElement.dataset.currentX = xVw.toFixed(2);
                contentElement.dataset.currentY = yVh.toFixed(2);
            }

            function onMouseMove(event) {
                moveAt(event.clientX, event.clientY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
                
                contentElement.style.zIndex = '';
                
                // Переводим финальные пиксели в vw/vh для проверки границ
                let finalXvw = (lastXpx / window.innerWidth) * 100;
                let finalYvh = (lastYpx / window.innerHeight) * 100;

                // Ограничиваем координаты в рамках поля
                const targetXvw = Math.max(MOVEMENT_BOUNDS.minX, Math.min(MOVEMENT_BOUNDS.maxX, finalXvw));
                const targetYvh = Math.max(MOVEMENT_BOUNDS.minY, Math.min(MOVEMENT_BOUNDS.maxY, finalYvh));

                // Плавно возвращаем в границы (или просто фиксируем, если в границах)
                contentElement.style.transition = 'transform 0.5s ease-out';
                contentElement.style.transform = `translate(${targetXvw.toFixed(2)}vw, ${targetYvh.toFixed(2)}vh) translateZ(0)`;
                
                contentElement.dataset.currentX = targetXvw.toFixed(2);
                contentElement.dataset.currentY = targetYvh.toFixed(2);

                // Возвращаем флаг ходьбы если он был
                // if (wasWalking) contentElement.dataset.canWalk = 'true';

                setTimeout(() => {
                    contentElement.style.transition = 'none';
                    // Запускаем движение (функция сама проверит canWalk внутри)
                    startRandomMovement(contentElement);
                }, 500);
            };
        };
    });
}

// Функция инициализации страницы Ferm - загружает всех купленных мутантов
function initFermPage() {
    const purchasedMutants = JSON.parse(localStorage.getItem('purchasedMutants') || '{}');
    const mutantsArea = document.getElementById('mutantsArea');
    
    if (!mutantsArea) return;
    
    // Очищаем область перед загрузкой (чтобы не дублировать при повторном открытии)
    mutantsArea.innerHTML = '';
    
    // Очищаем массив мутантов с глазами
    mutantsWithEyes = [];
    
    // Создаем элементы для всех купленных мутантов
    Object.keys(purchasedMutants).forEach(btnId => {
        const count = purchasedMutants[btnId];
        const mutantId = btnId.replace('buy', ''); // "buyBacteria" -> "Bacteria", "buyMutant1" -> "Mutant1"
        
        // Создаем столько элементов, сколько куплено
        for (let i = 0; i < count; i++) {
            createMutantOnFerm(mutantId);
        }
    });
    
    // Инициализируем движение зрачков и случайные траектории для всех мутантов
    setTimeout(() => {
        const allMutants = mutantsArea.querySelectorAll('.mutant-on-ferm');
        allMutants.forEach(mutant => {
            const mutantId = mutant.dataset.mutantId;
            if (mutantId === 'Mutant1' || mutantId === 'Mutant2' || mutantId === 'Mutant3') {
                initMutantEyeOnFerm(mutant.id, mutantId);
            }
        });
        startAllMutantsMovement();
        // Инициализируем Drag and Drop
        initDragAndDrop();
    }, 100);
}

// Экспортируем функции для использования в других файлах
export { createMutantOnFerm, initFermPage };

// Делаем доступными глобально
window.createMutantOnFerm = createMutantOnFerm;
window.initFermPage = initFermPage;
window.initDragAndDrop = initDragAndDrop;
