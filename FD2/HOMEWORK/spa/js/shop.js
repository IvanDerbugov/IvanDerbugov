"use strict";

function initShopPage() {
    const purchasedMutants = JSON.parse(localStorage.getItem('purchasedMutants')) || {};

    const descriptions = document.querySelectorAll('.mutant-description');

    descriptions.forEach(description => {
        const readMoreBtn = description.nextElementSibling;

        if (readMoreBtn && readMoreBtn.classList.contains('read-more-btn')) {
            readMoreBtn.addEventListener('click', function () {
                const isExpanded = description.classList.contains('expanded');
                const mutantItem = description.closest('.mutant-item');

                if (isExpanded) {
                    description.classList.remove('expanded');
                    description.classList.add('truncated');
                    if (mutantItem) {
                        setTimeout(() => {
                            mutantItem.classList.remove('stretched');
                        }, 300);
                    }
                    readMoreBtn.setAttribute('data-translate', 'читать полностью');
                    readMoreBtn.textContent = 'читать полностью';
                } else {
                    description.classList.add('expanded');
                    description.classList.remove('truncated');
                    if (mutantItem) {
                        mutantItem.classList.add('stretched');
                    }
                    readMoreBtn.setAttribute('data-translate', 'свернуть');
                    readMoreBtn.textContent = 'свернуть';
                }
            });
        }
    });


    // Функция для установки обработчиков hover звуков
    function setupHoverSound(elementId, audio, volume = 0.3) {
        const element = document.getElementById(elementId);
        if (element && audio) {
            audio.volume = volume;
            element.addEventListener('mouseenter', () => {
                audio.play().catch(() => {
                    // Игнорируем ошибку автовоспроизведения (требуется взаимодействие пользователя)
                });
            });
            element.addEventListener('mouseleave', () => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }

    // Установка обработчиков для мутантов
    setupHoverSound('bacteria', audioBacteria);
    setupHoverSound('mutant1', audioMutant1, 0.2);
    setupHoverSound('mutant2', audioMutant2, 1);

    // Инициализация движения зрачков для обоих мутантов
    initMutant1Eye();
    initMutant2Eye();



    // Функция проверки и покупки мутанта
    function buyMutant(price) {
        const countElement = document.getElementById('count');
        const currentCount = parseInt(countElement.textContent);
        
        if (currentCount >= price) {
            countElement.textContent = currentCount - price;
            audioBuy.volume = 0.3;
            audioBuy.play().catch(() => {
                // Игнорируем ошибку автовоспроизведения
            });
            return true;
        }
        return false;
    }

    // Установка обработчиков для кнопок покупки
    const btnBuy = document.querySelectorAll('.buy-btn');
    btnBuy.forEach(btn => {
        btn.addEventListener('click', () => {
            const price = parseInt(btn.dataset.price);
            if (price && buyMutant(price)) {
                if (!purchasedMutants[btn.id]) {
                    purchasedMutants[btn.id] = 1;
                    
                } else {
                    purchasedMutants[btn.id]++;
                }
                localStorage.gameScore = parseInt(localStorage.gameScore) - price;
                localStorage.setItem('purchasedMutants', JSON.stringify(purchasedMutants));
                console.log('purchasedMutantsLocalStorage', localStorage.getItem('purchasedMutants'));

                // Покупка успешна, можно добавить логику добавления мутанта
                setTimeout(() => {
                    window.location.hash = 'Ferm';
                    const mutantId = btn.id.replace('buy', ''); // "buyBacteria" -> "Bacteria"
                    if (window.createMutantOnFerm) {
                        // Передаем true для анимации падения при покупке
                        window.createMutantOnFerm(mutantId, true);
                    }
                }, 1000);
            } else {
                // Недостаточно денег
                console.log('Недостаточно денег');
                audioLessMoney.volume = 0.5;
                audioLessMoney.play().catch(() => {
                    // Игнорируем ошибку автовоспроизведения
                });
            }
        });
    });

    // Функция для движения зрачка за мышкой (mutant1)
    function initMutant1Eye() {
        const svgElement = document.getElementById('mutant1');
        if (!svgElement) return;

        const pupil = svgElement.querySelector('#mutant1-pupil');
        if (!pupil) return;

        // Параметры глаза (в координатах SVG viewBox)
        const eyeCenterX = 258;
        const eyeCenterY = 270;
        const eyeRadius = 55.652; // радиус большого круга
        const pupilRadius = 16.696; // радиус зрачка
        const maxOffset = eyeRadius - pupilRadius; // максимальное смещение зрачка
        
        // Начальная позиция зрачка (из path d="M272.696,256...")
        const initialPupilX = 272.696;
        const initialPupilY = 256;
        const initialOffsetX = initialPupilX - eyeCenterX; // 16.696
        const initialOffsetY = initialPupilY - eyeCenterY; // 0

        // Обработчик движения мыши
        document.addEventListener('mousemove', (e) => {
            // Получаем позицию SVG элемента на странице
            const svgRect = svgElement.getBoundingClientRect();
            
            // Проверяем, что SVG элемент видим и имеет размеры
            if (!svgRect.width || !svgRect.height) return;
            
            // Получаем viewBox SVG
            const viewBox = svgElement.viewBox.baseVal;
            const svgWidth = viewBox.width || svgElement.clientWidth;
            const svgHeight = viewBox.height || svgElement.clientHeight;

            // Проверяем валидность размеров
            if (!svgWidth || !svgHeight) return;

            // Конвертируем координаты мыши в координаты SVG
            const mouseX = ((e.clientX - svgRect.left) / svgRect.width) * svgWidth;
            const mouseY = ((e.clientY - svgRect.top) / svgRect.height) * svgHeight;

            // Вычисляем направление от центра глаза к мыши
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Проверяем валидность distance
            if (isNaN(distance) || !isFinite(distance)) return;

            // Ограничиваем расстояние максимальным смещением
            let offsetX = deltaX;
            let offsetY = deltaY;

            if (distance > maxOffset && distance > 0) {
                offsetX = (deltaX / distance) * maxOffset;
                offsetY = (deltaY / distance) * maxOffset;
            }

            // Проверяем валидность перед применением transform
            if (isNaN(offsetX) || isNaN(offsetY) || !isFinite(offsetX) || !isFinite(offsetY)) return;

            // Вычисляем transform с учетом начального смещения
            // transform должен переместить зрачок из начальной позиции в новую позицию
            const transformX = offsetX - initialOffsetX;
            const transformY = offsetY - initialOffsetY;

            // Проверяем валидность перед применением transform
            if (isNaN(transformX) || isNaN(transformY) || !isFinite(transformX) || !isFinite(transformY)) return;

            // Применяем transform к зрачку
            pupil.setAttribute('transform', `translate(${transformX.toFixed(2)}, ${transformY.toFixed(2)})`);
        });
    }

    // Функция для движения зрачка за мышкой (mutant2)
    function initMutant2Eye() {
        const svgElement = document.getElementById('mutant2');
        if (!svgElement) return;

        const pupil = svgElement.querySelector('#mutant2-pupil');
        if (!pupil) return;

        // Параметры глаза (в координатах SVG viewBox)
        const eyeCenterX = 159.27023;
        const eyeCenterY = 82.35041;
        const eyeRadius = 18.8161825; // радиус большого круга
        const pupilRadius = 6.89928; // радиус зрачка (увеличен в 2 раза)
        const maxOffset = eyeRadius - pupilRadius; // максимальное смещение зрачка

        // Обработчик движения мыши
        document.addEventListener('mousemove', (e) => {
            // Получаем позицию SVG элемента на странице
            const svgRect = svgElement.getBoundingClientRect();
            
            // Проверяем, что SVG элемент видим и имеет размеры
            if (!svgRect.width || !svgRect.height) return;
            
            // Получаем viewBox SVG
            const viewBox = svgElement.viewBox.baseVal;
            const svgWidth = viewBox.width || svgElement.clientWidth;
            const svgHeight = viewBox.height || svgElement.clientHeight;

            // Проверяем валидность размеров
            if (!svgWidth || !svgHeight) return;

            // Конвертируем координаты мыши в координаты SVG
            const mouseX = ((e.clientX - svgRect.left) / svgRect.width) * svgWidth;
            const mouseY = ((e.clientY - svgRect.top) / svgRect.height) * svgHeight;

            // Вычисляем направление от центра глаза к мыши
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Проверяем валидность distance
            if (isNaN(distance) || !isFinite(distance)) return;

            // Ограничиваем расстояние максимальным смещением
            let offsetX = deltaX;
            let offsetY = deltaY;

            if (distance > maxOffset && distance > 0) {
                offsetX = (deltaX / distance) * maxOffset;
                offsetY = (deltaY / distance) * maxOffset;
            }

            // Проверяем валидность перед применением transform
            if (isNaN(offsetX) || isNaN(offsetY) || !isFinite(offsetX) || !isFinite(offsetY)) return;

            // Применяем transform к зрачку (для mutant2 начальное смещение = 0, так как зрачок в центре)
            pupil.setAttribute('transform', `translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)})`);
        });
    }

}