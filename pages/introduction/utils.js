export const setFadeIn = $target => {
  const hideClass = 'animationHidden';
  const fadeInClass = 'animationFadeIn';
  $target.classList.add(hideClass);
  $target.classList.remove(fadeInClass);

  setTimeout(() => {
    $target.classList.add(fadeInClass);
    $target.classList.remove(hideClass);
  }, 100);
};

export const flipImages = arr => {
  [arr[0], arr[4]] = [arr[4], arr[0]];
  [arr[1], arr[5]] = [arr[5], arr[1]];
  [arr[2], arr[3]] = [arr[3], arr[2]];

  return arr;
};

export const makeImageTags = images => {
  const $imagesContainer = document.querySelector('.imagesContainer');
  let tagString = '';
  for (const image of images) {
    tagString += imgTagTemplate(image);
  }
  setFadeIn($imagesContainer);

  $imagesContainer.innerHTML = tagString;
};

const imgTagTemplate = src =>
  `<img src="${src}" alt="별돌이"width="300px" height="300px" />`;
