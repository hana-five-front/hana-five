import { flipImages, makeImageTags, rotateImage } from './utils.js';

const main = () => {
  const images = [
    '/public/images/별돌이1.png',
    '/public/images/별돌이2.png',
    '/public/images/별돌이3.png',
    '/public/images/별돌이4.png',
    '/public/images/별돌이5.png',
    '/public/images/별돌이6.jpeg',
  ];

  makeImageTags(images);

  setInterval(() => {
    rotateImage(images);
    makeImageTags(images);
  }, 3000);
};

main();
