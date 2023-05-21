document.addEventListener('DOMContentLoaded', function () {
  let detailTitle = document.querySelector('.detailTitle');
  let detailWriter = document.querySelector('.detailWriter');
  let detailDate = document.querySelector('.detailDate');
  let detailContext = document.querySelector('.detailContext');
  let detailCommentSubmit = document.querySelector('.detailCommentSubmit');
  let detailCommentInputWriter = document.querySelector(
    '.detailCommentInputWriter'
  );
  let detailCommentInputContext = document.querySelector(
    '.detailCommentInputContext'
  );
  let detailCommentList = document.querySelector('.detailCommentList');

  let postId = window.location.hash.substring(1).split('#');
  let posts = JSON.parse(localStorage.getItem('notice')) || [];

  let post = posts.find(post => post.id == postId);

  if (post) {
    detailTitle.textContent = post.title;
    detailWriter.textContent = post.userName || '익명';
    detailDate.textContent = post.date;
    post.contents.forEach((e,idx)=>{
      const outerDiv = document.createElement('div');
      outerDiv.textContent = e;
      detailContext.appendChild(outerDiv)
    })

    renderComments((post.comments || []).reverse());
  } else {
    alert('해당 게시글을 찾을 수 없습니다.');
    window.location.href = '../index.html';
  }

  function renderComments(comments) {
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

  detailCommentSubmit.addEventListener('click', function () {
    let commentName = detailCommentInputWriter.value || '익명';
    let commentContent = detailCommentInputContext.value;
    if (commentContent === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push({
      name: commentName,
      content: commentContent,
    });
    localStorage.setItem('noticePosts', JSON.stringify(posts));

    renderComments((post.comments || []).reverse());

    detailCommentInputWriter.value = '';
    detailCommentInputContext.value = '';
  });
});
