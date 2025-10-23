const startGame = document.getElementById('startFastClick');
startGame.addEventListener('click', function () {
    let timeStandart = 3000
    document.querySelector('#startFastClick p').innerHTML = 'Стартую ёпта'
    this.style.background = 'yellow'
    const countDown = document.querySelector('#startFastClick span')
    countDown.style.display = 'block'

    let counter = timeStandart / 1000
    const timer = setInterval(() => {
        counter--
        countDown.innerHTML = counter
        if (counter < 0) {
            clearInterval(timer)
        }
    }, 1000)

    setTimeout(function () {
        startGame.style.display = 'none';
        document.body.style.cursor = 'url("img/sword.svg") 32 32, crosshair';
        document.querySelector('header').style.cursor = 'default';
        document.querySelector('footer').style.cursor = 'default';
        document.querySelector('.compilations').style.cursor = 'default';

        const face = document.querySelector('.face')
        const originContent = face.innerHTML
        const newContent = `<img src="img/demon.svg" alt="">`

        setInterval(() => {
            face.innerHTML = newContent;
            face.setAttribute('data-message', 'Мочи демона!!!')
            face.style.setProperty('--before-display', 'block')
            setTimeout(() => {
                face.innerHTML = originContent;
                face.style.setProperty('--before-display', 'none')
            }, 1000)
        }, timeStandart)


        document.querySelector('div:has(#timeToEnd)').style.display = 'block'
        document.querySelector('div:has(#score)').style.display = 'block'
        let timeToEnd = document.getElementById(timeToEnd)
        let score = document.getElementById(score)

        // face.addEventListener('click', function () {
        //     if () {//клик по демону
        //         score.innerHTML++
        //     }
        //     if () {//клик по доброму
        //         score.innerHTML--
        //     }
        // }) 
            
    }, 4000)
})


