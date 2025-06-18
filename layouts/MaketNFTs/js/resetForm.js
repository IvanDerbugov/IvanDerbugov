document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function() {
            setTimeout(() => form.reset(), 100); // Очищаем форму чуть позже, чтобы не мешать отправке
        });
    });
});
