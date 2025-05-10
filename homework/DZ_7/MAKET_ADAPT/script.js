const btnJS = document.getElementById('btn')
const closeJS = document.getElementById('close')
const VSportJS = document.getElementsByClassName('VSport')


btnJS.addEventListener('click', () => {
    VSportJS[0].style.cssText = `
    display: block;
    position: fixed;
    `;
})

closeJS.addEventListener('click', () => {
    VSportJS[0].style.display = 'none';
})