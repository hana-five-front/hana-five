import {
  getLocalStorageItems,
  displayPage,
  displayPagination,
  searchPost,
} from '../community.js';

function markDowntoPlainWords(message) {
  return message.replace(/&gt;|:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function dateToText(date) {
  return date.split('T')[0];
}

function getSlackNotice() {
  fetch('http://localhost:3000/slackapi')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(data => {
      data = data.map((e, idx) => {
        e.title = markDowntoPlainWords(e.title);
        e.content = e.content.map(e => markDowntoPlainWords(e));
        e.date = dateToText(e.date);
        e.name = e.name === '' ? '익명' : e.name;
        return (e = { ...e, id: idx });
      });
      localStorage.setItem('notice', JSON.stringify(data));
      return data;
    })
    .catch(function (error) {
      console.log(error);
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
