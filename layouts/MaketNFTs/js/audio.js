const audioRocket = document.querySelectorAll('.audioRocket');

audioRocket.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/rocket.mp3');
        audio.play();
    });
});



const audiTo_index = document.querySelectorAll('.audiTo_index');

audiTo_index.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/to_index.mp3');
        audio.play();
    });
});



const audiEye = document.querySelectorAll('.audiEye');

audiEye.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/eye.mp3');
        audio.play();
    });
});

