const slides = document.getElementsByClassName('carousel-items')[0];
const slide = document.getElementsByClassName('carousel-item')[0];
const leftButton = document.getElementsByClassName('left-button')[0];
const rightButton = document.getElementsByClassName('right-button')[0];
const resultElement = document.getElementById('result');
const API_KEY = config.apikey;

let number = resultElement.innerText;
const slideWidth = slides.clientWidth;
let currentIndex = 0;

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
