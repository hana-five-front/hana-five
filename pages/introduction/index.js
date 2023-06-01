import { flipImages, makeImageTags, rotateImage } from './utils.js';

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
    makeImageTags(images);
  }, 3000);
};

AOS.init();
main();
