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

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

function goToSlide(index) {
  resultElement.innerText = number;
  slides.style.transform = 'translateX(' + -slideWidth * index + 'px)';
  currentIndex = index;
}

leftButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    number = parseInt(number) - 1;
    goToSlide(currentIndex - 1);
  } else if (currentIndex == 0) {
    number = parseInt(4);
    goToSlide(3);
  }
});

rightButton.addEventListener('click', () => {
  if (currentIndex < slides.children.length - 1) {
    number = parseInt(number) + 1;
    goToSlide(currentIndex + 1);
  } else if (currentIndex == 3) {
    number = parseInt(1);
    goToSlide(0);
  }
});

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

let slideInterval = setInterval(autoSlideHandler, [5000]);

const observeScreenResizeEvent = () => {
  window.addEventListener('resize', () => {
    slideWidth = slides.clientWidth;
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlideHandler, 5000);
    slides.style.transform = 'translateX(' + -slideWidth + 'px)';
  });
};

observeScreenResizeEvent();
