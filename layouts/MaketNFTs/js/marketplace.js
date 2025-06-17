const sampleNFTsItem = document.querySelectorAll('.sampleNFTsItem');
const sampleNFTsItemNumber = document.querySelectorAll('.sampleNFTsItemNumber');

sampleNFTsItem[0].classList.add('activeSample');
sampleNFTsItemNumber[0].classList.add('activeSampleNumber');

sampleNFTsItem.forEach(item => {
    item.addEventListener('click', () => {
        // Убираем классы у всех
        sampleNFTsItem.forEach(i => {
            i.classList.remove('activeSample');
            const num = i.querySelector('.sampleNFTsItemNumber');
            if (num) num.classList.remove('activeSampleNumber');
        });
        // Добавляем классы только выбранному
        item.classList.add('activeSample');
        const number = item.querySelector('.sampleNFTsItemNumber');
        if (number) number.classList.add('activeSampleNumber');
    });
});