import {
  displayPage,
  displayPagination,
  getLocalStorageItems,
} from '../community.js';

let postType = 'qna';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');
let posts = getLocalStorageItems(postType).reverse();
displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
