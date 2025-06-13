// const btnMenuButton = document.querySelector('.burgerMenuMobile');
// const menuMobile = document.querySelector('.headerTopRight');
// const close = document.querySelector('#close');
// const menuItems = document.querySelectorAll('.elMenu');

// // Открытие меню по кнопке-гамбургеру
// btnMenuButton.onclick = () => {
//     menuMobile.style.display = 'block';
// }

// // Закрытие по крестику
// close.onclick = () => {
//     menuMobile.style.display = 'none';
// }

// // Закрытие по клику на любой пункт меню
// menuItems.forEach(item => {
//     item.onclick = () => {
//         menuMobile.style.display = 'none'
//     }
// })

// // Закрытие по клику вне меню и вне кнопки-гамбургера
// document.addEventListener('click', function(event) {
//     if (menuMobile.style.display === 'block') {
//         if (!menuMobile.contains(event.target) && !btnMenuButton.contains(event.target)) {
//             menuMobile.style.display = 'none';
//         }
//     }
// })

const btnMenuButton = document.querySelector('.burgerMenuMobile');
const menuMobile = document.querySelector('.headerTopRight');
const close = document.querySelector('#close');
const menuItems = document.querySelectorAll('.elMenu');


// Открытие меню по кнопке-гамбургеру
btnMenuButton.onclick = () => {
    menuMobile.classList.add('active')
}

// Закрытие по крестику
close.onclick = () => {
    menuMobile.classList.remove('active')
}

// Закрытие по клику на любой пункт меню
menuItems.forEach(item => {
    item.onclick = () => {
        menuMobile.classList.remove('active')
    }
})

// Закрытие по клику вне меню и вне кнопки-гамбургера
document.addEventListener('click', function(event) {
    if (menuMobile.classList.contains('active')) {
        if (!menuMobile.contains(event.target) && !btnMenuButton.contains(event.target)) {
            menuMobile.classList.remove('active')
        }
    }
})