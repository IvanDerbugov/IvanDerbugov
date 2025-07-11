document.addEventListener('DOMContentLoaded', function() {
    const tariffs = document.querySelectorAll('.tariff');
    tariffs.forEach(tariff => {
        tariff.addEventListener('click', function() {
            tariffs.forEach(t => t.classList.remove('tariff-active'));
            this.classList.add('tariff-active');
        });
    });
});
