const compilationsBtns = document.querySelectorAll('.compilations > div')
console.log(`btns: `, compilationsBtns)

compilationsBtns.forEach((btn) => {
 btn.addEventListener('click', function(event) {
    for (let i = 0; i < compilationsBtns.length; i++){
        compilationsBtns[i].classList.remove('actionOpntionGame')
    }

    event.target.classList.add('actionOpntionGame')
 })
})