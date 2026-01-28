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
        },
        'Каталог мутантов': {
            'ru': 'Каталог мутантов',
            'en': 'Catalog of mutants'
        },
        'Бактерия': {
            'ru': 'Бактерия',
            'en': 'Bacteria'
        },
        'читать полностью': {
            'ru': 'читать полностью',
            'en': 'read more'
        },
        'свернуть': {
            'ru': 'свернуть',
            'en': 'collapse'
        },
        'Магазин': {
            'ru': 'Магазин',
            'en': 'Shop'
        },
        'bacteria-description': {
            'ru': 'Бактерии - это элементарный вид жизни, микроскопические организмы, которые были одними из первых обитателей Криптоне. Их появление на планете миллионы световых лет назад стало ключевым моментом в зарождении жизни, положив начало многообразию форм разума. Они представляют собой крошечных, но очень вредных мутантов, способных увеличивать шанс мутации у других существ. Их главная цель - выжить любой ценой. Не смотря на злой вид и не особо дружелюбное поведение из-за своего размера особой опасности не представляют.',
            'en': 'Bacteria are the elementary form of life, microscopic organisms that were one of the first inhabitants of Crypton. Their appearance on the planet millions of light years ago was a key moment in the origin of life, laying the foundation for the diversity of forms of reason. They represent tiny, but very harmful mutants, capable of increasing the chance of mutation of other beings. Their main goal is to survive at any cost. Despite their evil appearance and not particularly friendly behavior due to their size, they do not pose any particular danger.'
        },
        'купить': {
            'ru': 'купить',
            'en': 'buy'
        },
        'Спринтер': {
            'ru': 'Спринтер',
            'en': 'Sprinter'
        },
        'mutant2-description': {
            'ru': 'Фиолетовый Спринтер - один из самых необычных обитателей Криптона. Его яркий фиолетовый окрас появился в результате редкой мутации после контакта с кристаллами фиолетовой энергии, которые падают на планету во время метеоритных дождей. Несмотря на то, что он не отличается особым интеллектом и часто ведёт себя трусливо, его главное преимущество - невероятная скорость. Он может развивать скорость до 200 километров в час, что делает его идеальным разведчиком. Его трусость на самом деле - это инстинкт самосохранения, который помог ему выжить в суровых условиях Криптона. Когда он чувствует опасность, его фиолетовая кожа начинает светиться, предупреждая других об угрозе.',
            'en': 'Violet Sprinter is one of the most unusual inhabitants of Crypton. Its bright purple coloration appeared as a result of a rare mutation after contact with purple energy crystals that fall on the planet during meteor showers. Despite the fact that it is not particularly intelligent and often behaves cowardly, its main advantage is incredible speed. It can reach speeds of up to 200 kilometers per hour, making it an ideal scout. Its cowardice is actually an instinct for self-preservation that helped it survive in the harsh conditions of Crypton. When it senses danger, its purple skin begins to glow, warning others of the threat.'
        },
        'Зелёный Радист': {
            'ru': 'Зелёный Радист',
            'en': 'Green Radio Operator'
        },
        'mutant1-description': {
            'ru': 'Зелёный Радист - уникальный мутант с двумя мощными антеннами на голове, которые излучают особые сигналы дружелюбия. Его яркий зелёный окрас появился в результате мутации после поглощения редких кристаллов зелёной энергии, найденных в глубинах криптонских пещер. Главная особенность этого мутанта - способность посылать успокаивающие радиосигналы всем окружающим мутантам, значительно повышая их настроение и дружелюбие. Благодаря этому он может создавать гармонию в группе мутантов, снижая агрессию и конфликты. Однако, кроме этой способности, он практически бесполезен - не обладает силой, скоростью или интеллектом. Его часто используют как "живой генератор хорошего настроения" в колониях мутантов, где важна стабильность и мирное сосуществование.',
            'en': 'Green Radio Operator is a unique mutant with two powerful antennas on its head that emit special signals of friendliness. Its bright green coloration appeared as a result of a mutation after absorbing rare green energy crystals found in the depths of Crypton caves. The main feature of this mutant is the ability to send calming radio signals to all surrounding mutants, significantly increasing their mood and friendliness. Thanks to this, it can create harmony in a group of mutants, reducing aggression and conflicts. However, apart from this ability, it is practically useless - it does not possess strength, speed or intelligence. It is often used as a "living mood generator" in mutant colonies where stability and peaceful coexistence are important.'
        },
        'Главная': {
            'ru': 'Главная',
            'en': 'Main'
        },
        'Ферма': {
            'ru': 'Ферма',
            'en': 'Farm'
        },
        'Очки': {
            'ru': 'Очки',
            'en': 'Score'
        },
        'Правила': {
            'ru': 'Правила',
            'en': 'Rules'
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




