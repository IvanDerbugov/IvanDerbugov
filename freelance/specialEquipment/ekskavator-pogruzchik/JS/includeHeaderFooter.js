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
    includeHTML('#header-container', 'HTML/header.html', function() {
        // Динамически подключаем DropDownList.js после вставки header
        const script1 = document.createElement('script');
        script1.src = 'JS/DropDownList.js';
        document.body.appendChild(script1);

        // Динамически подключаем burgerMenu.js после вставки header
        const script2 = document.createElement('script');
        script2.src = 'JS/burgerMenu.js';
        document.body.appendChild(script2);
    });
    includeHTML('#footer-container', 'HTML/footer.html');
}); 