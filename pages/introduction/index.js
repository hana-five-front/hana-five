import { makeImageTags, rotateImage, setFadeIn, setFadeOut } from './utils.js';

const main = () => {
  const images = [
    '/public/images/분위기1.png',
    '/public/images/분위기2.png',
    '/public/images/분위기3.png',
    '/public/images/분위기4.png',
    '/public/images/분위기5.png',
    '/public/images/분위기6.png',
  ];

  makeImageTags(images);

  setInterval(() => {
    rotateImage(images);
    setFadeOut(document.querySelector('.imagesContainer'));

    setTimeout(() => {
      makeImageTags(images);
      setFadeIn(document.querySelector('.imagesContainer'));
    }, 300);
  }, 3000);
};

AOS.init();
main();
