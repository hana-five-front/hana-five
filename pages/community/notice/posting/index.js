import {
  findLocalStorageItemById,
  getLocalStorageItems,
  getPostId,
  modifyPost,
  submitPost,
} from '../../community.js';

let postType = 'notice';
let postingButton = document.querySelector('.postingButton');

let postId = getPostId();

if (postId != '') {
  let post = findLocalStorageItemById(getLocalStorageItems(postType), postId);
  let titleInput = document.querySelector('.postingInputTitle');
  let contentInput = document.querySelector('.postingInputContext');

  titleInput.value = post.title;
  contentInput.value = post.content;

  postingButton.addEventListener('click', function (event) {
    event.preventDefault();
    modifyPost(postType, postId);
  });
} else {
  postingButton.addEventListener('click', function (event) {
    event.preventDefault();
    submitPost(postType);
  });
}
