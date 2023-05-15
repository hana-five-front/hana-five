const slides = document.getElementsByClassName("fixed-carousel")[0];
const slide = document.getElementsByClassName(".list-calousel")[0];
const leftButton = document.getElementsByClassName("left-button")[0];
const rightButton = document.getElementsByClassName("right-button")[0];

const slideWidth = slides.clientWidth;
let currentIndex = 0;

function goToSlide(index) {
  console.log(slideWidth);
  slides.style.transform = `translateX(-${slideWidth * index}rem`;
  currentIndex = index;
}

leftButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
});

rightButton.addEventListener("click", () => {
  if (currentIndex < slides.children.length - 1) {
    goToSlide(currentIndex + 1);
  }
});
