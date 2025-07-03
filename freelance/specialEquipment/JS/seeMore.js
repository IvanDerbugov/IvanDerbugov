document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.wrapCardGrid .card');
    const seeMoreBtn = document.querySelector('.seeMore');
    let expanded = false;

    function updateCards() {
        cards.forEach((card, idx) => {
            if (!expanded && idx > 2) {
                card.classList.add('card-collapsed');
            } else {
                card.classList.remove('card-collapsed');
            }
        });
        seeMoreBtn.textContent = expanded ? 'Скрыть' : 'Посмотреть все модели';
    }

    updateCards();

    seeMoreBtn.addEventListener('click', function() {
        expanded = !expanded;
        updateCards();
    });
});
