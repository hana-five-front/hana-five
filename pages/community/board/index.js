import { getLocalStorageItems, displayPage, displayPagination,setBoard } from '../community.js';

let postType = 'board';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');
document.addEventListener('DOMContentLoaded',setBoard)
let posts = getLocalStorageItems(postType).reverse();

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
