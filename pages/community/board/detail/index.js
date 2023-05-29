import {
  renderPost,
  getPostId,
  deletePost,
  submitComment,
  redirectTo,
  getSessionStorageItems,
} from '../../community.js';

const postType = 'board';

const modifyBtn = document.querySelector('.modifyBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const submitCommentBtn = document.querySelector('.submitCommentBtn');

renderPost(postType);
let postingUsername = document.querySelector('.postingUsername');
postingUsername.innerText = `${getSessionStorageItems('userName')}`;
if (!getSessionStorageItems('userName')) {
  let commentComponent = document.querySelector('.detailCommentInput');
  commentComponent.style.display = 'none';
}

modifyBtn.addEventListener('click', function () {
  redirectTo('posting/index', getPostId());
});

deleteBtn.addEventListener('click', function () {
  deletePost(postType);
});

submitCommentBtn.addEventListener('click', function () {
  submitComment(postType);
});
