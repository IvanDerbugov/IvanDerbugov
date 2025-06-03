const btns = document.querySelectorAll('.miniImgsCard button');
const bigImg = document.querySelector('.imgsCard > div img');

// Массив путей к большим картинкам (по порядку миниатюр)
const bigImages = [
    '../img/cards/cardComfort3-1.jpg',
    '../img/cards/cardComfort3-2.jpg',
    '../img/cards/cardComfort3-3.jpg'
];

btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        // Убрать active у всех
        btns.forEach(b => b.classList.remove('active'));
        // Добавить active только на нажатую
        btn.classList.add('active');
        // Поменять большую картинку
        bigImg.src = bigImages[idx];
    });
});