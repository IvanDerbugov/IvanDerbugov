alert('Запустили более сложный скрипт - case&question.js')  //можно убрать
function strNotEmpty(whatWrite) {
    let str

    function checkPrompt() {
        return str === '' || str === null
    }

    do {
        str = prompt('Напишите ' + whatWrite, '') 

        checkPrompt() ? alert('Напишите ' + whatWrite + '!') : null
        // или
        // checkPrompt() && alert('Напишите ' + whatWrite + '!')

    } while (checkPrompt())
    return str
}

const firstName = strNotEmpty ('имя')

const lastName = strNotEmpty ('фамилию')

const patronymic = strNotEmpty ('отчество')

let age
do { //весь сыр-бор что-бы корректно обрабатывало "мне 24 года", parseint выдал бы NaN
    let input = strNotEmpty('сколько вам лет')
    let matchResult = input.match(/\d+/)  //если цифр не нашёл - вернёт null
    // console.log('тип рег. выраж.: ', typeof(matchResult))
    
    
    switch (matchResult) {
        case null:
            alert('Напишите цифрами сколько вам лет!');
            age = 0;
            break

        default:
            age = Number(matchResult[0]);
            break
    }
    // или
    // age = (matchResult !== null) ? Number(matchResult[0]) : (alert('Напишите цифрами сколько вам лет!'), 0)
    
} while (age === 0)
// console.log('age: ', typeof(age))
// console.log('age: ', age)

const gender_M = confirm ('ваш пол мужской?')
const genderForAlert = (gender_M && 'мужчинский') || 'женский'
// но тут лучше, конечно, вот так:
// const genderForAlert = gender_M ? 'мужчинский' : 'женский'


function getDaysInYear(year) {
    return (year % 4 === 0) ? 366 : 365 
    // или
    // return ((year % 4 === 0) && 366) || 365
}
// console.log('дней в году: ', getDaysInYear(2025))
// console.log(typeof(getDaysInYear(2025)))

function calcAgeInDays(age) {
    let ageInDays = 0
    const yearNow = new Date().getFullYear()
    // console.log('yearNow: ', yearNow)
    const yearBirth = yearNow - age
    const arrYears = []
    for (let i = (yearNow - 1); i >= yearBirth; i--) {
        arrYears.push(i)
    }// заполнили массив всеми годами жизни
    // console.log('года жизни: ', arrYears)

    arrYears.forEach(year => {
        ageInDays += getDaysInYear(year)
    });
    // console.log('ageInDays: ', ageInDays)

    return ageInDays
}


const ageInDays = calcAgeInDays(age)
// console.log('ageInDays: ', ageInDays)






const havePension = gender_M ? 
                    (age >= 63) ?
                        'да'
                        :
                        'нет'
                    :
                    
                    (age >= 58) ?
                        'да'
                        :
                        'нет'

// или
// let havePension
// switch (gender_M) {
 
//  case true:
//   havePension = age >= 63 ? 'да' : 'нет'
//   break

//  case false:
//   havePension = age >= 58 ? 'да' : 'нет'
// }
// console.log('havePension: ', havePension)

alert (`Ваше ФИО: ${firstName} ${lastName} ${patronymic}
        Ваш возраст в годах: ${age}
        Ваш возраст в днях: ${ageInDays} (с учётом высокосных лет)
        через 5 лет вам будет: ${(age + 5)}
        Ваш пол: ${genderForAlert}
        Вы на пенсии: ${havePension}`)