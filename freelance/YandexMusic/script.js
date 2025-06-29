const swiper = new Swiper('.reviews-swiper', {
  slidesPerView: 3,
  spaceBetween: 24,
  centeredSlides: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Можно добавить breakpoints для адаптива
});
