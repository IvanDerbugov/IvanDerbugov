// Подключение header.html и footer.html через fetch

function includeHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            if (callback) callback();
        });
}

document.addEventListener('DOMContentLoaded', function() {
    includeHTML('#header-container', '../HTML\'s/header.html', function() {
        // Динамически подключаем DropDownList.js после вставки header
        const script = document.createElement('script');
        script.src = '../JS/DropDownList.js';
        document.body.appendChild(script);
    });
    includeHTML('#footer-container', '../HTML\'s/footer.html');
}); 