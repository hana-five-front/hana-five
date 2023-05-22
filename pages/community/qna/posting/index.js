import { submitPost } from '../../community.js';

let postType = 'qna';
let postingButton = document.querySelector('.postingButton');

postingButton.addEventListener('click', function (event) {
  event.preventDefault();
  submitPost(postType);
});
