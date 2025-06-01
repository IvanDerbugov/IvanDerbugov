const btnMenuButton = document.querySelector('.btnMenu button');
const menuMobile = document.querySelector('.menuMobile');
const close = document.querySelector('#close');
const menuItems = document.querySelectorAll('.menuMobile ul li');

// Открытие меню по кнопке-гамбургеру
btnMenuButton.onclick = () => {
    menuMobile.style.display = 'block';
}

// Закрытие по крестику
close.onclick = () => {
    menuMobile.style.display = 'none';
}

// Закрытие по клику на любой пункт меню
menuItems.forEach(item => {
    item.onclick = () => {
        menuMobile.style.display = 'none'
    }
})

// Закрытие по клику вне меню и вне кнопки-гамбургера
document.addEventListener('click', function(event) {
    if (menuMobile.style.display === 'block') {
        if (!menuMobile.contains(event.target) && !btnMenuButton.contains(event.target)) {
            menuMobile.style.display = 'none';
        }
    }
})




const dNoneMobile = document.querySelector('.dNoneMobile');
const dBlockMobile = document.querySelector('.dBlockMobile');
const seeMoreMobile = document.querySelector('.seeMoreMobile');
// Открытие и закрытие блока с текстом
seeMoreMobile.onclick = () => {
    if (dNoneMobile.style.display === 'block') {
        dNoneMobile.style.display = 'none';
        dBlockMobile.style.display = 'block';
        seeMoreMobile.textContent = 'Смотреть больше';
    } else {
        dNoneMobile.style.display = 'block';
        dBlockMobile.style.display = 'none';
        seeMoreMobile.textContent = 'Скрыть';
    }
}







const modalThanks = document.querySelector('.modalThanks');
const BTNReference = document.querySelectorAll('.BTNReference');
const closeModalThanks = document.querySelector('.modalThanks button');
const overlay = document.querySelector('.overlay');
// Открытие модального окна СПАСИБО
BTNReference.forEach(btn => {
    btn.onclick = (event) => {
        event.stopPropagation();
        modalThanks.style.display = 'flex';
        overlay.style.display = 'block';
    }
})

// Закрытие модального окна СПАСИБО
closeModalThanks.onclick = (event) => {
    event.stopPropagation();
    modalThanks.style.display = 'none';
    overlay.style.display = 'none';
}

// Закрытие модального окна СПАСИБО по клику вне окна и вне кнопки закрытия
// document.addEventListener('click', function(event) {
//     if (modalThanks.style.display === 'block') {
//         if (!modalThanks.contains(event.target) && !closeModalThanks.contains(event.target)) {
//             modalThanks.style.display = 'none';
//         }
//     }
// })





const reviews = document.querySelectorAll('.review');
const dots = document.querySelectorAll('.switchReview button');
const btnLeft = document.querySelector('.BtnLeft');
const btnRight = document.querySelector('.BtnRight');
let current = 0;

// Показывает отзывы
function showReview(index) {
    reviews.forEach((r, i) => r.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.style.background = i === index ? '#937A60' : '#fff')
}    

// Слева
btnLeft.onclick = () => {
    current = (current -1 + reviews.length) % reviews.length;
    showReview(current);
}

// Справа
btnRight.onclick = () => {
    current = (current + 1) % reviews.length;
    showReview(current);
}

// Показывает отзывы
dots.forEach((dots, i) =>{
    dots.onclick = () => {
        current = i;
        showReview(current);
    }
})

showReview(current);






