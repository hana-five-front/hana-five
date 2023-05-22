import { submitPost } from '../../community.js';

let postType = 'boardPosts';
let postingButton = document.querySelector('.postingButton');
const loginBtn = document.querySelector('#login');
const writeBtn = document.querySelector('.postingSubject');

postingButton.addEventListener('click', function (event) {
  event.preventDefault();
  submitPost(postType);
});
