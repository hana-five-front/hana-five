export function getLocalStorageItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
export function setBoard(key) {
  let initBoard = [
    {
      content: ['안녕하세요'],
      date: '2023-05-31',
      id: 4,
      name: '이수창',
      mail: 'suchasucha@naver.com',
      title: '안녕하세요 이수창입니다',
    },
    {
      content: ['반갑습니다'],
      date: '2023-05-30',
      id: 3,
      name: '성창호',
      mail: 'yahiggoda@naver.com',
      title: '감사합니다 성창호입니다',
    },
    {
      content: ['감사합니다'],
      date: '2023-05-29',
      id: 2,
      name: '이상준',
      mail: 'uio3001@nate.com',
      title: '반갑습니다 이상준입니다',
    },
    {
      content: ['좋은 하루입니다'],
      date: '2023-05-28',
      id: 1,
      name: '곽동현',
      mail: 'jjs7280@kakao.com',
      title: '안녕하십니까 곽동현입니다',
    },
    {
      content: ['날씨가 좋네요'],
      date: '2023-05-27',
      id: 0,
      name: '정재헌',
      mail: 'joo000705@naver.com',
      title: '좋은아침 정재헌입니다',
    },
  ];
  if (!localStorage.getItem('board'))
    localStorage.setItem('board', JSON.stringify(initBoard));
}

export function getSessionStorageItems(key) {
  return sessionStorage.getItem(key);
}

export function setLocalStorageItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getPostId() {
  return window.location.hash.substring(1).split('#');
}

