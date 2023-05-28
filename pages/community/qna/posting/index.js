import {
  getPostId,
  getLocalStorageItems,
  findLocalStorageItemById,
  submitPost,
  modifyPost,
  getSessionStorageItems,
} from '../../community.js';

let postType = 'qna';
let postingButton = document.querySelector('.postingButton');

let postId = getPostId();
let postingUsername = document.querySelector('.postingUsername');
postingUsername.innerText = `작성자: ${getSessionStorageItems('userName')}`;
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
  post.content = post.content.map(e => e + '\n').join('');
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
