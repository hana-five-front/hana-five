const LOGO_TRANSPARENT =
  'https://user-images.githubusercontent.com/88099590/243233646-7ed71c7e-7040-4ea1-a213-70b1442cc270.png';
const LOGO_WHITE =
  'https://user-images.githubusercontent.com/88099590/243233655-037fb19f-d8b6-421a-81e8-81dc841419f5.png';
const MENU_TRANSPARENT = '/public/images/header.svg';
const MENU_WHITE = '/public/images/headerWhite.svg';

const slides = document.getElementsByClassName('carousel-items')[0];
const slide = document.getElementsByClassName('carousel-item')[0];
const leftButton = document.getElementsByClassName('left-button')[0];
const rightButton = document.getElementsByClassName('right-button')[0];
const resultElement = document.getElementById('result');
const slideList = document.querySelector('.carousel-items');

let number = resultElement.innerText;
let slideWidth = slides.clientWidth;
let currentIndex = 0;
let slidesLength = slides.children.length;

let clonedFirst = slideList.firstElementChild.cloneNode(true);
let clonedLast = slideList.lastElementChild.cloneNode(true);

const INTERVAL_TIME = 5000;

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

function goToSlide(index) {
  resultElement.innerText = number;
  slideWidth = slides.clientWidth;
  slides.style.transform = 'translateX(' + -slideWidth * index + 'px)';
  currentIndex = index;
}

const autoSlideHandler = () => {
  if (currentIndex <= slidesLength + 2) {
    slides.style.transition = 'transform 0.3s ease';
    number = parseInt(number) < 4 ? parseInt(number) + 1 : parseInt(1);
    goToSlide(currentIndex + 1);
  }
  if (currentIndex == slidesLength + 2) {
    setTimeout(
      function () {
        slides.style.transition = 'transform 0.3s ease';
        slides.style.transform = 'translateX(' + -slideWidth + 'px)';
        number = 2;
        resultElement.innerText = number;
      },
      [300]
    );
    slides.style.transition = '0ms';
    goToSlide(1);
    number = 2;
    resultElement.innerText = number;
    currentIndex = 1;
  }
};
let slideInterval = setInterval(autoSlideHandler, [INTERVAL_TIME]);

leftButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    number = parseInt(number) > 1 ? parseInt(number) - 1 : parseInt(4);
    goToSlide(currentIndex - 1);
  } else if (currentIndex == 0) {
    slides.style.transition = '0ms';
    slides.style.transform = 'translateX(' + -slideWidth * slidesLength + 'px)';
    number = 4;
    resultElement.innerText = number;
    currentIndex = slidesLength + 1;
    setTimeout(() => {
      slides.style.transition = 'transform 0.3s ease';
      goToSlide(3);
    }, 0);
  }
  resetInterval();
});

rightButton.addEventListener('click', () => {
  if (currentIndex <= slidesLength + 2) {
    slides.style.transition = 'transform 0.3s ease';
    number = parseInt(number) < 4 ? parseInt(number) + 1 : parseInt(1);
    goToSlide(currentIndex + 1);
  }
  if (currentIndex == slidesLength + 2) {
    setTimeout(
      function () {
        slides.style.transition = 'transform 0.3s ease';
        slides.style.transform = 'translateX(' + -slideWidth + 'px)';
        number = 2;
        resultElement.innerText = number;
      },
      [300]
    );
    slides.style.transition = '0ms';
    goToSlide(1);
    number = 2;
    resultElement.innerText = number;
    currentIndex = 1;
  }
  resetInterval();
});

const resetSlideWidth = () => {
  resetInterval();
  slides.style.transform = 'translateX(' + -slideWidth + 'px)';
};

const resetInterval = () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(autoSlideHandler, INTERVAL_TIME);
};

const setHeaderWhite = () => {
  document.querySelector('#header').classList.remove('transparent');
  setHeaderLogo(LOGO_TRANSPARENT);
  setMenuImg(MENU_TRANSPARENT);
};

const setHeaderTransparent = () => {
  document.querySelector('#header').classList.add('transparent');
  setHeaderLogo(LOGO_WHITE);
  setMenuImg(MENU_WHITE);
};

const setMenuImg = src => {
  document.querySelector('#menuButton').src = src;
};

const setHeaderLogo = src => {
  document.querySelector('#headerLogoImg').src = src;
};

const setTransparentLogo = $target => {
  $target.classList.add('transparentLogo');
};

const setLogoToWhite = $target => {
  $target.classList.remove('transparentLogo');
};

let carouselHeight = 64;
const setLogoByScreenWidth = () => {
  if (window.innerWidth > 1210 || window.scrollY > carouselHeight) {
    setHeaderWhite();
  } else {
    setHeaderTransparent();
  }
};

const observeScreenResizeEvent = () => {
  window.addEventListener('resize', () => {
    slideWidth = slides.clientWidth;
    resetSlideWidth();
    setLogoByScreenWidth();
  });
};

window.addEventListener('load', () => {
  setLogoByScreenWidth();
  document.addEventListener('scroll', setLogoByScreenWidth);
});

observeScreenResizeEvent();
