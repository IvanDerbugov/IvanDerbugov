const startGame = document.getElementById('startFastClick');
startGame.addEventListener('click', function () {
    this.innerHTML = 'Стартую ёпта'
    this.style.background = 'yellow'
    setTimeout(function () {
        startGame.style.display = 'none';
        document.body.style.cursor = 'url("img/sword.svg") 32 32, crosshair';
        document.querySelector('header').style.cursor = 'default';
        document.querySelector('footer').style.cursor = 'default';
        document.querySelector('.compilations').style.cursor = 'default';

        const face = document.querySelector('.face')
        const originContent = face.innerHTML
        const newContent = '👿'

        setInterval(() => {
            face.innerHTML = newContent;
            setTimeout(() => {
                face.innerHTML = originContent;
            }, 1000)
        }, 3000)

    }, 3000)
})


