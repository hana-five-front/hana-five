import {
  renderPost,
  submitComment,
  getSessionStorageItems,
  asideHighLighter,
} from '../../community.js';

const postType = 'notice';

const submitCommentBtn = document.querySelector('.submitCommentBtn');

asideHighLighter(postType);

renderPost(postType);

let postingUsername = document.querySelector('.postingUsername');
postingUsername.innerText = `${getSessionStorageItems('userName')}`;
if (!getSessionStorageItems('userName')) {
  let commentComponent = document.querySelector('.detailCommentInput');
  commentComponent.style.display = 'none';
}

submitCommentBtn.addEventListener('click', function () {
  submitComment(postType);
});
