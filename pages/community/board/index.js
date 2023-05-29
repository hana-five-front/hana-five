import {
  displayPage,
  displayPagination,
  getLocalStorageItems,
  searchPost,
  getSessionStorageItems
} from '../community.js';

let postType = 'board';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');
let searchBtn = document.querySelector('.boardButton');
let searchInput = document.querySelector('.boardSearchInput');

let posts = getLocalStorageItems(postType).reverse();

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

if (!getSessionStorageItems('userName')) 
{document.querySelector('.boardPostingButton').style.display = "none"}

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
