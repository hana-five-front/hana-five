export function renderPost(postType) {
  let detailTitle = document.querySelector('.detailTitle');
  let detailWriter = document.querySelector('.detailWriter');
  let detailDate = document.querySelector('.detailDate');
  let detailContext = document.querySelector('.detailContext');

  let postId = window.location.hash.substring(1).split('#');
  let posts = JSON.parse(localStorage.getItem(postType)) || [];
  let post = posts.find(post => post.id == postId);

  if (post) {
    detailTitle.textContent = post.title;
    detailWriter.textContent = post.name || '익명';
    detailDate.textContent = post.date;
    detailContext.textContent = post.content;
    renderComments((post.comments || []).reverse());
  } else {
    alert('해당 게시글을 찾을 수 없습니다.');
    window.location.href = '../index.html';
  }
}

export function submitComment(postType) {
  let detailCommentInputWriter = document.querySelector(
    '.detailCommentInputWriter'
  );
  let detailCommentInputContext = document.querySelector(
    '.detailCommentInputContext'
  );

  let commentName = detailCommentInputWriter.value || '익명';
  let commentContent = detailCommentInputContext.value;
  if (commentContent === '') {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  let postId = window.location.hash.substring(1).split('#');
  let posts = JSON.parse(localStorage.getItem(postType)) || [];
  let post = posts.find(post => post.id == postId);

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    name: commentName,
    content: commentContent,
  });
  localStorage.setItem(postType, JSON.stringify(posts));

  renderComments((post.comments || []).reverse());

  detailCommentInputWriter.value = '';
  detailCommentInputContext.value = '';
}

export function submitPost(postType) {
  let titleInput = document.querySelector('.postingInputTitle');
  let nameInput = document.querySelector('.postingInputName');
  let contentInput = document.querySelector('.postingInputContext');

  let title = titleInput.value;
  let name = nameInput.value;
  if (name === '') {
    name = '익명';
  }
  let content = contentInput.value;
  let date = new Date().toISOString().split('T')[0];

  if (title === '' || content === '') {
    alert('제목과 내용을 모두 입력해주세요.');
  } else {
    let post = {
      id: Date.now(),
      title: titleInput.value,
      name: name,
      content: contentInput.value,
      date: date,
    };

    let posts = JSON.parse(localStorage.getItem(postType)) || [];

    posts.push(post);
    localStorage.setItem(postType, JSON.stringify(posts));

    window.location.href = '../detail/index.html#' + post.id;

    titleInput.value = '';
    nameInput.value = '';
    contentInput.value = '';
  }
}

function renderComments(comments) {
  let detailCommentList = document.querySelector('.detailCommentList');

  detailCommentList.innerHTML = '';
  for (let comment of comments) {
    let commentElement = document.createElement('div');
    commentElement.className = 'detailComment';

    let writerElement = document.createElement('p');
    writerElement.className = 'detailCommentWriter';
    writerElement.textContent = comment.name || '익명';

    let contextElement = document.createElement('p');
    contextElement.className = 'detailCommentContext';
    contextElement.textContent = comment.content;

    commentElement.appendChild(writerElement);
    commentElement.appendChild(contextElement);
    detailCommentList.appendChild(commentElement);
  }
}
