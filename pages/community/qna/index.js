import { getPosts, displayPage, displayPagination } from '../community.js';

let postType = 'qnaPosts';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');

let posts = getPosts(postType).reverse();

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
