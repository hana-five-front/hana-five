import { getPosts, displayPage, displayPagination } from '../community.js';

let postType = 'boardPosts';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');

let posts = getPosts(postType).reverse(); // 함수 재사용

displayPage(posts, currentPage, boardList); // 함수 재사용
displayPagination(posts, currentPage, pagination, boardList); // 함수 재사용
