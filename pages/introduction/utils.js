const CLASS_FADE_OUT = 'animationHidden';
const CLASS_FADE_IN = 'animationFadeIn';

export const setFadeIn = $target => {
  $target.classList.add(CLASS_FADE_IN);
  $target.classList.remove(CLASS_FADE_OUT);
};

export const setFadeOut = $target => {
  $target.classList.add(CLASS_FADE_OUT);
  $target.classList.remove(CLASS_FADE_IN);
};

export const rotateImage = arr => {
  return arr.unshift(arr.pop());
};

export const flipImages = arr => {
  [arr[0], arr[4]] = [arr[4], arr[0]];
  [arr[1], arr[5]] = [arr[5], arr[1]];
  [arr[2], arr[3]] = [arr[3], arr[2]];

  return arr;
};

export const makeImageTags = images => {
  let tagString = '';
  images.forEach(image => (tagString += imgTagTemplate(image)));

  document.querySelector('.imagesContainer').innerHTML = tagString;
};

const imgTagTemplate = src => `<img src="${src}" />`;
