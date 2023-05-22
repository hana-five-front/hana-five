import { getPosts, displayPage, displayPagination } from '../community.js';

function markDowntoPlainWords(message) {
  return message.replace(/&gt;|:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function dateToText(date) {
  return date.split('T')[0];
}

function makeNotice(posts) {
  let boardList = document.querySelector('.boardList');
  boardList.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let listItem = document.createElement('li');
    listItem.className = 'boardContent';
    let link = document.createElement('a');
    link.href = `./detail/index.html#${post.id}`;

    let title = document.createElement('p');
    title.className = 'boardContentTitle';
    title.textContent = markDowntoPlainWords(post.title);
    link.appendChild(title);

    let infoDiv = document.createElement('div');
    infoDiv.className = 'boardContentInformation';

    let name = document.createElement('p');
    name.className = 'boardContentName';

    name.textContent = post.userName;
    infoDiv.appendChild(name);

    let date = document.createElement('p');
    date.className = 'boardContentDate';
    date.textContent = dateToText(post.date);
    infoDiv.appendChild(date);

    link.appendChild(infoDiv);
    listItem.appendChild(link);
    boardList.appendChild(listItem);
  }
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
        e.contents = e.contents.map(e => markDowntoPlainWords(e));
        e.date = dateToText(e.date);
        return (e = { ...e, id: idx });
      });
      makeNotice(data);

      localStorage.setItem('notice', JSON.stringify(data));
      const x = JSON.parse(localStorage.getItem('notice'));
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


getSlackNotice()
let postType = 'notice';

let currentPage = 1;

let boardList = document.querySelector('.boardList');
let pagination = document.querySelector('.boardPage');

let posts = getPosts(postType).reverse();

displayPage(posts, currentPage, boardList);
displayPagination(posts, currentPage, pagination, boardList);