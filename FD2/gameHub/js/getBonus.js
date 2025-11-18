const minBonusEl = document.getElementById('minBonus')
const secBonusEl = document.getElementById('secBonus')


const timeNow = Math.floor(new Date())
// let remainsSec = timeNow - (timeNow - 60 * 60 * 1000)
let remainsSec = timeNow - (timeNow - 60 * 60 * 1000)

function updateTimer() {
    let min = Math.floor(remainsSec / 60 / 1000)
    let sec = Math.floor(remainsSec / 1000 % 60)

    minBonusEl.textContent = String(min).padStart(2, '0')
    secBonusEl.textContent = String(sec).padStart(2, '0')
}

function tick() {
    updateTimer()
    remainsSec -= 1000
    if (remainsSec < 0) {
        clearInterval(timerInterval)
    }
}

updateTimer()
const timerInterval = setInterval(tick, 1000)




const btnBonus = document.querySelector('.bonus')
const wrapModalBonus = document.querySelector('.wrapModalGetBonus')
const windowModalBonus = document.querySelector('.modalGetBonus')
const btnCloseModalBonus = document.getElementById('closeModalGetBonus')
const handleOutsideClickBonus = createHandler(windowModalBonus, closeModalGetBonus)
btnBonus.addEventListener('click', () => {
    if (remainsSec <= 0) {
        wrapModalBonus.style.setProperty('--modal-display', 'block')
        btnCloseModalBonus.addEventListener('click', closeModalGetBonus)
        setTimeout(() => document.addEventListener('click', handleOutsideClickBonus), 50)
    }
    else {
        minBonusEl.classList.add('timer-pulse')
        secBonusEl.classList.add('timer-pulse')
        setTimeout(() => {
            minBonusEl.classList.remove('timer-pulse')
            secBonusEl.classList.remove('timer-pulse')
        }, 400)
    }
})

function closeModalGetBonus() {
    wrapModalBonus.style.setProperty('--modal-display', 'none')
    btnCloseModalBonus.removeEventListener('click', closeModalGetBonus)
    document.removeEventListener('click', handleOutsideClickBonus)
}