function showForm() {
    document.getElementById('form').style.display = 'block';
}

function processForm() {
    let textarea = document.getElementById('text'); // получаем элемент textarea
    let text = textarea.value; // используем .value для textarea
    let numbers = text.match(/\d+/g); // находим все числа
    console.log('Найденные числа:', numbers);

    if (numbers && numbers.length > 0) {
        // Преобразуем строки в числа и вычисляем среднее
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += parseInt(numbers[i]);
        }
        let average = Math.round(sum / numbers.length);
        console.log('Среднее арифметическое:', average);
        let result = document.getElementById('result');
        result.innerHTML = `Средний показатель вашего беспокойства: ${average}`;
        let recommendation = document.getElementById('recommendation');

        showForm();
        if (average >= 1 && average <= 3) {
            recommendation.innerHTML = 'В наше жизни стресс не избежен, ваша тревожность в норме.';
        } else if (average >= 4 && average <= 7) {
            recommendation.innerHTML = 'У вас повышенная тревожность, вам лучше обратиться к психологу.';
        } else if (average >= 8 && average <= 10) {
            recommendation.innerHTML = 'У вас высокая тревожность, вам немедленно нужно обратиться к психологу.';
        }
        else if (average > 10 || average < 1) {
            recommendation.innerHTML = 'Вы ввели некорректные данные, попробуйте еще раз.';
            document.getElementById('form').style.display = 'none';
        }


    } else {
        let result = document.getElementById('result');
        let recommendation = document.getElementById('recommendation');
        result.innerHTML = 'Оценки не найдены в тексте';
        recommendation.innerHTML = 'Пожалуйста, введите текст с оценками от 1 до 10';
        console.log('Числа не найдены');
    }

    textarea.value = ''; // очищаем textarea
}

// Обработчик клика по кнопке
document.getElementById('button').addEventListener('click', processForm);

document.getElementById('button-send-form').addEventListener('click', () => {
    alert('Спасибо за вашу заявку!');
    // document.getElementById('form').style.display = 'none';
});