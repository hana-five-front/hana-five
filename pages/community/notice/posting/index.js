import { submitPost } from '../../community.js';

let postType = 'noticePosts';
let postingButton = document.querySelector('.postingButton');

postingButton.addEventListener('click', function (event) {
  event.preventDefault();
  submitPost(postType);
});
