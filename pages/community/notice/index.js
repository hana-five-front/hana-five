import {
  getLocalStorageItems,
  displayPage,
  displayPagination,
  searchPost,
} from '../community.js';

function markDownToPlainWords(message) {
  return message.replace(/&gt;|:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function dateToText(date) {
  return date.split('T')[0];
}

function getSlackNotice() {
  getLocalStorageItems("board")
  fetch('http://43.200.63.91:3000/slackapi')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(data => {
      data = data.map((e, idx) => {
        e.title = markDownToPlainWords(e.title);
        e.content = e.content.map(e => markDownToPlainWords(e));
        e.date = dateToText(e.date);
        e.name = e.name === '' ? '익명' : e.name;
        return (e = { ...e, id: idx });
      });
      localStorage.setItem('notice', JSON.stringify(data.reverse()));
      return data.reverse();
    })
    .catch(function (error) {
      console.error(error);
    });
}

getSlackNotice();

let postType = 'notice';

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

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
