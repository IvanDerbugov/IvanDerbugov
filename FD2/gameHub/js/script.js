const compilationsBtns = document.querySelectorAll('.wrapperGroupsGames > div')

compilationsBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
        for (let i = 0; i < compilationsBtns.length; i++) {
            compilationsBtns[i].classList.remove('actionOpntionGame')
        }

        event.target.classList.add('actionOpntionGame')
    })
})


//тыкалка по сменен языка
const languageBtn = document.getElementById('languageBtn')
const listLanguage = document.querySelector('.listLanguage')
const arrowSeeMore = document.getElementById('arrowSeeMore')

function createHandler (element, closeFunction) {
    return function(event) {
        if(!element.contains(event.target)) {
            closeFunction()
        }
    }
}
const handleOutsideClickLanguage = createHandler(languageBtn, closeListLanguage)
function closeListLanguage() {
    listLanguage.style.display = 'none'
    arrowSeeMore.style.transform = 'rotate(0deg)'
    document.removeEventListener('click', handleOutsideClickLanguage)
}



languageBtn.addEventListener('click', function () {
    if (window.getComputedStyle(listLanguage).display === 'none') {
        listLanguage.style.display = 'block'
        arrowSeeMore.style.transform = 'rotate(180deg)'

        document.addEventListener('click', handleOutsideClickLanguage)

    }
    else {
        closeListLanguage()
    }
})

//сменить язык
const languageSvg = document.querySelectorAll('.listLanguage > svg')

languageSvg.forEach((svg) => {
    svg.addEventListener('click', function (event) {
        for (let i of languageSvg) {
            i.classList.remove('activLangage')
        }
        event.currentTarget.classList.add('activLangage')
        const activeSvgINlanguageBtn = languageBtn.querySelector('svg:first-child')
        activeSvgINlanguageBtn.innerHTML = event.currentTarget.innerHTML
        
        
        translateAll()
    })
})




