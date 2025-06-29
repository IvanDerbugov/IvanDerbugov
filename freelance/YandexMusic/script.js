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
  // Анимации для SVG иконок
  const svgIcons = document.querySelectorAll('svg');
  
  // Случайные анимации при загрузке
  svgIcons.forEach((svg, index) => {
    setTimeout(() => {
      svg.style.animationDelay = `${index * 0.1}s`;
    }, index * 50);
  });

  // Интерактивные эффекты для SVG
  svgIcons.forEach(svg => {
    svg.addEventListener('mouseenter', function() {
      // Добавляем только pulse и bounce, убираем rotate
      const effects = ['pulse', 'bounce'];
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      
      // Убираем предыдущие анимации
      this.style.animation = 'none';
      this.offsetHeight; // Trigger reflow
      
      // Применяем новую анимацию
      this.style.animation = `${randomEffect} 0.6s ease-in-out`;
      // Звук убран по требованию заказчика
    });

    svg.addEventListener('mouseleave', function() {
      this.style.animation = '';
    });

    // Клик эффект
    svg.addEventListener('click', function() {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Эффект частиц
      createParticles(this);
    });
  });

  // Функция создания частиц
  function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #AA80EC;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${centerX}px;
        top: ${centerY}px;
        animation: particle 0.8s ease-out forwards;
      `;

      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;

      particle.style.setProperty('--end-x', endX + 'px');
      particle.style.setProperty('--end-y', endY + 'px');

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }

  // Функция звукового эффекта
  function playHoverSound() {
    // Создаем простой звук через Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Игнорируем ошибки аудио
    }
  }

  // Анимация для кнопок скачивания
  const downloadButtons = document.querySelectorAll('.downloadBtns button');
  downloadButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.filter = 'drop-shadow(0 0 15px #AA80EC) brightness(1.5)';
        svg.style.transform = 'scale(1.2) rotate(-10deg)';
      }
    });

    button.addEventListener('mouseleave', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.filter = '';
        svg.style.transform = '';
      }
    });
  });

  // Анимация для соцсетей
  const socialLinks = document.querySelectorAll('.linksToSocial a');
  socialLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        // Только pulse и bounce, без rotate
        const effects = [
          'pulse 0.6s ease-in-out',
          'pulse 0.6s ease-in-out',
          'bounce 0.8s ease-in-out',
          'pulse 0.6s ease-in-out'
        ];
        svg.style.animation = effects[index] || effects[0];
        svg.style.filter = 'drop-shadow(0 0 20px #AA80EC) brightness(1.3)';
      }
    });

    link.addEventListener('mouseleave', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.animation = '';
        svg.style.filter = '';
      }
    });
  });

  // Анимация для логотипа
  const logos = document.querySelectorAll('header .top svg, footer .top svg');
  logos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 0.8s ease-in-out';
      this.style.filter = 'drop-shadow(0 0 20px #AA80EC) brightness(1.4)';
      
      // Анимация внутренних элементов
      const circle = this.querySelector('circle');
      const paths = this.querySelectorAll('path');
      
      if (circle) {
        circle.style.fill = '#B1BFFE';
        circle.style.animation = 'glow 1.2s ease-in-out infinite';
      }
      
      paths.forEach(path => {
        path.style.stroke = '#fff';
        path.style.strokeWidth = '5';
      });
    });

    logo.addEventListener('mouseleave', function() {
      this.style.animation = '';
      this.style.filter = '';
      
      const circle = this.querySelector('circle');
      const paths = this.querySelectorAll('path');
      
      if (circle) {
        circle.style.fill = '';
        circle.style.animation = '';
      }
      
      paths.forEach(path => {
        path.style.stroke = '';
        path.style.strokeWidth = '';
      });
    });
  });

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
  setTimeout(() => {
    stop();
  }, (1000 * 60 * 5));
  function stop () {
    alert('В данной версии просмотр остановлен');
    stop() 
  }


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
    // Отключаем анимацию для .improvingCosts при каждом показе
    if (blocks[1]) blocks[1].classList.remove('animate');
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
    // Возвращаем анимацию для .controlAll
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

// Добавляем CSS для частиц
const style = document.createElement('style');
style.textContent = `
  @keyframes particle {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
