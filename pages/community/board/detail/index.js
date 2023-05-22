import { renderPost, submitComment } from '../../community.js';

const postType = 'boardPosts';
const detailCommentSubmit = document.querySelector('.detailCommentSubmit');

renderPost(postType);

detailCommentSubmit.addEventListener('click', function () {
  submitComment(postType);
});
