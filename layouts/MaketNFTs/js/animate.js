const animateL_R = document.getElementById('animateL_R');

function updateAnimationClass() {
    if (!animateL_R) return; //страховка если такого элемента нет
    if (window.innerWidth <= 705) {
        animateL_R.classList.remove('animate__backInLeft');
        animateL_R.classList.add('animate__backInRight');
    } else {
        animateL_R.classList.remove('animate__backInRight');
        animateL_R.classList.add('animate__backInLeft');
    }
}

// При загрузке страницы
updateAnimationClass();

// При изменении размера окна
window.addEventListener('resize', updateAnimationClass);
