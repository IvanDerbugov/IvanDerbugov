function strNotEmpty(whatWrite) {
    let str

    function checkPrompt() {
        return str === '' || str === null
    }

    do {
        str = prompt('Напишите ' + whatWrite, '')
        if (checkPrompt()) { 
            alert('Напишите ' + whatWrite + '!') //можно убрать
        }
    } while (checkPrompt())
    return str
}

const firstName = strNotEmpty ('имя')

const lastName = strNotEmpty ('фамилию')

const patronymic = strNotEmpty ('отчество')

let age
do { //весь сыр-бор что-бы корректно обрабатывало "мне 24 года", parseint выдал бы NaN
    let input = strNotEmpty('сколько вам лет')
    let matchResult = input.match(/\d+/) //если цифр не нашёл - вернёт null
    // console.log('тип рег. выраж.: ', typeof(matchResult))
    if (matchResult !== null) {
        age = Number(matchResult[0])
    } else {
        alert('Напишите цифрами сколько вам лет!') //можно убрать
        age = 0
    }
} while (age === 0)
// console.log('age: ', typeof(age))
// console.log('age: ', age)

const gender_M = confirm ('ваш пол мужской?')
let genderForAlert 
if (gender_M) {genderForAlert = 'мужчинский'}
else {genderForAlert = 'женский'}


function getDaysInYear(year) {
    if (year % 4 === 0) {
        return 366
    }
    else {
        return 365
    }
}
// console.log('дней в году: ', getDaysInYear(2025))
// console.log(typeof(getDaysInYear(2025)))

function calcAgeInDays(age) {
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
    console.log('ageInDays: ', ageInDays)

    return ageInDays
}


const ageInDays = calcAgeInDays(age)
// console.log('ageInDays: ', ageInDays)






let havePension
if (gender_M) {
    if (age >= 63) {havePension = 'да'}
    else havePension = 'нет'
}
else {
    if (age >= 58) {havePension = 'да'}
    else havePension = 'нет'
}
// console.log('havePension: ', havePension)


alert('Ваше ФИО: ' + firstName + ' ' + lastName + ' ' + patronymic + '\n' /*1*/ + 'Ваш возраст в годах: ' + age + '\n' /*2*/ + 'Ваш возраст в днях: ' +  ageInDays + ' (с учётом высокосных лет)' + '\n' /*3*/ + 'через 5 лет вам будет: ' + (age + 5) + '\n' /*4*/ + 'Ваш пол: ' + genderForAlert + '\n' /*5*/ + 'Вы на пенсии: ' + havePension /*Zhenya-gad😓*/)