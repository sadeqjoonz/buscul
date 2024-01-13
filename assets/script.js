document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = Math.floor(slides.length / 2);
    const slideInterval = 5000;
    let autoSlide;

    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateSlider();
        startAutoSlide();
    }

    function startAutoSlide() {
        clearTimeout(autoSlide);
        autoSlide = setTimeout(() => changeSlide(1), slideInterval);
    }

    function stopAutoSlide() {
        clearTimeout(autoSlide);
    }

    function setupClickHandlers() {
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            });
        });
    }

    function updateSlider() {
        slides.forEach((slide, index) => {
            const offset = index - currentIndex;
            const scaleFactor = offset === 0 ? 1.2 : 1 / (Math.abs(offset) + 1);
            const zIndex = offset === 0 ? 2 : 1;

            slide.style.zIndex = zIndex;
            slide.classList.toggle('active', offset === 0);

            if (offset === 0) {
                slide.style.transform = `translateX(-50%) scale(${scaleFactor})`;
            } else {
                const direction = offset < 0 ? -1 : 1;
                const distance = Math.abs(offset) * 100;
                slide.style.transform = `translateX(${direction * (distance + 10)}%) scale(${scaleFactor})`;
            }

            slide.setAttribute('tabindex', offset === 0 ? 0 : -1);
        });
    }

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', () => { stopAutoSlide(); changeSlide(-1); });
    nextButton.addEventListener('click', () => { stopAutoSlide(); changeSlide(1); });

    document.addEventListener('keydown', (event) => {
        stopAutoSlide();
        if (event.key === 'ArrowLeft') changeSlide(-1);
        else if (event.key === 'ArrowRight') changeSlide(1);
    });

    slider.addEventListener('click', () => stopAutoSlide());

    setupClickHandlers();
    startAutoSlide();
    updateSlider();
});










var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });