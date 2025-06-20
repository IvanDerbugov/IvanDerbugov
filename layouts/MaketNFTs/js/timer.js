const deadline = new Date('2025-07-20T00:00:00');

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
    const now = new Date();
    let totalSeconds = Math.floor((deadline - now) / 1000);

    if (totalSeconds < 0) {totalSeconds = 0};

    let hours = Math.floor(totalSeconds / 3600); //поделили на часы, получили количествово часов, остаток отбросили
    let minutes = Math.floor((totalSeconds % 3600) / 60); //поделили на часы и что не поделилось - минуты
    let seconds = totalSeconds % 60; //количество секунд, оставшихся после вычитания полных минут

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

function tick() {
    updateTimer();
    // Если время вышло — останавливаем таймер
    if ((deadline - new Date()) <= 0) {
        clearInterval(timerInterval);
    }
}

updateTimer(); // начальная отрисовка
const timerInterval = setInterval(tick, 1000);