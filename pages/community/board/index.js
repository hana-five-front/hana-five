import { getPosts, displayPage, displayPagination,setBoard } from '../community.js';

let postType = 'boardPosts';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');
document.addEventListener('DOMContentLoaded',setBoard())
let posts = getPosts(postType).reverse();

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
