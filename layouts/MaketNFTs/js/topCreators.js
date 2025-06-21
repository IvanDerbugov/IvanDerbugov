const periodTimeItems = document.querySelectorAll('.periodTime > div');


// Устанавливаем "Today" как активный по умолчанию
if (periodTimeItems.length > 0) {
    const firstP = periodTimeItems[0].querySelector('p');
    if (firstP) {
        firstP.classList.add('active');
    }
}

periodTimeItems.forEach(item => {
    item.addEventListener('click', () => {
        // Удаляем класс 'active' со всех элементов
        periodTimeItems.forEach(i => {
            const p = i.querySelector('p');
            if (p) {
                p.classList.remove('active');
            }
        });
        // Добавляем класс 'active' к нажатому элементу
        const clickedP = item.querySelector('p');
        if (clickedP) {
            clickedP.classList.add('active');
        }
    });
});