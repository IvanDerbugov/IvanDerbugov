const $btn =  document.getElementById('snap');
const $close =  document.getElementById('close');
const $shadow = document.getElementsByClassName('shadow');

$btn.addEventListener('click', () => {
        $shadow[0].style.display = 'block';
        })
$close.addEventListener('click', () => {
        $shadow[0].style.display = 'none';
        })