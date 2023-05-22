export function getLocalStorageItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorageItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getPostId() {
  return window.location.hash.substring(1).split('#');
}

export function findLocalStorageItemById(items, id) {
  return items.find(post => post.id == id);
}

export function findAndDeleteLocalStorageItem(items, id) {
  let index = items.findIndex(item => item.id == id);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

export function redirectToIndex() {
  window.location.href = '../index.html';
}

export function displayPage(postType, currentPage, boardList) {
  let postsPerPage = 10;
  let start = (currentPage - 1) * postsPerPage;
  let end = start + postsPerPage;

  let posts = getLocalStorageItems(postType);

  boardList.innerHTML = '';

  for (let i = start; i < end && i < posts.length; i++) {
    let post = posts[i];
    let listItem = document.createElement('li');
    listItem.className = 'boardContent';
    let link = document.createElement('a');
    link.href = `./detail/index.html#${post.id}`;

    let title = document.createElement('p');
    title.className = 'boardContentTitle';
    title.textContent = post.title;
    link.appendChild(title);

    let infoDiv = document.createElement('div');
    infoDiv.className = 'boardContentInformation';

    let name = document.createElement('p');
    name.className = 'boardContentName';
    name.textContent = post.name;
    infoDiv.appendChild(name);

    let date = document.createElement('p');
    date.className = 'boardContentDate';
    date.textContent = post.date;
    infoDiv.appendChild(date);

    link.appendChild(infoDiv);
    listItem.appendChild(link);
    boardList.appendChild(listItem);
  }
}

export function displayPagination(
  postType,
  currentPage,
  pagination,
  boardList
) {
  let postsPerPage = 10;
  let totalPages = Math.ceil(posts.length / postsPerPage);

  let posts = getLocalStorageItems(postType);

  pagination.innerHTML = '';

  let firstPageButton = document.createElement('a');
  firstPageButton.href = '#';
  firstPageButton.className = 'firstPage';
  firstPageButton.addEventListener('click', function (e) {
    e.preventDefault();
    currentPage = 1;
    displayPage(posts, currentPage, boardList);
  });
  pagination.appendChild(firstPageButton);

  let prevPageButton = document.createElement('a');
  prevPageButton.href = '#';
  prevPageButton.className = 'prevPage';
  prevPageButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(posts, currentPage, boardList);
    }
  });
  pagination.appendChild(prevPageButton);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('a');
    pageButton.href = '#';
    pageButton.textContent = i;

    pageButton.addEventListener('click', function (e) {
      e.preventDefault();
      currentPage = i;
      displayPage(posts, currentPage, boardList);
    });

    pagination.appendChild(pageButton);
  }

  let nextPageButton = document.createElement('a');
  nextPageButton.href = '#';
  nextPageButton.className = 'nextPage';
  nextPageButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(posts, currentPage, boardList);
    }
  });
  pagination.appendChild(nextPageButton);

  let endPageButton = document.createElement('a');
  endPageButton.href = '#';
  endPageButton.className = 'endPage';
  endPageButton.addEventListener('click', function (e) {
    e.preventDefault();
    currentPage = totalPages;
    displayPage(posts, currentPage, boardList);
  });
  pagination.appendChild(endPageButton);
}

export function renderPost(postType) {
  let detailTitle = document.querySelector('.detailTitle');
  let detailWriter = document.querySelector('.detailWriter');
  let detailDate = document.querySelector('.detailDate');
  let detailContext = document.querySelector('.detailContext');

  let post = findLocalStorageItemById(
    getLocalStorageItems(postType),
    getPostId()
  );

  if (post) {
    detailTitle.textContent = post.title;
    detailWriter.textContent = post.name || '익명';
    detailDate.textContent = post.date;
    if (postType === 'notice') {
      post.content.forEach(e => {
        const outerDiv = document.createElement('div');
        outerDiv.textContent = e;
        detailContext.appendChild(outerDiv);
      });
    } else {
      detailContext.textContent = post.content;
    }

    renderComments((post.comments || []).reverse());
  } else {
    alert('해당 게시글을 찾을 수 없습니다.');
    redirectToIndex();
  }
}

export function deletePost(postType) {
  let posts = getLocalStorageItems(postType);

  findAndDeleteLocalStorageItem(posts, getPostId());

  setLocalStorageItems(postType, posts);
  redirectToIndex();
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

  let post = findLocalStorageItemById(
    getLocalStorageItems(postType),
    getPostId()
  );

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    name: commentName,
    content: commentContent,
  });
  setLocalStorageItems(postType, posts);

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
    let posts = getLocalStorageItems(postType);

    if (postType === 'notice') {
      let post = {
        id: posts.length,
        title: titleInput.value,
        name: name,
        content: contentInput.value.split('\n'),
        date: date,
      };

      posts.unshift(post);
      setLocalStorageItems(postType, posts);
      let text = [title + '\n', ...contentInput.value].join('');
      fetch('http://localhost:3000/slackapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      titleInput.value = '';
      nameInput.value = '';
      contentInput.value = '';
      window.location.href = '../detail/index.html#' + post.id;
    } else {
      let post = {
        id: posts.length,
        title: titleInput.value,
        name: name,
        content: contentInput.value,
        date: date,
      };

      posts.push(post);
      setLocalStorageItems(postType, posts);

      titleInput.value = '';
      nameInput.value = '';
      contentInput.value = '';
      window.location.href = '../detail/index.html#' + post.id;
    }
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
