document.addEventListener('DOMContentLoaded', function () {
  let boardList = document.querySelector('.boardList');
  let pagination = document.querySelector('.boardPage');
  let postsPerPage = 10;
  let posts = (JSON.parse(localStorage.getItem('noticePosts')) || []).reverse();

  let currentPage = 1;
  let totalPages = Math.ceil(posts.length / postsPerPage);

  function displayPage(pageNumber) {
    let start = (pageNumber - 1) * postsPerPage;
    let end = start + postsPerPage;

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

  function displayPagination() {
    pagination.innerHTML = '';

    let firstPageButton = document.createElement('a');
    firstPageButton.href = '#';
    firstPageButton.className = 'firstPage';
    firstPageButton.addEventListener('click', function (e) {
      e.preventDefault();
      currentPage = 1;
      displayPage(currentPage);
    });
    pagination.appendChild(firstPageButton);

    let prevPageButton = document.createElement('a');
    prevPageButton.href = '#';
    prevPageButton.className = 'prevPage';
    prevPageButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
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
        displayPage(currentPage);
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
        displayPage(currentPage);
      }
    });
    pagination.appendChild(nextPageButton);

    let endPageButton = document.createElement('a');
    endPageButton.href = '#';
    endPageButton.className = 'endPage';
    endPageButton.addEventListener('click', function (e) {
      e.preventDefault();
      currentPage = totalPages;
      displayPage(currentPage);
    });
    pagination.appendChild(endPageButton);
  }

  displayPage(currentPage);
  displayPagination();
});
