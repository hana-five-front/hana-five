import { displayPage, displayPagination } from '../community.js';

let postType = 'board';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');

displayPage(postType, currentPage, boardList);
displayPagination(postType, currentPage, pagination, boardList);
