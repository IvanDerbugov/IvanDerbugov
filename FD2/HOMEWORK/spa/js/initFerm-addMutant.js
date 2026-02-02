"use strict";

import { renderMutant1 } from '../moduls/mutant1.js';
import { renderMutant2 } from '../moduls/mutant2.js';

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
    const finalX = Math.random() * 80; // от 10vw до 90vw
    const finalY = Math.random() * 27; // от 10vh до 90vh
    
    // Создаем изображение в зависимости от типа мутанта через switch case
    let contentElement = null; // Элемент, к которому будет применяться transform
    switch (mutantId) {
        case 'Bacteria':
            const img = document.createElement('img');
            img.src = 'img/bacteria.svg';
            img.alt = 'Bacteria';
            img.style.minWidth = '100px';
            img.style.minHeight = '100px';
            img.style.position = 'absolute';
            img.style.left = '0';
            img.style.top = '0';
            contentElement = img;
            mutantElement.appendChild(img);
            break;
            
        case 'Mutant1':
            // Создаем SVG для mutant1
            const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg1.setAttribute('height', '200px');
            svg1.setAttribute('width', '200px');
            svg1.setAttribute('version', '1.1');
            svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg1.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svg1.setAttribute('viewBox', '0 0 512 512');
            svg1.setAttribute('xml:space', 'preserve');
            svg1.setAttribute('data-mutant-type', 'Mutant1');
            svg1.style.position = 'absolute';
            svg1.style.left = '0';
            svg1.style.top = '0';
            svg1.innerHTML = renderMutant1();
            contentElement = svg1;
            mutantElement.appendChild(svg1);
            break;
            
        case 'Mutant2':
            // Создаем SVG для mutant2
            const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg2.setAttribute('version', '1.1');
            svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg2.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svg2.setAttribute('x', '0px');
            svg2.setAttribute('y', '0px');
            svg2.setAttribute('width', '200px');
            svg2.setAttribute('height', '188px');
            svg2.setAttribute('viewBox', '0 0 300 282');
            svg2.setAttribute('xml:space', 'preserve');
            svg2.setAttribute('data-mutant-type', 'Mutant2');
            svg2.style.position = 'absolute';
            svg2.style.left = '0';
            svg2.style.top = '0';
            svg2.innerHTML = renderMutant2();
            contentElement = svg2;
            mutantElement.appendChild(svg2);
            break;
            
        case 'Mutant3':
            // Для будущего mutant3
            // const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // ... настройки для mutant3
            break;
            
        default:
            console.warn(`Unknown mutant type: ${mutantId}`);
            return;
    }
    
    // Применяем transform к элементу контента (img или svg)
    if (contentElement) {
        // Отдельный слой для каждого мутанта (оптимизация производительности)
        contentElement.style.transform = `translate(${finalX}vw, ${finalY}vh) translateZ(0)`;
        contentElement.style.willChange = 'transform';
        
        // Если это новая покупка - добавляем анимацию падения
        if (withAnimation) {
            // Начальная позиция - выше экрана (используем отрицательное значение в vh)
            // Вычисляем начальную позицию: текущая Y минус примерно 127% высоты экрана
            const startY = finalY - 127;
            contentElement.style.transform = `translate(${finalX}vw, ${startY}vh) translateZ(0)`;
            contentElement.style.transition = 'transform 1s ease-out';
            
            mutantsArea.appendChild(mutantElement);
            
            // Запускаем анимацию падения с небольшой задержкой для корректного рендеринга
            setTimeout(() => {
                contentElement.style.transform = `translate(${finalX}vw, ${finalY}vh) translateZ(0)`;
            }, 10);
        } else {
            // При загрузке страницы - сразу на место без анимации
            mutantsArea.appendChild(mutantElement);
        }
    }
    
    // Инициализируем движение зрачков для Mutant1, Mutant2 и Mutant3
    if (mutantId === 'Mutant1' || mutantId === 'Mutant2' || mutantId === 'Mutant3') {
        setTimeout(() => {
            initMutantEyeOnFerm(uniqueId, mutantId);
        }, 100);
    }
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
    
    // Инициализируем движение зрачков для всех мутантов на ферме после небольшой задержки
    setTimeout(() => {
        const allMutants = mutantsArea.querySelectorAll('.mutant-on-ferm');
        allMutants.forEach(mutant => {
            const mutantId = mutant.dataset.mutantId;
            if (mutantId === 'Mutant1' || mutantId === 'Mutant2' || mutantId === 'Mutant3') {
                initMutantEyeOnFerm(mutant.id, mutantId);
            }
        });
    }, 100);
}

// Экспортируем функции для использования в других файлах
export { createMutantOnFerm, initFermPage };

// Делаем доступными глобально
window.createMutantOnFerm = createMutantOnFerm;
window.initFermPage = initFermPage;
