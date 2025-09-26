document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('slides');
  const slideNodes = Array.from(document.querySelectorAll('.slide'));
  const menuLinks = document.querySelectorAll('.menu a');
  const dotsContainer = document.getElementById('dots');
  const TOTAL = slideNodes.length;

  let index = 0;
  let intervalId = null;
  const INTERVAL_MS = 5000; // cada 5 segundos

  // Crear dots dinámicamente
  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Mover al slide deseado
  function goToIndex(i) {
    index = i;
    slidesContainer.style.transition = 'transform 0.8s cubic-bezier(.22,.9,.32,1)';
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  // Siguiente slide automático
  function nextSlide() {
    if (index < TOTAL - 1) {
      index++;
      goToIndex(index);
    } else {
      index = 0;
      slidesContainer.style.transition = 'none'; // sin animación para el salto
      slidesContainer.style.transform = `translateX(0%)`;
      updateDots();

      requestAnimationFrame(() => {
        slidesContainer.style.transition = 'transform 0.8s cubic-bezier(.22,.9,.32,1)';
      });
    }
  }

  // autoplay
  function startAuto() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, INTERVAL_MS);
  }
  function stopAuto() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Clicks en menú (solo primeros 4)
  menuLinks.forEach((a, i) => {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (i > 3) return; // ignorar "Más" y "Blog"
      goToIndex(i);
      stopAuto();
      startAuto();
    });
  });

  // Clicks en dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const dotIndex = parseInt(dot.dataset.index);
      goToIndex(dotIndex);
      stopAuto();
      startAuto();
    });
  });

  // Pausa cuando el mouse está encima (opcional)
  const bannerSlider = document.getElementById('banner-slider');
  bannerSlider.addEventListener('mouseenter', stopAuto);
  bannerSlider.addEventListener('mouseleave', startAuto);

  // Init
  slidesContainer.style.transform = `translateX(0%)`;
  startAuto();
});