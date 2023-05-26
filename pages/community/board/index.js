import {
  displayPage,
  displayPagination,
  getLocalStorageItems,
  searchPost,
} from '../community.js';

let postType = 'board';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');
let searchBtn = document.querySelector('.boardButton');
let searchInput = document.querySelector('.boardSearchInput');

let posts = getLocalStorageItems(postType).reverse();

let writeBtn = document.querySelector('.boardPostingButton');

export function postingButton() {
  const sessionUser = sessionStorage.getItem('userName');
  console.log(sessionUser);
  if (!sessionUser) {
    writeBtn.style.visibility = 'hidden';
  } else {
    writeBtn.style.visibility = 'visible';
  }
}

postingButton();

window.onload = function () {
  searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    searchPost(postType, currentPage, pagination, boardList);
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBtn.click();
    }
  });
};

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