export function getPostType() {
  return window.location.href.split('/')[5];
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

export function filterPostsByKeyword(posts, keyword) {
  return posts.filter(post => post.title.includes(keyword));
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

export function displayPage(posts, currentPage, boardList) {
  let postsPerPage = 10;
  let start = (currentPage - 1) * postsPerPage;
  let end = start + postsPerPage;

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

export function displayPagination(posts, currentPage, pagination, boardList) {
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
  let editButtons = document.querySelector('.editButtons');
  let post = findLocalStorageItemById(
    getLocalStorageItems(postType),
    getPostId()
  );
  if (post) {
    detailTitle.textContent = post.title;
    detailWriter.textContent = post.name || '익명';
    detailDate.textContent = post.date;
    if (post.mail != getSessionStorageItems('userMail')) {
      editButtons.style.visibility = 'hidden';
    }

    post.content.forEach(e => {
      const outerDiv = document.createElement('div');
      outerDiv.textContent = e;
      detailContext.appendChild(outerDiv);
    });

    renderComments(postType, (post.comments || []).reverse());
  } else {
    alert('해당 게시글을 찾을 수 없습니다.');
    redirectTo('index');
  }
}

export function modifyPost(postType, postId) {
  let titleInput = document.querySelector('.postingInputTitle');
  let contentInput = document.querySelector('.postingInputContext');

  let title = titleInput.value;
  let name = getSessionStorageItems('userName');
  let mail = getSessionStorageItems('userMail');
  if (name === '') {
    name = '익명';
  }

  let content = contentInput.value.split(`\n`);

  let date = new Date().toISOString().split('T')[0];

  if (title === '' || content === '') {
    alert('제목과 내용을 모두 입력해주세요.');
  } else {
    let posts = getLocalStorageItems(postType);

    let post = {
      id: parseInt(postId),
      title: title,
      name: name,
      mail: mail,
      content: content,
      date: date,
      comments: getCommentsByPostId(posts, postId),
    };

    findAndChangeLocalStorageItem(postType, posts, postId, post);

    resetInputs([titleInput, contentInput]);
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

  let commentName = getSessionStorageItems('userName');
  let commentMail = getSessionStorageItems('userMail');
  let commentContent = detailCommentInputContext.value;
  if (commentContent === '') {
    alert('댓글 내용을 입력해주세요.');
    return;
  } else if (commentContent.length > 300) {
    alert('댓글은 최대 ' + 300 + '자까지 입력할 수 있습니다.');
    return;
  }

  let posts = getLocalStorageItems(postType);
  let post = findLocalStorageItemById(posts, getPostId());

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    id: getNextId(post.comments),
    name: commentName,
    mail: commentMail,
    content: commentContent,
  });
  setLocalStorageItems(postType, posts);

  renderComments(postType, (post.comments || []).reverse());

  resetInputs([detailCommentInputContext]);
}

export function searchPost(postType, currentPage, pagination, boardList) {
  let searchInput = document.querySelector('.boardSearchInput');
  let keyword = searchInput.value;

  let posts = filterPostsByKeyword(getLocalStorageItems(postType), keyword);

  displayPage(posts, currentPage, boardList);
  displayPagination(posts, currentPage, pagination, boardList);

  if (posts.length === 0) {
    const noPostsElement = document.createElement('p');
    noPostsElement.innerText = '게시글이 존재하지 않습니다';
    boardList.appendChild(noPostsElement);
  }
}

export function deleteComment(commentId) {
  let postId = getPostId();
  let postType = getPostType();
  let posts = getLocalStorageItems(postType);
  let post = findLocalStorageItemById(posts, postId);

  post.comments = post.comments.filter(comment => comment.id != commentId);
  findAndChangeLocalStorageItem(postType, posts, postId, post);
  renderComments(postType, (post.comments || []).reverse());
}

export function deleteCommentHandler(event) {
  const commentId = event.target.dataset.commentId;
  deleteComment(commentId);
}

export async function submitPost(postType) {
  let titleInput = document.querySelector('.postingInputTitle');
  let name = null;
  name = getSessionStorageItems('userName');
  let mail = getSessionStorageItems('userMail');
  let contentInput = document.querySelector('.postingInputContext');

  let title = titleInput.value;

  if (name == null) {
    name = '관리자';
  }
  let content = contentInput.value;
  let date = new Date().toISOString().split('T')[0];

  if (title === '' || content === '') {
    alert('제목과 내용을 모두 입력해주세요.');
  } else if (title.length > 75) {
    alert('제목은 최대 ' + 75 + '자까지 입력할 수 있습니다.');
  } else {
    let posts = getLocalStorageItems(postType);
    let nextId = getNextId(posts);

    if (postType === 'notice') {
      let post = {
        id: nextId,
        title: titleInput.value,
        name: name,
        mail: mail,
        content: contentInput.value.split('\n'),
        date: date,
      };

      posts.unshift(post);
      setLocalStorageItems(postType, posts);
      let text = [title + '\n', ...contentInput.value].join('');
      fetch('https://server-eternalclash.koyeb.app/slackapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      resetInputs([titleInput, contentInput]);
      redirectTo('detail/index', post.id);
    } else {
      let post = {
        id: nextId,
        title: titleInput.value,
        name: name,
        mail: mail,
        content: contentInput.value.split('\n'),
        date: date,
      };

      posts.push(post);
      localStorage.setItem(postType, JSON.stringify(posts));
      resetInputs([titleInput, contentInput]);
      redirectTo('detail/index', post.id);
    }
  }
}

function renderComments(postType, comments) {
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

    let divElement = document.createElement('div');
    divElement.className = 'deleteDivBox';

    commentElement.appendChild(writerElement);
    commentElement.appendChild(contextElement);
    commentElement.appendChild(divElement);

    if (getSessionStorageItems('userMail') == comment.mail) {
      let deleteCommentBtnElement = document.createElement('img');
      deleteCommentBtnElement.className = 'deleteCommentBtn';
      deleteCommentBtnElement.src = '/public/images/delete.svg';
      deleteCommentBtnElement.dataset.commentId = comment.id;
      deleteCommentBtnElement.addEventListener('click', deleteCommentHandler);

      divElement.appendChild(deleteCommentBtnElement);
    }

    detailCommentList.appendChild(commentElement);
  }
}

export function checkContentsEmpty() {
  const boardContent = document.querySelector('.boardContent');

  if (!boardContent) {
    const noPostsElement = document.createElement('p');
    noPostsElement.innerText = '게시글이 존재하지 않습니다';

    const boardList = document.querySelector('.boardList');
    document.addEventListener('DOMContentLoaded', function () {
      boardList.appendChild(noPostsElement);
    });
  }
}

export function asideHighLighter(postType) {
  let currentAsideSubject;
  if (postType === 'board') {
    currentAsideSubject = document.querySelector('.asideCommunityBoard');
  } else if (postType === 'notice') {
    currentAsideSubject = document.querySelector('.asideCommunityNotice');
  } else if (postType === 'qna') {
    currentAsideSubject = document.querySelector('.asideCommunityQna');
  }

  currentAsideSubject.style.color = '#008485';
}
