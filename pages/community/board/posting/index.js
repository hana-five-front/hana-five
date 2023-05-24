import {
  getPostId,
  getLocalStorageItems,
  findLocalStorageItemById,
  submitPost,
  modifyPost,
} from '../../community.js';

let postType = 'board';
let postingButton = document.querySelector('.postingButton');

let postId = getPostId();

if (postId != '') {
  let post = findLocalStorageItemById(getLocalStorageItems(postType), postId);
  let titleInput = document.querySelector('.postingInputTitle');
  let nameInput = document.querySelector('.postingInputName');
  let contentInput = document.querySelector('.postingInputContext');

  titleInput.value = post.title;
  if (post.name == '익명') {
    nameInput.value = '';
  } else {
    nameInput.value = post.name;
  }
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
