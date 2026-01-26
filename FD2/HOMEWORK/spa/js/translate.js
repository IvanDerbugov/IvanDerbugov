function translateAll () {
    const words = {
        'Найти игру': {
            'ru': 'Найти игру',
            'en': 'Find game'
        },
        'Найти': {
            'ru': 'Найти',
            'en': 'Find'
        },
        'Войти': {
            'ru': 'Войти',
            'en': 'Sign in'
        },
        'Зарегистрироваться': {
            'ru': 'Зарегистрироваться',
            'en': 'Sign up'
        },
        'Все игры': {
            'ru': 'Все игры',
            'en': 'All games'
        },
        'Простые': {
            'ru': 'Простые',
            'en': 'Simple'
        },
        'Лучшая игра': {
            'ru': 'Лучшая игра',
            'en': 'Best game'
        },
        'Убей демона': {
            'ru': 'Убей демона',
            'en': 'Kill the demon'
        },
        'Забрать бонус': {
            'ru': 'Забрать бонус',
            'en': 'Collect the bonus'
        },
        'магазин': {
            'ru': 'магазин',
            'en': 'shop'
        },
        'счёт': {
            'ru': 'счёт',
            'en': 'count'
        }
    }
    
    // Определяем язык по активному флагу
    const activeFlag = document.querySelector('.listLanguage .activLangage')
    const allFlags = document.querySelectorAll('.listLanguage > svg')
    let targetLang = 'ru' // по умолчанию русский
    
    if (activeFlag) {
        // Находим индекс активного флага в списке
        const flagIndex = Array.from(allFlags).indexOf(activeFlag)
        // Первый флаг (индекс 0) = ru, второй (индекс 1) = en
        targetLang = flagIndex === 0 ? 'ru' : 'en'
    }
    
    const wordsItems = document.querySelectorAll('[data-translate], [data-translate-placeholder]')
    wordsItems.forEach((word) => {
        const key = word.dataset.translate || word.dataset.translatePlaceholder
        
        if (key && key in words) {
            if (word.tagName !== 'INPUT') {
                word.textContent = words[key][targetLang]
            }
            else {
                word.placeholder = words[key][targetLang]
            }
        }
    })
}




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




