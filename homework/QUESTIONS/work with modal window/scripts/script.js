const buttonElem = document.querySelector('.section__button')
const modalElem = document.querySelector('.modal')

modalElem.style.cssText = `
display: flex;
visibility: hidden;
opacity: 0;
transition: opacity 300ms ease-in-out;
`;

const openModel = () => {
modalElem.style.visibility = 'visible';
modalElem.style.opacity = 1;
}

buttonElem.addEventListener('click', openModel)