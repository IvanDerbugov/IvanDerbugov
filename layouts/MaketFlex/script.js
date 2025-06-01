const btnMenuButton = document.querySelector('.btnMenu button');
const menuMobile = document.querySelector('.menuMobile');
const close = document.querySelector('#close');
const menuItems = document.querySelectorAll('.menuMobile ul li');

btnMenuButton.onclick = () => {
    menuMobile.style.display = 'block';
}

close.onclick = () => {
    menuMobile.style.display = 'none';
}

menuItems.forEach(item => {
    item.onclick = () => {
        menuMobile.style.display = 'none'
    }
})

document.addEventListener('click', function(event) {
    if (menuMobile.style.display === 'block') {
        if (!menuMobile.contains(event.target) && !btnMenuButton.contains(event.target)) {
            menuMobile.style.display = 'none';
        }
    }
})





const reviews = document.querySelectorAll('.review');
const dots = document.querySelectorAll('.switchReview button');
const btnLeft = document.querySelector('.BtnLeft');
const btnRight = document.querySelector('.BtnRight');
let current = 0;

function showReview(index) {
    reviews.forEach((r, i) => r.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.style.background = i === index ? '#937A60' : '#fff')
}    

btnLeft.onclick = () => {
    current = (current -1 + reviews.length) % reviews.length;
    showReview(current);
}

btnRight.onclick = () => {
    current = (current + 1) % reviews.length;
    showReview(current);
}

dots.forEach((dots, i) =>{
    dots.onclick = () => {
        current = i;
        showReview(current);
    }
})

showReview(current);






