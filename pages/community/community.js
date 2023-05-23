export function getLocalStorageItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorageItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getPostId() {
  return window.location.hash.substring(1).split('#');
}

export function getNextId(items) {
  const nextId = Math.max(...items.map(item => item.id)) + 1;
  return isFinite(nextId) ? nextId : 0;
}

export function findLocalStorageItemById(items, id) {
  return items.find(item => item.id == id);
}

export function findLocalStorageItemIndexById(items, id) {
  return items.findIndex(item => item.id == id);
}

export function getCommentsByPostId(posts, postId) {
  return findLocalStorageItemById(posts, postId).comments;
}

export function deleteLocalStorageItem(items, index) {
  if (index !== -1) {
    items.splice(index, 1);
  }
}

export function changeLocalStorageItem(items, index, newItem) {
  if (index !== -1) {
    items.splice(index, 1, newItem);
  }
}

export function findAndDeleteLocalStorageItem(key, items, id) {
  let index = findLocalStorageItemIndexById(items, id);
  deleteLocalStorageItem(items, index);
  setLocalStorageItems(key, items);
}

export function findAndChangeLocalStorageItem(key, items, id, newItem) {
  let index = findLocalStorageItemIndexById(items, id);
  changeLocalStorageItem(items, index, newItem);
  setLocalStorageItems(key, items);
}

export function redirectTo(href, index) {
  if (index) {
    index = '#' + index;
  } else {
    index = '';
  }
  window.location.href = '../' + href + '.html' + index;
}

function resetInputs(inputs) {
  inputs.forEach(input => {
    input.value = '';
  });
}

function resetElementContent(selectors) {
  selectors.forEach(selector => {
    selector.innerHTML = '';
  });
}

export function displayPage(postType, currentPage, boardList) {
  let postsPerPage = 10;
  let start = (currentPage - 1) * postsPerPage;
  let end = start + postsPerPage;

  let posts = getLocalStorageItems(postType).reverse();

  resetElementContent([boardList]);

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
  let posts = getLocalStorageItems(postType);

  let postsPerPage = 10;
  let totalPages = Math.ceil(posts.length / postsPerPage);

  resetElementContent([pagination]);

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
    redirectTo('index');
  }
}

export function modifyPost(postType, postId) {
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

    let post = {
      id: parseInt(postId),
      title: title,
      name: name,
      content: content,
      date: date,
      comments: getCommentsByPostId(posts, postId),
    };

    findAndChangeLocalStorageItem(postType, posts, postId, post);

    resetInputs([titleInput, nameInput, contentInput]);
    redirectTo('detail/index', postId);
  }
}

export function deletePost(postType) {
  findAndDeleteLocalStorageItem(
    postType,
    getLocalStorageItems(postType),
    getPostId()
  );
  redirectTo('index');
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

  let posts = getLocalStorageItems(postType);
  let post = findLocalStorageItemById(posts, getPostId());

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    name: commentName,
    content: commentContent,
  });
  setLocalStorageItems(postType, posts);

  renderComments((post.comments || []).reverse());

  resetInputs([detailCommentInputWriter, detailCommentInputContext]);
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
    let nextId = getNextId(posts);

    if (postType === 'notice') {
      let post = {
        id: nextId,
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
      resetInputs([titleInput, nameInput, contentInput]);
      redirectTo('detail/index', post.id);
    } else {
      let post = {
        id: nextId,
        title: titleInput.value,
        name: name,
        content: contentInput.value,
        date: date,
      };

      posts.push(post);
      setLocalStorageItems(postType, posts);

      resetInputs([titleInput, nameInput, contentInput]);
      redirectTo('detail/index', post.id);
    }
  }
}

function renderComments(comments) {
  let detailCommentList = document.querySelector('.detailCommentList');

  resetElementContent([detailCommentList]);

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
