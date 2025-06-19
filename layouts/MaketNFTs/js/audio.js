const audioRocket = document.querySelectorAll('.audioRocket');

audioRocket.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/rocket.mp3');
        audio.play();
    });
});



const audioTo_index = document.querySelectorAll('.audioTo_index');

audioTo_index.forEach(button => {
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


const audioCash = document.querySelectorAll('.audioCash');

audioCash.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/cash2.mp3');
        audio.play();
    });
});


const audioTopor = document.querySelectorAll('.audioTopor');

audioTopor.forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('audio/topor.mp3');
        audio.play();
    });
});

