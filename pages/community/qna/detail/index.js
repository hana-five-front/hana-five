import { renderPost, submitComment } from '../../community.js';

const postType = 'qnaPosts';
const detailCommentSubmit = document.querySelector('.detailCommentSubmit');

renderPost(postType);

detailCommentSubmit.addEventListener('click', function () {
  submitComment(postType);
});
