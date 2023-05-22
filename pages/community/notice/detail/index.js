import { renderPost, deletePost, submitComment } from '../../community.js';

const postType = 'notice';
const modifyBtn = document.querySelector('.modifyBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const detailCommentSubmit = document.querySelector('.detailCommentSubmit');

renderPost(postType);

modifyBtn.addEventListener('click', function () {
  submitComment(postType);
});

deleteBtn.addEventListener('click', function () {
  deletePost(postType);
});

detailCommentSubmit.addEventListener('click', function () {
  submitComment(postType);
});
