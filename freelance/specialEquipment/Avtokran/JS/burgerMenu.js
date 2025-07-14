const btnMenuButton = document.querySelector('.burgerMenuMobile');
const menuMobile = document.querySelector('.headerTopRight');
const close = document.querySelector('#closeBurger');
const menuItems = document.querySelectorAll('.elMenu');


// Открытие меню по кнопке-гамбургеру
btnMenuButton.onclick = () => {
    menuMobile.classList.add('burger-modal-active')
}

// Закрытие по крестику
close.onclick = () => {
    console.log('close');
    menuMobile.classList.remove('burger-modal-active')
}

// Закрытие по клику на любой пункт меню
menuItems.forEach(item => {
    item.onclick = () => {
        menuMobile.classList.remove('burger-modal-active')
    }
})

// Закрытие по клику вне меню и вне кнопки-гамбургера
document.addEventListener('mousedown', function(event) {
    if (menuMobile.classList.contains('burger-modal-active')) {
        const menuCard = document.querySelector('.menu-card');
        if (menuCard && !menuCard.contains(event.target) && !btnMenuButton.contains(event.target)) {
            menuMobile.classList.remove('burger-modal-active');
        }
    }
});
