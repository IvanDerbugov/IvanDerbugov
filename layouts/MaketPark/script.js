const modalController = ({modal, btnOpen, btnClose}) => {
    const buttonElems = document.querySelectorAll(btnOpen)
    const modalElem = document.querySelector(modal)

    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;

    const closeModel = event => {
    const target = event.target; //хрен его знает что за event

        if(target === modalElem || target.closest(btnClose)) { //хрен его знает что за target.closest
        modalElem.style.opacity = 0;

        setTimeout(() => {
            modalElem.style.visibility = 'hidden';
        }, 300)
        }
    }

    const openModel = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    }

    buttonElems.forEach(btn =>{
    btn.addEventListener('click', openModel);
    });
    modalElem.addEventListener('click', closeModel);
 }

 modalController({
    modal: '.modal',
    btnOpen: '.btnCallUs',
    btnClose: '#close'
     })