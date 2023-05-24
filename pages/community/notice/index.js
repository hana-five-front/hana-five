import { getLocalStorageItems,displayPage, displayPagination } from '../community.js';

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

let posts = getLocalStorageItems(postType);

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);
