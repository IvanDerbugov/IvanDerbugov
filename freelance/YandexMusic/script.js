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

document.addEventListener('DOMContentLoaded', function() {
  const screens = document.querySelector('.screens');
  if (screens) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            screens.classList.add('animate');
            obs.unobserve(entry.target); // Запустить только один раз
          }
        });
      },
      {
        threshold: 0.3 // 30% блока видно — запускаем
      }
    );
    observer.observe(screens);
  }

  // Переключение блоков по точкам
  const blocks = [
    document.querySelector('.controlAll'),
    document.querySelector('.improvingCosts'),
    document.querySelector('.aplicationSettings')
  ];
  const dots = document.querySelectorAll('.pagination-dots .dot');
  let currentIdx = 0;
  function showBlock(idx) {
    blocks.forEach((block, i) => {
      if (block) block.classList.toggle('active', i === idx);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    currentIdx = idx;
  }
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showBlock(idx);
    });
  });
  

  // Свайп для переключения блоков
  let startX = null;
  const swipeZone = blocks[0]?.parentElement; // общий контейнер
  if (swipeZone) {
    swipeZone.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    });
    swipeZone.addEventListener('touchend', function(e) {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 50) {
        if (dx < 0 && currentIdx < blocks.length - 1) {
          showBlock(currentIdx + 1);
        } else if (dx > 0 && currentIdx > 0) {
          showBlock(currentIdx - 1);
        }
      }
      startX = null;
    });
  }

  // Анимация появления блоков
  document.querySelectorAll('.animated-block').forEach(block => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            block.classList.add('animate');
            if (block.classList.contains('features')) {
              block.classList.add('animate'); // для карточек features
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(block);
  });
});
