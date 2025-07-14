document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.wrapCardGrid .card');
    const seeMoreShowBtn = document.querySelector('.seeMoreShow');
    const seeMoreHideBtn = document.querySelector('.seeMoreHide');
    let expanded = false;

    function updateCards() {
        cards.forEach((card, idx) => {
            if (!expanded && idx > 2) {
                card.classList.add('card-collapsed');
            } else {
                card.classList.remove('card-collapsed');
            }
        });
        if (expanded) {
            seeMoreShowBtn.style.display = 'none';
            seeMoreHideBtn.style.display = 'block';
        } else {
            seeMoreShowBtn.style.display = 'block';
            seeMoreHideBtn.style.display = 'none';
        }
    }

    updateCards();

    seeMoreShowBtn.addEventListener('click', function() {
        expanded = true;
        updateCards();
    });
    seeMoreHideBtn.addEventListener('click', function() {
        expanded = false;
        updateCards();
    });
});
