import { renderPost, submitComment } from '../../community.js';

const postType = 'notice';
const detailCommentSubmit = document.querySelector('.detailCommentSubmit');

renderPost(postType);

detailCommentSubmit.addEventListener('click', function () {
  submitComment(postType);
});
