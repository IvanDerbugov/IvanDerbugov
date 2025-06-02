const btn = document.querySelectorAll('.miniImgsCard button');

btn.forEach(btn => {
    btn.onclick = () => {
        btn.classList.add('active')
    }
})