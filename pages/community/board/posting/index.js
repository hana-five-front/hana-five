import {
  getPostId,
  getLocalStorageItems,
  findLocalStorageItemById,
  submitPost,
  modifyPost,
  getSessionStorageItems,
} from '../../community.js';

let postType = 'board';
let postingButton = document.querySelector('.postingButton');
let postingUsername = document.querySelector('.postingUsername');
postingUsername.innerText = `작성자: ${getSessionStorageItems('userName')}`;
let postId = getPostId();

if (postId != '') {
  let post = findLocalStorageItemById(getLocalStorageItems(postType), postId);
  let titleInput = document.querySelector('.postingInputTitle');
  let contentInput = document.querySelector('.postingInputContext');
  titleInput.value = post.title;

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
